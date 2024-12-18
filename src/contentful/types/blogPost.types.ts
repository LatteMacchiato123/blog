import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";


export interface TypeBlogPostFields extends EntrySkeletonType {
  title: EntryFieldTypes.Symbol | undefined;
  slug?: EntryFieldTypes.Symbol;
  body: EntryFieldTypes.RichText;
  image: AssetLink;
  date: EntryFieldTypes.Date;
  summary: EntryFieldTypes.Symbol;
  categories?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;

 
}

interface AssetLink {
  sys: {
    id: string;
  };
  fields: {
    file: {
      url: string;
      details?: Record<string, string>;
      fileName?: string;
      contentType?: string;
    };
  };
}

export interface IContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    file: {
      url: string;
      details?: Record<string, string>;
      fileName?: string;
      contentType?: string;
    };
  };
}

export type TypeBlogPostSkeleton = EntrySkeletonType<
  TypeBlogPostFields,
  "blogPost"
>;
export type TypeBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;


export interface TypeCategoryFields {
    name?: EntryFieldTypes.Symbol;
}

export type TypeCategorySkeleton = EntrySkeletonType<TypeCategoryFields, "category">;
export type TypeCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCategorySkeleton, Modifiers, Locales>;
