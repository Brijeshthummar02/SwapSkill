import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Star,
  Clock,
  CheckCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MessagingModal = ({
  isOpen,
  onClose,
  conversation,
  currentUser,
  onSendMessage,
  loading,
}) => {
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (conversation) {
      scrollToBottom();
    }
  }, [conversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() && conversation) {
      onSendMessage(messageText.trim());
      setMessageText("");
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] p-0">
        <div className="flex h-[80vh]">
          {/* Chat Area */}
          <div className="w-full flex flex-col">
            {conversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={conversation.otherUser.profilePhoto}
                          alt={conversation.otherUser.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {conversation.otherUser.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {conversation.otherUser.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {conversation.otherUser.isOnline
                            ? "Active now"
                            : "Last seen recently"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  <AnimatePresence>
                    {conversation.messages.map((message, index) => {
                      const isOwnMessage = message.senderId === currentUser.id;
                      const showDate =
                        index === 0 ||
                        formatDate(message.timestamp) !==
                          formatDate(
                            conversation.messages[index - 1].timestamp
                          );

                      return (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {showDate && (
                            <div className="flex justify-center my-4">
                              <Badge
                                variant="secondary"
                                className="bg-white text-gray-600"
                              >
                                {formatDate(message.timestamp)}
                              </Badge>
                            </div>
                          )}
                          <div
                            className={`flex ${
                              isOwnMessage ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md ${
                                isOwnMessage ? "order-2" : "order-1"
                              }`}
                            >
                              {!isOwnMessage && (
                                <Avatar className="w-8 h-8 mb-2">
                                  <AvatarImage
                                    src={conversation.otherUser.profilePhoto}
                                    alt={conversation.otherUser.name}
                                  />
                                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                                    {conversation.otherUser.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <Card
                                className={`${
                                  isOwnMessage
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                    : "bg-white border-gray-200"
                                }`}
                              >
                                <CardContent className="p-3">
                                  <p className="text-sm">{message.text}</p>
                                  <div
                                    className={`flex items-center justify-between mt-2 text-xs ${
                                      isOwnMessage
                                        ? "text-blue-100"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    <span>{formatTime(message.timestamp)}</span>
                                    {isOwnMessage && (
                                      <CheckCheck
                                        className={`w-4 h-4 ${
                                          message.read
                                            ? "text-blue-200"
                                            : "text-blue-300"
                                        }`}
                                      />
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      disabled={!messageText.trim() || loading}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Conversation Selected
                  </h3>
                  <p className="text-gray-500">
                    Select a conversation to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessagingModal;
