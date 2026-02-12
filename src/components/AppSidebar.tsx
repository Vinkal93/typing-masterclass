import { Home, BookOpen, Gamepad2, TrendingUp, Keyboard, User, History, ClipboardList, Zap, Target, Hand, Trophy, Medal, BarChart3, FileText } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";

export function AppSidebar() {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const location = useLocation();
  const { t, isHindi } = useLanguage();
  const collapsed = state === "collapsed";

  const mainItems = [
    { title: t('dashboard'), url: "/", icon: Home },
    { title: isHindi ? "फास्ट ट्रैक" : "Fast Track", url: "/fast-track", icon: Zap },
    { title: t('lessons'), url: "/lessons", icon: BookOpen },
    { title: isHindi ? "स्मार्ट प्रैक्टिस" : "Smart Practice", url: "/smart-practice", icon: Target },
    { title: t('games'), url: "/games", icon: Gamepad2 },
    { title: isHindi ? "CPCT Mock" : "CPCT Mock", url: "/cpct-mock", icon: FileText },
    { title: t('progress'), url: "/progress", icon: TrendingUp },
    { title: t('keyboardGuide'), url: "/keyboard-guide", icon: Keyboard },
  ];

  const secondaryItems = [
    { title: isHindi ? "फिंगर हीटमैप" : "Finger Heatmap", url: "/finger-heatmap", icon: Hand },
    { title: isHindi ? "उपलब्धियाँ" : "Achievements", url: "/achievements", icon: Trophy },
    { title: isHindi ? "लीडरबोर्ड" : "Leaderboard", url: "/leaderboard", icon: Medal },
    { title: isHindi ? "एरर विश्लेषण" : "Error Analysis", url: "/error-analysis", icon: BarChart3 },
    { title: isHindi ? "पूर्ण इतिहास" : "Full History", url: "/full-history", icon: ClipboardList },
    { title: t('examHistory'), url: "/exam-history", icon: History },
    { title: t('about'), url: "/about-developer", icon: User },
  ];

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-accent/50"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                      onClick={handleNavClick}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t('more')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-accent/50"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                      onClick={handleNavClick}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
