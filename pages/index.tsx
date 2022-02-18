import { GetStaticProps } from "next";
import React from "react";
import Layout from "../components/layout";
import Profile from "../components/profile";
import Works from "../components/works";

export default function Home() {
  return (
    <Layout>
      <section>
        <Profile />
      </section>
      <section>
        <Works />
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};
