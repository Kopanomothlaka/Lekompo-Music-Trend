import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, User, Clock, ArrowLeft, Share2, Copy, Check, Twitter, Facebook, Linkedin, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

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

  useEffect(() => {
    if (newsItems.length > 0 && id) {
      const foundArticle = newsItems.find(item => item.id === id);
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        // Article not found, redirect to news page
        navigate('/news');
      }
    }
  }, [newsItems, id, navigate]);

  const handleShare = async () => {
    const shareData = {
      title: article?.title || 'Lekompo News',
      text: article?.excerpt || 'Check out this article from Lekompo Groove Hub',
      url: window.location.href,
    };

    try {
      // Try native Web Share API first (works on mobile and some desktop browsers)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully!",
          description: "The article has been shared.",
          duration: 3000,
        });
      } else {
        // Fallback: copy URL to clipboard
        await copyToClipboard();
      }
    } catch (error) {
      console.error('Share failed:', error);
      // If native share fails, fallback to clipboard
      await copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Article URL has been copied to your clipboard.",
        duration: 3000,
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      fallbackCopyToClipboard();
    }
  };

  const fallbackCopyToClipboard = () => {
    const textArea = document.createElement('textarea');
    textArea.value = window.location.href;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Article URL has been copied to your clipboard.",
        duration: 3000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Fallback copy failed:', error);
      toast({
        title: "Copy failed",
        description: "Please manually copy the URL from your browser's address bar.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const shareToSocialMedia = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article?.title || 'Lekompo News');
    const text = encodeURIComponent(article?.excerpt || 'Check out this article from Lekompo Groove Hub');
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-20 pb-32">
          <div className="container mx-auto px-6 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Loading Article...</h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-20 pb-32">
          <div className="container mx-auto px-6 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Article Not Found</h1>
              <p className="text-xl text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
              <Button 
                onClick={() => navigate('/news')}
                className="spotify-green hover:scale-105 text-black font-semibold px-8 py-3 rounded-full"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to News
              </Button>
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
              onClick={() => navigate('/news')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </div>

          {/* Article Header */}
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full font-medium">
                  {article.category || 'News'}
                </span>
                {article.featured && (
                  <span className="px-4 py-2 spotify-green text-black text-sm font-bold rounded-full">
                    FEATURED
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-400 mb-8">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{article.author || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(article.date || article.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{article.read_time || '5 min read'}</span>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-400 hover:border-green-500 hover:text-green-400"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Share2 className="h-4 w-4 mr-2" />
                      )}
                      {copied ? 'Copied!' : 'Share'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-700">
                    <DropdownMenuItem 
                      onClick={handleShare}
                      className="text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Native Share
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => shareToSocialMedia('twitter')}
                      className="text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => shareToSocialMedia('facebook')}
                      className="text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => shareToSocialMedia('linkedin')}
                      className="text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => shareToSocialMedia('whatsapp')}
                      className="text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => shareToSocialMedia('telegram')}
                      className="text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Telegram
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Featured Image */}
            {article.image_url && (
              <div className="mb-12 rounded-lg overflow-hidden">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img 
                    src={article.image_url} 
                    alt={article.title} 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {article.content ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }} />
                ) : (
                  <p className="text-gray-400 italic">No content available for this article.</p>
                )}
              </div>
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400">
                  <span className="text-sm">Written by {article.author || 'Unknown'}</span>
                </div>
                
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-green-500 text-green-400 hover:bg-green-500/10"
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Share2 className="h-4 w-4 mr-2" />
                  )}
                  {copied ? 'Copied!' : 'Share Article'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsDetail; 