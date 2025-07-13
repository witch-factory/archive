export default {
  permalink: function ({ page }) {
    const { rawInput, ...rest } = page;
    const fileSlug = rest.fileSlug === "books" ? "" : rest.fileSlug;
    return `/books/${fileSlug}/index.html`;
  },
};
