
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Zap, Target, MessageSquare, ArrowRight, Heart, X, Eye, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UserCard = ({ user, onSwapRequest, onMessageUser, currentUser, onSuperLike, onPass, showMatchActions = false }) => {
  const availabilityIcons = {
    'evenings': '🌙',
    'weekends': '🏖️', 
    'weekdays': '💼',
    'flexible': '⏰'
  };

  const availabilityColors = {
    'evenings': 'bg-purple-50 text-purple-700 border-purple-200',
    'weekends': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'weekdays': 'bg-blue-50 text-blue-700 border-blue-200',
    'flexible': 'bg-amber-50 text-amber-700 border-amber-200'
  };

  const matchPercentage = user.matchPercentage || 0;
  const isHighMatch = matchPercentage >= 80;
  const isMediumMatch = matchPercentage >= 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className="group relative"
    >
      <Card className="relative h-full glass border-0 shadow-nord hover:shadow-nord-lg transition-all duration-500 overflow-hidden bg-white/80 backdrop-blur-xl">
        {/* Match percentage indicator */}
        {matchPercentage > 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-semibold z-10 ${
              isHighMatch ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
              isMediumMatch ? 'bg-amber-100 text-amber-700 border border-amber-200' :
              'bg-blue-100 text-blue-700 border border-blue-200'
            }`}
          >
            {matchPercentage}% match
          </motion.div>
        )}

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4 flex-1">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Avatar className="w-16 h-16 ring-3 ring-white/60 shadow-lg">
                    <AvatarImage src={user.profilePhoto} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/90 to-primary text-white text-xl font-medium">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                {user.isOnline && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-white shadow-sm"
                  />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300 truncate">
                  {user.name}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span className="truncate">{user.location}</span>
                </div>
                
                {/* Rating */}
                <motion.div 
                  className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full border border-yellow-200/80"
                  whileHover={{ scale: 1.05 }}
                >
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-yellow-700">{user.rating}</span>
                  <span className="text-xs text-yellow-600">({user.reviewCount})</span>
                </motion.div>

                {/* Availability status */}
                <div className="mt-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs font-medium px-3 py-1.5 ${availabilityColors[user.availability]}`}
                  >
                    {availabilityIcons[user.availability]} Available {user.availability}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 relative z-10 px-6">
          {/* Enhanced Skills Section */}
          <div className="space-y-4">
            {/* Skills Offered */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm font-semibold text-foreground">Can teach</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.skillsOffered.slice(0, 3).map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200 hover:from-emerald-100 hover:to-teal-100 transition-all text-xs font-medium px-3 py-1.5 cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
                {user.skillsOffered.length > 3 && (
                  <Badge variant="outline" className="text-xs border-dashed hover:bg-muted/50 transition-colors">
                    +{user.skillsOffered.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-foreground">Wants to learn</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.skillsWanted.slice(0, 3).map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all text-xs font-medium px-3 py-1.5 cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
                {user.skillsWanted.length > 3 && (
                  <Badge variant="outline" className="text-xs border-dashed hover:bg-muted/50 transition-colors">
                    +{user.skillsWanted.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className="flex items-center justify-between py-3 border-t border-border/40">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-foreground">{user.completedSwaps}</span>
                <span>swaps</span>
              </div>
              <div className="w-1.5 h-1.5 bg-border rounded-full"></div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Active {user.lastActive || '2h ago'}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="pt-2">
            {showMatchActions && currentUser && currentUser.id !== user.id && (
              <div className="flex gap-3 mb-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                  <Button 
                    variant="outline"
                    onClick={() => onPass && onPass(user)}
                    className="w-full group/btn bg-white/70 hover:bg-red-50 border border-red-200 hover:border-red-300 text-red-600 hover:text-red-700 transition-all duration-300"
                  >
                    <X className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Pass
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                  <Button 
                    onClick={() => onSuperLike && onSuperLike(user)}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                  >
                    <Heart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Super Like
                  </Button>
                </motion.div>
              </div>
            )}

            <div className="flex gap-3">
              {currentUser && currentUser.id !== user.id && (
                <>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button 
                      variant="outline"
                      onClick={() => onMessageUser(user)}
                      className="w-full group/btn bg-white/60 hover:bg-white/90 border-border/60 hover:border-primary/40 transition-all duration-300"
                    >
                      <MessageSquare className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Message
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button 
                      onClick={() => onSwapRequest(user)}
                      className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                    >
                      Request Swap
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </>
              )}
              
              {currentUser?.id === user.id && (
                <Button disabled className="w-full bg-muted/70 text-muted-foreground cursor-not-allowed">
                  This is you
                </Button>
              )}
              
              {!currentUser && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                  <Button 
                    onClick={() => onSwapRequest(user)}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                  >
                    Request Swap
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Quick View Profile */}
            {!showMatchActions && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-3">
                <Button 
                  variant="ghost"
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors group/view"
                >
                  <Eye className="w-4 h-4 mr-2 group-hover/view:scale-110 transition-transform" />
                  View Full Profile
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserCard;
