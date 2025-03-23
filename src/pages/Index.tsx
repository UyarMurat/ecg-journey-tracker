
import { Link } from "react-router-dom";
import { HeartPulse, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative py-20 md:py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-background z-0"></div>
          
          <div className="container max-w-6xl mx-auto relative z-10">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="space-y-6 text-center md:text-left animate-fade-in">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary font-medium mb-2">
                  <HeartPulse className="h-4 w-4 mr-2 animate-pulse-heart" />
                  Track your heart's journey
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Monitor Your ECG With Precision
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-[42rem]">
                  Track, analyze, and understand your heart's activity with our elegant and 
                  intuitive ECG tracking solution.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                  <Button size="lg" asChild>
                    <Link to="/dashboard">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/readings">View Readings</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative mx-auto w-full max-w-md animate-slide-in-right hidden md:block">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-1 glass shadow-xl">
                  <div className="h-full w-full rounded-xl bg-white/80 p-6 backdrop-blur-sm">
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="relative h-48 w-full">
                        <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                          <path
                            d="M0,50 Q25,50 37.5,50 T50,50 T62.5,20 T75,80 T87.5,50 T100,50 T112.5,50 T125,50 Q137.5,50 150,50 Q162.5,50 175,50 T187.5,20 T200,80 T212.5,50 T225,50 T237.5,50 T250,50 Q262.5,50 275,50 Q287.5,50 300,50 T312.5,20 T325,80 T337.5,50 T350,50 T362.5,50 T375,50 Q387.5,50 400,50"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="animate-pulse-subtle"
                          />
                        </svg>
                        
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                          <HeartPulse className="h-16 w-16 text-primary/80 animate-pulse-heart" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-2xl bg-primary/20 glass rotate-12"></div>
                <div className="absolute -top-6 -left-6 h-16 w-16 rounded-2xl bg-primary/10 glass -rotate-12"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 md:py-24 px-6 bg-secondary/50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Track What Matters</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our app provides comprehensive tools to monitor and understand your heart health
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                    <HeartPulse className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>ECG Monitoring</CardTitle>
                  <CardDescription>
                    Record and view your ECG readings with detailed analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Log detailed ECG data, heart rate, and blood pressure measurements in one place.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1" asChild>
                    <Link to="/readings">
                      View readings
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Trend Analysis</CardTitle>
                  <CardDescription>
                    Track changes in your heart metrics over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Visualize your heart health journey with beautiful charts and trend indicators.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1" asChild>
                    <Link to="/dashboard">
                      View dashboard
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Private & Secure</CardTitle>
                  <CardDescription>
                    Your health data is protected and private
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Full control over your data with privacy-first design and secure storage.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1" asChild>
                    <Link to="/profile">
                      Manage settings
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 md:py-24 px-6 bg-background">
          <div className="container max-w-6xl mx-auto text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold">Ready to Start Tracking?</h2>
              <p className="text-muted-foreground">
                Begin your heart health journey today. Record, monitor, and understand your ECG patterns with ease.
              </p>
              <Button size="lg" asChild className="mt-4">
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
