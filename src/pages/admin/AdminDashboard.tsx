
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { AdminStats } from '@/types/admin';

const AdminDashboard = () => {
  // Mock data - in real app, this would come from API
  const stats: AdminStats = {
    totalUsers: 2847,
    activeUsers: 1234,
    totalSwaps: 15231,
    completedSwaps: 14318,
    pendingReports: 12,
    newUsersToday: 45,
    swapsToday: 128,
  };

  const recentActivity = [
    { type: 'user_joined', message: 'Sarah Chen joined the platform', time: '2 minutes ago' },
    { type: 'swap_completed', message: 'Swap between Marcus and Emily completed', time: '5 minutes ago' },
    { type: 'report_filed', message: 'New content report filed', time: '12 minutes ago' },
    { type: 'user_banned', message: 'User temporarily suspended', time: '1 hour ago' },
  ];

  const quickActions = [
    { title: 'Review Reports', description: '12 pending reports', icon: Shield, href: '/admin/moderation', urgent: true },
    { title: 'Manage Users', description: 'User management tools', icon: Users, href: '/admin/users' },
    { title: 'Monitor Swaps', description: 'Active swap monitoring', icon: MessageSquare, href: '/admin/swaps' },
    { title: 'Send Announcement', description: 'Platform communication', icon: TrendingUp, href: '/admin/communications' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-light text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage and monitor your SkillSwap platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.newUsersToday}</span> today
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light">{stats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Swaps</CardTitle>
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light">{stats.totalSwaps.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.swapsToday}</span> today
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reports</CardTitle>
              <AlertTriangle className={`w-4 h-4 ${stats.pendingReports > 0 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light">{stats.pendingReports}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingReports > 0 ? 'Requires attention' : 'All clear'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-between h-auto p-4 hover:bg-accent/50"
                >
                  <Link to={action.href}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.urgent ? 'bg-yellow-500/10' : 'bg-primary/10'}`}>
                        <action.icon className={`w-4 h-4 ${action.urgent ? 'text-yellow-600' : 'text-primary'}`} />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-sm text-muted-foreground">{action.description}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                className="flex items-start space-x-3"
              >
                <div className={`p-1.5 rounded-full mt-1 ${
                  activity.type === 'report_filed' ? 'bg-yellow-500/20' :
                  activity.type === 'user_banned' ? 'bg-red-500/20' :
                  'bg-green-500/20'
                }`}>
                  {activity.type === 'report_filed' ? (
                    <AlertTriangle className="w-3 h-3 text-yellow-600" />
                  ) : activity.type === 'user_banned' ? (
                    <Shield className="w-3 h-3 text-red-600" />
                  ) : (
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
