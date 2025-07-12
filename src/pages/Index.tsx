
import React, { useState } from 'react';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Zap,
  Heart,
  Globe,
  Shield,
  Sparkles,
  Target,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Index = ({ currentUser, onLogin, onRegister, onLogout }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleRegisterClick = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (userData, type) => {
    if (type === 'login') {
      onLogin(userData);
    } else {
      onRegister(userData);
    }
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      <Header 
        currentUser={currentUser}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onLogout={onLogout}
        onProfileClick={() => {}}
        onMessagesClick={() => {}}
      />
      
      <main>
        {/* Enhanced Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          {/* Ambient background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-gentle" />
            <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-gentle" style={{animationDelay: '2s'}} />
          </div>

          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-light mb-6 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
                Learn Together,
                <br />
                <span className="font-medium">Grow Together</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Connect with skilled individuals in your community. Trade knowledge, 
                master new skills, and build meaningful relationships through collaborative learning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              {currentUser ? (
                <Link to="/matches">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-nord text-lg px-8 py-6 rounded-2xl font-medium"
                  >
                    <Sparkles className="mr-2 w-5 h-5" />
                    Find Matches
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg" 
                  onClick={handleRegisterClick}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-nord text-lg px-8 py-6 rounded-2xl font-medium"
                >
                  Start Learning
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              )}
              <Link to="/how-it-works">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary/30 hover:bg-primary/10 text-lg px-8 py-6 rounded-2xl font-medium"
                >
                  How it Works
                  <BookOpen className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Demo Credentials Info */}
            {!currentUser && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-md mx-auto"
              >
                <Card className="glass border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Demo Admin Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p className="mb-2">Try the admin portal with these credentials:</p>
                    <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                      <p><strong>Email:</strong> admin@skillswap.com</p>
                      <p><strong>Password:</strong> admin123</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </section>

        {/* Enhanced Search Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="What would you like to learn today?" 
                  className="glass pl-12 pr-4 py-6 text-lg rounded-2xl border-border/50 focus:border-primary/50"
                />
                <Link to="/discover">
                  <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl">
                    Search
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Features Grid */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-light mb-4">Why Choose SkillSwap?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Experience a new way of learning that's personal, practical, and powerful
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Smart Matching",
                  description: "Our AI-powered system finds your perfect learning partners based on skills, goals, and compatibility",
                  color: "text-blue-500",
                  gradient: "from-blue-100 to-indigo-100"
                },
                {
                  icon: Zap,
                  title: "Skill Exchange",
                  description: "Trade your expertise for knowledge you want to gain. No money required, just passion for learning",
                  color: "text-yellow-500",
                  gradient: "from-yellow-100 to-orange-100"
                },
                {
                  icon: Heart,
                  title: "Community Trust",
                  description: "Verified profiles, ratings, and reviews ensure safe and trustworthy learning connections",
                  color: "text-red-500",
                  gradient: "from-red-100 to-pink-100"
                },
                {
                  icon: Globe,
                  title: "Diverse Skills",
                  description: "From coding to cooking, art to languages - discover endless possibilities in our global community",
                  color: "text-green-500",
                  gradient: "from-green-100 to-emerald-100"
                },
                {
                  icon: MessageSquare,
                  title: "Seamless Communication",
                  description: "Built-in messaging, video calls, and scheduling tools make coordination effortless",
                  color: "text-purple-500",
                  gradient: "from-purple-100 to-violet-100"
                },
                {
                  icon: TrendingUp,
                  title: "Track Progress",
                  description: "Monitor your learning journey with detailed analytics and achievement milestones",
                  color: "text-orange-500",
                  gradient: "from-orange-100 to-amber-100"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="glass hover-lift h-full border-0 shadow-nord hover:shadow-nord-lg transition-all duration-300">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl font-medium">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-4xl font-light mb-6">Ready to Start Your Journey?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our growing community of learners and teachers. Your next skill is just a connection away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleRegisterClick}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-nord text-lg px-8 py-6 rounded-2xl font-medium"
                >
                  Join SkillSwap Today
                  <CheckCircle className="ml-2 w-5 h-5" />
                </Button>
                {currentUser && (
                  <Link to="/matches">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-2 border-primary/30 hover:bg-primary/10 text-lg px-8 py-6 rounded-2xl font-medium"
                    >
                      <Heart className="mr-2 w-5 h-5" />
                      Start Matching
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onLogin={(data) => handleAuthSuccess(data, 'login')}
        onRegister={(data) => handleAuthSuccess(data, 'register')}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
};

export default Index;
