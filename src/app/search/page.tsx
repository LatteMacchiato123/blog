"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { SocMed } from "@/components/SocMed";
import { Hero } from "@/components/hero/Hero";
import Image from "next/image";
import Link from "next/link";
import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeBlogPostSkeleton,
} from "@/contentful/types/blogPost.types";
import { UnresolvedLink } from "contentful";
import type { Entry, EntrySkeletonType } from "contentful";

// Define the type for the blog post result
interface BlogPost {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    image: IContentfulAsset;
    summary: string;
    date: string;
    categories: Category[];
  };
}
interface Category {
  sys: {
    id: string;
  };
  fields: {
    name: string;
  };
}

// Function to fetch blog posts from Contentful
const getBlogPosts = async (searchQuery: string): Promise<BlogPost[]> => {
  try {
    const response = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
      content_type: "blogPost",
      select: [
        "fields.title",
        "fields.slug",
        "fields.image",
        "fields.summary",
        "fields.date",
        "fields.categories",
      ],
      include: 1, // Ensure we fetch linked entries
    });
    const posts = response.items;

    function isEntry(
      post:
        | UnresolvedLink<"Entry">
        | Entry<EntrySkeletonType, undefined, string>
    ): post is Entry<EntrySkeletonType, undefined, string> {
      return post.sys.type === "Entry";
    }
    // Filter posts based on the search query
    const filteredPosts = posts.filter((post) =>
      post.fields.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredPosts
      .map((post) => {
        if (isEntry(post)) {
          const blogPost = {
            sys: post.sys,
            fields: {
              title: post.fields.title,
              slug: post.fields.slug as string,
              image: post.fields.image,
              summary: post.fields.summary,
              date: post.fields.date,
              categories: post.fields
                .categories!.filter((category) => isEntry(category))
                .map((category) => ({
                  sys: category.sys,
                  fields: {
                    name: category.fields.name,
                  },
                })),
            },
          } as BlogPost;
          return blogPost;
        } else {
          // Handle the case where post is not an Entry
          return undefined;
        }
      })
      .filter((post) => post !== undefined);
  } catch (error) {
    console.error(error);
    return [];
  }
};
// Format date function
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const SearchPage: React.FC = () => {
  const router = useRouter();
  const [results, setResults] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (searchQuery) {
      const fetchResults = async () => {
        const posts = await getBlogPosts(searchQuery);
        setResults(posts);
      };
      fetchResults();
    }
  }, [searchQuery]);

  const handleSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    router.push(`/search?query=${searchQuery}`); // Navigate with updated search query
  };

  useEffect(() => {
    document.title = "Search | Travelog"; // Set the title of the page
  }, []);

  return (
    <div>
      {/* Search Section */}
      <div className="max-w-screen-2xl mx-auto pt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Search Results
        </h2>

        {/* Search Form */}
        <form className="flex items-center mb-6" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered text-black focus:ring-2 focus:ring-blue-500 w-[500px] py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="btn ml-2 bg-primary text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg px-4 py-2 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none"
          >
            <FaSearch className="mr-2" />
            Search
          </button>
        </form>

        {/* Search Results Section */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((result) => (
              <div key={result.sys.id} className="rounded-lg">
                <Link href={`/article/${result.fields.slug}`} className="block">
                  <div className="relative w-full h-48 bg-gray-100">
                    <Image
                      src={`https:${
                        (result.fields.image as IContentfulAsset)?.fields.file
                          .url
                      }`}
                      alt={result.fields.title}
                      fill
                      className="transition-transform duration-300 transform hover:scale-105 object-cover rounded-lg"
                    />
                  </div>
                  <div className="bg-white pt-4 flex flex-col h-full">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        {result.fields.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-2">
                        {result.fields.summary}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 pt-5">
                        {result.fields.categories?.map((category: Category) => (
                          <span
                            key={category.sys.id}
                            className="text-xs text-gray-500 pt-5"
                          >
                            {category.fields.name}
                          </span>
                        ))}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 mb-10">
                      {formatDate(result.fields.date)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found for &quot;{searchQuery}&quot;.</p>
        )}
      </div>

      <div className="mb-20">
        <SocMed />
      </div>
      <div>
        <Hero />
      </div>
    </div>
  );
};

export default SearchPage;
