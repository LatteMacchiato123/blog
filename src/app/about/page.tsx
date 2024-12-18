import { AboutHero } from "@/components/hero/AboutHero";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const metadata = {
  title: 'About Us | Travelog',
  description: 'About us of Travelog ',
};

export default function Page() {
  return (
    <div>
           <AboutHero />
      <div>
        {/* Blog History Section */}
        <div className="max-w-screen-xl mx-auto text-center p-10 mt-10">
          <h2 className="text-5xl font-bold mb-12 text-gradient bg-gradient-to-r from-neutral via-accent to-base-content text-transparent bg-clip-text text-left">
            OUR BLOG HISTORY
          </h2>
          <hr className="border-primary border-t-2 w-1/3 mb-12" />
          <p className="text-lg leading-relaxed text-left">
            Our blog was born out of a passion for storytelling and a desire to
            share our adventures with the world. Starting as a small personal
            journal, it has now grown into a platform where we connect with a
            global audience, sharing insights, experiences, and inspiration from
            our journeys.
          </p>
          <p className="text-lg leading-relaxed text-left mt-4">
            Over the years, we have expanded our team, collaborated with other
            travel enthusiasts, and continuously evolved our content to bring
            fresh and exciting stories to our readers. From exploring hidden
            gems to uncovering unique cultural experiences, our blog is a
            testament to our love for travel and discovery.
          </p>
          <p className="text-lg leading-relaxed text-left mt-4">
            We are committed to inspiring others to explore the world, embrace
            new experiences, and create their own unforgettable memories. Thank
            you for being a part of our journey.
          </p>
        </div>

        {/* Team Section */}
        <div className="max-w-screen-xl mx-auto text-center p-10">
          <h2 className="text-5xl font-bold mb-12 text-gradient bg-gradient-to-r from-neutral via-accent to-base-content text-transparent bg-clip-text text-left">
            OUR TEAM
          </h2>
          <hr className="border-primary border-t-2 w-1/3 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Team Member 1 */}
            <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg">
              <div className="card-body">
                <div className="flex items-center justify-center mb-6">
                  <Image
                    src="/team/john-smith.jpg"
                    alt="John Smith"
                    width={108}
                    height={108}
                    className="rounded-full shadow-md"
                  />
                  <div className="text-left ml-4">
                    <h3 className="text-2xl font-semibold">John Smith</h3>
                    <p className="text-lg text-gray-600">Author</p>
                  </div>
                </div>
                <p className="text-lg text-left leading-relaxed italic">
                  &quot;He is an avid traveler, storyteller, and the creator
                  behind this blog. With a passion for uncovering hidden gems
                  and exploring cultures around the world.&quot;
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg">
              <div className="card-body">
                <div className="flex items-center justify-center mb-6">
                  <Image
                    src="/team/susan-jones.jpg"
                    alt="Susan Jones"
                    width={108}
                    height={108}
                    className="rounded-full shadow-md"
                  />
                  <div className="text-left ml-4">
                    <h3 className="text-2xl font-semibold">Susan Jones</h3>
                    <p className="text-lg text-gray-600">Blog Manager</p>
                  </div>
                </div>
                <p className="text-lg text-left leading-relaxed italic">
                  &quot; The driving force behind this blog, ensuring every post
                  delivers value, inspiration, and a seamless reading
                  experience. With a background in content strategy,
                  storytelling, and digital management, she oversees everything
                  from editorial planning to publication&quot;
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg">
              <div className="card-body">
                <div className="flex items-center justify-center mb-6">
                  <Image
                    src="/team/mark-wilson.jpg"
                    alt="Mark Wilson"
                    width={108}
                    height={108}
                    className="rounded-full shadow-md"
                  />
                  <div className="text-left ml-4">
                    <h3 className="text-2xl font-semibold">Mark Wilson</h3>
                    <p className="text-lg text-gray-600">Photographer</p>
                  </div>
                </div>
                <p className="text-lg text-left leading-relaxed italic">
                  &quot;He is a passionate travel photographer with a keen eye
                  for capturing the beauty of the world, one frame at a time.
                  Specializing in landscapes, street photography, cultural
                  portraits.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="max-w-screen-xl mx-auto text-center p-10 mt-10">
          <h2 className="text-5xl font-bold mb-12 text-gradient bg-gradient-to-r from-neutral via-accent to-base-content text-transparent bg-clip-text text-left">
            OUR MISSION AND VISION
          </h2>
          <hr className="border-primary border-t-2 w-1/3 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mission */}
            <div>
              <h3 className="text-3xl font-semibold mb-4 text-gradient bg-gradient-to-r from-accent to-base-content text-transparent bg-clip-text text-left">
                Mission
              </h3>
              <p className="text-lg leading-relaxed text-left">
                Our mission is to inspire people to explore the world with
                curiosity and respect, to share our genuine experiences, and to
                connect travelers and enthusiasts through compelling
                storytelling. We aim to provide valuable insights, practical
                advice, and heartfelt stories that resonate with our readers.
              </p>
            </div>

            {/* Vision */}
            <div>
              <h3 className="text-3xl font-semibold mb-4 text-gradient bg-gradient-to-r from-accent to-base-content text-transparent bg-clip-text text-left">
                Vision
              </h3>
              <p className="text-lg leading-relaxed text-left">
                Our vision is to be a leading voice in the travel and
                storytelling community, fostering a sense of adventure and
                cultural appreciation. We strive to create a diverse and
                inclusive platform that celebrates different perspectives and
                experiences, encouraging our readers to step out of their
                comfort zones and embrace the beauty of the world.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="max-w-screen-xl mx-auto text-center p-10 mt-10">
          <h2 className="text-5xl font-bold mb-12 text-gradient bg-gradient-to-r from-neutral via-accent to-base-content text-transparent bg-clip-text text-left">
            CONTACT INFORMATION
          </h2>
          <hr className="border-primary border-t-2 w-1/3 mb-12" />
          <p className="text-lg leading-relaxed text-left">
            We’d love to hear from you! Whether you have questions, feedback, or
            collaboration ideas, feel free to reach out to us:
          </p>
          <ul className="text-lg leading-relaxed text-left mt-6 space-y-4">
            <li className="flex items-center gap-4">
              <FaEnvelope className="text-primary" />
              <span>Email: contact@adventureblog.com</span>
            </li>
            <li className="flex items-center gap-4">
              <FaPhone className="text-primary" />
              <span>Phone: +1 (123) 456-7890</span>
            </li>
            <li className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-primary" />
              <span>Address: 123 Adventure Lane, Travel City, World 45678</span>
            </li>
          </ul>
          <div></div>
          <p className="text-lg leading-relaxed text-left mt-8">
            Or connect with us on social media:
          </p>
          <div className="flex justify-start gap-6 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-accent"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-accent"
            >
              <FaXTwitter size={28} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


