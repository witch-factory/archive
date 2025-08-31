import markdownIt from "markdown-it";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { katex } from "@mdit/plugin-katex";
import { IdAttributePlugin } from "@11ty/eleventy";
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
      .use(markdownItFootnote)
  );

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
        style: "max-width: 100%; height: auto;",
      },

      // Which source to use for `<img width height src>` attributes
      fallback: "largest", // or "smallest"
    },
  });
  eleventyConfig.addPlugin(IdAttributePlugin);

  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addCollection("daily", (collectionApi) =>
    collectionApi.getFilteredByGlob("data/daily/**/*.md")
  );

  eleventyConfig.addCollection("math", (collectionApi) =>
    collectionApi.getFilteredByGlob("data/math/**/*.md")
  );

  eleventyConfig.addCollection("study", (collectionApi) =>
    collectionApi.getFilteredByGlob("data/study/**/*.md")
  );

  eleventyConfig.addCollection("scrap", (collectionApi) =>
    collectionApi.getFilteredByGlob("data/scrap/**/*.md")
  );

  eleventyConfig.addCollection("books", (collectionApi) =>
    collectionApi.getFilteredByGlob("data/books/**/*.md")
  );
}

export const config = {
  dir: {
    input: ".",
    output: "_site",
    // These are both relative to your input directory!
    includes: "_includes",
    layouts: "_layouts",
  },
};
