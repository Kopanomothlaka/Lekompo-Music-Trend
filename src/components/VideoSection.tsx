import { Youtube, Play, Eye, Clock, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const VideoSection = () => {
  const [playingVideo, setPlayingVideo] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) {
        console.error('Error fetching videos:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  const updateVideoStats = useMutation({
    mutationFn: async ({ videoId, type }: { videoId: string, type: 'view' | 'like' }) => {
      // For now, directly update until the SQL functions are created
      if (type === 'view') {
        const video = videos.find(v => v.id === videoId);
        const currentViews = parseInt(video?.views || '0') || 0;
        const { error } = await supabase
          .from('videos')
          .update({ views: (currentViews + 1).toString() })
          .eq('id', videoId);
        if (error) throw error;
      } else if (type === 'like') {
        const video = videos.find(v => v.id === videoId);
        const currentLikes = parseInt(video?.likes || '0') || 0;
        const { error } = await supabase
          .from('videos')
          .update({ likes: (currentLikes + 1).toString() })
          .eq('id', videoId);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    }
  });

  // Function to extract YouTube video ID from various URL formats
  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    
    // Match YouTube URL patterns
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) 
      ? match[2] 
      : null;
  };

  // Function to handle video playback
  const handlePlayVideo = (video: any) => {
    setPlayingVideo(video);
    updateVideoStats.mutate({ videoId: video.id, type: 'view' });
  };

  // Function to handle like action
  const handleLikeVideo = (video: any, event: React.MouseEvent) => {
    event.stopPropagation();
    updateVideoStats.mutate({ videoId: video.id, type: 'like' });
  };

  // Function to visit YouTube channel
  const visitYouTubeChannel = () => {
    const channelUrl = "https://www.youtube.com/@LovableLekompo";
    window.open(channelUrl, '_blank');
  };

  if (isLoading) {
    return (
      <section id="videos" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-6">
              <Youtube className="h-10 w-10 text-red-500 mr-4 animate-pulse-glow" />
              <h2 className="text-5xl md:text-6xl font-bold gradient-text">
                Video Hub
              </h2>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Loading videos...
            </p>
          </div>
        </div>
      </section>
    );
  }

  const featuredVideo = videos.find(video => video.featured) || videos[0];
  const regularVideos = videos.filter(video => video.id !== featuredVideo?.id);

  return (
    <section id="videos" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <Youtube className="h-10 w-10 text-red-500 mr-4 animate-pulse-glow" />
            <h2 className="text-5xl md:text-6xl font-bold gradient-text">
              Video Hub
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in the visual world of Lekompo with performances, tutorials, and behind-the-scenes content.
          </p>
        </div>
        
        {videos.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-gray-400">No videos available yet. Add some in the admin dashboard!</p>
          </div>
        ) : (
          <>
            {/* Featured Video */}
            {featuredVideo && (
              <div className="mb-16">
                <Card 
                  className="spotify-card border-0 overflow-hidden cursor-pointer group animate-slide-up"
                  onClick={() => handlePlayVideo(featuredVideo)}
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative overflow-hidden h-64 lg:h-auto">
                        <div className="w-full h-full overflow-hidden">
                          <img 
                            src={featuredVideo.thumbnail_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=340&fit=crop"} 
                            alt={featuredVideo.title}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300 shadow-2xl">
                            <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                          </div>
                        </div>
                        
                        {/* Duration and featured badge */}
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 spotify-green text-black text-sm font-bold rounded-full mr-2">
                            FEATURED
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded-full font-medium">
                          {featuredVideo.duration || '0:00'}
                        </div>
                      </div>
                      
                      <div className="p-8 lg:p-12 flex flex-col justify-center bg-gray-900/80">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                          {featuredVideo.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-400 mb-4">
                          <Youtube className="h-5 w-5 text-red-500 mr-2" />
                          <span className="font-medium">{featuredVideo.channel || 'Channel'}</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-6 mb-6">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Eye className="h-4 w-4 text-green-400 mr-1" />
                              <span className="text-lg font-bold text-white">{featuredVideo.views || '0'}</span>
                            </div>
                            <span className="text-xs text-gray-400">Views</span>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <ThumbsUp 
                                className="h-4 w-4 text-green-400 mr-1 cursor-pointer hover:text-green-300" 
                                onClick={(e) => handleLikeVideo(featuredVideo, e)}
                              />
                              <span className="text-lg font-bold text-white">{featuredVideo.likes || '0'}</span>
                            </div>
                            <span className="text-xs text-gray-400">Likes</span>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Clock className="h-4 w-4 text-green-400 mr-1" />
                              <span className="text-lg font-bold text-white">{featuredVideo.duration || '0:00'}</span>
                            </div>
                            <span className="text-xs text-gray-400">Duration</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-green-400 font-semibold group-hover:text-green-300 transition-colors duration-300">
                          <Play className="h-5 w-5 mr-2" fill="currentColor" />
                          <span>Watch Now</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Regular Videos Grid */}
            {regularVideos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularVideos.map((video, index) => (
                  <Card 
                    key={video.id}
                    className="spotify-card border-0 overflow-hidden cursor-pointer group animate-slide-up"
                    style={{animationDelay: `${index * 0.1 + 0.2}s`}}
                    onClick={() => handlePlayVideo(video)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden">
                          <img 
                            src={video.thumbnail_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=340&fit=crop"} 
                            alt={video.title}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300">
                            <Play className="h-5 w-5 text-white ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                        
                        {/* Duration badge */}
                        <div className="absolute bottom-3 right-3 bg-black/90 text-white text-xs px-2 py-1 rounded font-medium">
                          {video.duration || '0:00'}
                        </div>
                      </div>
                      
                      <div className="p-5 bg-gray-900/80">
                        <h3 className="text-base font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
                          {video.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-400 text-sm mb-3">
                          <Youtube className="h-4 w-4 text-red-500 mr-2" />
                          <span>{video.channel || 'Channel'}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            <span>{video.views || '0'} views</span>
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp 
                              className="h-3 w-3 mr-1 cursor-pointer hover:text-green-400" 
                              onClick={(e) => handleLikeVideo(video, e)}
                            />
                            <span>{video.likes || '0'}</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          {video.upload_date || 'Recently uploaded'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Video Player Dialog */}
            <Dialog open={!!playingVideo} onOpenChange={(open) => !open && setPlayingVideo(null)}>
              <DialogContent className="bg-black border-gray-800 max-w-3xl w-[95vw] p-1">
                <DialogHeader className="mb-2">
                  <DialogTitle className="text-white">{playingVideo?.title}</DialogTitle>
                </DialogHeader>
                {playingVideo && getYoutubeVideoId(playingVideo.video_url) ? (
                  <div className="aspect-video w-full">
                    <iframe 
                      width="100%" 
                      height="100%"
                      src={`https://www.youtube.com/embed/${getYoutubeVideoId(playingVideo.video_url)}?autoplay=1`}
                      title={playingVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-sm"
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gray-800 flex items-center justify-center text-gray-400">
                    No valid YouTube URL provided
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
        
        <div className="text-center mt-16">
          <button 
            onClick={visitYouTubeChannel}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center mx-auto font-semibold"
          >
            <Youtube className="mr-2 h-5 w-5" />
            Visit Our Channel
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
