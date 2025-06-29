import React from 'react';
import { ArrowLeft, BookOpen, Music, Users, Globe, Heart, Award, Calendar, MapPin, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Education = () => {
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
              African Music Education
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              {/* Introduction Section */}
              <section className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Discover the Rich Tapestry of African Music
                  </h2>
                  <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    Embark on a journey through the diverse and vibrant world of African music. From ancient traditions 
                    to modern innovations, explore the cultural significance, instruments, and rhythms that have shaped 
                    global music for centuries.
                  </p>
                </div>
              </section>

              {/* Historical Overview Section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Historical Overview of African Music
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Ancient Origins and Evolution</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      African music has roots that extend back thousands of years, with evidence of musical instruments 
                      and traditions dating to ancient civilizations. The continent's diverse geography and cultures 
                      have given rise to an incredibly rich musical heritage that continues to influence global music today.
                    </p>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      From the drum circles of West Africa to the vocal harmonies of South Africa, each region has 
                      developed unique musical traditions that reflect local customs, beliefs, and ways of life. 
                      These traditions have been passed down through generations, preserving cultural identity and 
                      community bonds.
                    </p>
                    <div className="flex items-center text-green-400 font-semibold">
                      <Calendar className="mr-2 h-5 w-5" />
                      <span>5000+ years of musical tradition</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 p-8 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-4">Key Historical Periods</h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span><strong>Ancient Period (3000 BCE - 500 CE):</strong> Development of early instruments and ritual music</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span><strong>Medieval Period (500-1500):</strong> Rise of griot traditions and court music</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span><strong>Colonial Period (1500-1900):</strong> Adaptation and resistance through music</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span><strong>Modern Era (1900-present):</strong> Global influence and contemporary innovation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Traditional Instruments Section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Traditional African Instruments
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  <div className="bg-gray-800/30 p-6 rounded-lg">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <Music className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Drums</h3>
                    <p className="text-gray-300 mb-4">
                      The heartbeat of African music, drums come in countless varieties including djembe, talking drums, 
                      and bata drums. Each serves specific ceremonial and communicative purposes.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Djembe - West African goblet drum</li>
                      <li>• Talking Drum - Variable pitch communication</li>
                      <li>• Bata - Sacred Yoruba drums</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/30 p-6 rounded-lg">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <Music className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">String Instruments</h3>
                    <p className="text-gray-300 mb-4">
                      From the kora to the mbira, string instruments create melodic and harmonic foundations 
                      for African music traditions.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Kora - 21-string harp-lute</li>
                      <li>• Mbira - Thumb piano</li>
                      <li>• Ngoni - Traditional lute</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/30 p-6 rounded-lg">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <Music className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Wind Instruments</h3>
                    <p className="text-gray-300 mb-4">
                      Flutes, horns, and reed instruments add melodic and atmospheric elements to African music, 
                      often used in ceremonial contexts.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Algaita - Double-reed horn</li>
                      <li>• Fulani Flute - Traditional wind instrument</li>
                      <li>• Kudu Horn - Natural horn instrument</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Regional Music Traditions Section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Regional Music Traditions
                </h2>
                
                <div className="space-y-8">
                  <div className="bg-gray-800/30 p-8 rounded-lg">
                    <h3 className="text-2xl font-bold text-white mb-6">West African Music</h3>
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          West Africa is renowned for its complex polyrhythmic traditions, particularly in countries 
                          like Mali, Senegal, and Ghana. The griot tradition of storytelling through music is central 
                          to West African culture, preserving history and cultural values through song.
                        </p>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          Key characteristics include call-and-response patterns, intricate drumming, and the use 
                          of traditional instruments like the kora and balafon. Modern West African music has given 
                          birth to genres like Afrobeats, which blend traditional elements with contemporary production.
                        </p>
                      </div>
                      <div className="bg-green-500/10 p-6 rounded-lg">
                        <h4 className="text-lg font-bold text-white mb-3">Notable Features</h4>
                        <ul className="text-gray-300 space-y-2">
                          <li>• Griot storytelling tradition</li>
                          <li>• Complex polyrhythms</li>
                          <li>• Call-and-response vocals</li>
                          <li>• Kora and balafon instruments</li>
                          <li>• Modern Afrobeats influence</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 p-8 rounded-lg">
                    <h3 className="text-2xl font-bold text-white mb-6">East African Music</h3>
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          East African music is characterized by its vocal harmonies and rhythmic complexity. 
                          Countries like Kenya, Tanzania, and Ethiopia have rich musical traditions that incorporate 
                          both indigenous and Arabic influences.
                        </p>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          Traditional East African music often features acapella singing, intricate vocal arrangements, 
                          and the use of instruments like the nyatiti (lyre) and various percussion instruments. 
                          Modern East African music includes genres like Bongo Flava and contemporary gospel.
                        </p>
                      </div>
                      <div className="bg-green-500/10 p-6 rounded-lg">
                        <h4 className="text-lg font-bold text-white mb-3">Notable Features</h4>
                        <ul className="text-gray-300 space-y-2">
                          <li>• Complex vocal harmonies</li>
                          <li>• Acapella traditions</li>
                          <li>• Arabic musical influences</li>
                          <li>• Nyatiti and percussion</li>
                          <li>• Bongo Flava genre</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 p-8 rounded-lg">
                    <h3 className="text-2xl font-bold text-white mb-6">Southern African Music</h3>
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          Southern Africa is home to diverse musical traditions, from the mbube vocal harmonies 
                          of South Africa to the marimba music of Zimbabwe. The region has produced globally 
                          influential genres like mbaqanga, kwaito, and amapiano.
                        </p>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          Traditional Southern African music emphasizes vocal performance, often featuring 
                          complex harmonies and call-and-response patterns. The mbira (thumb piano) is a 
                          central instrument in Zimbabwean music, while South Africa is known for its 
                          choral traditions and township music.
                        </p>
                      </div>
                      <div className="bg-green-500/10 p-6 rounded-lg">
                        <h4 className="text-lg font-bold text-white mb-3">Notable Features</h4>
                        <ul className="text-gray-300 space-y-2">
                          <li>• Mbube vocal harmonies</li>
                          <li>• Marimba and mbira</li>
                          <li>• Township music</li>
                          <li>• Amapiano and kwaito</li>
                          <li>• Choral traditions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cultural Significance Section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Cultural Significance of African Music
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Music as Cultural Expression</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      African music serves as a powerful medium for cultural expression, storytelling, and 
                      community building. It's not merely entertainment but a vital part of daily life, 
                      ceremonies, and social interactions.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Users className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-1">Community Bonding</h4>
                          <p className="text-gray-400 text-sm">
                            Music brings communities together, strengthening social bonds and cultural identity
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <BookOpen className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-1">Oral History</h4>
                          <p className="text-gray-400 text-sm">
                            Preserves cultural history and traditions through storytelling and song
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Heart className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-1">Spiritual Connection</h4>
                          <p className="text-gray-400 text-sm">
                            Facilitates spiritual experiences and connections with ancestors
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-4">Music in Daily Life</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <span>Birth celebrations and naming ceremonies</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <span>Coming-of-age rituals and initiations</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <span>Wedding ceremonies and celebrations</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <span>Funeral rites and memorial services</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <span>Harvest festivals and agricultural celebrations</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <span>Healing ceremonies and traditional medicine</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Modern Influence Section */}
              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  African Music's Global Influence
                </h2>
                
                <div className="bg-gray-800/30 p-8 rounded-lg mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Shaping World Music</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    African music has profoundly influenced global music traditions, from jazz and blues to 
                    rock, pop, and electronic music. The rhythmic complexity, melodic patterns, and cultural 
                    depth of African music continue to inspire artists worldwide.
                  </p>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    The transatlantic slave trade brought African musical traditions to the Americas, where 
                    they evolved into new forms like jazz, blues, and gospel. Today, contemporary African 
                    artists are leading global music trends, with genres like Afrobeats achieving worldwide popularity.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gray-800/20 rounded-lg">
                    <Award className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">Jazz & Blues</h4>
                    <p className="text-sm text-gray-400">African rhythmic and melodic foundations</p>
                  </div>
                  <div className="text-center p-6 bg-gray-800/20 rounded-lg">
                    <Music className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">Rock & Pop</h4>
                    <p className="text-sm text-gray-400">Rhythmic patterns and vocal styles</p>
                  </div>
                  <div className="text-center p-6 bg-gray-800/20 rounded-lg">
                    <Globe className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">Electronic</h4>
                    <p className="text-sm text-gray-400">Sampling and rhythmic programming</p>
                  </div>
                  <div className="text-center p-6 bg-gray-800/20 rounded-lg">
                    <Users className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">Contemporary</h4>
                    <p className="text-sm text-gray-400">Modern fusion and innovation</p>
                  </div>
                </div>
              </section>

              {/* Call to Action Section */}
              <section className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Continue Your Musical Journey
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Explore our collection of African music, read the latest news, and discover the artists 
                  who are shaping the future of African music.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/downloads')}
                    className="spotify-green hover:scale-105 text-black font-semibold px-8 py-3 rounded-full"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Listen to Music
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/news')}
                    className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-3 rounded-full font-semibold"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
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

export default Education; 