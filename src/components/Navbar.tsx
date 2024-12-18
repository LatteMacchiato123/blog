"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For client-side navigation

// Define types for category items
interface Category {
  name: string;
  path: string;
}

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // Initialize useRouter for navigation

  // Handle search submission
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?query=${searchQuery}`); // Redirect to the search page with the query parameter
  };

  // Categories data with type annotation
  const categories: Category[] = [
    { name: "Destinations", path: "/category/destinations" },
    { name: "Food", path: "/category/food" },
    { name: "Well-Being", path: "/category/well-being" },
    { name: "Sport", path: "/category/sport" },
    { name: "Family", path: "/category/family" },
    { name: "Lifestyle", path: "/category/lifestyle" },
  ];

  return (
    <div>
      <div className="navbar bg-[#121516] fixed top-0 z-50 text-white shadow-lg px-6">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center">
          <Link href="/" className="btn btn-ghost flex items-center">
            <span className="text-xl font-bold text-white">Travelog</span>
          </Link>
          <div className="dropdown lg:hidden ml-6">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#121516] p-2 rounded-box shadow-md mt-3 w-52">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <a>Category</a>
                <ul className="p-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link href={category.path}>{category.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Navbar Center (Search Form) */}
        <div className="navbar-center hidden lg:flex items-center justify-center">
          <form className="flex items-center " onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered text-black focus:ring-2 focus:ring-blue-500 w-[500px] py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn ml-2 bg-primary text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg px-4 py-2 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none"
              type="submit"
            >
              <FaSearch className="mr-2" />
              Search
            </button>
          </form>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-500">
                About
              </Link>
            </li>
            <li className="relative group">
              <a className="hover:text-blue-500">Category</a>
              <ul className=" absolute top-7 -left-10 hidden bg-[#121516] rounded-box shadow-lg group-hover:block">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link href={category.path} className="btn btn-ghost align-left">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
