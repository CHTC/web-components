import Markdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import markdownComponents, {
  createMarkdownComponents,
} from "./markdownComponents";
import type { SiteImageComponent } from "../images/types";

interface MarkdownContentProps {
  children?: string | null;
  /** Override the component map; defaults to the shared markdownComponents. */
  components?: Components;
  /**
   * Component rendered for images in the markdown. Ignored when `components`
   * is supplied, since that map already decides how images render.
   */
  imageComponent?: SiteImageComponent;
  /** `sizes` hint forwarded to `imageComponent`. */
  imageSizes?: string;
}

/**
 * Renders markdown with raw-HTML support and the library's component overrides.
 * Centralizes the `rehypeRaw` + components wiring shared across Article,
 * Presentation and PresentationCard.
 */
const MarkdownContent = ({
  children,
  components,
  imageComponent,
  imageSizes,
}: MarkdownContentProps) => {
  const resolved =
    components ??
    (imageComponent
      ? createMarkdownComponents({ imageComponent, imageSizes })
      : markdownComponents);

  return (
    <Markdown rehypePlugins={[rehypeRaw]} components={resolved}>
      {children}
    </Markdown>
  );
};

export default MarkdownContent;
