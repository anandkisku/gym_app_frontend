import React, { useState, useEffect } from 'react';
import { FaDumbbell, FaHeartbeat, FaUtensils, FaBed, FaRunning, FaBrain } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Information() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const fitnessArticles = [
    {
      id: 1,
      title: "10 Essential Exercises for Beginners",
      category: "workout",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      excerpt: "Starting your fitness journey? These 10 exercises are perfect for beginners and will help you build a strong foundation.",
      date: "June 15, 2023",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Science Behind Muscle Recovery",
      category: "health",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      excerpt: "Understanding how your muscles recover after exercise is crucial for optimizing your workout routine and preventing injury.",
      date: "June 10, 2023",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Nutrition Guide for Muscle Building",
      category: "nutrition",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      excerpt: "Learn about the best foods to eat for muscle growth and recovery, including protein sources, carbs, and healthy fats.",
      date: "June 5, 2023",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Sleep: The Missing Link in Your Fitness Journey",
      category: "lifestyle",
      image: "https://plus.unsplash.com/premium_photo-1661454345269-c6ab685d3b01?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      excerpt: "Discover why quality sleep is essential for muscle recovery, hormone regulation, and overall fitness progress.",
      date: "May 28, 2023",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "Cardio vs. Strength Training: Which is Better?",
      category: "workout",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      excerpt: "A comprehensive comparison of cardio and strength training, including benefits, drawbacks, and how to incorporate both.",
      date: "May 20, 2023",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Mental Health Benefits of Regular Exercise",
      category: "health",
      image: "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      excerpt: "Explore the powerful connection between physical activity and mental well-being, including stress reduction and improved mood.",
      date: "May 15, 2023",
      readTime: "5 min read"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await axios.get('https://www.anytimefitness.co.in/blog/');
        // setArticles(response.data);
        
        // Using sample data for now
        setTimeout(() => {
          setArticles(fitnessArticles);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching articles:', error);
        toast.error('Failed to load fitness information');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const categories = [
    { id: 'all', name: 'All Articles', icon: <FaDumbbell /> },
    { id: 'workout', name: 'Workout Tips', icon: <FaRunning /> },
    { id: 'nutrition', name: 'Nutrition', icon: <FaUtensils /> },
    { id: 'health', name: 'Health', icon: <FaHeartbeat /> },
    { id: 'lifestyle', name: 'Lifestyle', icon: <FaBed /> },
    { id: 'mental', name: 'Mental Health', icon: <FaBrain /> }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(cat => cat.id === category);
    return categoryObj ? categoryObj.icon : <FaDumbbell />;
  };

  return (
    <div className="w-full min-h-screen bg-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-3xl font-bold text-yellow-500 mb-2">Fitness Information</h2>
          <p className="text-gray-600 mb-6">Stay informed with the latest fitness tips, nutrition advice, and health insights.</p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <FaDumbbell className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Articles Found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <div key={article.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-600">{getCategoryIcon(article.category)}</span>
                      <span className="text-xs text-gray-500">{article.date} • {article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                    <button className="text-white bg-yellow-500 font-medium hover:bg-yellow-400 transition duration-200">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured Article */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Featured Article</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Featured Article" 
                className="w-full h-64 md:h-full object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">Featured</span>
                <span className="text-xs text-gray-500">July 1, 2023 • 10 min read</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">The Complete Guide to Building a Fit Lifestyle</h3>
              <p className="text-gray-600 mb-4">
              Join us and let us help you achieve your fitness goals! Our expert guidance and personalized workout plans will keep you on track, whether you're at home or in the gym. Let's build a stronger, healthier you together!
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Guidance</span>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Gym Workout</span>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Diet</span>
              </div>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200">
                Read Full Article
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-white">Subscribe to our newsletter for the latest fitness tips and exclusive content.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-lg text-gray-800 w-full md:w-64 focus:outline-none"
              />
              <button className="px-4 py-2 bg-yellow-500 text-white border-none rounded-lg hover:bg-yellow-400 transition duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information; 