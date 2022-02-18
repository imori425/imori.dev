import { Feed } from "feed";
import constants from "./constants";
import { getAllArticles } from "./articles";
import { markdownToHtml } from "./markdown";

export const generateFeedXml = async (): Promise<string> => {
  const url = process.env.URL;
  const feed = new Feed({
    id: "index",
    copyright: "imori",
    title: constants.site.name,
    description: constants.site.description,
    link: url,
    image: "",
    updated: new Date(),
  });

  const articles = await getAllArticles();
  articles.forEach((article) => {
    feed.addItem({
      title: article.title,
      id: article.id,
      link: `${url}/${article.id}`,
      description: "",
      content: markdownToHtml(article.contents),
      date: new Date(article.publishedAt),
      image: "",
    });
  });
  return feed.rss2();
};
