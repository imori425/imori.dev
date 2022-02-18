import React from "react";
import HeadLayout from "./head";
import constants from "../lib/constants";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto prose prose-sm prose-slate p-5">
      <HeadLayout
        path=""
        description={constants.site.description}
        image={process.env.URL + constants.site.defaultImageUrl}
        keyword={constants.site.description}
        title={constants.site.name}
        ogType="website"
      />
      <Header />
      <main>{children}</main>
      <footer className="mt-20">
        <small>
          <time>2022</time> <span>@imori</span>
          <a href="/feed.xml" className="float-right">
            RSS
          </a>
        </small>
      </footer>
    </div>
  );
}
