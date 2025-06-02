
import { Download, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tracks = [
  {
    id: 1,
    title: "Urban Lekompo Beats",
    artist: "DJ Lekompo Master",
    releaseDate: "2024-01-15",
    genre: ["Lekompo", "Electronic", "World"],
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
    duration: "4:32"
  },
  {
    id: 2,
    title: "Traditional Fusion",
    artist: "Lekompo Collective",
    releaseDate: "2024-01-10",
    genre: ["Lekompo", "Traditional", "Fusion"],
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop",
    duration: "3:45"
  },
  {
    id: 3,
    title: "Rhythm of the Night",
    artist: "Midnight Lekompo",
    releaseDate: "2024-01-05",
    genre: ["Lekompo", "Ambient", "Chill"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    duration: "5:18"
  },
  {
    id: 4,
    title: "Ocean Waves Lekompo",
    artist: "Natural Sounds Co.",
    releaseDate: "2024-01-01",
    genre: ["Lekompo", "Nature", "Meditation"],
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop",
    duration: "6:12"
  }
];

const DownloadsSection = () => {
  return (
    <section id="downloads" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Free Downloads
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our collection of premium Lekompo tracks, available for free download
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track, index) => (
            <Card 
              key={track.id} 
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl group animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={track.image} 
                    alt={track.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 truncate">
                    {track.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-400 text-sm mb-2">
                    <User className="h-4 w-4 mr-1" />
                    <span className="truncate">{track.artist}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{track.releaseDate}</span>
                    <span className="ml-auto">{track.duration}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {track.genre.map((g) => (
                      <span 
                        key={g}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
