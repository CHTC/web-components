import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { Components } from "react-markdown";

/*
 * react-markdown hands every component the mdast `node` it came from. It is
 * useful for inspecting the source tree, but it is not a DOM attribute, and
 * MUI forwards unknown props straight through — so leaving it in the spread
 * stamps `node="[object Object]"` onto the rendered element. Every component
 * below drops it before spreading the rest.
 */

const markdownComponents: Components = {
  h1: ({ children, node, ...props }) => {
    return (
      <Typography component={"h1"} variant="h4" gutterBottom {...props}>
        {children}
      </Typography>
    );
  },
  h2: ({ children, node, ...props }) => {
    return (
      <Typography component={"h2"} variant="h5" gutterBottom {...props}>
        {children}
      </Typography>
    );
  },
  h3: ({ children, node, ...props }) => {
    return (
      <Typography component={"h3"} variant="h6" gutterBottom {...props}>
        {children}
      </Typography>
    );
  },
  h4: ({ children, node, ...props }) => {
    return (
      <Typography
        component={"h4"}
        variant="h6"
        fontWeight={400}
        borderBottom={"black solid 1px"}
        gutterBottom
        {...props}
      >
        {children}
      </Typography>
    );
  },
  h5: ({ children, node, ...props }) => {
    return (
      <Typography
        component={"h5"}
        variant="h6"
        fontWeight={300}
        gutterBottom
        {...props}
      >
        {children}
      </Typography>
    );
  },
  h6: ({ children, node, ...props }) => {
    return (
      <Typography
        component={"h6"}
        variant="h6"
        fontWeight={300}
        color={"primary.main"}
        gutterBottom
        {...props}
      >
        {children}
      </Typography>
    );
  },
  p: ({ node, ...props }) => (
    <Typography variant="body1" component={"div"} gutterBottom {...props} />
  ), // use sx for spacing
  a: ({ node, ...props }) => <MuiLink {...props} />,
  ul: ({ node, ...props }) => (
    <Box component="ul" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  ol: ({ node, ...props }) => (
    <Box component="ol" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  li: ({ node, ...props }) => (
    <Box component="li" sx={{ mb: 0.5 }} {...props} />
  ),
  blockquote: ({ node, ...props }) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: "grey.300",
        pl: 2,
        ml: 0,
        my: 2,
        color: "grey.700",
        fontStyle: "italic",
      }}
      {...props}
    />
  ),
  code: ({ children, node, ...props }) => {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/github.min.css"
        />
        <Box
          component="code"
          sx={{
            bgcolor: "grey.100",
            py: 0.2,
            borderRadius: 1,
            fontFamily: "monospace",
            fontSize: "0.95em",
          }}
          {...props}
        >
          {children}
        </Box>
      </>
    );
  },
  pre: ({ node, ...props }) => (
    <Box
      component="pre"
      sx={{
        bgcolor: "grey.100",
        p: 2,
        borderRadius: 2,
        overflow: "auto",
        mb: 2,
      }}
      {...props}
    />
  ),
  img: ({ node, ...props }) => {
    return (
      <img
        {...props}
        style={{
          maxWidth: "100%",
          height: "auto",
          marginTop: 2,
          marginBottom: 2,
        }}
      />
    );
  },
};

export default markdownComponents;
