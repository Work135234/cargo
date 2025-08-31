import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Shield, Users, CheckCircle, Clock, MapPin, DollarSign, ArrowRight, Star, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Truck className="h-8 w-8 text-primary transition-all duration-300" />,
      title: "Multi-Modal Transport",
      description: "Choose between truck delivery and train freight for optimal logistics",
      color: "primary"
    },
    {
      icon: <Clock className="h-8 w-8 text-accent transition-all duration-300" />,
      title: "Real-Time Tracking",
      description: "Monitor your shipments with live updates and precise delivery estimates",
      color: "accent"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-success transition-all duration-300" />,
      title: "Transparent Pricing",
      description: "Get instant quotes with no hidden fees - pay only for what you ship",
      color: "success"
    },
    {
      icon: <Shield className="h-8 w-8 text-warning transition-all duration-300" />,
      title: "Secure & Reliable",
      description: "Professional drivers and secure handling for your peace of mind",
      color: "warning"
    }
  ];

  const stats = [
    { number: "10K+", label: "Deliveries Completed", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "500+", label: "Happy Customers", icon: <Star className="h-5 w-5" /> },
    { number: "99.9%", label: "Uptime Reliability", icon: <Zap className="h-5 w-5" /> },
    { number: "24/7", label: "Customer Support", icon: <Shield className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background page-transition">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-mesh-gradient">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="mx-auto bg-primary p-4 rounded-full w-fit animate-bounce-in hover-scale animate-pulse-glow">
                <Truck className="h-12 w-12 text-primary-foreground animate-float" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Welcome to{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  CargoStream
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Your comprehensive delivery booking platform. Connect customers, manage logistics,
                and track shipments with our modern, efficient solution.
              </p>
            </div>

            {/* Stats Section */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center hover-lift">
                  <div className="flex items-center justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <Button asChild size="lg" className="text-lg px-8 btn-interactive hover-lift group">
                <Link to="/register">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 hover-lift hover-glow" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose CargoStream?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Streamline your logistics with our comprehensive platform designed for modern delivery needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`text-center card-interactive hover-lift group transition-all duration-500 ${
                  activeFeature === index ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardHeader>
                  <div className={`mx-auto p-3 rounded-full w-fit transition-all duration-300 group-hover:scale-110 ${
                    activeFeature === index 
                      ? `bg-${feature.color}/20 animate-pulse-glow` 
                      : 'bg-primary/10'
                  }`}>
                    <div className={`transition-all duration-300 ${
                      activeFeature === index ? 'animate-bounce' : ''
                    }`}>
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base group-hover:text-foreground transition-colors">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold">Built for Every User</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three dedicated portals designed for different roles in the logistics ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="card-interactive hover-lift group animate-slide-in-left">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <Users className="h-8 w-8 text-primary transition-all duration-300 group-hover:animate-bounce" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">Booking Manager Portal</CardTitle>
                <CardDescription className="group-hover:text-foreground transition-colors">For businesses and individuals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm">
                  {[
                    "Create and manage bookings",
                    "Real-time shipment tracking",
                    "Instant fare calculations",
                    "Delivery history & analytics"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center group/item hover:text-primary transition-colors">
                      <CheckCircle className="h-4 w-4 text-success mr-3 group-hover/item:scale-110 transition-transform" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full btn-interactive hover-lift group/btn" asChild>
                  <Link to="/register">
                    Sign Up as Booking Manager
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-interactive hover-lift group animate-fade-in-up border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center relative z-10">
                <div className="mx-auto bg-destructive/10 p-4 rounded-full w-fit group-hover:bg-destructive/20 transition-all duration-300 group-hover:scale-110">
                  <Shield className="h-8 w-8 text-destructive transition-all duration-300 group-hover:animate-bounce" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">Admin Panel</CardTitle>
                <CardDescription className="group-hover:text-foreground transition-colors">For platform administrators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <ul className="space-y-3 text-sm">
                  {[
                    "Comprehensive dashboard & KPIs",
                    "User & booking management",
                    "Driver assignments & scheduling",
                    "Pricing configuration & reports"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center group/item hover:text-primary transition-colors">
                      <CheckCircle className="h-4 w-4 text-success mr-3 group-hover/item:scale-110 transition-transform" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full hover-lift hover-glow group/btn" asChild>
                  <Link to="/login">
                    Admin Access
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-interactive hover-lift group animate-slide-in-right">
              <CardHeader className="text-center">
                <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                  <Truck className="h-8 w-8 text-accent transition-all duration-300 group-hover:animate-bounce" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">Dispatcher Portal</CardTitle>
                <CardDescription className="group-hover:text-foreground transition-colors">For drivers and dispatchers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm">
                  {[
                    "View assigned deliveries",
                    "Update delivery status",
                    "GPS navigation integration",
                    "Customer communication tools"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center group/item hover:text-primary transition-colors">
                      <CheckCircle className="h-4 w-4 text-success mr-3 group-hover/item:scale-110 transition-transform" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full hover-lift hover-glow group/btn" asChild>
                  <Link to="/login">
                    Dispatcher Login
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Ready to Transform Your Logistics?
              </h2>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Join thousands of businesses already using CargoStream for their delivery needs
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" variant="secondary" className="btn-interactive hover-lift group" asChild>
                <Link to="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary hover-lift transition-all duration-300" 
                asChild
              >
                <Link to="/login">Existing User? Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4 animate-slide-in-left">
              <div className="flex items-center space-x-2 group">
                <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg group-hover:text-primary transition-colors">CargoStream</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Modern delivery booking platform for efficient logistics management.
              </p>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '100ms'}}>
              <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/register" className="hover:text-primary transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    Booking Manager Portal
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-primary transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    Admin Panel
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-primary transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    Dispatcher Access
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '200ms'}}>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '300ms'}}>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center text-muted-foreground animate-fade-in-up" style={{animationDelay: '400ms'}}>
            <p>&copy; 2024 CargoStream. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
