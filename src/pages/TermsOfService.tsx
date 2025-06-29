import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfService = () => {
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
              Terms of Service
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-300 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300 mb-4">
                  By accessing and using Lekompo Groove Hub ("the Website"), you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Content Ownership and Licensing</h2>
                <p className="text-gray-300 mb-4">
                  <strong>Original Content:</strong> All original content on this website, including but not limited to articles, 
                  educational materials, cultural insights, and website design, is owned by Lekompo Groove Hub and is protected 
                  by copyright laws.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Music Content:</strong> Music tracks available for streaming and download are provided by artists 
                  who have granted us permission to distribute their work. We maintain agreements with artists and content 
                  creators to ensure proper licensing and distribution rights.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Third-Party Content:</strong> Some content may be provided by third parties. We make reasonable 
                  efforts to ensure all content is properly licensed and attributed.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Use License</h2>
                <p className="text-gray-300 mb-4">
                  Permission is granted to temporarily access the materials on Lekompo Groove Hub's website for personal, 
                  non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="text-gray-300 list-disc pl-6 mb-4">
                  <li>Modify or copy the materials for commercial purposes</li>
                  <li>Use the materials for any public display or commercial purpose</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  <li>Use the materials in any way that violates copyright laws or intellectual property rights</li>
                </ul>
                <p className="text-gray-300 mb-4">
                  <strong>Music Downloads:</strong> Music downloads are provided for personal use only. Commercial use, 
                  redistribution, or public performance without proper licensing is prohibited.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Copyright and Intellectual Property</h2>
                <p className="text-gray-300 mb-4">
                  <strong>Respect for Copyright:</strong> We respect the intellectual property rights of others and expect 
                  our users to do the same. All content on this website is either owned by us, licensed to us, or used 
                  with permission.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>DMCA Compliance:</strong> If you believe that your copyrighted work has been used on our website 
                  in a way that constitutes copyright infringement, please contact us with the following information:
                </p>
                <ul className="text-gray-300 list-disc pl-6 mb-4">
                  <li>A description of the copyrighted work that you claim has been infringed</li>
                  <li>A description of where the material is located on our website</li>
                  <li>Your contact information (name, address, telephone number, email address)</li>
                  <li>A statement that you have a good faith belief that the use is not authorized</li>
                  <li>A statement that the information is accurate and that you are the copyright owner or authorized to act on their behalf</li>
                </ul>
                <p className="text-gray-300 mb-4">
                  <strong>Contact for Copyright Issues:</strong> copyright@lekompo.com
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. User-Generated Content</h2>
                <p className="text-gray-300 mb-4">
                  Users may have the opportunity to submit content, comments, or feedback. By submitting content, you:
                </p>
                <ul className="text-gray-300 list-disc pl-6 mb-4">
                  <li>Grant us a non-exclusive, royalty-free license to use, modify, and display your content</li>
                  <li>Warrant that you own or have the right to submit the content</li>
                  <li>Agree not to submit content that violates any laws or third-party rights</li>
                  <li>Understand that we may remove content at our discretion</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Disclaimer</h2>
                <p className="text-gray-300 mb-4">
                  The materials on Lekompo Groove Hub's website are provided on an 'as is' basis. Lekompo Groove Hub 
                  makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
                  including without limitation, implied warranties or conditions of merchantability, fitness for a 
                  particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Music Disclaimer:</strong> While we strive to ensure all music content is properly licensed, 
                  we cannot guarantee that all content is free from copyright claims. Users download and use music at their own risk.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Limitations</h2>
                <p className="text-gray-300 mb-4">
                  In no event shall Lekompo Groove Hub or its suppliers be liable for any damages (including, without limitation, 
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                  to use the materials on the website, even if Lekompo Groove Hub or a Lekompo Groove Hub authorized 
                  representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Accuracy of Materials</h2>
                <p className="text-gray-300 mb-4">
                  The materials appearing on Lekompo Groove Hub's website could include technical, typographical, or 
                  photographic errors. Lekompo Groove Hub does not warrant that any of the materials on its website 
                  are accurate, complete, or current. Lekompo Groove Hub may make changes to the materials contained 
                  on its website at any time without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Links</h2>
                <p className="text-gray-300 mb-4">
                  Lekompo Groove Hub has not reviewed all of the sites linked to its website and is not responsible 
                  for the contents of any such linked site. The inclusion of any link does not imply endorsement by 
                  Lekompo Groove Hub of the site. Use of any such linked website is at the user's own risk.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Modifications</h2>
                <p className="text-gray-300 mb-4">
                  Lekompo Groove Hub may revise these terms of service for its website at any time without notice. 
                  By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
                <p className="text-gray-300 mb-4">
                  These terms and conditions are governed by and construed in accordance with the laws of South Africa 
                  and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-gray-300">
                  <strong>Email:</strong> legal@lekompo.com<br />
                  <strong>Address:</strong> Lekompo Groove Hub, 233 Fox Street, Johannesburg, South Africa<br />
                  <strong>Phone:</strong> +27 11 123 4567
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

export default TermsOfService; 