import React from "react";
import Link from "next/link";
import constants from "../lib/constants";

export default function Header() {
  return (
    <header>
      <Link href="/" as="/">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <h1 className="">{constants.site.name}</h1>
        </a>
      </Link>
      <section>
        <ul className="flex justify-end list-none">
          <li className="pl-5">
            <Link href="/" as="/">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="">About</a>
            </Link>
          </li>
          <li className="pl-5">
            <Link href="/articles" as="/articles" prefetch>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="">Posts</a>
            </Link>
          </li>
        </ul>
      </section>
    </header>
  );
}
