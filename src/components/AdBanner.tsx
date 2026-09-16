import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle" | "leaderboard";
  className?: string;
  responsive?: boolean;
  onAdLoaded?: () => void;
}

/** AdSense refuses to render below this width; pushing anyway throws a TagError. */
const MIN_AD_WIDTH = 250;

const AdBanner = ({ slot, format = "auto", className = "", responsive = true, onAdLoaded }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const isMobile = useIsMobile();
  const [adLoaded, setAdLoaded] = useState(false);
  const [hasWidth, setHasWidth] = useState(false);

  // Wait until the slot actually has usable width before asking AdSense to fill it.
  useEffect(() => {
    const node = adRef.current;
    if (!node) return;

    const check = () => {
      if (node.getBoundingClientRect().width >= MIN_AD_WIDTH) setHasWidth(true);
    };
    check();

    const observer = new ResizeObserver(check);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasWidth || pushed.current) return;
    pushed.current = true;

    let timer: number | undefined;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      timer = window.setTimeout(() => {
        const ins = adRef.current?.querySelector("ins");
        if (ins && ins.getAttribute("data-ad-status") === "filled") {
          setAdLoaded(true);
          onAdLoaded?.();
        }
      }, 2000);
    } catch {
      // No ad to show — the container stays collapsed, layout is unaffected.
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [hasWidth, onAdLoaded]);

  const getAdStyle = (): React.CSSProperties => {
    if (format === "leaderboard" && !isMobile) {
      return { display: "inline-block", width: "728px", height: "90px" };
    }
    if (format === "vertical") {
      return { display: "inline-block", width: "300px", height: "600px" };
    }
    if (format === "rectangle") {
      return { display: "inline-block", width: "336px", height: "280px" };
    }
    return { display: "block", width: "100%" };
  };

  return (
    <div
      className={`ad-container w-full flex justify-center overflow-hidden transition-all duration-300 ${className}`}
      ref={adRef}
      style={{ minHeight: 0, maxHeight: adLoaded ? "600px" : "0px", opacity: adLoaded ? 1 : 0 }}
    >
      {hasWidth && (
        <ins
          className="adsbygoogle"
          style={getAdStyle()}
          data-ad-client="ca-pub-6692854120594522"
          data-ad-slot={slot}
          data-ad-format={format === "auto" || (isMobile && responsive) ? "auto" : undefined}
          data-full-width-responsive={responsive ? "true" : undefined}
        />
      )}
    </div>
  );
};

export default AdBanner;
