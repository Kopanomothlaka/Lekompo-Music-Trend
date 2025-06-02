
import { Calendar, ArrowRight, User, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const newsItems = [
  {
    id: 1,
    title: "Lekompo Festival 2024 Announces Stellar Lineup",
    excerpt: "Get ready for the biggest Lekompo celebration of the year featuring international artists and traditional masters from around the globe.",
    date: "2024-01-20",
    category: "Events",
    author: "Music Insider",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "New Documentary Explores Lekompo Origins",
    excerpt: "A groundbreaking film traces the roots of Lekompo music from ancient traditions to modern interpretations.",
    date: "2024-01-18",
    category: "Culture",
    author: "Cultural Review",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
    featured: false
  },
  {
    id: 3,
    title: "Rising Artist Breaks Streaming Records",
    excerpt: "Young Lekompo producer achieves unprecedented success with innovative fusion techniques that blend tradition with modernity.",
    date: "2024-01-15",
    category: "Artists",
    author: "Trend Reporter",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1571974599782-87624638275f?w=600&h=400&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "Global Collaboration Creates New Lekompo Sound",
    excerpt: "Artists from five continents unite to create a revolutionary album that's changing the genre forever.",
    date: "2024-01-12",
    category: "Collaboration",
    author: "World Music Today",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
    featured: false
  }
];

const NewsSection = () => {
  const featuredNews = newsItems.find(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <section id="news" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Latest News
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stay in the loop with the freshest Lekompo updates, artist spotlights, and cultural insights.
          </p>
        </div>
        
        {/* Featured Article */}
        {featuredNews && (
          <div className="mb-16">
            <Card className="spotify-card border-0 overflow-hidden cursor-pointer group animate-slide-up">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden h-64 lg:h-auto">
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 spotify-green text-black text-sm font-bold rounded-full">
                        FEATURED
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center bg-gray-900/80">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full font-medium">
                        {featuredNews.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                      {featuredNews.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                      {featuredNews.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          <span>{featuredNews.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{featuredNews.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{featuredNews.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-green-400 font-semibold group-hover:text-green-300 transition-colors duration-300">
                      <span>Read Full Story</span>
                      <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Regular News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularNews.map((item, index) => (
            <Card 
              key={item.id}
              className="spotify-card border-0 overflow-hidden cursor-pointer group animate-slide-up"
              style={{animationDelay: `${index * 0.1 + 0.2}s`}}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm text-green-300 text-sm rounded-full font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-900/80">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400 text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{item.date}</span>
                    </div>
                    
                    <div className="flex items-center text-green-400 text-sm font-medium group-hover:text-green-300 transition-colors duration-300">
                      <span>Read</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-3 rounded-full font-semibold">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
