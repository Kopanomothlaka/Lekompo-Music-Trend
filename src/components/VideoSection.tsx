
import { Youtube, Play, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const videos = [
  {
    id: 1,
    title: "Lekompo Masterclass: Traditional Techniques",
    channel: "Lekompo Academy",
    views: "125K",
    duration: "12:34",
    thumbnail: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=300&fit=crop",
    uploadDate: "3 days ago"
  },
  {
    id: 2,
    title: "Epic Lekompo Performance at World Music Festival",
    channel: "Festival Live",
    views: "89K",
    duration: "8:45",
    thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=300&fit=crop",
    uploadDate: "1 week ago"
  },
  {
    id: 3,
    title: "Behind the Scenes: Making Modern Lekompo",
    channel: "Studio Sessions",
    views: "67K",
    duration: "15:22",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=300&fit=crop",
    uploadDate: "2 weeks ago"
  },
  {
    id: 4,
    title: "Lekompo Meditation & Relaxation Mix",
    channel: "Peaceful Sounds",
    views: "203K",
    duration: "45:18",
    thumbnail: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=300&fit=crop",
    uploadDate: "1 month ago"
  }
];

const VideoSection = () => {
  return (
    <section id="videos" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Youtube className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Latest Videos
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch the latest Lekompo performances, tutorials, and behind-the-scenes content
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <Card 
              key={video.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl group animate-slide-up cursor-pointer"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs mb-2">
                    {video.channel}
                  </p>
                  
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{video.views} views</span>
                    </div>
                    <span>{video.uploadDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center mx-auto">
            <Youtube className="mr-2 h-5 w-5" />
            Visit Our Channel
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
