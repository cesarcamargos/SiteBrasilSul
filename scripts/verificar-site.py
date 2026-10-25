"""Check the static site without dependencies: python scripts/verificar-site.py."""

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import json
import re
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.ids = []
        self.links = []
        self.structured_data = []
        self.script = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for key in ("href", "src"):
            if attrs.get(key):
                self.links.append(attrs[key])
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.script = ""

    def handle_data(self, data):
        if self.script is not None:
            self.script += data

    def handle_endtag(self, tag):
        if tag == "script" and self.script is not None:
            self.structured_data.append(self.script)
            self.script = None


def check():
    files = sorted([*ROOT.glob("*.html"), *ROOT.joinpath("blog").glob("*.html")])
    docs = {path: Document(path.read_text(encoding="utf-8")) for path in files}
    errors = []

    def report(path, message):
        errors.append(f"{path.relative_to(ROOT)}: {message}")

    def check_link(path, link, check_anchor=True):
        url = urlsplit(link)
        if url.scheme or url.netloc:
            return
        if url.path.startswith("/"):
            target = ROOT / unquote(url.path.lstrip("/"))
        else:
            target = path.parent / unquote(url.path) if url.path else path
        target = target.resolve()
        if not target.is_relative_to(ROOT):
            report(path, f"link outside site: {link}")
            return
        if target.is_dir():
            target /= "index.html"
        if not target.is_file():
            report(path, f"missing target: {link}")
        elif check_anchor and url.fragment and target in docs and unquote(url.fragment) not in docs[target].ids:
            report(path, f"missing anchor: {link}")

    for path, doc in docs.items():
        counts = Counter(tag for tag, attrs in doc.tags)
        for tag in ("title", "main", "h1", "header", "footer"):
            if counts[tag] != 1:
                report(path, f"expected one {tag}, found {counts[tag]}")
        for element_id, count in Counter(doc.ids).items():
            if count > 1:
                report(path, f"duplicate id: {element_id}")
        if "conteudo" not in doc.ids:
            report(path, "missing skip-link target")
        for link in doc.links:
            check_link(path, link)
            if "fonts.googleapis.com" in link:
                report(path, "external font dependency")
        for data in doc.structured_data:
            try:
                json.loads(data)
            except ValueError as error:
                report(path, f"invalid structured data: {error}")
        if path.name != "404.html" and not any(tag == "link" and attrs.get("rel") == "canonical" for tag, attrs in doc.tags):
            report(path, "missing canonical URL")
        if not any(tag == "meta" and attrs.get("name") == "description" for tag, attrs in doc.tags):
            report(path, "missing description")
        if any(tag in {"rect", "text", "svg"} for tag, attrs in doc.tags[:20]):
            report(path, "unexpected SVG in document metadata")

    for path in ROOT.joinpath("css").glob("*.css"):
        css = path.read_text(encoding="utf-8")
        for match in re.finditer(r"url\(\s*['\"]?([^)'\"\s]+)", css):
            check_link(path, match[1], check_anchor=False)
        if "fonts.googleapis.com" in css:
            report(path, "external font dependency")

    contact = docs[ROOT / "contato.html"]
    forms = [attrs for tag, attrs in contact.tags if tag == "form" and "data-lead" in attrs]
    if len(forms) != 1 or forms[0].get("method", "").lower() != "post" or forms[0].get("action") != "https://formspree.io/f/mgogowov":
        report(ROOT / "contato.html", "lead form native POST integration changed")

    if errors:
        print("\n".join(errors))
        return 1
    print(f"OK: {len(files)} pages; links, anchors, assets, metadata, structured data and native lead form verified.")
    return 0


if __name__ == "__main__":
    raise SystemExit(check())
