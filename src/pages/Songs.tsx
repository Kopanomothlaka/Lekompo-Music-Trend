import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Play, Heart, Download, Calendar, User, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
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

const Songs = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: songs = [], isLoading } = useQuery({
    queryKey: ['all-songs'],
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
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleDownload = async (song: Song) => {
    if (!song.download_url) return;
    
    try {
      // For mobile devices, use a simpler download approach
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Direct download link for mobile - faster and more reliable
        const link = document.createElement('a');
        link.href = song.download_url;
        link.download = `${song.title.replace(/[^a-z0-9]/gi, '_')}_by_${song.artist.replace(/[^a-z0-9]/gi, '_')}.mp3`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Desktop approach with blob for better file naming
        const response = await fetch(song.download_url);
        if (!response.ok) {
          throw new Error(`Failed to download: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        const safeTitle = song.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const safeArtist = song.artist.replace(/[^a-z0-9]/gi, '_').toLowerCase();
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
      window.open(song.download_url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-20 container mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Loading Songs...</h1>
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
        <div className="container mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              All Songs
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Discover and play all tracks from Lekompo's collection
            </p>
          </div>

          {songs.length === 0 ? (
            <div className="text-center">
              <p className="text-xl text-gray-400">No songs available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {songs.map((song, index) => (
                <Card 
                  key={song.id} 
                  className="spotify-card group cursor-pointer animate-slide-up border-0 overflow-hidden"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <div className="aspect-square w-full overflow-hidden">
                        <img 
                          src={song.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"} 
                          alt={song.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <Button 
                          onClick={() => handlePlaySong(song, index)}
                          className="spotify-green rounded-full w-14 h-14 p-0 shadow-2xl"
                        >
                          {currentSong?.id === song.id && isPlaying ? (
                            <Pause className="h-5 w-5 text-black" fill="currentColor" />
                          ) : (
                            <Play className="h-5 w-5 text-black ml-0.5" fill="currentColor" />
                          )}
                        </Button>
                      </div>
                      
                      {/* Heart icon */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Heart className="h-5 w-5 text-white hover:text-green-400 cursor-pointer transition-colors" />
                      </div>
                      
                      {/* Play count */}
                      <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                        <span className="text-white text-xs font-medium">{song.plays?.toLocaleString() || '0'} plays</span>
                      </div>

                      {/* Now playing indicator */}
                      {currentSong?.id === song.id && (
                        <div className="absolute top-3 left-3 bg-green-500 px-2 py-1 rounded-full">
                          <span className="text-black text-xs font-bold">NOW PLAYING</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 bg-gray-900/80">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300 truncate">
                        {song.title}
                      </h3>
                      
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <User className="h-3 w-3 mr-1" />
                        <span className="truncate">{song.artist}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{song.release_date ? new Date(song.release_date).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <span className="font-medium">{song.duration || 'N/A'}</span>
                      </div>
                      
                      {song.genre && song.genre.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {song.genre.slice(0, 2).map((g) => (
                            <span 
                              key={g}
                              className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full font-medium"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handlePlaySong(song, index)}
                          className="flex-1 spotify-green hover:scale-105 text-black font-semibold rounded-full transition-all duration-300 text-xs py-2"
                        >
                          {currentSong?.id === song.id && isPlaying ? (
                            <>
                              <Pause className="mr-1 h-3 w-3" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="mr-1 h-3 w-3" />
                              Play
                            </>
                          )}
                        </Button>
                        
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(song)}
                          className="border-green-500 text-green-400 hover:bg-green-500/10 rounded-full p-2"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
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

export default Songs;
