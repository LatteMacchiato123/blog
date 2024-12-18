"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  IContentfulAsset,
  TypeBlogPostFields,
} from "@/contentful/types/blogPost.types";
import contentfulClient from "@/contentful/contentfulClient";
import Image from "next/image";
import RichText from "@/components/global/RichText";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import Link from "next/link";
import { FaEye, FaThumbsUp, FaUserFriends, FaShareAlt } from "react-icons/fa";

interface ArticleData {
  article: TypeBlogPostFields;
  otherArticles: TypeBlogPostFields[];
}

async function fetchArticleData(slug: string): Promise<ArticleData | null> {
  try {
    const articleResponse =
      await contentfulClient.getEntries<TypeBlogPostFields>({
        content_type: "blogPost",
        limit: 1,
        "fields.slug": slug,
      });

    const otherArticlesResponse =
      await contentfulClient.getEntries<TypeBlogPostFields>({
        content_type: "blogPost",
        limit: 3,
        "fields.slug[ne]": slug,
      });

    if (articleResponse.items.length === 0) {
      return null;
    }

    const article = articleResponse.items[0]
      .fields as unknown as TypeBlogPostFields;
    const otherArticles = otherArticlesResponse.items.map(
      (item) => item.fields as unknown as TypeBlogPostFields
    );

    return { article, otherArticles };
  } catch (error) {
    console.log(error);
    return null;
  }
}
const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const views = generateRandomNumber(100, 5000); // Random views between 100 and 5000
const likes = generateRandomNumber(10, 1000); // Random likes between 10 and 1000
const followers = generateRandomNumber(1, 500); // Random comments between 1 and 500
const shares = generateRandomNumber(0, 100); // Random shares between 0 and 100

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [clientRendered, setClientRendered] = useState(false);

  useEffect(() => {
    const getArticleData = async () => {
      const fetchedArticleData = await fetchArticleData(slug);
      if (fetchedArticleData) {
        setArticleData(fetchedArticleData);
      } else {
        console.log("Article not found");
      }
      setLoading(false);
    };
    getArticleData();
  }, [slug]);

  useEffect(() => {
    if (articleData?.article) {
      document.title = articleData.article.title?.toString() || "Article";
    }
  }, [articleData]);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!articleData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Article not found
      </div>
    );
  }

  const { article, otherArticles } = articleData;

  const Breadcrumb: React.FC<{
    title: string;
    category?: string | string[];
  }> = ({ title, category }) => (
    <div className="text-sm breadcrumbs mb-4">
      <ul>
        <li>
          <Link href="/" className="text-blue-500 hover:underline pl-4">
            Home
          </Link>
        </li>
        {category ? (
          Array.isArray(category) ? (
            category.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/category/${encodeURIComponent(cat)}`}
                  className="text-blue-500 hover:underline"
                >
                  {cat}
                </Link>
              </li>
            ))
          ) : (
            <li>
              <Link
                href={`/category/${encodeURIComponent(category)}`}
                className="text-blue-500 hover:underline"
              >
                {category}
              </Link>
            </li>
          )
        ) : (
          <li className="text-gray-500">Uncategorized</li>
        )}
        <li className="text-gray-500">{title}</li>
      </ul>
    </div>
  );

  return (
    <div className="max-w-screen px-4 sm:px-8 lg:px-12 mt-10 flex flex-col lg:flex-row bg-gray-100 gap-8">
      <div className="flex-1 bg-white rounded-lg">
        <div className="relative w-full h-64 sm:h-80 lg:h-[60vh]">
          <Image
            src={`https:${(article.image as IContentfulAsset).fields.file.url}`}
            alt={
              (article.image as IContentfulAsset).fields.file.fileName ||
              "Image"
            }
            fill
            className="object-cover rounded-lg"
            priority
          />
          <div className="p-4 sm:p-8 absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 hover:bg-opacity-90 transition">
            <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">
              {article.title?.toString() ?? ""}
            </h1>
          </div>
        </div>
        <div className="p-4 text-black">
          <Breadcrumb
            title={article.title?.toString() ?? ""}
            category={article.categories?.toString() ?? ""}
          />
        </div>
        <div className="container mx-auto p-4 sm:p-8 prose sm:prose-lg max-w-none">
          <RichText document={article.body as unknown as RichTextDocument} />
        </div>
      </div>
      {clientRendered && (
        <div className="flex flex-col lg:w-1/3 space-y-4 mt-20 max-w-sm">
          <h2 className="text-xl sm:text-2xl font-semibold text-center">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {otherArticles.map((otherArticle, idx) => (
              <Link
                key={idx}
                href={`/article/${otherArticle.slug}`}
                className="block rounded-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex flex-col">
                  <div className="relative w-full h-40 sm:h-48">
                    <Image
                      src={`https:${
                        (otherArticle.image as IContentfulAsset).fields.file.url
                      }`}
                      alt={
                        (otherArticle.image as IContentfulAsset).fields.file
                          .fileName || "Image"
                      }
                      fill
                      className="object-cover rounded-t-md"
                    />
                  </div>
                  <div className="flex-grow flex justify-center bg-white px-5 py-3 rounded-b-md">
                    <h3 className="text-md sm:text-lg font-semibold text-center">
                      {String(otherArticle.title)}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Author */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg">
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
            </div>
          </div>
          {/* {Stats} */}
          {/* Stats */}
          <div className="card bg-base-100 h-72 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg">
            <div className="card-body">
              <div className="flex flex-col items-center justify-center mb-6 space-y-4">
                <h3 className="text-xl font-semibold text-center">
                  Article Stats
                </h3>
                <div className="flex items-center justify-between w-full">
                  <div className="stat">
                    <div className="stat-title text-sm">Views</div>
                    <div className="stat-value text-xl">
                      <FaEye className="inline-block mr-2" />
                      {views}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title text-sm">Likes</div>
                    <div className="stat-value text-xl">
                      <FaThumbsUp className="inline-block mr-2" />
                      {likes}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="stat">
                    <div className="stat-title text-sm">Followers</div>{" "}
                    {/* Replaced Comments with Followers */}
                    <div className="stat-value text-xl">
                      <FaUserFriends className="inline-block mr-2" />
                      {followers}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title text-sm">Shares</div>
                    <div className="stat-value text-xl">
                      <FaShareAlt className="inline-block mr-2" />
                      {shares}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
