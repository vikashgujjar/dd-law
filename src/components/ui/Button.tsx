import { Magnetic } from "@/components/motion/primitives";
import { ArrowIcon } from "./Icons";

type Variant = "gold" | "ghost" | "ink" | "ivory";

const styles: Record<Variant, string> = {
  gold: "bg-gold text-navy hover:text-navy before:bg-gold-light",
  ghost: "border border-ivory/25 text-ivory hover:border-gold hover:text-navy before:bg-gold",
  ink: "bg-charcoal text-ivory hover:text-navy before:bg-gold",
  ivory: "bg-ivory text-navy hover:text-navy before:bg-gold",
};

/**
 * Premium CTA: magnetic drift, a fill that rises from below, and an arrow that slides.
 */
export function Button({
  href,
  children,
  variant = "gold",
  icon,
  className = "",
  magnetic = true,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: React.ReactNode;
  className?: string;
  magnetic?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  const link = (
    <a
      href={href}
      className={`group relative isolate inline-flex items-center gap-3 overflow-hidden px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ease-lux
        before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 before:ease-lux hover:before:scale-y-100
        ${styles[variant]} ${className}`}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      {!icon && (
        <span className="relative flex h-4 w-4 overflow-hidden">
          <ArrowIcon className="absolute h-4 w-4 transition-transform duration-500 ease-lux group-hover:translate-x-full" />
          <ArrowIcon className="absolute h-4 w-4 -translate-x-full transition-transform duration-500 ease-lux group-hover:translate-x-0" />
        </span>
      )}
    </a>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
