import { GetServerSidePropsContext } from "next";
import { generateFeedXml } from "../lib/feed";

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const xml = await generateFeedXml(); // フィードのXMLを生成する（後述）

  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24時間キャッシュする
  res.setHeader("Content-Type", "text/xml");
  res.end(xml);

  return {
    props: {},
  };
};

function Page() {
  return null;
}
export default Page;
