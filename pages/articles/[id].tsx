/* eslint-disable @typescript-eslint/no-non-null-assertion, react/no-danger */

import React from "react";
import { NextRouter, useRouter } from "next/router";
import Error from "next/error";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { getAllArticleIds, getArticle, Article } from "../../lib/articles";
import { DateComponent } from "../../components/dateComponent";
import ArticleLayout from "../../components/articleLayout";
import { markdownToHtml, markdownToPlainText } from "../../lib/markdown";

export const getStaticPaths: GetStaticPaths = async () => {
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
};

type Props = { article: Article | null };

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  let article: Article | null;
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
    props: { article },
  };
};

// eslint-disable-next-line react/function-component-definition
const ArticlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  article,
}) => {
  const router: NextRouter = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (article === null) {
    return <Error statusCode={404} />;
  }

  const articleHtml = markdownToHtml(article.contents);

  const plainText = markdownToPlainText(article.contents);
  const index = plainText.indexOf("。");
  const description =
    index !== -1 ? plainText.substring(0, plainText.indexOf("。") + 1) : "";

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
};

export default ArticlePage;
