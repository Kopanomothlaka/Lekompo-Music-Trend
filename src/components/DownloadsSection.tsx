import { Download, Calendar, User, Play, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const DownloadsSection = () => {
  const { data: tracks = [], isLoading } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching songs:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  const handleDownload = async (track: any) => {
    if (!track.download_url) return;
    
    try {
      // For mobile devices, use a simpler download approach
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Direct download link for mobile - faster and more reliable
        const link = document.createElement('a');
        link.href = track.download_url;
        link.download = `${track.title.replace(/[^a-z0-9]/gi, '_')}_by_${track.artist.replace(/[^a-z0-9]/gi, '_')}.mp3`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Desktop approach with blob for better file naming
        const response = await fetch(track.download_url);
        if (!response.ok) {
          throw new Error(`Failed to download: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        const safeTitle = track.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const safeArtist = track.artist.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const filename = `${safeTitle}_by_${safeArtist}.mp3`;
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download error:', error);
      window.open(track.download_url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <section id="downloads" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Popular Tracks
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Loading tracks...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="downloads" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Popular Tracks
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stream and download the hottest Lekompo tracks. All free, all yours.
          </p>
        </div>
        
        {tracks.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-gray-400">No tracks available yet. Add some in your Supabase database!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track, index) => (
              <Card 
                key={track.id} 
                className="spotify-card group cursor-pointer animate-slide-up border-0 overflow-hidden"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <div className="aspect-square w-full overflow-hidden">
                      <img 
                        src={track.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"} 
                        alt={track.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <Button className="spotify-green rounded-full w-16 h-16 p-0 shadow-2xl">
                        <Play className="h-6 w-6 text-black ml-1" fill="currentColor" />
                      </Button>
                    </div>
                    
                    {/* Heart icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Heart className="h-6 w-6 text-white hover:text-green-400 cursor-pointer transition-colors" />
                    </div>
                    
                    {/* Play count */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-medium">{track.plays?.toLocaleString() || '0'} plays</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-900/80">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300 truncate">
                      {track.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <User className="h-4 w-4 mr-2" />
                      <span className="truncate">{track.artist}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{track.release_date ? new Date(track.release_date).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      <span className="font-medium">{track.duration || 'N/A'}</span>
                    </div>
                    
                    {track.genre && track.genre.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {track.genre.map((g) => (
                          <span 
                            key={g}
                            className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full font-medium"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {track.download_url && (
                      <Button 
                        className="w-full spotify-green hover:scale-105 text-black font-semibold rounded-full transition-all duration-300"
                        onClick={() => handleDownload(track)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Free
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center mt-16">
          <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-3 rounded-full font-semibold">
            View All Tracks
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
