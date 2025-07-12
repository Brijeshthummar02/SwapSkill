import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';

const SuccessStories = ({ currentUser, onLogin, onRegister, onLogout }) => {
  const stories = [
    {
      name: "Sarah Chen",
      skill: "Learned Python & Taught UI/UX",
      quote: "SkillSwap transformed my career. I taught design principles and learned Python in return. Now I'm a full-stack developer at a tech startup!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      rating: 5,
      sessions: 15
    },
    {
      name: "Marcus Rodriguez",
      skill: "Learned React & Taught Spanish",
      quote: "The community here is incredible. I helped someone become fluent in Spanish while they taught me React. We're still friends and collaborate on projects!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      sessions: 22
    },
    {
      name: "Emily Johnson",
      skill: "Learned Photography & Taught Marketing",
      quote: "I never thought I could afford photography lessons. Through SkillSwap, I learned from a professional photographer by sharing my marketing expertise.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      sessions: 12
    },
    {
      name: "David Kim",
      skill: "Learned Guitar & Taught Data Science",
      quote: "Music was always my passion but seemed out of reach. Now I play guitar every evening thanks to the amazing musician I met here!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 5,
      sessions: 18
    }
  ];

  const stats = [
    { value: "10,000+", label: "Successful Swaps" },
    { value: "94%", label: "Success Rate" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "2,847", label: "Active Members" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30 relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-gentle" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-gentle" style={{animationDelay: '2s'}} />
      </div>

      <Header 
        currentUser={currentUser}
        onLogin={onLogin}
        onRegister={onRegister}
        onLogout={onLogout}
        onMessagesClick={() => {}}
        unreadMessagesCount={0} // Replace with actual data if available
      />

      <main className="container mx-auto px-6 py-12 relative z-10">
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-light bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Real people, real transformations. Discover how SkillSwap has changed lives and careers around the world.
          </p>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="glass hover-lift border-0 shadow-nord text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-light text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Stories Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {stories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Card className="glass hover-lift border-0 shadow-nord h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <Quote className="w-8 h-8 text-primary/60 flex-shrink-0 mt-1" />
                      <p className="text-foreground font-light leading-relaxed italic">
                        "{story.quote}"
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={story.image} alt={story.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                            {story.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{story.name}</div>
                          <div className="text-sm text-muted-foreground">{story.skill}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(story.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {story.sessions} sessions
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          {!currentUser && (
            <Card className="glass border-0 shadow-nord max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-medium mb-4">Start Your Success Story</h2>
                <p className="text-muted-foreground mb-6 font-light">
                  Join thousands of learners who have already transformed their skills and careers.
                </p>
                <Button
                  size="lg"
                  onClick={onRegister}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-nord rounded-xl px-8 font-medium"
                >
                  Begin Your Journey
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.section>
      </main>
    </div>
  );
};

export default SuccessStories;