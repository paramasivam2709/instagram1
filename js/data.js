// ============================================
// STACKLY - Mock Data Module
// ============================================

const StacklyData = {
  // Users data
  users: [
    { id: 1, name: "Sarah Chen", handle: "@sarahchen", avatar: "SC", online: true, followers: "12.5K", following: "892" },
    { id: 2, name: "Marcus Johnson", handle: "@marcusj", avatar: "MJ", online: true, followers: "8.2K", following: "456" },
    { id: 3, name: "Emily Rodriguez", handle: "@emilyr", avatar: "ER", online: false, followers: "24K", following: "1.2K" },
    { id: 4, name: "Alex Kim", handle: "@alexkim", avatar: "AK", online: true, followers: "5.8K", following: "234" },
    { id: 5, name: "Priya Sharma", handle: "@priyas", avatar: "PS", online: false, followers: "18.3K", following: "678" },
    { id: 6, name: "James Wilson", handle: "@jamesw", avatar: "JW", online: true, followers: "31K", following: "1.5K" },
    { id: 7, name: "Luna Park", handle: "@lunapark", avatar: "LP", online: true, followers: "9.1K", following: "543" },
    { id: 8, name: "David Lee", handle: "@davidlee", avatar: "DL", online: false, followers: "15.7K", following: "890" },
  ],

  // Posts data
  posts: [
    {
      id: 1,
      userId: 1,
      username: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "SC",
      time: "2 hours ago",
      image: "images/post1.webp",
      imageIcon: "🏔️",
      text: "Just reached the summit! The view from up here is absolutely breathtaking. Nature never fails to amaze me. 🏔️✨ #hiking #adventure #mountains",
      likes: 2341,
      comments: 156,
      shares: 89,
      liked: false,
      saved: false
    },
    {
      id: 2,
      userId: 2,
      username: "Marcus Johnson",
      handle: "@marcusj",
      avatar: "MJ",
      time: "4 hours ago",
      image: "images/post2.webp",
      imageIcon: "🍽️",
      text: "New recipe unlocked! Homemade pasta with truffle oil and parmesan. Sometimes the best therapy is cooking something delicious. 🍝👨‍🍳",
      likes: 1876,
      comments: 234,
      shares: 67,
      liked: true,
      saved: true
    },
    {
      id: 3,
      userId: 3,
      username: "Emily Rodriguez",
      handle: "@emilyr",
      avatar: "ER",
      time: "6 hours ago",
      image: "images/post3.webp",
      imageIcon: "🎉",
      text: "What an incredible night! Thank you to everyone who came out to celebrate. The energy was electric! 🎵🎉 #concert #music #vibes",
      likes: 4521,
      comments: 389,
      shares: 245,
      liked: false,
      saved: false
    },
    {
      id: 4,
      userId: 4,
      username: "Alex Kim",
      handle: "@alexkim",
      avatar: "AK",
      time: "8 hours ago",
      image: "images/post4.webp",
      imageIcon: "💻",
      text: "Late night coding session. Building something special with the team. There's nothing quite like the flow state when everything clicks. 💻☕",
      likes: 987,
      comments: 78,
      shares: 34,
      liked: false,
      saved: true
    },
    {
      id: 5,
      userId: 5,
      username: "Priya Sharma",
      handle: "@priyas",
      avatar: "PS",
      time: "12 hours ago",
      image: "images/post5.webp",
      imageIcon: "📚",
      text: "Knowledge is power! Just finished an amazing workshop on UX design. So inspired to implement these new insights. 🎨📚 #design #learning",
      likes: 1567,
      comments: 123,
      shares: 78,
      liked: true,
      saved: false
    },
    {
      id: 6,
      userId: 6,
      username: "James Wilson",
      handle: "@jamesw",
      avatar: "JW",
      time: "1 day ago",
      image: "images/post6.webp",
      imageIcon: "🎵",
      text: "Dropping my new track tonight at midnight! This one is very personal and I can't wait for you all to hear it. 🎵🔥 #newmusic #producer",
      likes: 6789,
      comments: 567,
      shares: 890,
      liked: false,
      saved: false
    }
  ],

  // Reels data
 reels: [
{
id:1,
username:"Alex Kim",
avatar:"AK",
views:"67K",
video:"https://www.w3schools.com/html/mov_bbb.mp4"
},
{
id:2,
username:"Priya Sharma",
avatar:"PS",
views:"178K",
video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
},
{
id:3,
username:"James Wilson",
avatar:"JW",
views:"312K",
video:"https://www.w3schools.com/html/movie.mp4"
},
{
id:4,
username:"Luna Park",
avatar:"LP",
views:"95K",
video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
},
{
id:5,
username:"David Lee",
avatar:"DL",
views:"145K",
video:"https://www.w3schools.com/html/mov_bbb.mp4"
},
{
id:6,
username:"Sarah Chen",
avatar:"SC",
views:"125K",
video:"https://www.w3schools.com/html/movie.mp4"
},
{
id:7,
username:"Marcus Johnson",
avatar:"MJ",
views:"89K",
video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
},
{
id:8,
username:"Emily Rodriguez",
avatar:"ER",
views:"256K",
video:"https://www.w3schools.com/html/mov_bbb.mp4"
}
],

  // Messages data
  messages: [
    { id: 1, userId: 1, name: "Sarah Chen", avatar: "SC", preview: "Hey! Are we still on for coffee tomorrow? ☕", time: "2m ago", unread: 2 },
    { id: 2, userId: 2, name: "Marcus Johnson", avatar: "MJ", preview: "Just sent you the photos from last weekend! 📸", time: "15m ago", unread: 1 },
    { id: 3, userId: 3, name: "Emily Rodriguez", avatar: "ER", preview: "The event was amazing! Thanks for inviting me 🎉", time: "1h ago", unread: 0 },
    { id: 4, userId: 4, name: "Alex Kim", avatar: "AK", preview: "Can you review my latest code? Need your eyes on it 👀", time: "2h ago", unread: 3 },
    { id: 5, userId: 5, name: "Priya Sharma", avatar: "PS", preview: "Loved your recent post! The design is 🔥", time: "3h ago", unread: 0 },
    { id: 6, userId: 6, name: "James Wilson", avatar: "JW", preview: "New track dropping tonight! Don't miss it 🎵", time: "5h ago", unread: 1 },
  ],

  // Features data
  features: [
    {
      icon: "📸",
      image: "../images/post1.webp",
      title: "Photo Sharing",
      description: "Share high-quality photos with stunning filters and editing tools. Capture moments and make them unforgettable."
    },
    {
      icon: "🎬",
      image: "../images/reels.webp",
      title: "Reels & Stories",
      description: "Create and discover short-form videos with music, effects, and creative tools that bring your stories to life."
    },
    {
      icon: "💬",
      image: "../images/post3.webp",
      title: "Real-time Messaging",
      description: "Connect with friends through seamless messaging with voice notes, video calls, and group chats."
    },
    {
      icon: "🔔",
      image: "../images/post4.webp",
      title: "Smart Notifications",
      description: "Stay updated with intelligent notifications that prioritize what matters most to you."
    },
    {
      icon: "🔒",
      image: "../images/post5.webp",
      title: "Privacy First",
      description: "Your data, your control. Advanced privacy settings keep your content secure and visible only to whom you choose."
    },
    {
      icon: "🌍",
      image: "../images/post6.webp",
      title: "Discover World",
      description: "Explore trending content, discover new creators, and find communities that share your passions."
    }
  ],

  // Stats for admin dashboard
  adminStats: {
    totalUsers: 12543,
    activeUsers: 8921,
    totalPosts: 45678,
    totalReels: 12345,
    newSignups: 234,
    reports: 12,
    engagement: "87%",
    growth: "+23%"
  },

  // Recent activity for admin
  recentActivity: [
    { action: "New user registered", user: "John Doe", time: "2 min ago", type: "user" },
    { action: "Post reported", user: "Jane Smith", time: "5 min ago", type: "report" },
    { action: "New reel uploaded", user: "Mike Johnson", time: "10 min ago", type: "content" },
    { action: "Comment flagged", user: "Sarah Lee", time: "15 min ago", type: "report" },
    { action: "User upgraded to premium", user: "Tom Brown", time: "20 min ago", type: "upgrade" },
    { action: "New message sent", user: "Alice Wang", time: "25 min ago", type: "message" },
  ],

  // Helper functions
  getUserById(id) {
    return this.users.find(u => u.id === id);
  },

  getPostsByUserId(userId) {
    return this.posts.filter(p => p.userId === userId);
  },

  formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.StacklyData = StacklyData;
}
