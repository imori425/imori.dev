import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import HeadLayout from "./head";
import Header from "./header";
import Footer from "./footer";

export default function ArticleLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}): ReactElement {
  const router = useRouter();
  // TODO og image
  return (
    <div className="container mx-auto prose prose-sm prose-slate p-5">
      <HeadLayout
        path={router.asPath}
        description={description}
        image=""
        keyword=""
        title={title}
        ogType="article"
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
