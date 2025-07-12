
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';

const Discover = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30 relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-gentle" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-gentle" style={{animationDelay: '2s'}} />
      </div>

      <Header 
        currentUser={null} 
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
        onProfileClick={() => {}}
        onLogout={() => {}}
        onMessagesClick={() => {}}
        unreadMessagesCount={0}
      />

      <main className="container mx-auto px-6 py-12 relative z-10">
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-light bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-6">
            Discover Skills
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Explore thousands of skills available for exchange. Find the perfect match for your learning journey.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Advanced Search",
              description: "Filter by skill level, location, availability, and more to find exactly what you're looking for.",
              icon: Search
            },
            {
              title: "Smart Matching",
              description: "Our algorithm suggests the best skill swap partners based on your profile and preferences.",
              icon: Filter
            },
            {
              title: "Community Insights",
              description: "See what skills are trending in your area and what the community is most excited about.",
              icon: Users
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="glass hover-lift border-0 shadow-nord h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-medium">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-light">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default Discover;
