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
}

const AdBanner = ({ slot, format = "auto", className = "", responsive = true }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const isMobile = useIsMobile();
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
      // Check if ad rendered after a delay
      setTimeout(() => {
        if (adRef.current) {
          const ins = adRef.current.querySelector('ins');
          if (ins && ins.getAttribute('data-ad-status') === 'filled') {
            setAdLoaded(true);
          }
        }
      }, 2000);
    } catch (e) {
      console.error("Ad error:", e);
    }
  }, []);

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
    return { display: "block" };
  };

  return (
    <div 
      className={`ad-container flex justify-center overflow-hidden transition-all duration-300 ${className}`} 
      ref={adRef}
      style={{ minHeight: 0, maxHeight: adLoaded ? '600px' : '0px', opacity: adLoaded ? 1 : 0 }}
    >
      <ins
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client="ca-pub-6692854120594522"
        data-ad-slot={slot}
        data-ad-format={format === "auto" || (isMobile && responsive) ? "auto" : undefined}
        data-full-width-responsive={responsive ? "true" : undefined}
      />
    </div>
  );
};

export default AdBanner;
