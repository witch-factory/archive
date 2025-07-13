export default {
  permalink: function ({ page }) {
    const { rawInput, ...rest } = page;
    const fileSlug = rest.fileSlug === "study" ? "" : rest.fileSlug;
    return `/study/${fileSlug}/index.html`;
  },
};
