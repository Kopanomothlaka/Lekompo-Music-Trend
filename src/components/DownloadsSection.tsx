
import { Download, Calendar, User, Play, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tracks = [
  {
    id: 1,
    title: "Urban Lekompo Beats",
    artist: "DJ Lekompo Master",
    releaseDate: "2024-01-15",
    genre: ["Lekompo", "Electronic", "World"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    duration: "4:32",
    plays: "2.3M"
  },
  {
    id: 2,
    title: "Traditional Fusion",
    artist: "Lekompo Collective",
    releaseDate: "2024-01-10",
    genre: ["Lekompo", "Traditional", "Fusion"],
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
    duration: "3:45",
    plays: "1.8M"
  },
  {
    id: 3,
    title: "Rhythm of the Night",
    artist: "Midnight Lekompo",
    releaseDate: "2024-01-05",
    genre: ["Lekompo", "Ambient", "Chill"],
    image: "https://images.unsplash.com/photo-1571974599782-87624638275f?w=400&h=400&fit=crop",
    duration: "5:18",
    plays: "3.1M"
  },
  {
    id: 4,
    title: "Ocean Waves Lekompo",
    artist: "Natural Sounds Co.",
    releaseDate: "2024-01-01",
    genre: ["Lekompo", "Nature", "Meditation"],
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    duration: "6:12",
    plays: "4.2M"
  },
  {
    id: 5,
    title: "Electric Pulse",
    artist: "Neon Lekompo",
    releaseDate: "2023-12-28",
    genre: ["Lekompo", "Electronic", "Dance"],
    image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&h=400&fit=crop",
    duration: "4:15",
    plays: "1.5M"
  },
  {
    id: 6,
    title: "Sunset Vibes",
    artist: "Chill Collective",
    releaseDate: "2023-12-20",
    genre: ["Lekompo", "Chill", "Sunset"],
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    duration: "3:58",
    plays: "2.7M"
  }
];

const DownloadsSection = () => {
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
                    src={track.image} 
                    alt={track.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
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
                    <span className="text-white text-sm font-medium">{track.plays} plays</span>
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
                      <span>{track.releaseDate}</span>
                    </div>
                    <span className="font-medium">{track.duration}</span>
                  </div>
                  
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
                  
                  <Button className="w-full spotify-green hover:scale-105 text-black font-semibold rounded-full transition-all duration-300">
                    <Download className="mr-2 h-4 w-4" />
                    Download Free
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
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
