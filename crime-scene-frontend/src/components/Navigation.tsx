import { NavLink } from "react-router-dom";
import { Home, Upload, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/upload", label: "Upload", icon: Upload },
    { to: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">CrimeDetect AI</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `p-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`
                }
                title={label}
              >
                <Icon className="h-5 w-5" />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;