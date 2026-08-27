import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper border border-ink hover:bg-accent-deep hover:border-accent-deep",
        "solid-on-panel": "bg-accent text-accent-ink border border-accent hover:bg-white",
        outline: "border border-line text-ink hover:border-ink",
        "outline-on-panel": "border border-panel-line text-on-panel hover:border-accent hover:text-accent",
        ghost: "text-muted hover:text-ink",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "h-9 w-9 p-0",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "solid", size: "default" },
  }
);

type Common = VariantProps<typeof buttonVariants> & { className?: string };

export type ButtonProps =
  | (Common & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (Common & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

/** Shared pill button — renders an `<a>` when `href` is passed, a `<button>` otherwise. */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(buttonVariants({ variant, size }), className)}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);
Button.displayName = "Button";
