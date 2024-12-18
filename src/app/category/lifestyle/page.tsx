import React from "react";
import contentfulClient from "@/contentful/contentfulClient";
import {
  TypeBlogPostSkeleton,
  IContentfulAsset,
} from "@/contentful/types/blogPost.types";
import Image from "next/image";
import Link from "next/link";

import type { Entry, EntrySkeletonType } from "contentful";

import { LifestyleHero } from "@/components/hero/LifestyleHero";

export const metadata = {
  title: 'Lifestyle | Travelog',
  description: 'Lifestyle Category of Travelog ',
};
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

export default async function WellBeing() {
  const posts = await getBlogPosts();

  // Sort posts by date in descending order
  posts.sort(
    (a, b) =>
      new Date(b.fields.date).getTime() - new Date(a.fields.date).getTime()
  );

  // Filter posts by category "Well-Being"
  const articlePosts = posts.filter((post) =>
    (
      post.fields.categories as Entry<EntrySkeletonType, undefined, string>[]
    ).some((category) => category.fields.name === "Lifestyle")
  );

  // Get the latest posts if there are no "Well-Being" posts
  const latestPosts = posts.slice(0, 4);

  return (
    <div>
      <LifestyleHero />
      <div className="max-w-screen-2xl mx-auto">
        {articlePosts.length > 0 ? (
          <div className="pt-7">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Lifestyle</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {articlePosts.map((blog, idx) => (
                <div key={idx} className="rounded-lg">
                  <Link href={`/article/${blog.fields.slug}`} className="block">
                    <div className="relative w-full h-48 bg-gray-100">
                      <div className="w-full h-48 bg-gray-100">
                        <Image
                          src={`https:${
                            (blog.fields.image as IContentfulAsset)?.fields.file
                              .url
                          }`}
                          alt={blog.fields.title}
                          fill
                          className="transition-transform duration-300 transform hover:scale-105 object-cover rounded-lg"
                        />
                      </div>
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
                        <p className="text-xs text-gray-500 mt-2">
                          {formatDate(blog.fields.date)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-2xl mt-20 mb-6">
              Belum ada postingan dalam kategori
              <span className="italic"> Lifestyle</span>. Cek postingan terbaru
              kami di bawah ini:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {latestPosts.map((blog, idx) => (
                <div key={idx} className="rounded-lg">
                  <Link href={`/article/${blog.fields.slug}`} className="block">
                    <div className="relative w-full h-48 bg-gray-100">
                      <div className="w-full h-48 bg-gray-100">
                        <Image
                          src={`https:${
                            (blog.fields.image as IContentfulAsset)?.fields.file
                              .url
                          }`}
                          alt={blog.fields.title}
                          fill
                          className="transition-transform duration-300 transform hover:scale-105 object-cover rounded-lg"
                        />
                      </div>
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
                        <p className="text-xs text-gray-500 mt-2">
                          {formatDate(blog.fields.date)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
