import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
              Privacy Policy
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-300 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                <p className="text-gray-300 mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  subscribe to our newsletter, or contact us for support. This may include:
                </p>
                <ul className="text-gray-300 list-disc pl-6 mb-4">
                  <li>Name and email address</li>
                  <li>Profile information</li>
                  <li>Communication preferences</li>
                  <li>Feedback and support requests</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-300 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="text-gray-300 list-disc pl-6 mb-4">
                  <li>Provide and maintain our services</li>
                  <li>Send you updates and marketing communications</li>
                  <li>Respond to your comments and questions</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
                <p className="text-gray-300 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy or as required by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Cookies and Tracking</h2>
                <p className="text-gray-300 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website. 
                  These technologies help us:
                </p>
                <ul className="text-gray-300 list-disc pl-6 mb-4">
                  <li>Remember your preferences</li>
                  <li>Analyze website traffic</li>
                  <li>Provide personalized content</li>
                  <li>Improve our services</li>
                </ul>
                
                <h3 className="text-xl font-bold text-white mb-3 mt-6">Types of Cookies We Use:</h3>
                
                <div className="space-y-4 mb-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">Necessary Cookies</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      These cookies are essential for the website to function properly. They cannot be disabled.
                    </p>
                    <ul className="text-gray-400 text-sm list-disc pl-4">
                      <li>Session management</li>
                      <li>Security features</li>
                      <li>Basic functionality</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>
                    <ul className="text-gray-400 text-sm list-disc pl-4">
                      <li>Page views and navigation</li>
                      <li>User behavior patterns</li>
                      <li>Performance metrics</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">Marketing Cookies</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Used to track visitors across websites to display relevant and engaging advertisements.
                    </p>
                    <ul className="text-gray-400 text-sm list-disc pl-4">
                      <li>Ad personalization</li>
                      <li>Cross-site tracking</li>
                      <li>Campaign effectiveness</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">Preference Cookies</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Allow the website to remember information that changes the way it behaves or looks.
                    </p>
                    <ul className="text-gray-400 text-sm list-disc pl-4">
                      <li>Language preferences</li>
                      <li>Theme settings</li>
                      <li>Music quality settings</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">Managing Your Cookie Preferences</h3>
                <p className="text-gray-300 mb-4">
                  You can manage your cookie preferences at any time by:
                </p>
                <ul className="text-gray-300 list-disc pl-6 mb-4">
                  <li>Using our cookie consent banner</li>
                  <li>Adjusting your browser settings</li>
                  <li>Contacting us directly</li>
                </ul>
                
                <p className="text-gray-300 mb-4">
                  <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website. 
                  Necessary cookies cannot be disabled as they are essential for basic site operations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                <p className="text-gray-300 mb-4">
                  Our website may contain links to third-party websites and services. We are not responsible 
                  for the privacy practices of these third parties. We encourage you to read their privacy policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
                <p className="text-gray-300 mb-4">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                <p className="text-gray-300 mb-4">
                  You have the right to:
                </p>
                <ul className="text-gray-300 list-disc pl-6 mb-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with supervisory authorities</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
                <p className="text-gray-300 mb-4">
                  We may update this privacy policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about this privacy policy, please contact us at:
                </p>
                <p className="text-gray-300">
                  <strong>Email:</strong> privacy@lekompo.com<br />
                  <strong>Address:</strong> Lekompo Groove Hub, 233 Fox Street, Johannesburg, South Africa
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 