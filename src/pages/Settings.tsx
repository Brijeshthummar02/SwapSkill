import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { UserMetadata } from '@/types/user';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Settings = () => {
  const { user, refetchUser } = useAuth();
  const userMetadata = user?.user_metadata as UserMetadata;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [location, setLocation] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    if (userMetadata) {
      setName(userMetadata.name || '');
      setProfilePhoto(userMetadata.profilePhoto || '');
      setLocation(userMetadata.location || '');
    }
    if (user) {
      setEmail(user.email || '');
    }
  }, [user, userMetadata]);

  const handleSaveChanges = async () => {
    const { data, error } = await supabase.auth.updateUser({
      data: { name, profilePhoto, location },
    });
    if (error) {
      console.error('Error updating user:', error);
    } else {
      console.log('User updated successfully:', data);
      refetchUser();
    }
  };

  const handleAddSkill = async () => {
    if (newSkill && !userMetadata?.skills?.includes(newSkill)) {
      const updatedSkills = [...(userMetadata?.skills || []), newSkill];
      const { data, error } = await supabase.auth.updateUser({
        data: { skills: updatedSkills },
      });
      if (error) {
        console.error('Error adding skill:', error);
      } else {
        console.log('Skill added successfully:', data);
        setNewSkill('');
        refetchUser();
      }
    }
  };

  const handleAddInterest = async () => {
    if (newInterest && !userMetadata?.interests?.includes(newInterest)) {
      const updatedInterests = [...(userMetadata?.interests || []), newInterest];
      const { data, error } = await supabase.auth.updateUser({
        data: { interests: updatedInterests },
      });
      if (error) {
        console.error('Error adding interest:', error);
      } else {
        console.log('Interest added successfully:', data);
        setNewInterest('');
        refetchUser();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-light mb-8">Settings</h1>
        <Card className="glass border-0 shadow-nord">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profilePhoto} alt={name} />
                <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-medium">
                  {name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="profile-photo">Profile Photo URL</Label>
                <Input id="profile-photo" value={profilePhoto} onChange={(e) => setProfilePhoto(e.target.value)} placeholder="https://example.com/photo.jpg" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, State/Country" />
            </div>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="glass border-0 shadow-nord">
            <CardHeader>
              <CardTitle>My Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {userMetadata?.skills?.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Add a skill</Label>
                <Input id="skills" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="e.g., React, Python, etc." />
              </div>
              <Button onClick={handleAddSkill} className="mt-4">Add Skill</Button>
            </CardContent>
          </Card>
          <Card className="glass border-0 shadow-nord">
            <CardHeader>
              <CardTitle>My Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {userMetadata?.interests?.map((interest) => (
                  <Badge key={interest}>{interest}</Badge>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Add an interest</Label>
                <Input id="interests" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} placeholder="e.g., Cooking, Hiking, etc." />
              </div>
              <Button onClick={handleAddInterest} className="mt-4">Add Interest</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;