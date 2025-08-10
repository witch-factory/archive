// https://www.ovl.design/text/permalink-driven-breadcrumbs-in-eleventy/
// 11ty computed data docs: https://www.11ty.dev/docs/data-computed/
export default {
  breadcrumbs: ({ page }) => {
    if (!page || !page.url) {
      return [];
    }
    const segments = page.url.split("/").filter(Boolean);
    const result = [];

    result.push({
      name: "Home",
      url: "/",
    });

    result.push(
      ...segments.reduce((acc, segment, index) => {
        const url = `/${segments.slice(0, index + 1).join("/")}/`;
        acc.push({
          name: segment.replace(/\.html$/, ""),
          url: url,
        });
        return acc;
      }, [])
    );
    return result;
  },
};
