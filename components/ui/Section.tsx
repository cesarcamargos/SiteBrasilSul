import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  tone?: "default" | "alt" | "dark";
  as?: "section" | "div";
  paddingTop?: boolean;
}

const tones = {
  default: "bg-concreto text-grafite",
  alt: "bg-concreto-alt text-grafite",
  dark: "bg-preto text-branco",
};

export function Section({
  children,
  className = "",
  tone = "default",
  as = "section",
  paddingTop = true,
}: SectionProps) {
  const Tag = as;
  return (
    <Tag className={`${tones[tone]} ${paddingTop ? "pt-xxl" : ""} pb-xxl ${className}`}>
      <div className="mx-auto max-w-[1180px] px-lg">{children}</div>
    </Tag>
  );
}
