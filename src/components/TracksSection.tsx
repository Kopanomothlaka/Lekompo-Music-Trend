
import { Download, Calendar, User, Play, Pause, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  image_url?: string;
  download_url?: string;
  release_date?: string;
  duration?: string;
  plays?: number;
  genre?: string[];
}

interface TracksSectionProps {
  onSongSelect?: (song: Song) => void;
  onPlayPause?: (song?: Song) => void;
  currentSong?: Song | null;
  isPlaying?: boolean;
}

const TracksSection = ({ onSongSelect, onPlayPause, currentSong, isPlaying }: TracksSectionProps) => {
  const { data: tracks = [], isLoading } = useQuery({
    queryKey: ['featured-songs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('plays', { ascending: false })
        .limit(6);
      
      if (error) {
        console.error('Error fetching songs:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  const handlePlayPause = (track: Song) => {
    if (onPlayPause) {
      onPlayPause(track);
    }
    if (onSongSelect && (!currentSong || currentSong.id !== track.id)) {
      onSongSelect(track);
    }
  };

  const handleDownload = (track: Song) => {
    if (track.download_url) {
      window.open(track.download_url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <section id="tracks" className="py-24 bg-gradient-to-b from-black to-gray-900">
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
    <section id="tracks" className="py-24 bg-gradient-to-b from-black to-gray-900">
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
                    <img 
                      src={track.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"} 
                      alt={track.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <Button 
                        onClick={() => handlePlayPause(track)}
                        className="spotify-green rounded-full w-16 h-16 p-0 shadow-2xl"
                      >
                        {currentSong?.id === track.id && isPlaying ? (
                          <Pause className="h-6 w-6 text-black" fill="currentColor" />
                        ) : (
                          <Play className="h-6 w-6 text-black ml-1" fill="currentColor" />
                        )}
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

                    {/* Now playing indicator */}
                    {currentSong?.id === track.id && (
                      <div className="absolute top-4 left-4 bg-green-500 px-2 py-1 rounded-full">
                        <span className="text-black text-xs font-bold">NOW PLAYING</span>
                      </div>
                    )}
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
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handlePlayPause(track)}
                        className="flex-1 spotify-green hover:scale-105 text-black font-semibold rounded-full transition-all duration-300"
                      >
                        {currentSong?.id === track.id && isPlaying ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Play
                          </>
                        )}
                      </Button>
                      
                      {track.download_url && (
                        <Button 
                          variant="outline"
                          onClick={() => handleDownload(track)}
                          className="border-green-500 text-green-400 hover:bg-green-500/10 rounded-full"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
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

export default TracksSection;
