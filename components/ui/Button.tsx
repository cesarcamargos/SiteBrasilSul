import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "inverted" | "light" | "whatsapp";

const base =
  "inline-flex items-center gap-2.5 font-mono text-mono-label uppercase px-[26px] py-[15px] border transition-colors duration-200 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-grafite text-branco border-grafite hover:bg-sinal hover:border-sinal",
  outline:
    "bg-transparent text-grafite border-grafite hover:bg-sinal hover:text-branco hover:border-sinal",
  inverted:
    "bg-concreto text-grafite border-concreto hover:bg-branco",
  light: "bg-concreto text-grafite border-concreto hover:bg-branco",
  whatsapp:
    "bg-whatsapp text-branco border-whatsapp hover:bg-whatsapp-escuro hover:border-whatsapp-escuro",
};

const arrow = (
  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
    →
  </span>
);

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", children, className = "", showArrow = variant !== "whatsapp", ...rest } = props;
  const classes = `${base} ${variants[variant]} group ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as LinkProps;
    const isExternal = href.startsWith("http") || href.startsWith("https://wa.me");
    if (isExternal) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {children}
          {showArrow && arrow}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
        {showArrow && arrow}
      </Link>
    );
  }

  const { ...buttonRest } = rest as ButtonProps;
  return (
    <button className={classes} {...buttonRest}>
      {children}
      {showArrow && arrow}
    </button>
  );
}
