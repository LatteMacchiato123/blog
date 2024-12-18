import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  Document as RichTextDocument,
  Block,
  Inline,
} from "@contentful/rich-text-types";
import Image from "next/image";

interface RichTextProps {
  document: RichTextDocument | undefined;
}

let hrCounter = 0; // Initialize a counter for <hr> elements

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: React.ReactNode) => (
      <h1 className="text-4xl font-extrabold my-5 ">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => (
      <h2 className="text-3xl font-bold my-5">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => (
      <h3 className="text-2xl font-semibold my-5">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node: Block | Inline, children: React.ReactNode) => (
      <h4 className="text-xl font-medium my-5">{children}</h4>
    ),
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => (
      <p className="my-5 text-justify text-lg leading-relaxed">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ul className="list-disc list-outside ml-5 my-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ol className="list-decimal list-outside ml-5 my-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: React.ReactNode) => (
      <li className="ml-5 my-1">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: Block | Inline, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic my-5 text-xl text-gray-600">
        {children}
      </blockquote>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => (
      <div className=" ">
        <Image
          src={`https:${node.data.target.fields.file.url}`}
          alt={node.data.target.fields.title}
          className="rounded-b-xl mx-auto shadow-2xl"
          width={721}
          height={450}
          style={{ objectFit: "cover" }}
          sizes="(max-width: 400px) 100vw, 700px"
        />
      </div>
    ),
    [BLOCKS.HR]: () => {
      hrCounter += 1; // Increment counter for each <hr> element
      const isOdd = hrCounter % 2 !== 0; // Check if counter is odd

      return (
        <div
          className={` max-w-screen mx-auto mt-24  -mb-0 border-4 border-black bg-black ${
            isOdd ? "" : ""
          }`}
        ></div>
      );
    },
    [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a href={node.data.uri} className="text-blue-600 hover:underline">
        {children}
      </a>
    ),
  },
};

const RichText: React.FC<RichTextProps> = ({ document }) => {
  if (!document) {
    return null;
  }

  return <>{documentToReactComponents(document, options)}</>;
};

export default RichText;
