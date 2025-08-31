
// // Header.tsx
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Truck, User, LogOut } from "lucide-react";
// import NotificationBell from "./NotificationBell";
// import { useAuth } from "@/contexts/AuthContext";  // <-- real context

// export const Header = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   // derive role once
//   const role = user?.role?.toLowerCase();

//   const handleLogout = () => {
//     logout();        // clears token + context
//     navigate("/login");
//   };

//   const getRoleColor = (r?: string) => {
//     switch (r) {
//       case "admin": return "bg-destructive";
//       case "dispatcher": return "bg-accent";
//       default: return "bg-primary";
//     }
//   };

//   return (
//     <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="bg-primary p-2 rounded-lg">
//               <Truck className="h-6 w-6 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-foreground">CargoStream</h1>
//               <p className="text-xs text-muted-foreground">Delivery Platform</p>
//             </div>
//           </Link>

//           {/* Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             {role && (
//               <>
//                 {role === "customer" && (
//                   <>
//                     <Link to="/dashboard">Dashboard</Link>
//                     <Link to="/booking">New Booking</Link>
//                     <Link to="/tracking">Track Orders</Link>
//                   </>
//                 )}
//                 {role === "admin" && (
//                   <>
//                     <Link to="/dashboard">Dashboard</Link>
//                     <Link to="/admin/bookings">Bookings</Link>
//                     <Link to="/admin/users">Users</Link>
//                     <Link to="/admin/reports">Reports</Link>
//                   </>
//                 )}
//                 {role === "dispatcher" && (
//                   <>
//                     <Link to="/dashboard">Dashboard</Link>
//                     <Link to="/dispatcher/deliveries">My Deliveries</Link>
//                   </>
//                 )}
//               </>
//             )}
//           </nav>

//           {/* Right side */}
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <NotificationBell />
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" className="h-8 w-8 rounded-full">
//                       <Avatar>
//                         <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
//                         <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
//                       </Avatar>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-56" align="end" forceMount>
//                     <div className="flex items-center gap-2 p-2">
//                       <div className="flex flex-col">
//                         <p className="font-medium">{user.name}</p>
//                         <Badge className={`text-xs ${getRoleColor(role)}`}>
//                           {role?.charAt(0).toUpperCase() + role?.slice(1)}
//                         </Badge>
//                       </div>
//                     </div>
//                     <DropdownMenuItem onClick={handleLogout}>
//                       <LogOut className="mr-2 h-4 w-4" />
//                       Log out
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Button variant="ghost" asChild>
//                   <Link to="/login">Login</Link>
//                 </Button>
//                 <Button asChild>
//                   <Link to="/register">Register</Link>
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };












// Header.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Truck, User, LogOut, Menu, X } from "lucide-react";
import NotificationBell from "./NotificationBell";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // derive role once, safely handle undefined
  const role = typeof user?.role === 'string' ? user.role.toLowerCase() : undefined;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getRoleColor = (r?: string) => {
    switch (r) {
      case "admin": return "bg-destructive";
      case "dispatcher": return "bg-accent";
      default: return "bg-primary";
    }
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md hover-lift group ${
        isActiveRoute(to)
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
      }`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
        isActiveRoute(to) ? 'w-full' : 'w-0 group-hover:w-full'
      }`} />
    </Link>
  );

  return (
    <header className={`border-b backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 shadow-md border-border/50' 
        : 'bg-card/50 border-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-all duration-300 animate-pulse-glow">
              <Truck className="h-6 w-6 text-primary-foreground animate-float" />
            </div>
            <div className="transition-all duration-300 group-hover:translate-x-1">
              <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                CargoStream
              </h1>
              <p className="text-xs text-muted-foreground">Delivery Platform</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {role && (
              <>
                {role === "customer" && (
                  <>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/dashboard/create-booking">New Booking</NavLink>
                    <NavLink to="/tracking">Track Orders</NavLink>
                  </>
                )}
                {role === "admin" && (
                  <>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/dashboard/booking-management">Bookings</NavLink>
                    <NavLink to="/dashboard/user-management">Users</NavLink>
                    <NavLink to="/dashboard/reports">Reports</NavLink>
                    <NavLink to="/dashboard/pricing-rules">Pricing</NavLink>
                  </>
                )}
                {role === "dispatcher" && (
                  <>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/dispatcher/deliveries">My Deliveries</NavLink>
                  </>
                )}
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover-scale"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-300" />
              )}
            </Button>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="animate-fade-in-right">
                  <NotificationBell />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 rounded-full hover-scale group">
                      <Avatar className="group-hover:ring-2 group-hover:ring-primary/50 transition-all duration-300">
                        <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                        <AvatarFallback className="group-hover:bg-primary/20 transition-colors">
                          {user.name?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 animate-scale-in" align="end" forceMount>
                    <div className="flex items-center gap-3 p-3 border-b">
                      <Avatar>
                        <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                        <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <Badge className={`text-xs mt-1 w-fit ${getRoleColor(role)}`}>
                          {role?.charAt(0).toUpperCase() + role?.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenuItem onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive transition-colors">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2 animate-fade-in-left">
                <Button variant="ghost" className="hover-lift" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="btn-interactive hover-lift" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in-down">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t bg-card/95 backdrop-blur-sm">
              {role && (
                <>
                  {role === "customer" && (
                    <>
                      <NavLink to="/dashboard">Dashboard</NavLink>
                      <NavLink to="/dashboard/create-booking">New Booking</NavLink>
                      <NavLink to="/tracking">Track Orders</NavLink>
                    </>
                  )}
                  {role === "admin" && (
                    <>
                      <NavLink to="/dashboard">Dashboard</NavLink>
                      <NavLink to="/dashboard/booking-management">Bookings</NavLink>
                      <NavLink to="/dashboard/user-management">Users</NavLink>
                      <NavLink to="/dashboard/reports">Reports</NavLink>
                      <NavLink to="/dashboard/pricing-rules">Pricing</NavLink>
                    </>
                  )}
                  {role === "dispatcher" && (
                    <>
                      <NavLink to="/dashboard">Dashboard</NavLink>
                      <NavLink to="/dispatcher/deliveries">My Deliveries</NavLink>
                    </>
                  )}
                </>
              )}
              
              {user ? (
                <div className="pt-4 border-t">
                  <div className="flex items-center px-3 py-2">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                      <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <Badge className={`text-xs ${getRoleColor(role)}`}>
                        {role?.charAt(0).toUpperCase() + role?.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start px-3 text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};