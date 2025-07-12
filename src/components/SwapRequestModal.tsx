
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Zap, Target, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

const SwapRequestModal = ({ 
  isOpen, 
  onClose, 
  targetUser, 
  currentUser, 
  onSubmit 
}) => {
  const [selectedSkillOffered, setSelectedSkillOffered] = useState('');
  const [selectedSkillWanted, setSelectedSkillWanted] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSkillOffered || !selectedSkillWanted) return;

    onSubmit({
      targetUserId: targetUser?.id,
      skillOffered: selectedSkillOffered,
      skillWanted: selectedSkillWanted,
      message: message.trim()
    });

    // Reset form
    setSelectedSkillOffered('');
    setSelectedSkillWanted('');
    setMessage('');
  };

  if (!isOpen || !targetUser || !currentUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Request Skill Swap
          </DialogTitle>
          <DialogDescription>
            Send a skill exchange request to {targetUser.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={currentUser.profilePhoto} alt={currentUser.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {currentUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-sm text-gray-500">You</p>
              </div>
            </div>

            <ArrowRight className="w-6 h-6 text-gray-400" />

            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={targetUser.profilePhoto} alt={targetUser.name} />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                  {targetUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{targetUser.name}</p>
                <p className="text-sm text-gray-500">Recipient</p>
              </div>
            </div>
          </div>

          {/* Skill Selection */}
          <div className="space-y-4">
            {/* What you offer */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-600" />
                  What I can teach
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentUser.skillsOffered && currentUser.skillsOffered.length > 0 ? (
                  <Select 
                    value={selectedSkillOffered} 
                    onValueChange={setSelectedSkillOffered}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a skill you can teach" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentUser.skillsOffered.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    You haven't added any skills yet. Update your profile first.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* What you want */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  What I want to learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select 
                  value={selectedSkillWanted} 
                  onValueChange={setSelectedSkillWanted}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select what you want to learn" />
                  </SelectTrigger>
                  <SelectContent>
                    {targetUser.skillsOffered.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Message (Optional)
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and explain why you'd like to swap skills..."
              rows={4}
              maxLength={500}
            />
            <div className="text-xs text-gray-500 text-right">
              {message.length}/500 characters
            </div>
          </div>

          {/* Preview */}
          {selectedSkillOffered && selectedSkillWanted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border"
            >
              <h4 className="font-medium mb-2">Request Summary:</h4>
              <p className="text-sm text-gray-700">
                You want to teach <Badge variant="secondary" className="bg-green-100 text-green-700 mx-1">{selectedSkillOffered}</Badge> 
                in exchange for learning <Badge variant="secondary" className="bg-blue-100 text-blue-700 mx-1">{selectedSkillWanted}</Badge>
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={!selectedSkillOffered || !selectedSkillWanted}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SwapRequestModal;
