export default {
  permalink: function ({ page }) {
    const { rawInput, ...rest } = page;
    const fileSlug = rest.fileSlug === "scrap" ? "" : rest.fileSlug;
    return `/scrap/${fileSlug}/index.html`;
  },
};
