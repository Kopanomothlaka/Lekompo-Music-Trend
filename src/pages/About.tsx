import React from 'react';
import { ArrowLeft, Music, Users, Globe, Heart, Award, BookOpen, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20 pb-32">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <div className="mb-8">
            <Button 
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">
              About Lekompo Groove Hub
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              {/* Mission Section */}
              <section className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Our Mission
                  </h2>
                  <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    Lekompo Groove Hub is dedicated to preserving, promoting, and celebrating the rich tapestry of African music. 
                    We serve as a bridge between traditional rhythms and modern interpretations, connecting artists with audiences worldwide.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center p-6 bg-gray-800/30 rounded-lg">
                    <Music className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Preserve</h3>
                    <p className="text-gray-300">
                      Documenting and archiving traditional African music forms for future generations
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gray-800/30 rounded-lg">
                    <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Connect</h3>
                    <p className="text-gray-300">
                      Building bridges between African artists and global audiences
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gray-800/30 rounded-lg">
                    <Globe className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Promote</h3>
                    <p className="text-gray-300">
                      Showcasing contemporary African music to the world stage
                    </p>
                  </div>
                </div>
              </section>

              {/* African Music Heritage Section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  The Rich Heritage of African Music
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">A Legacy of Rhythm and Storytelling</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      African music is more than just entertainment—it's a living history, a form of communication, 
                      and a spiritual connection to ancestors. From the ancient drum circles of West Africa to the 
                      contemporary Afrobeat movement, African music has influenced global culture for centuries.
                    </p>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Traditional African music serves multiple purposes: it accompanies ceremonies, tells stories, 
                      preserves history, and brings communities together. The complex polyrhythms, call-and-response 
                      patterns, and use of indigenous instruments create a unique musical language that speaks to 
                      the soul.
                    </p>
                    <div className="flex items-center text-green-400 font-semibold">
                      <Heart className="mr-2 h-5 w-5" />
                      <span>Celebrating 5000+ years of musical tradition</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 p-8 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-4">Key Elements of African Music</h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span><strong>Polyrhythms:</strong> Multiple rhythms played simultaneously</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span><strong>Call and Response:</strong> Interactive musical dialogue</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span><strong>Percussion:</strong> Drums as the heartbeat of the music</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span><strong>Oral Tradition:</strong> Music as a vehicle for storytelling</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span><strong>Community:</strong> Music as a unifying force</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Modern African Music Section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Contemporary African Music Revolution
                </h2>
                
                <div className="bg-gray-800/30 p-8 rounded-lg mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">From Traditional Roots to Global Beats</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Today's African music scene is experiencing an unprecedented renaissance. Artists are blending 
                    traditional elements with modern production techniques, creating innovative sounds that resonate 
                    with audiences worldwide. From Afrobeats to Amapiano, African music is dominating global charts 
                    and influencing international artists.
                  </p>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    The digital age has democratized music production and distribution, allowing African artists 
                    to reach global audiences directly. Social media platforms, streaming services, and digital 
                    marketplaces have created new opportunities for African musicians to showcase their talent 
                    and build international fan bases.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gray-800/20 rounded-lg">
                    <Award className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">Afrobeats</h4>
                    <p className="text-sm text-gray-400">Modern fusion of African rhythms and Western pop</p>
                  </div>
                  <div className="text-center p-6 bg-gray-800/20 rounded-lg">
                    <Music className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">Amapiano</h4>
                    <p className="text-sm text-gray-400">South African house music with deep basslines</p>
                  </div>
                  <div className="text-center p-6 bg-gray-800/20 rounded-lg">
                    <Globe className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">Afro-Fusion</h4>
                    <p className="text-sm text-gray-400">Blending traditional African music with various genres</p>
                  </div>
                  <div className="text-center p-6 bg-gray-800/20 rounded-lg">
                    <Users className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">Gospel</h4>
                    <p className="text-sm text-gray-400">Spiritual music with African cultural influences</p>
                  </div>
                </div>
              </section>

              {/* Educational Content Section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Educational Resources & Cultural Insights
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Learning African Music History</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Understanding African music requires exploring its historical context, cultural significance, 
                      and social functions. Each region of Africa has developed unique musical traditions that 
                      reflect local customs, beliefs, and ways of life.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <BookOpen className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-1">Historical Context</h4>
                          <p className="text-gray-400 text-sm">
                            Explore how African music evolved through colonization, independence movements, and globalization
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-1">Cultural Significance</h4>
                          <p className="text-gray-400 text-sm">
                            Understand the role of music in ceremonies, rituals, and daily life across African cultures
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-1">Regional Variations</h4>
                          <p className="text-gray-400 text-sm">
                            Discover the diverse musical traditions from West, East, Central, and Southern Africa
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-4">Featured Educational Content</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <span>Traditional African Instruments Guide</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <span>History of African Drumming Traditions</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <span>Modern African Music Production Techniques</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <span>African Music in Global Popular Culture</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <span>Preserving Indigenous Musical Traditions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Community Section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Building a Global African Music Community
                </h2>
                
                <div className="text-center mb-8">
                  <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    Lekompo Groove Hub is more than just a music platform—it's a community of artists, 
                    music lovers, and cultural enthusiasts who share a passion for African music. We believe 
                    in the power of music to unite people across borders and cultures.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Artists</h3>
                    <p className="text-gray-300">
                      Supporting emerging and established African musicians with promotion and distribution
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Fans</h3>
                    <p className="text-gray-300">
                      Connecting music lovers with authentic African sounds and cultural experiences
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Culture</h3>
                    <p className="text-gray-300">
                      Preserving and promoting African cultural heritage through music education
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Join Our Mission
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Whether you're an artist looking to share your music, a fan seeking authentic African sounds, 
                  or a cultural enthusiast wanting to learn more, we welcome you to our community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/downloads')}
                    className="spotify-green hover:scale-105 text-black font-semibold px-8 py-3 rounded-full"
                  >
                    Explore Music
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/news')}
                    className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-3 rounded-full font-semibold"
                  >
                    Read News
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About; 