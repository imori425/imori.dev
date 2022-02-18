import { SitemapStream, streamToPromise } from "sitemap";
import { getAllArticles } from "./articles";

export async function generateSitemapXml() {
  const url = process.env.URL;
  const smStream = new SitemapStream({
    hostname: url,
    lastmodDateOnly: false,
  });

  const articles = await getAllArticles();

  // index page
  // 記事の最終更新日がindex pageの最終更新日とする
  smStream.write({
    url,
    changefreq: "daily",
    priority: 1.0,
    lastmod: new Date(articles[0].publishedAt),
  });

  // article page
  articles.forEach((article) => {
    const articleUrl = `${url}/articles/${article.id}`;
    smStream.write({
      url: articleUrl,
      changefreq: "weekly",
      priority: 0.5,
      lastmod: new Date(article.publishedAt),
    });
  });

  smStream.end();

  const buffer = await streamToPromise(smStream);
  return buffer.toString();
}
