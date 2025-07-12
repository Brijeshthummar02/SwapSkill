
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Heart, X, Undo2, Filter, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import UserCard from '@/components/UserCard';

const Matches = ({ currentUser, onLogin, onRegister, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [matches, setMatches] = useState([]);
  const [superLikesLeft, setSuperLikesLeft] = useState(3);

  // Mock data for potential matches
  useEffect(() => {
    const mockUsers = [
      {
        id: '1',
        name: 'Sarah Chen',
        location: 'San Francisco, CA',
        profilePhoto: null,
        isOnline: true,
        rating: 4.9,
        reviewCount: 47,
        completedSwaps: 23,
        availability: 'evenings',
        skillsOffered: ['React Development', 'UI/UX Design', 'TypeScript'],
        skillsWanted: ['Python', 'Machine Learning', 'Data Science'],
        matchPercentage: 92,
        lastActive: '1h ago'
      },
      {
        id: '2', 
        name: 'Marcus Rodriguez',
        location: 'Austin, TX',
        profilePhoto: null,
        isOnline: false,
        rating: 4.7,
        reviewCount: 32,
        completedSwaps: 18,
        availability: 'weekends',
        skillsOffered: ['Guitar', 'Music Production', 'Audio Engineering'],
        skillsWanted: ['Photography', 'Video Editing', 'Graphic Design'],
        matchPercentage: 87,
        lastActive: '3h ago'
      },
      {
        id: '3',
        name: 'Emily Watson',
        location: 'Seattle, WA', 
        profilePhoto: null,
        isOnline: true,
        rating: 4.8,
        reviewCount: 61,
        completedSwaps: 34,
        availability: 'flexible',
        skillsOffered: ['French Language', 'Cooking', 'Yoga'],
        skillsWanted: ['Spanish', 'Rock Climbing', 'Photography'],
        matchPercentage: 78,
        lastActive: '30m ago'
      },
      {
        id: '4',
        name: 'David Kim',
        location: 'Los Angeles, CA',
        profilePhoto: null,
        isOnline: true,
        rating: 4.6,
        reviewCount: 28,
        completedSwaps: 15,
        availability: 'weekdays',
        skillsOffered: ['Photography', 'Photoshop', 'Lightroom'],
        skillsWanted: ['Web Development', 'JavaScript', 'Node.js'],
        matchPercentage: 83,
        lastActive: '15m ago'
      }
    ];
    setUsers(mockUsers);
  }, []);

  const handleSwipe = (direction, user) => {
    setSwipeDirection(direction);
    
    if (direction === 'right' || direction === 'super') {
      setMatches(prev => [...prev, user]);
      if (direction === 'super') {
        setSuperLikesLeft(prev => Math.max(0, prev - 1));
      }
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setMatches(prev => prev.slice(0, -1));
    }
  };

  const currentUser_card = users[currentIndex];
  const hasMoreCards = currentIndex < users.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      <Header 
        currentUser={currentUser}
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
        onLogout={onLogout}
        onProfileClick={() => {}}
        onMessagesClick={() => {}}
      />

      <main className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-light bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-4"
          >
            Discover Matches
          </motion.h1>
          <p className="text-muted-foreground text-lg">
            Swipe through potential skill swap partners
          </p>
        </div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-6 mb-8"
        >
          <Card className="glass border-0 shadow-nord">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-semibold text-primary">{matches.length}</div>
              <div className="text-sm text-muted-foreground">Matches</div>
            </CardContent>
          </Card>
          <Card className="glass border-0 shadow-nord">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-semibold text-pink-500">{superLikesLeft}</div>
              <div className="text-sm text-muted-foreground">Super Likes</div>
            </CardContent>
          </Card>
          <Card className="glass border-0 shadow-nord">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-semibold text-emerald-500">{users.length - currentIndex}</div>
              <div className="text-sm text-muted-foreground">Remaining</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card Stack */}
        <div className="max-w-md mx-auto relative h-[600px] mb-8">
          <AnimatePresence>
            {hasMoreCards && currentUser_card && (
              <motion.div
                key={currentUser_card.id}
                className="absolute inset-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ 
                  x: swipeDirection === 'left' ? -300 : swipeDirection === 'right' || swipeDirection === 'super' ? 300 : 0,
                  opacity: 0,
                  scale: 0.8,
                  rotate: swipeDirection === 'left' ? -30 : swipeDirection === 'right' || swipeDirection === 'super' ? 30 : 0
                }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }: PanInfo) => {
                  const swipe = Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500;
                  if (swipe) {
                    handleSwipe(offset.x > 0 ? 'right' : 'left', currentUser_card);
                  }
                }}
                whileDrag={{ scale: 1.05 }}
              >
                <UserCard
                  user={currentUser_card}
                  currentUser={currentUser}
                  onSwapRequest={(user) => handleSwipe('right', user)}
                  onMessageUser={() => {}}
                  onSuperLike={(user) => handleSwipe('super', user)}
                  onPass={(user) => handleSwipe('left', user)}
                  showMatchActions={true}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!hasMoreCards && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Card className="glass border-0 shadow-nord p-8 text-center">
                <CardContent>
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground mb-4">
                    You've seen all available matches. Check back later for more!
                  </p>
                  <Button 
                    onClick={() => {
                      setCurrentIndex(0);
                      setMatches([]);
                      setSuperLikesLeft(3);
                    }}
                    className="bg-gradient-to-r from-primary to-primary/90"
                  >
                    Start Over
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        {hasMoreCards && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 mb-8"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleSwipe('left', currentUser_card)}
                className="w-16 h-16 rounded-full border-2 border-red-200 hover:bg-red-50 hover:border-red-300 text-red-500 hover:text-red-600"
              >
                <X className="w-6 h-6" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={handleUndo}
                disabled={currentIndex === 0}
                className="w-16 h-16 rounded-full border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-50"
              >
                <Undo2 className="w-6 h-6" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="lg"
                onClick={() => handleSwipe('super', currentUser_card)}
                disabled={superLikesLeft === 0}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50"
              >
                <Heart className="w-6 h-6" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleSwipe('right', currentUser_card)}
                className="w-16 h-16 rounded-full border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 text-emerald-500 hover:text-emerald-600"
              >
                <Zap className="w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Recent Matches */}
        {matches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Recent Matches</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {matches.slice(-8).map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass border-0 shadow-nord p-4 text-center hover-lift cursor-pointer">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-semibold text-primary">
                          {match.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-sm font-medium truncate">{match.name}</div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {match.matchPercentage}% match
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Matches;
