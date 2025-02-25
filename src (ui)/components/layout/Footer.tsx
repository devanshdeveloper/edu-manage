import React from 'react';
import { Link } from 'react-router-dom';
import { School, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: 'Features', path: '/features' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Contact', path: '/contact' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Careers', path: '/careers' },
    ],
    resources: [
      { name: 'Documentation', path: '/docs' },
      { name: 'Support', path: '/support' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
  };

  return (
    <footer className="bg-background border-t border-divider">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-1 rounded-lg">
                <School className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">EduManage</span>
            </Link>
            <p className="text-default-500 mb-4 max-w-sm">
              Empowering educational institutions with comprehensive management solutions for a smarter, more efficient learning environment.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-default-500">
                <Mail className="w-4 h-4" />
                <span>contact@edumanage.com</span>
              </div>
              <div className="flex items-center gap-2 text-default-500">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-default-500">
                <MapPin className="w-4 h-4" />
                <span>123 Education St, Knowledge City</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-default-500 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-default-500 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-default-500 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-divider">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-default-500 text-sm">
              © {currentYear} EduManage. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                to="/terms"
                className="text-default-500 hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-default-500 hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}