import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Trophy,
  User,
  Database,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Learn", url: "/learn", icon: BookOpen },
  { title: "MCQ Arena", url: "/mcq", icon: Brain },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Profile", url: "/profile", icon: User },
];

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside
        className={`sticky top-0 h-screen border-r border-border bg-card flex flex-col transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 h-14 border-b border-border shrink-0">
          <Database className="w-5 h-5 text-primary shrink-0" />
          {!collapsed && (
            <span className="font-bold text-base tracking-tight">SQL Quest</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              activeClassName="bg-secondary text-foreground font-medium"
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-10 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AppLayout;
