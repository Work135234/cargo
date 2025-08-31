// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { LogOut, User, Calculator, Package, MapPin, Users, Settings, BarChart3, Eye } from 'lucide-react';
// import FareCalculator from './booking/FareCalculator';
// import BookingForm from './booking/BookingForm';
// import UserManagement from './admin/UserManagement';
// import PricingRules from './admin/PricingRules';
// import BookingManagement from './admin/BookingManagement';
// import Reports from './admin/Reports';
// import DispatcherDashboard from './dispatcher/DispatcherDashboard';

// const Dashboard: React.FC = () => {
//   const { user, logout } = useAuth();
//   const [activeTab, setActiveTab] = useState('overview');

//   const handleLogout = () => {
//     logout();
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'fare-calculator':
//         return <FareCalculator />;
//       case 'create-booking':
//         return <BookingForm />;
//       case 'user-management':
//         return <UserManagement />;
//       case 'pricing-rules':
//         return <PricingRules />;
//       case 'booking-management':
//         return <BookingManagement />;
//       case 'reports':
//         return <Reports />;
//       case 'dispatcher-dashboard':
//         return <DispatcherDashboard />;
//       default:
//         return (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <User className="mr-2 h-5 w-5" />
//                   Welcome, {user?.name}!
//                 </CardTitle>
//                 <CardDescription>
//                   Role: {user?.role}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-gray-600">
//                   Email: {user?.email}
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Customer Features */}
//             {user?.role === 'Customer' && (
//               <>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <Calculator className="mr-2 h-5 w-5" />
//                       Fare Calculator
//                     </CardTitle>
//                     <CardDescription>
//                       Calculate delivery fare before booking
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button
//                       className="w-full"
//                       onClick={() => setActiveTab('fare-calculator')}
//                     >
//                       Calculate Fare
//                     </Button>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <Package className="mr-2 h-5 w-5" />
//                       Create Booking
//                     </CardTitle>
//                     <CardDescription>
//                       Create a new delivery booking
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button
//                       className="w-full"
//                       onClick={() => setActiveTab('create-booking')}
//                     >
//                       New Booking
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </>
//             )}

//             {/* Admin Features */}
//             {user?.role === 'Admin' && (
//               <>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <Users className="mr-2 h-5 w-5" />
//                       User Management
//                     </CardTitle>
//                     <CardDescription>
//                       Manage users and their roles
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button
//                       className="w-full"
//                       onClick={() => setActiveTab('user-management')}
//                     >
//                       Manage Users
//                     </Button>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <Settings className="mr-2 h-5 w-5" />
//                       Pricing Rules
//                     </CardTitle>
//                     <CardDescription>
//                       Manage fare calculation rules
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button
//                       className="w-full"
//                       onClick={() => setActiveTab('pricing-rules')}
//                     >
//                       Manage Pricing
//                     </Button>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <Eye className="mr-2 h-5 w-5" />
//                       Booking Management
//                     </CardTitle>
//                     <CardDescription>
//                       View and manage all bookings
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button
//                       className="w-full"
//                       onClick={() => setActiveTab('booking-management')}
//                     >
//                       Manage Bookings
//                     </Button>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <BarChart3 className="mr-2 h-5 w-5" />
//                       Reports & Analytics
//                     </CardTitle>
//                     <CardDescription>
//                       Generate reports and view analytics
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button
//                       className="w-full"
//                       onClick={() => setActiveTab('reports')}
//                     >
//                       View Reports
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </>
//             )}

//             {/* Dispatcher Features */}
//             {user?.role === 'Dispatcher' && (
//               <>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center">
//                       <MapPin className="mr-2 h-5 w-5" />
//                       Active Deliveries
//                     </CardTitle>
//                     <CardDescription>
//                       Manage deliveries and update status
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button
//                       className="w-full"
//                       onClick={() => setActiveTab('dispatcher-dashboard')}
//                     >
//                       View Deliveries
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </>
//             )}
//           </div>
//         );
//     }
//   };

//   const getTabTitle = () => {
//     switch (activeTab) {
//       case 'fare-calculator':
//         return 'Fare Calculator';
//       case 'create-booking':
//         return 'Create Booking';
//       case 'user-management':
//         return 'User Management';
//       case 'pricing-rules':
//         return 'Pricing Rules';
//       case 'booking-management':
//         return 'Booking Management';
//       case 'reports':
//         return 'Reports & Analytics';
//       case 'dispatcher-dashboard':
//         return 'Dispatcher Dashboard';
//       default:
//         return 'Dashboard';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center space-x-4">
//             <h1 className="text-3xl font-bold text-gray-900">{getTabTitle()}</h1>
//             {activeTab !== 'overview' && (
//               <Button
//                 variant="outline"
//                 onClick={() => setActiveTab('overview')}
//               >
//                 Back to Dashboard
//               </Button>
//             )}
//           </div>
//           <Button onClick={handleLogout} variant="outline">
//             <LogOut className="mr-2 h-4 w-4" />
//             Logout
//           </Button>
//         </div>

