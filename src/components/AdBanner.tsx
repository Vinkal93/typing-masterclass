import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
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
    <div className={`ad-container flex justify-center ${className}`} ref={adRef}>
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
