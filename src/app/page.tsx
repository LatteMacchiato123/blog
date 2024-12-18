import React from "react";
import contentfulClient from "@/contentful/contentfulClient";
import {
  TypeBlogPostSkeleton,
  IContentfulAsset,
} from "@/contentful/types/blogPost.types";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import type { Entry, EntrySkeletonType } from "contentful";
import { SocMed } from "@/components/SocMed";
import Head from "next/head";



const getBlogPosts = async () => {
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
    return response.items;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default async function Home() {
  const posts = await getBlogPosts();

  // Sort posts by date in descending order
  posts.sort(
    (a, b) =>
      new Date(b.fields.date).getTime() - new Date(a.fields.date).getTime()
  );
  const [featuredPost, ...latestPosts] = posts.slice(0, 5); // First post is featured, next 4 are latest

  return (
    <div>
      <Head>
        <title>Travelog | Inspiration for Everyone</title>
      </Head>
      {/* Featured Post Section */}
      <div className="max-w-screen-2xl mx-auto pt-20">
        {/* <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Post</h2> */}
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Link href={`/article/${featuredPost.fields.slug}`} className="block">
            <Image
              src={`https:${
                (featuredPost.fields.image as IContentfulAsset)?.fields.file.url
              }`}
              alt={featuredPost.fields.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-80 text-white p-6 w-full">
              <h2 className="text-2xl font-bold">
                {featuredPost.fields.title}
              </h2>
              <p className="text-sm mt-2">{featuredPost.fields.summary}</p>
              <p className="text-xs mt-2">
                {formatDate(featuredPost.fields.date)}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="max-w-screen-2xl mx-auto">
        <div className="pt-7">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Latest Posts
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestPosts.map((blog, idx) => (
            <div key={idx} className="rounded-lg">
              <Link href={`/article/${blog.fields.slug}`} className="block">
                <div className="relative w-full h-48 bg-gray-100">
                  <Image
                    src={`https:${
                      (blog.fields.image as IContentfulAsset)?.fields.file.url
                    }`}
                    alt={blog.fields.title}
                    fill
                    className="transition-transform duration-300 transform hover:scale-105 object-cover rounded-lg"
                  />
                </div>
                <div className="bg-white pt-4 flex flex-col h-full">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {blog.fields.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                      {blog.fields.summary}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {blog.fields.categories?.map(
                        (category) =>
                          (category as Entry<EntrySkeletonType>).fields
                            .name && (
                            <span
                              key={
                                (category as Entry<EntrySkeletonType>).sys.id
                              }
                              className="text-xs text-gray-500 pt-5"
                            >
                              {(
                                category as Entry<EntrySkeletonType>
                              ).fields.name?.toString()}
                            </span>
                          )
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 mb-10">
                      {formatDate(blog.fields.date)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mb-20">
          <SocMed />
        </div>
      </div>
      <div>
        <Hero />
      </div>
    </div>
  );
}
