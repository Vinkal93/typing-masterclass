import AdBanner from "@/components/AdBanner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface AdLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
}

const AdLayout = ({ children, showSidebar = true, showHeader = true }: AdLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarAdLoaded, setSidebarAdLoaded] = useState(false);

  return (
    <div className="w-full">
      {showHeader && (
        <div className="w-full">
          <div className="container mx-auto px-4">
            <AdBanner slot="1000000001" format="leaderboard" className="my-1" />
          </div>
        </div>
      )}

      <div className="flex w-full">
        <div className="flex-1 min-w-0">
          {children}
        </div>

        {showSidebar && !isMobile && (
          <aside 
            className={`hidden lg:block shrink-0 pr-4 pt-8 transition-all duration-300 ${
              sidebarAdLoaded ? 'w-[320px]' : 'w-0 overflow-hidden'
            }`}
          >
            <div className="sticky top-20">
              <AdBanner 
                slot="1000000002" 
                format="vertical" 
                className="mb-4" 
                responsive={false}
                onAdLoaded={() => setSidebarAdLoaded(true)} 
              />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default AdLayout;
