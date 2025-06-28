import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, User, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const News = () => {
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
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-20 pb-32">
          <div className="container mx-auto px-6 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Loading News...</h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20 pb-32">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <div className="mb-8">
            <Button 
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              All News Articles
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Stay in the loop with the freshest Lekompo updates, artist spotlights, and cultural insights.
            </p>
          </div>

          {/* News Articles Grid */}
          {newsItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400 mb-8">No news articles available yet. Add some in the admin dashboard!</p>
              <Button 
                onClick={() => navigate('/admin')}
                className="spotify-green text-black font-semibold px-6 py-3 rounded-full"
              >
                Go to Admin Dashboard
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item, index) => (
                <Card 
                  key={item.id}
                  className="spotify-card border-0 overflow-hidden cursor-pointer group animate-slide-up"
                  style={{animationDelay: `${index * 0.1}s`}}
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
                        {item.featured && (
                          <span className="ml-2 px-3 py-1 spotify-green text-black text-sm font-bold rounded-full">
                            FEATURED
                          </span>
                        )}
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

          {/* Article Count */}
          {newsItems.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-400">
                Showing {newsItems.length} article{newsItems.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
