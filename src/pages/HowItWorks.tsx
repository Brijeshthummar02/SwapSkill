
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, MessageSquare, Handshake, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Tell us about your skills and what you'd like to learn. Upload a photo and write a brief bio.",
      icon: UserPlus,
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      number: "02", 
      title: "Find Your Match",
      description: "Browse through profiles or use our smart matching system to find the perfect skill swap partner.",
      icon: Search,
      color: "bg-green-500/10 text-green-600"
    },
    {
      number: "03",
      title: "Connect & Chat",
      description: "Send a message to start the conversation. Discuss your goals, availability, and learning preferences.",
      icon: MessageSquare,
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      number: "04",
      title: "Exchange Skills",
      description: "Meet up virtually or in person to share knowledge. Each session is an opportunity to learn and teach.",
      icon: Handshake,
      color: "bg-orange-500/10 text-orange-600"
    },
    {
      number: "05",
      title: "Rate & Review",
      description: "After each session, rate your experience and help build trust within our community.",
      icon: Star,
      color: "bg-pink-500/10 text-pink-600"
    }
  ];

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
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Getting started with SkillSwap is simple. Follow these five easy steps to begin your learning journey.
          </p>
        </motion.section>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="mb-12 last:mb-0"
            >
              <div className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <Card className="glass hover-lift border-0 shadow-nord">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className={`p-4 rounded-2xl ${step.color} flex-shrink-0`}>
                          <step.icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl font-light text-primary">{step.number}</span>
                            <h3 className="text-2xl font-medium">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground font-light leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <Card className="glass border-0 shadow-nord max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-medium mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 font-light">
                Join our community of learners and start exchanging skills today.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-nord rounded-xl px-8 font-medium"
              >
                Create Your Profile
              </Button>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
};

export default HowItWorks;