//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;














import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Calculator, Package, MapPin, Users, Settings, BarChart3, Eye, Bell, ArrowRight, TrendingUp, Activity } from 'lucide-react';
import { AnimatedCounter, PulsingDot } from '@/components/ui/animated-counter';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import FareCalculator from './booking/FareCalculator';
import BookingForm from './booking/BookingForm';
import UserManagement from './admin/UserManagement';
import PricingRules from './admin/PricingRules';
import BookingManagement from './admin/BookingManagement';
import Reports from './admin/Reports';
import DispatcherDashboard from './dispatcher/DispatcherDashboard';
import CustomerDashboard from './customer/CustomerDashboard';
import NotificationCenter from './NotificationCenter';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Extract active tab from URL path
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path.includes('/fare-calculator')) return 'fare-calculator';
    if (path.includes('/create-booking')) return 'create-booking';
    if (path.includes('/user-management')) return 'user-management';
    if (path.includes('/pricing-rules')) return 'pricing-rules';
    if (path.includes('/booking-management')) return 'booking-management';
    if (path.includes('/reports')) return 'reports';
    if (path.includes('/dispatcher-dashboard')) return 'dispatcher-dashboard';
    if (path.includes('/notifications')) return 'notifications';
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath());

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Update active tab when URL changes
  useEffect(() => {
    const newTab = getActiveTabFromPath();
    setActiveTab(newTab);
  }, [location.pathname]);

  const handleTabChange = (tab: string) => {
    setIsLoading(true);
    setActiveTab(tab);
    
    // Add a small delay for smooth transition
    setTimeout(() => {
      if (tab === 'overview') {
        navigate('/dashboard');
      } else {
        navigate(`/dashboard/${tab}`);
      }
      setIsLoading(false);
    }, 150);
  };

  const handleLogout = () => {
    logout();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'fare-calculator':
        return <FareCalculator />;
      case 'create-booking':
        return <BookingForm />;
      case 'user-management':
        return <UserManagement />;
      case 'pricing-rules':
        return <PricingRules />;
      case 'booking-management':
        return <BookingManagement />;
      case 'reports':
        return <Reports />;
      case 'dispatcher-dashboard':
        return <DispatcherDashboard />;
      case 'notifications':
        return <NotificationCenter />;
      default:
        // Render different dashboards based on user role
        if (user?.role === 'Customer') {
          return <CustomerDashboard />;
        } else if (user?.role === 'Dispatcher') {
          return <DispatcherDashboard />;
        } else {
          const DashboardCard = ({ 
            icon, 
            title, 
            description, 
            onClick, 
            delay = 0,
            status,
            children 
          }: {
            icon: React.ReactNode;
            title: string;
            description: string;
            onClick?: () => void;
            delay?: number;
            status?: 'active' | 'warning' | 'success';
            children?: React.ReactNode;
          }) => (
            <Card 
              className={`card-interactive hover-lift group transition-all duration-300 ${
                onClick ? 'cursor-pointer' : ''
              }`}
              onClick={onClick}
              style={{ animationDelay: `${delay}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                      {icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="group-hover:text-primary transition-colors">{title}</span>
                        {status && <PulsingDot color={status === 'active' ? 'success' : status} size="sm" />}
                      </div>
                    </div>
                  </div>
                  {onClick && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  )}
                </CardTitle>
                <CardDescription className="group-hover:text-foreground transition-colors">
                  {description}
                </CardDescription>
              </CardHeader>
              {children && <CardContent>{children}</CardContent>}
            </Card>
          );

          return (
            <div className={`space-y-8 transition-all duration-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {/* Welcome Section */}
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Welcome back, {user?.name}! 👋
                </h2>
                <p className="text-muted-foreground">
                  Here's what's happening with your {user?.role?.toLowerCase()} account today.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="card-interactive hover-lift animate-slide-in-left">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Bookings</p>
                        <div className="flex items-center space-x-2">
                          <AnimatedCounter value={12} className="text-2xl font-bold" />
                          <TrendingUp className="h-4 w-4 text-success" />
                        </div>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-interactive hover-lift animate-fade-in-up" style={{animationDelay: '100ms'}}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                        <div className="flex items-center space-x-2">
                          <AnimatedCounter value={2840} prefix="$" className="text-2xl font-bold" />
                          <Activity className="h-4 w-4 text-success" />
                        </div>
                      </div>
                      <div className="p-3 bg-success/10 rounded-full">
                        <BarChart3 className="h-6 w-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-interactive hover-lift animate-fade-in-up" style={{animationDelay: '200ms'}}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                        <div className="flex items-center space-x-2">
                          <AnimatedCounter value={5} className="text-2xl font-bold" />
                          <Bell className="h-4 w-4 text-warning" />
                        </div>
                      </div>
                      <div className="p-3 bg-warning/10 rounded-full">
                        <Bell className="h-6 w-6 text-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-interactive hover-lift animate-slide-in-right" style={{animationDelay: '300ms'}}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">System Status</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-success">Online</span>
                          <PulsingDot color="success" size="sm" />
                        </div>
                      </div>
                      <div className="p-3 bg-accent/10 rounded-full">
                        <Activity className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {/* Admin Features */}
                {user?.role === 'Admin' && (
                  <>
                    <DashboardCard
                      icon={<Users className="h-5 w-5 text-primary" />}
                      title="User Management"
                      description="Manage users and their roles"
                      onClick={() => handleTabChange('user-management')}
                      delay={400}
                      status="active"
                    />

                    <DashboardCard
                      icon={<Settings className="h-5 w-5 text-accent" />}
                      title="Pricing Rules"
                      description="Manage fare calculation rules"
                      onClick={() => handleTabChange('pricing-rules')}
                      delay={500}
                    />

                    <DashboardCard
                      icon={<Eye className="h-5 w-5 text-success" />}
                      title="Booking Management"
                      description="View and manage all bookings"
                      onClick={() => handleTabChange('booking-management')}
                      delay={600}
                      status="active"
                    />

                    <DashboardCard
                      icon={<BarChart3 className="h-5 w-5 text-warning" />}
                      title="Reports & Analytics"
                      description="Generate reports and view analytics"
                      onClick={() => handleTabChange('reports')}
                      delay={700}
                    />
                  </>
                )}

                {/* Customer Features */}
                {user?.role === 'Customer' && (
                  <>
                    <DashboardCard
                      icon={<Calculator className="h-5 w-5 text-primary" />}
                      title="Fare Calculator"
                      description="Calculate delivery fare before booking"
                      onClick={() => handleTabChange('fare-calculator')}
                      delay={400}
                    />

                    <DashboardCard
                      icon={<Package className="h-5 w-5 text-success" />}
                      title="Create Booking"
                      description="Create a new delivery booking"
                      onClick={() => handleTabChange('create-booking')}
                      delay={500}
                      status="active"
                    />

                    <DashboardCard
                      icon={<Bell className="h-5 w-5 text-warning" />}
                      title="Notifications"
                      description="View your delivery updates and notifications"
                      onClick={() => handleTabChange('notifications')}
                      delay={600}
                      status="warning"
                    />
                  </>
                )}

                {/* Dispatcher Features */}
                {user?.role === 'Dispatcher' && (
                  <>
                    <DashboardCard
                      icon={<MapPin className="h-5 w-5 text-accent" />}
                      title="Active Deliveries"
                      description="Manage deliveries and update status"
                      onClick={() => handleTabChange('dispatcher-dashboard')}
                      delay={400}
                      status="active"
                    />

                    <DashboardCard
                      icon={<Bell className="h-5 w-5 text-warning" />}
                      title="Notifications"
                      description="View your assignment updates and notifications"
                      onClick={() => handleTabChange('notifications')}
                      delay={500}
                      status="warning"
                    />
                  </>
                )}
              </div>
            </div>
          );
        }
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'fare-calculator':
        return 'Fare Calculator';
      case 'create-booking':
        return 'Create Booking';
      case 'user-management':
        return 'User Management';
      case 'pricing-rules':
        return 'Pricing Rules';
      case 'booking-management':
        return 'Booking Management';
      case 'reports':
        return 'Reports & Analytics';
      case 'dispatcher-dashboard':
        return 'Dispatcher Dashboard';
      case 'notifications':
        return 'Notifications';
      default:
        return 'Dashboard';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" variant="truck" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in-down">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-foreground">{getTabTitle()}</h1>
            {activeTab !== 'overview' && (
              <Button
                variant="outline"
                onClick={() => handleTabChange('overview')}
                className="hover-lift btn-interactive"
              >
                ← Back to Dashboard
              </Button>
            )}
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="hover-lift hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-300"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
