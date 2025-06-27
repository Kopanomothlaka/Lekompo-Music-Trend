import React from 'react';
import { ArrowLeft, Music, Users, Award, Globe } from 'lucide-react';
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

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">
              About Lekompo Groove Hub
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  Lekompo Groove Hub was born from a passion for music and a desire to create a platform 
                  where artists and music lovers could connect, discover, and share the rich cultural 
                  heritage of African music. Founded in 2024, we've been dedicated to promoting authentic 
                  African sounds and providing a space for emerging and established artists to showcase 
                  their talent.
                </p>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  Our platform serves as a bridge between traditional African music and modern digital 
                  distribution, ensuring that the vibrant rhythms and melodies of our continent reach 
                  audiences worldwide while preserving their cultural significance.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <Music className="h-12 w-12 text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Promote African Music</h3>
                    <p className="text-gray-300">
                      We're committed to showcasing the diverse and rich musical traditions of Africa, 
                      from traditional rhythms to contemporary fusion sounds.
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <Users className="h-12 w-12 text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Support Artists</h3>
                    <p className="text-gray-300">
                      We provide a platform for both emerging and established artists to reach global 
                      audiences and build sustainable careers in music.
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <Award className="h-12 w-12 text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Cultural Preservation</h3>
                    <p className="text-gray-300">
                      We work to preserve and promote the cultural heritage embedded in African music 
                      for future generations.
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <Globe className="h-12 w-12 text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Global Connection</h3>
                    <p className="text-gray-300">
                      We connect music lovers worldwide with authentic African sounds, fostering 
                      cross-cultural understanding and appreciation.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">What We Offer</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-bold text-white mb-2">Music Downloads</h3>
                    <p className="text-gray-300">
                      High-quality downloads of African music tracks, from traditional to contemporary genres.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-bold text-white mb-2">News & Updates</h3>
                    <p className="text-gray-300">
                      Latest news about African music, artist interviews, and industry insights.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-bold text-white mb-2">Video Content</h3>
                    <p className="text-gray-300">
                      Music videos, live performances, and behind-the-scenes content from African artists.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-bold text-white mb-2">Artist Profiles</h3>
                    <p className="text-gray-300">
                      Detailed profiles of African musicians, their stories, and their contributions to music.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2">Authenticity</h3>
                    <p className="text-gray-300">
                      We believe in promoting genuine African music that reflects the true spirit 
                      and culture of our continent.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2">Inclusivity</h3>
                    <p className="text-gray-300">
                      We welcome all artists and music lovers, regardless of background, to celebrate 
                      the diversity of African music.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2">Innovation</h3>
                    <p className="text-gray-300">
                      We embrace modern technology to bring traditional African music to global audiences 
                      while preserving its essence.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
                <div className="bg-gray-900/50 p-8 rounded-lg">
                  <p className="text-gray-300 mb-4">
                    We'd love to hear from you! Whether you're an artist looking to showcase your music, 
                    a music lover with questions, or a potential partner, we're here to help.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">General Inquiries</h3>
                      <p className="text-gray-300">info@lekompo.com</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Artist Submissions</h3>
                      <p className="text-gray-300">artists@lekompo.com</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Support</h3>
                      <p className="text-gray-300">support@lekompo.com</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Business</h3>
                      <p className="text-gray-300">business@lekompo.com</p>
                    </div>
                  </div>
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