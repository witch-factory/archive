export default {
  permalink: function ({ page }) {
    const { rawInput, ...rest } = page;
    const fileSlug = rest.fileSlug === "math" ? "" : rest.fileSlug;
    return `/math/${fileSlug}/index.html`;
  },
};
