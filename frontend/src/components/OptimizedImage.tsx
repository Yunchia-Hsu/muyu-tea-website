import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

// 將 .png 路徑轉換為 .webp 路徑
const getWebPSrc = (src: string): string => {
  return src.replace(/\.(png|jpg|jpeg)$/i, ".webp");
};

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/images/tea-intro.webp",
  onLoad,
  className,
  style,
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  const imageSrc = hasError ? fallbackSrc : src;
  const webpSrc = getWebPSrc(imageSrc);
  const pngSrc = imageSrc;

  return (
    <picture>
      {/* WebP  - modern browser */}
      <source srcSet={webpSrc} type="image/webp" />
      {/* PNG fallback - old browser */}
      <img
        src={pngSrc}
        alt={alt}
        loading="lazy"
        onLoad={onLoad}
        onError={handleError}
        className={className}
        style={style}
      />
    </picture>
  );
}
