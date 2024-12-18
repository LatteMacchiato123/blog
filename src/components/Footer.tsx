import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <div>
      <footer className="footer bg-gradient-to-r from-slate-900 to-slate-700  p-10 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <nav>
            <h6 className="footer-title text-lg font-semibold mb-4">Category</h6>
            <ul className="space-y-2">
              <li>
                <a className="link link-hover hover:text-primary" href="/category/destinations">
                  Destinations
                </a>
              </li>
              <li>
                <a className="link link-hover hover:text-primary" href="/category/food">
                  Food
                </a>
              </li>
              <li>
                <a className="link link-hover hover:text-primary" href="/category/well-being">
                  Well-Being
                </a>
              </li>
              <li>
                <a className="link link-hover hover:text-primary" href="/category/sport">
                  Sport
                </a>
              </li>
              <li>
                <a className="link link-hover hover:text-primary" href="/category/family">
                  Family
                </a>
              </li>
              <li>
                <a className="link link-hover hover:text-primary" href="/category/lifestyle">
                  Lifestyle
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <h6 className="footer-title text-lg font-semibold mb-4">Blog</h6>
            <ul className="space-y-2">
              <li>
                <a className="link link-hover hover:text-primary" href="/about-us">
                  About Us
                </a>
              </li>
              <li>
                <a className="link link-hover hover:text-primary" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <h6 className="footer-title text-lg font-semibold mb-4">Social</h6>
            <div className="flex gap-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-primary"
              >
                <FaXTwitter size={28} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-primary"
              >
                <FaInstagram size={28} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-primary"
              >
                <FaFacebook size={28} />
              </a>
            </div>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Travelog: Travel Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
