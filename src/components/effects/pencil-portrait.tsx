import Image from "next/image";
import { cn } from "@/lib/utils";

/** Frames the (real, hand-style) pencil-sketch portrait consistently with
 * the rest of the paper/print system — no filters applied here, since the
 * source image is already a finished sketch, not a photo to process. */
export function PencilPortrait({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-paper-2",
        className
      )}
    >
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 24rem, 60vw" className="object-cover" />
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-line"
        aria-hidden="true"
      />
    </div>
  );
}
