/** @param {import("@11ty/eleventy/UserConfig").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addCollection("study2025", (collectionApi) =>
    collectionApi.getFilteredByGlob("data/study/*.md")
  );

  eleventyConfig.addCollection("scrap", (collectionApi) =>
    collectionApi.getFilteredByGlob("data/scrap/*.md")
  );

  eleventyConfig.addCollection("books", (collectionApi) =>
    collectionApi.getFilteredByGlob("data/books/*.md")
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
