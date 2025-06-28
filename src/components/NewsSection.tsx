import { Calendar, ArrowRight, User, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const NewsSection = () => {
  const navigate = useNavigate();

  const { data: newsItems = [], isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching news:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  const handleReadArticle = (article: any) => {
    navigate(`/news/${article.id}`);
  };

  if (isLoading) {
    return (
      <section id="news" className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Latest News
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Loading news...
            </p>
          </div>
        </div>
      </section>
    );
  }

  const featuredNews = newsItems.find(item => item.featured) || newsItems[0];
  const regularNews = newsItems.filter(item => item.id !== featuredNews?.id);

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
        
        {newsItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-gray-400">No news articles available yet. Add some in the admin dashboard!</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredNews && (
              <div className="mb-16">
                <Card 
                  className="spotify-card border-0 overflow-hidden cursor-pointer group animate-slide-up"
                  onClick={() => handleReadArticle(featuredNews)}
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative overflow-hidden h-64 lg:h-auto">
                        <div className="w-full h-full overflow-hidden">
                          <img 
                            src={featuredNews.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"} 
                            alt={featuredNews.title}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 spotify-green text-black text-sm font-bold rounded-full">
                            FEATURED
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8 lg:p-12 flex flex-col justify-center bg-gray-900/80">
                        <div className="mb-4">
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full font-medium">
                            {featuredNews.category || 'News'}
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
                              <span>{featuredNews.author || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{new Date(featuredNews.date || featuredNews.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{featuredNews.read_time || '5 min read'}</span>
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
            {regularNews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularNews.map((item, index) => (
                  <Card 
                    key={item.id}
                    className="spotify-card border-0 overflow-hidden cursor-pointer group animate-slide-up"
                    style={{animationDelay: `${index * 0.1 + 0.2}s`}}
                    onClick={() => handleReadArticle(item)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <div className="aspect-[4/3] w-full overflow-hidden">
                          <img 
                            src={item.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"} 
                            alt={item.title}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm text-green-300 text-sm rounded-full font-medium">
                            {item.category || 'News'}
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
                            <span>{item.author || 'Unknown'}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{item.read_time || '5 min read'}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-400 text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{new Date(item.date || item.created_at).toLocaleDateString()}</span>
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
            )}
          </>
        )}
        
        <div className="text-center mt-16">
          <Button 
            variant="outline" 
            className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            onClick={() => {
              console.log('View All News clicked - navigating to /news');
              navigate('/news');
            }}
          >
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
