// Content components, their data types, and the getters that load them from
// GitHub. Pulls in @11ty/gray-matter, js-yaml, and react-markdown.
export * from "../Article";
export * from "../Event";
export * from "../Presentation";
export * from "../Staff";

export { default as MarkdownContent } from "../markdownComponents/MarkdownContent";
export {
  default as markdownComponents,
  createMarkdownComponents,
  type MarkdownComponentOptions,
} from "../markdownComponents/markdownComponents";
export { default as excerptComponents, linkedCardExcerptComponents, createExcerptComponents } from "../markdownComponents/excerptComponents";

export type { Website } from "../types";
export * from "../images";

// Next.js metadata built from the content types above.
export * from "../metadata";
export * from "../utils";
