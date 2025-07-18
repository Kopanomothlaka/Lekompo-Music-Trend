import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Download, Calendar, User } from 'lucide-react';

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

const Tracks = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

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

  const updatePlayCount = useMutation({
    mutationFn: async (songId: string) => {
      // For now, directly update the plays count until the SQL function is created
      const song = songs.find(s => s.id === songId);
      const { error } = await supabase
        .from('songs')
        .update({ plays: (song?.plays || 0) + 1 })
        .eq('id', songId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-songs'] });
      queryClient.invalidateQueries({ queryKey: ['featured-songs'] });
    }
  });

  const handlePlayPause = (song?: Song) => {
    if (song && song.id !== currentSong?.id) {
      setCurrentSong(song);
      setIsPlaying(true);
      updatePlayCount.mutate(song.id);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (!currentSong || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!currentSong || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
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

  // Filter songs based on search query
  const filteredSongs = songs.filter((song: Song) => {
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      (song.genre && song.genre.join(' ').toLowerCase().includes(query))
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-20 pb-32">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">Loading Tracks...</h1>
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">All Tracks</h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Discover and stream all available tracks from Lekompo
            </p>
          </div>

          {/* Search Input */}
          <div className="flex justify-center mb-10">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by title, artist, or genre..."
              className="w-full max-w-md px-5 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>

          {filteredSongs.length === 0 ? (
            <div className="text-center">
              <p className="text-xl text-gray-400">No tracks found for your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSongs.map((song) => (
                <Card 
                  key={song.id} 
                  className="spotify-card group cursor-pointer border-0 overflow-hidden bg-gray-900/50"
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
                          onClick={() => handlePlayPause(song)}
                          className="spotify-green rounded-full w-16 h-16 p-0 shadow-2xl"
                        >
                          {currentSong?.id === song.id && isPlaying ? (
                            <Pause className="h-6 w-6 text-black" fill="currentColor" />
                          ) : (
                            <Play className="h-6 w-6 text-black ml-1" fill="currentColor" />
                          )}
                        </Button>
                      </div>
                      
                      {/* Play count */}
                      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-sm font-medium">
                          {song.plays?.toLocaleString() || '0'} plays
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300 truncate">
                        {song.title}
                      </h3>
                      
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <User className="h-4 w-4 mr-2" />
                        <span className="truncate">{song.artist}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{song.release_date ? new Date(song.release_date).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <span className="font-medium">{song.duration || 'N/A'}</span>
                      </div>
                      
                      {song.genre && song.genre.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {song.genre.map((g) => (
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
                          onClick={() => handlePlayPause(song)}
                          className="flex-1 spotify-green hover:scale-105 text-black font-semibold rounded-full transition-all duration-300"
                        >
                          {currentSong?.id === song.id && isPlaying ? (
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
                        
                        {song.download_url && (
                          <Button 
                            variant="outline"
                            onClick={() => handleDownload(song)}
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
        </div>
      </div>
      
      <MusicPlayer 
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={() => handlePlayPause()}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      
      <Footer />
    </div>
  );
};

export default Tracks;
