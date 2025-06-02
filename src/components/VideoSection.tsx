
import { Youtube, Play, Eye, Clock, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const videos = [
  {
    id: 1,
    title: "Lekompo Masterclass: Traditional Techniques",
    channel: "Lekompo Academy",
    views: "125K",
    duration: "12:34",
    likes: "8.2K",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=340&fit=crop",
    uploadDate: "3 days ago",
    featured: true
  },
  {
    id: 2,
    title: "Epic Lekompo Performance at World Music Festival",
    channel: "Festival Live",
    views: "89K",
    duration: "8:45",
    likes: "5.1K",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=340&fit=crop",
    uploadDate: "1 week ago",
    featured: false
  },
  {
    id: 3,
    title: "Behind the Scenes: Making Modern Lekompo",
    channel: "Studio Sessions",
    views: "67K",
    duration: "15:22",
    likes: "4.3K",
    thumbnail: "https://images.unsplash.com/photo-1571974599782-87624638275f?w=600&h=340&fit=crop",
    uploadDate: "2 weeks ago",
    featured: false
  },
  {
    id: 4,
    title: "Lekompo Meditation & Relaxation Mix",
    channel: "Peaceful Sounds",
    views: "203K",
    duration: "45:18",
    likes: "12.7K",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=340&fit=crop",
    uploadDate: "1 month ago",
    featured: false
  },
  {
    id: 5,
    title: "Lekompo Dance Tutorial for Beginners",
    channel: "Dance Academy",
    views: "156K",
    duration: "18:42",
    likes: "9.8K",
    thumbnail: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=600&h=340&fit=crop",
    uploadDate: "2 weeks ago",
    featured: false
  },
  {
    id: 6,
    title: "Live Lekompo Jam Session",
    channel: "Midnight Sessions",
    views: "92K",
    duration: "23:15",
    likes: "6.4K",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=340&fit=crop",
    uploadDate: "1 week ago",
    featured: false
  }
];

const VideoSection = () => {
  const featuredVideo = videos.find(video => video.featured);
  const regularVideos = videos.filter(video => !video.featured);

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
        
        {/* Featured Video */}
        {featuredVideo && (
          <div className="mb-16">
            <Card className="spotify-card border-0 overflow-hidden cursor-pointer group animate-slide-up">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden h-64 lg:h-auto">
                    <img 
                      src={featuredVideo.thumbnail} 
                      alt={featuredVideo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
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
                      {featuredVideo.duration}
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center bg-gray-900/80">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                      {featuredVideo.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-400 mb-4">
                      <Youtube className="h-5 w-5 text-red-500 mr-2" />
                      <span className="font-medium">{featuredVideo.channel}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Eye className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-lg font-bold text-white">{featuredVideo.views}</span>
                        </div>
                        <span className="text-xs text-gray-400">Views</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <ThumbsUp className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-lg font-bold text-white">{featuredVideo.likes}</span>
                        </div>
                        <span className="text-xs text-gray-400">Likes</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-lg font-bold text-white">{featuredVideo.duration}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularVideos.map((video, index) => (
            <Card 
              key={video.id}
              className="spotify-card border-0 overflow-hidden cursor-pointer group animate-slide-up"
              style={{animationDelay: `${index * 0.1 + 0.2}s`}}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300">
                      <Play className="h-5 w-5 text-white ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/90 text-white text-xs px-2 py-1 rounded font-medium">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-5 bg-gray-900/80">
                  <h3 className="text-base font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <Youtube className="h-4 w-4 text-red-500 mr-2" />
                    <span>{video.channel}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{video.views} views</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      <span>{video.likes}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {video.uploadDate}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center mx-auto font-semibold">
            <Youtube className="mr-2 h-5 w-5" />
            Visit Our Channel
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
