
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const newsItems = [
  {
    id: 1,
    title: "Lekompo Festival 2024 Announces Stellar Lineup",
    excerpt: "Get ready for the biggest Lekompo celebration of the year featuring international artists and traditional masters.",
    date: "2024-01-20",
    category: "Events",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=300&fit=crop"
  },
  {
    id: 2,
    title: "New Documentary Explores Lekompo Origins",
    excerpt: "A groundbreaking film traces the roots of Lekompo music from ancient traditions to modern interpretations.",
    date: "2024-01-18",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Rising Artist Breaks Streaming Records",
    excerpt: "Young Lekompo producer achieves unprecedented success with innovative fusion techniques.",
    date: "2024-01-15",
    category: "Artists",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=300&fit=crop"
  }
];

const NewsSection = () => {
  return (
    <section id="news" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Latest News
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest happenings in the Lekompo world
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Card 
              key={item.id}
              className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl group animate-slide-up cursor-pointer"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{item.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  <div className="flex items-center text-purple-400 font-medium group-hover:text-purple-300 transition-colors duration-300">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
