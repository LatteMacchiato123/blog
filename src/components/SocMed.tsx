import { FaFacebook,  FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function SocMed() {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">Follow Us:</h2>
      <div className="flex justify-center gap-8 mt-3">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center bg-blue-600 text-white p-4 rounded-full shadow-md transform transition-all duration-300 hover:scale-110 hover:bg-blue-800"
        >
          <FaFacebook className="text-3xl" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center bg-black text-white p-4 rounded-full shadow-md transform transition-all duration-300 hover:scale-110 hover:bg-gray-800"
        >
          <FaXTwitter className="text-3xl" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center bg-pink-500 text-white p-4 rounded-full shadow-md transform transition-all duration-300 hover:scale-110 hover:bg-pink-700"
        >
          <FaInstagram className="text-3xl" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center bg-blue-700 text-white p-4 rounded-full shadow-md transform transition-all duration-300 hover:scale-110 hover:bg-blue-900"
        >
          <FaLinkedin className="text-3xl" />
        </a>
      </div>
    </div>
  );
}
