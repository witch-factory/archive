export default {
  permalink: function ({ page }) {
    const { rawInput, ...rest } = page;
    const fileSlug = rest.fileSlug === "daily" ? "" : rest.fileSlug;
    return `/daily/${fileSlug}/index.html`;
  },
};
