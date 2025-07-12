
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Check, 
  X, 
  Eye, 
  Clock,
  MessageSquare,
  User,
  Flag
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { UserReport, SwapReport } from '@/types/admin';

const ContentModeration = () => {
  const [activeTab, setActiveTab] = useState('reports');

  // Mock data - in real app, this would come from API
  const userReports: UserReport[] = [
    {
      id: '1',
      reporterId: '123',
      reportedUserId: '456',
      reason: 'inappropriate_content',
      description: 'User posted inappropriate content in their skill description',
      status: 'pending',
      createdAt: '2024-01-20T10:30:00Z',
    },
    {
      id: '2',
      reporterId: '789',
      reportedUserId: '012',
      reason: 'spam',
      description: 'User is sending spam messages to multiple users',
      status: 'pending',
      createdAt: '2024-01-20T09:15:00Z',
    },
  ];

  const swapReports: SwapReport[] = [
    {
      id: '1',
      swapId: 'swap-123',
      reporterId: '456',
      reportedUserId: '789',
      reason: 'no_show',
      description: 'User did not show up for scheduled skill swap session',
      status: 'pending',
      createdAt: '2024-01-20T11:00:00Z',
    },
  ];

  const getReasonBadge = (reason: string) => {
    const reasons: Record<string, { label: string; color: string }> = {
      inappropriate_content: { label: 'Inappropriate Content', color: 'bg-red-500/10 text-red-700' },
      spam: { label: 'Spam', color: 'bg-orange-500/10 text-orange-700' },
      harassment: { label: 'Harassment', color: 'bg-red-500/10 text-red-700' },
      no_show: { label: 'No Show', color: 'bg-yellow-500/10 text-yellow-700' },
      fraud: { label: 'Fraud', color: 'bg-red-500/10 text-red-700' },
    };

    const reasonInfo = reasons[reason] || { label: reason, color: 'bg-gray-500/10 text-gray-700' };
    return <Badge className={reasonInfo.color}>{reasonInfo.label}</Badge>;
  };

  const handleApproveReport = (reportId: string, type: 'user' | 'swap') => {
    console.log(`Approving ${type} report:`, reportId);
    // In real app, this would call API to take action
  };

  const handleDismissReport = (reportId: string, type: 'user' | 'swap') => {
    console.log(`Dismissing ${type} report:`, reportId);
    // In real app, this would call API to dismiss report
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-light text-foreground mb-2">Content Moderation</h1>
        <p className="text-muted-foreground">Review and manage reports from the community</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reports</p>
                <p className="text-2xl font-light">{userReports.length + swapReports.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-light">8</p>
              </div>
              <Check className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                <p className="text-2xl font-light">2.4h</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>User Reports ({userReports.length})</span>
          </TabsTrigger>
          <TabsTrigger value="swaps" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Swap Reports ({swapReports.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {userReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-red-500/10 rounded-lg">
                        <Flag className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          {getReasonBadge(report.reason)}
                          <Badge variant="outline" className="text-xs">
                            ID: {report.id}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Reported {new Date(report.createdAt).toLocaleDateString()} at {new Date(report.createdAt).toLocaleTimeString()}
                        </p>
                        <p className="text-foreground">{report.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700">
                      Pending
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>Reporter ID: {report.reporterId}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Reported User ID: {report.reportedUserId}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDismissReport(report.id, 'user')}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Dismiss
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApproveReport(report.id, 'user')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Take Action
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="swaps" className="space-y-6">
          {swapReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          {getReasonBadge(report.reason)}
                          <Badge variant="outline" className="text-xs">
                            Swap ID: {report.swapId}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Reported {new Date(report.createdAt).toLocaleDateString()} at {new Date(report.createdAt).toLocaleTimeString()}
                        </p>
                        <p className="text-foreground">{report.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700">
                      Pending
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>Reporter ID: {report.reporterId}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Reported User ID: {report.reportedUserId}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Swap
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDismissReport(report.id, 'swap')}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Dismiss
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApproveReport(report.id, 'swap')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Resolve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentModeration;
