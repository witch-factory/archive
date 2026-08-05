import markdownIt from "markdown-it";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { katex } from "@mdit/plugin-katex";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";

export default async function (eleventyConfig) {
  const options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.setLibrary(
    "md",
    markdownIt(options)
      .use(katex, { output: "mathml" })
      .use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.linkInsideHeader({
          symbol: "#",
          placement: "after",
        }),
      })
      .use(markdownItFootnote),
  );

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: [400, 800, 1200, "auto"],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
        style: "max-width: 100%; height: auto;",
        sizes: "(max-width: 60rem) 100vw, 60rem",
      },

      // Which source to use for `<img width height src>` attributes
      fallback: "largest", // or "smallest"
    },
  });

  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("assets");

  for (const name of ["daily", "math", "study", "scrap", "books"]) {
    eleventyConfig.addCollection(name, (collectionApi) =>
      collectionApi.getFilteredByGlob(`data/${name}/**/*.md`),
    );
  }
}

export const config = {
  markdownTemplateEngine: false,
  dir: {
    input: ".",
    output: "_site",
    // These are both relative to your input directory!
    includes: "_includes",
    layouts: "_layouts",
  },
};
