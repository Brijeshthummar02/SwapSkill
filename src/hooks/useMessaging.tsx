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

export const useMessaging = (currentUserId) => {
  const [conversations, setConversations] = useState(mockConversations);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentConversation) {
      setMessages(currentConversation.messages);
    } else {
      setMessages([]);
    }
  }, [currentConversation]);

  const findOrCreateConversation = async (otherUserId) => {
    setLoading(true);
    try {
      const conversation = conversations.find(c => c.otherUser.id === otherUserId);
      if (conversation) {
        setCurrentConversation(conversation);
      } else {
        // This is a mock, in a real app you'd fetch the user's data
        const otherUser = {
          id: otherUserId,
          name: "New Match",
          profilePhoto: null,
          isOnline: false,
          rating: 0,
          location: "Unknown"
        };
        const newConversation = {
          id: Date.now(),
          otherUser,
          messages: [],
          lastMessage: null,
          unreadCount: 0,
        };
        setConversations(prev => [newConversation, ...prev]);
        setCurrentConversation(newConversation);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (messageText) => {
    if (!currentConversation) return;

    const newMessage = {
      id: Date.now(),
      senderId: currentUserId,
      text: messageText,
      timestamp: new Date().toISOString(),
      read: false,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    const updatedConversation = {
      ...currentConversation,
      messages: updatedMessages,
      lastMessage: {
        text: messageText,
        timestamp: newMessage.timestamp,
      },
    };

    setCurrentConversation(updatedConversation);
    setConversations(prev =>
      prev.map(c => (c.id === currentConversation.id ? updatedConversation : c))
    );
  };

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0);
  };

  return {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    findOrCreateConversation,
    sendMessage,
    setCurrentConversation,
    getTotalUnreadCount,
  };
};