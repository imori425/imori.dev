import React from "react";
import Layout from "../components/layout";
import Profile from "../components/profile";
import Dev from "../components/dev";

export default function Home() {
  return (
    <Layout>
      <section>
        <Profile />
      </section>
      <section>
        <Dev />
      </section>
    </Layout>
  );
}
