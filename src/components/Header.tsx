import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Settings,
  LogOut,
  MessageSquare,
  Star,
  Sparkles,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import NotificationsPopover from "./NotificationsPopover";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "./AuthModal";
import { authHelpers } from "@/lib/supabase";
import { UserMetadata } from "@/types/user";

const Header = () => {
  const { user: currentUser } = useAuth();
  const location = useLocation();
  const { isAdmin } = useAdminAuth();
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const userMetadata = currentUser?.user_metadata as UserMetadata;

  const onLoginClick = () => setAuthModal({ isOpen: true, mode: 'login' });
  const onRegisterClick = () => setAuthModal({ isOpen: true, mode: 'register' });
  const onLogout = async () => {
    await authHelpers.signOut();
  };
  const onMessagesClick = () => { /* Implement navigation to messages page */ };
  const unreadMessagesCount = 0; // Replace with actual data

  const navigationItems = [
    { name: "Discover", path: "/discover" },
    { name: "How it Works", path: "/how-it-works" },
    { name: "Success Stories", path: "/success-stories" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass sticky top-0 z-50 border-b border-border/50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Enhanced with Nord Breeze styling */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-nord">
                  <Sparkles className="text-primary-foreground w-6 h-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-medium bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                  SkillSwap
                </h1>
                <p className="text-xs text-muted-foreground font-light -mt-1">
                  Connect & Learn
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Navigation - Refined spacing and typography */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className={`text-muted-foreground hover:text-foreground hover:bg-accent/50 font-medium px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActivePath(item.path) ? "text-foreground bg-accent/50" : ""
                }`}
              >
                <Link to={item.path}>{item.name}</Link>
              </Button>
            ))}
          </nav>

          {/* User Actions - Enhanced with Nord Breeze styling */}
          <div className="flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                {/* Admin Portal Access */}
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    <Link to="/admin" className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  </Button>
                )}

                {/* Notifications */}
                <NotificationsPopover />

                {/* Messages */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative hover:bg-accent/50 rounded-xl"
                  onClick={onMessagesClick}
                >
                  <MessageSquare className="w-5 h-5" />
                  {unreadMessagesCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-primary border-2 border-background">
                      {unreadMessagesCount}
                    </Badge>
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-11 w-11 rounded-2xl hover:bg-accent/50"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={userMetadata?.profilePhoto}
                          alt={userMetadata?.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-medium">
                          {userMetadata?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {userMetadata?.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background shadow-sm"></div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-64 glass border-border/50 shadow-nord-lg"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuLabel className="font-normal p-4">
                      <div className="flex flex-col space-y-2">
                        <p className="font-medium leading-none">
                          {userMetadata?.name}
                        </p>
                        <p className="text-sm leading-none text-muted-foreground">
                          {currentUser.email}
                        </p>
                        <div className="flex items-center gap-1 pt-1">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {userMetadata?.rating || 0} (
                            {userMetadata?.reviewCount || 0} reviews)
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem
                      className="hover:bg-accent/50 cursor-pointer p-3"
                    >
                      <User className="mr-3 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-accent/50 cursor-pointer p-3">
                      <Settings className="mr-3 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator className="bg-border/50" />
                        <DropdownMenuItem
                          asChild
                          className="hover:bg-accent/50 cursor-pointer p-3"
                        >
                          <Link to="/admin">
                            <Shield className="mr-3 h-4 w-4" />
                            <span>Admin Portal</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem
                      onClick={onLogout}
                      className="hover:bg-accent/50 cursor-pointer p-3"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={onLoginClick}
                  className="font-medium hover:bg-accent/50 rounded-xl px-6"
                >
                  Sign In
                </Button>
                <Button
                  onClick={onRegisterClick}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-nord rounded-xl px-6 font-medium"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        mode={authModal.mode}
        onSwitchMode={(mode) => setAuthModal({ ...authModal, mode })}
      />
    </motion.header>
  );
};

export default Header;
