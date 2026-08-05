// TIL은 연도 폴더별로 분류하기
export default {
  layout: "main.html",
  // filePathStem 기준으로 data/ 접두사를 떼고 URL을 만든다.
  // /data/daily/20260423-nextjs-pwa -> /daily/20260423-nextjs-pwa/
  // /data/daily/nested/index        -> /daily/nested/
  // /data/daily/index               -> /daily/
  permalink: ({ page }) =>
    page.filePathStem.replace(/^\/data/, "").replace(/\/index$/, "") + "/",
};
