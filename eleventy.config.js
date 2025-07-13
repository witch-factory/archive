import markdownIt from "markdown-it";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function (eleventyConfig) {
  const options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.setLibrary("md", markdownIt(options));

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addCollection("study2025", (collectionApi) =>
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
