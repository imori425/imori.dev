/* eslint-disable @typescript-eslint/no-non-null-assertion, react/no-danger */

import React from "react";
import { NextRouter, useRouter } from "next/router";
import Error from "next/error";
import { GetStaticProps } from "next";
import { getAllArticleIds, getArticle, Article } from "../../lib/articles";
import { DateComponent } from "../../components/dateComponent";
import ArticleLayout from "../../components/articleLayout";
import { markdownToHtml, markdownToPlainText } from "../../lib/markdown";

export default function ArticlePage({ article }: { article: Article }) {
  const router: NextRouter = useRouter();

  const articleHtml = markdownToHtml(article.contents);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!article) {
    return <Error statusCode={404} />;
  }

  const plainText = markdownToPlainText(article.contents);
  const index = plainText.indexOf("。");
  const description =
    index !== -1 ? plainText.substring(0, plainText.indexOf("。") + 1) : "";

  // TODO 画像があれば一番最初に出てくる画像のURLを設定するようにする
  // TODO 画像がなければデフォルトの画像URLを設定する
  return (
    <ArticleLayout title={article.title} description={description}>
      <section>
        <h3>{article.title}</h3>
        <small>
          <DateComponent dateString={article.publishedAt} />
        </small>
        <hr className="my-5" />
        <article
          className="markdown-body not-prose"
          dangerouslySetInnerHTML={{ __html: articleHtml }}
        />
      </section>
    </ArticleLayout>
  );
}

export async function getStaticPaths() {
  const articleIds = await getAllArticleIds();
  const paths = articleIds.map((id) => {
    return {
      params: {
        id,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  let article;
  if (context.preview) {
    const previewData = context.previewData as {
      id: string;
      draftKey: string;
    };
    article = await getArticle(previewData.id, previewData.draftKey);
  } else {
    article = await getArticle(context.params!.id as string);
  }
  return {
    props: {
      article,
    },
  };
};
