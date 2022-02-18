// noinspection JSUnusedGlobalSymbols

import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import React from "react";
import Layout from "../../components/layout";
import { getAllArticles, Article } from "../../lib/articles";
import { DateComponent } from "../../components/dateComponent";

export default function Home({ articles }: { articles: Array<Article> }) {
  return (
    <Layout>
      <Head>
        <title>Posts</title>
      </Head>

      <section>
        <h3>Posts</h3>
        {articles.map(({ id, publishedAt, title, tags }, index) => (
          <div key={id}>
            <Link href="/articles/[id]" as={`/articles/${id}`}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="text-slate-900">{title}</a>
            </Link>
            <br />
            <div className="text-xs my-1">
              <DateComponent dateString={publishedAt} />
            </div>
            <div className="flex flex-row flex-wrap place-items-center">
              {tags.map((t) => (
                <span
                  key={t.id}
                  className="rounded-full py-1 px-2 border bg-white border-gray-300 text-xs mr-1 my-1"
                >
                  {t.name}
                </span>
              ))}
            </div>
            {index !== articles.length - 1 && <hr className="p-0 my-3" />}
          </div>
        ))}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticles();
  return {
    props: {
      articles,
    },
    revalidate: 60,
  };
};
