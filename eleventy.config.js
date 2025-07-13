/** @param {import("@11ty/eleventy/UserConfig").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("apple-icon.png");
  eleventyConfig.addPassthroughCopy("witch-archive.png");

  eleventyConfig.addCollection("til", (collectionApi) =>
    collectionApi.getFilteredByGlob("data/til/*.md")
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
