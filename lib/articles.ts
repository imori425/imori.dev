import fetch from "isomorphic-unfetch";

export type Tag = {
  id: string;
  name: string;
};

export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  contents: string;
  tags: Array<Tag>;
};

export type MicroCmsResponse<T> = {
  contents: T;
  totalCount: number;
  offset: number;
  limit: number;
};

export async function getAllArticles(): Promise<Array<Article>> {
  const key = {
    headers: { "X-MICROCMS-API-KEY": process.env.MICRO_CMS_API_KEY },
  };
  const res = await fetch(`${process.env.MICRO_CMS_URL}/articles`, key);
  const data = (await res.json()) as MicroCmsResponse<Article[]>;

  return data.contents.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1;
    }
    return -1;
  });
}

export async function getAllArticleIds(): Promise<Array<string>> {
  return (await getAllArticles()).map((a) => a.id);
}

export async function getArticle(
  id: string,
  draftKey?: string
): Promise<Article | null> {
  const key = {
    headers: { "X-MICROCMS-API-KEY": process.env.MICRO_CMS_API_KEY },
  };

  let url = `${process.env.MICRO_CMS_URL}/articles/${id}`;

  if (draftKey) {
    url += `?draftKey=${draftKey}`;
  }
  const res = await fetch(url, key);

  if (res.status === 404) {
    return null;
  }

  const article = (await res.json()) as Article;

  // 下書き状態は公開日が入っていないケースがあるので、デフォルトの値として現在日時を設定する。
  if (article.publishedAt == null && draftKey) {
    article.publishedAt = new Date().toISOString();
  }

  return article;
}

export async function getIndexArticles() {
  const articles = await getAllArticles();
  return articles.slice(0, 5);
}
