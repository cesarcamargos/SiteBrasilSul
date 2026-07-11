"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "brasilsul_cookies";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "ok") return;
    } catch {
      return;
    }
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "ok");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className={`fixed left-0 right-0 bottom-0 z-toast bg-preto text-branco/85 border-t border-branco/10 px-lg py-[14px] flex items-center justify-center gap-lg flex-wrap transition-transform duration-400 ease-out ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <span className="text-body-sm">
        Usamos cookies essenciais para o funcionamento do site.{" "}
        <Link href="/privacidade" className="text-sinal underline">
          Saiba mais
        </Link>
      </span>
      <button
        type="button"
        onClick={accept}
        className="font-mono text-mono-label normal-case px-lg py-sm bg-branco text-preto hover:bg-sinal hover:text-branco transition-colors"
      >
        Aceitar
      </button>
    </div>
  );
}
