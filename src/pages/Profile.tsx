import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { UserMetadata } from '@/types/user';

const Profile = () => {
  const { user } = useAuth();
  const userMetadata = user?.user_metadata as UserMetadata;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="flex items-center space-x-6 mb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userMetadata?.profilePhoto} alt={userMetadata?.name} />
            <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-medium">
              {userMetadata?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold">{userMetadata?.name}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <Card className="glass border-0 shadow-nord">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-muted-foreground">{userMetadata?.location || 'Not specified'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Rating</h3>
              <p className="text-muted-foreground">{userMetadata?.rating || 0} ({userMetadata?.reviewCount || 0} reviews)</p>
            </div>
          </CardContent>
        </Card>


        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <Card className="glass border-0 shadow-nord">
            <CardHeader>
              <CardTitle>My Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userMetadata?.skills?.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
                {(!userMetadata?.skills || userMetadata.skills.length === 0) && (
                  <p className="text-muted-foreground">You have not added any skills yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="glass border-0 shadow-nord">
            <CardHeader>
              <CardTitle>My Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userMetadata?.interests?.map((interest) => (
                  <Badge key={interest}>{interest}</Badge>
                ))}
                {(!userMetadata?.interests || userMetadata.interests.length === 0) && (
                  <p className="text-muted-foreground">You have not added any interests yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="glass border-0 shadow-nord">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for achievements */}
              <p className="text-muted-foreground">You have no achievements yet.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;