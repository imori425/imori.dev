import type { NextApiRequest, NextApiResponse } from "next";
import { getArticle } from "../../lib/articles";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (!req.query.draftKey || !req.query.id) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const article = await getArticle(
    req.query.id as string,
    req.query.draftKey as string
  );

  if (!article) {
    return res.status(401).json({ message: "Invalid id" });
  }

  // プレビューデータを格納
  res.setPreviewData(
    {
      draftKey: req.query.draftKey,
      id: req.query.id
    },
    {
      maxAge: 60
    }
  );
  // 詳細ページへリダイレクト
  res.writeHead(307, { Location: `/articles/${req.query.id as string}` });

  res.end();

  return Promise.resolve();
}

export default handler;
