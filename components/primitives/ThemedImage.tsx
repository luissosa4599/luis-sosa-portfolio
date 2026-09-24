import Image from "next/image"
import { cn } from "@/lib/utils"

// All screenshots are 16:10 (1440×900); used for aspect ratio when not `fill`
const WIDTH = 1440
const HEIGHT = 900

interface ThemedImageProps {
  src: string
  /** Light-theme variant. When present, `src` is shown only in dark mode. */
  srcLight?: string
  alt: string
  sizes: string
  /** Cover the nearest positioned parent instead of sizing by aspect ratio */
  fill?: boolean
  className?: string
}

/**
 * Dark/light screenshot pair via next/image.
 * Images stay lazy: the variant hidden with display:none is never downloaded,
 * so each visitor only fetches the one matching their theme.
 */
export function ThemedImage({ src, srcLight, alt, sizes, fill, className }: ThemedImageProps) {
  const sizing = fill ? { fill: true } : { width: WIDTH, height: HEIGHT }

  function render(imageSrc: string, themeClass?: string) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        sizes={sizes}
        {...sizing}
        className={cn(!fill && "w-full h-auto", themeClass, className)}
      />
    )
  }

  if (!srcLight) return render(src)

  return (
    <>
      {render(src, "theme-dark-only")}
      {render(srcLight, "theme-light-only")}
    </>
  )
}
