// https://www.ovl.design/text/permalink-driven-breadcrumbs-in-eleventy/
export default {
  hi: () => "Hello, World!",
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
          name: segment.replace(/-/g, " ").replace(/\.html$/, ""),
          url: url,
        });
        return acc;
      }, [])
    );
    return result;
  },
};
