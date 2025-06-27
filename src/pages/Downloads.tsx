import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Play, Heart, Download, Calendar, User, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { downloadFile, sanitizeFilename } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';

interface Song {
  id: string;
  title: string;
  artist: string;
  release_date?: string;
  genre?: string[];
  image_url?: string;
  duration?: string;
  plays?: number;
  download_url?: string;
}

const Downloads = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

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

  const handlePlaySong = (song: Song, index: number) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentSong(tracks[nextIndex]);
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentSong(tracks[prevIndex]);
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleDownload = async (song: Song) => {
    if (!song.download_url) {
      toast({
        title: "Download Unavailable",
        description: "This track is not available for download.",
        variant: "destructive",
      });
      return;
    }

    const filename = sanitizeFilename(song.title, song.artist);
    
    await downloadFile({
      url: song.download_url,
      filename,
      onSuccess: () => {
        toast({
          title: "Download Started",
          description: `${song.title} by ${song.artist} is downloading...`,
        });
      },
      onError: (error) => {
        toast({
          title: "Download Failed",
          description: error || "Failed to download the track. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-20 container mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Loading Tracks...</h1>
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
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
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
                          <Button 
                            onClick={() => handlePlaySong(track, index)}
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
                            onClick={() => handlePlaySong(track, index)}
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
                              className="border-green-500 text-green-400 hover:bg-green-500/10 rounded-full px-4"
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
      </div>
      
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      
      <Footer />
    </div>
  );
};

export default Downloads;
