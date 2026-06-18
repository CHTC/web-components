import Markdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import markdownComponents from "./markdownComponents";

interface MarkdownContentProps {
  children?: string | null;
  /** Override the component map; defaults to the shared markdownComponents. */
  components?: Components;
}

/**
 * Renders markdown with raw-HTML support and the library's component overrides.
 * Centralizes the `rehypeRaw` + components wiring shared across Article,
 * Presentation and PresentationCard.
 */
const MarkdownContent = ({
  children,
  components = markdownComponents,
}: MarkdownContentProps) => (
  <Markdown rehypePlugins={[rehypeRaw]} components={components}>
    {children}
  </Markdown>
);

export default MarkdownContent;
