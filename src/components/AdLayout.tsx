import AdBanner from "@/components/AdBanner";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
}

const AdLayout = ({ children, showSidebar = true, showHeader = true }: AdLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full">
      {/* Top Header Banner - Below Navbar */}
      {showHeader && (
        <div className="w-full bg-muted/30 py-1">
          <div className="container mx-auto px-4">
            <div className="min-h-0">
              <AdBanner slot="1000000001" format="leaderboard" className="my-1" />
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>

        {/* Sticky Sidebar Ad - Desktop Only */}
        {showSidebar && !isMobile && (
          <aside className="hidden lg:block w-[320px] shrink-0 pr-4 pt-8">
            <div className="sticky top-20 min-h-0">
              <AdBanner slot="1000000002" format="vertical" className="mb-4" responsive={false} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default AdLayout;
