
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TracksSection from "@/components/TracksSection";
import NewsSection from "@/components/NewsSection";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";

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

const Index = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePlayPause = (song?: Song) => {
    if (song && song.id !== currentSong?.id) {
      setCurrentSong(song);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    // For now, just pause since we don't have a playlist context here
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    // For now, just pause since we don't have a playlist context here
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <TracksSection 
        onSongSelect={handleSongSelect}
        onPlayPause={handlePlayPause}
        currentSong={currentSong}
        isPlaying={isPlaying}
      />
      <NewsSection />
      <VideoSection />
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

export default Index;
