
import { useState, useEffect } from 'react';

// Mock messaging data and functions
const mockConversations = [
  {
    id: 1,
    otherUser: {
      id: 2,
      name: "Marcus Rodriguez",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      isOnline: true,
      rating: 4.8,
      location: "Austin, TX"
    },
    messages: [
      {
        id: 1,
        senderId: 2,
        text: "Hi! I saw your React skills. I'd love to learn from you in exchange for Python tutoring.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: true
      },
      {
        id: 2,
        senderId: 999,
        text: "That sounds great! I'm definitely interested in learning Python. When would be a good time to start?",
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        read: true
      },
      {
        id: 3,
        senderId: 2,
        text: "How about this weekend? We could start with a 1-hour session each way.",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        read: true
      }
    ],
    lastMessage: {
      text: "How about this weekend? We could start with a 1-hour session each way.",
      timestamp: new Date(Date.now() - 1800000).toISOString()
    },
    unreadCount: 0
  },
  {
    id: 2,
    otherUser: {
      id: 1,
      name: "Sarah Chen",
      profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      isOnline: false,
      rating: 4.9,
      location: "San Francisco, CA"
    },
    messages: [
      {
        id: 4,
        senderId: 1,
        text: "Hey! I noticed you're interested in UI/UX. I could teach you design principles in exchange for some JavaScript help?",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: true
      },
      {
        id: 5,
        senderId: 999,
        text: "Perfect! I've been wanting to improve my design skills. What's your experience level?",
        timestamp: new Date(Date.now() - 6600000).toISOString(),
        read: true
      },
      {
        id: 6,
        senderId: 1,
        text: "I've been doing UX design for 5 years at a tech company. I can help you with user research, wireframing, and prototyping.",
        timestamp: new Date(Date.now() - 900000).toISOString(),
        read: false
      }
    ],
    lastMessage: {
      text: "I've been doing UX design for 5 years at a tech company. I can help you with user research, wireframing, and prototyping.",
      timestamp: new Date(Date.now() - 900000).toISOString()
    },
    unreadCount: 1
  },
  {
    id: 3,
    otherUser: {
      id: 4,
      name: "David Kim",
      profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      isOnline: true,
      rating: 4.9,
      location: "Seattle, WA"
    },
    messages: [
      {
        id: 7,
        senderId: 4,
        text: "Hi there! I'm interested in your web development skills. I could teach you data science in return?",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: true
      }
    ],
    lastMessage: {
      text: "Hi there! I'm interested in your web development skills. I could teach you data science in return?",
      timestamp: new Date(Date.now() - 86400000).toISOString()
    },
    unreadCount: 1
  }
];

export const useMessaging = (currentUser) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    if (currentUser) {
      // Simulate loading conversations for the current user
      setConversations(mockConversations);
    }
  }, [currentUser]);

  const selectConversation = (conversation) => {
    // Mark messages as read when conversation is selected
    const updatedConversation = {
      ...conversation,
      unreadCount: 0,
      messages: conversation.messages.map(msg => ({ ...msg, read: true }))
    };
    
    setSelectedConversation(updatedConversation);
    
    // Update the conversation in the list
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id ? updatedConversation : conv
      )
    );
  };

  const sendMessage = (conversationId, messageText) => {
    const newMessage = {
      id: Date.now(),
      senderId: currentUser.id,
      text: messageText,
      timestamp: new Date().toISOString(),
      read: false
    };

    // Update the selected conversation
    if (selectedConversation && selectedConversation.id === conversationId) {
      const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, newMessage],
        lastMessage: {
          text: messageText,
          timestamp: newMessage.timestamp
        }
      };
      setSelectedConversation(updatedConversation);
    }

    // Update the conversations list
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: {
                text: messageText,
                timestamp: newMessage.timestamp
              }
            }
          : conv
      )
    );
  };

  const createConversation = (otherUser) => {
    const newConversation = {
      id: Date.now(),
      otherUser,
      messages: [],
      lastMessage: null,
      unreadCount: 0
    };

    setConversations(prev => [newConversation, ...prev]);
    return newConversation;
  };

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  return {
    conversations,
    selectedConversation,
    selectConversation,
    sendMessage,
    createConversation,
    getTotalUnreadCount
  };
};
