import { remark } from "remark";
import remarkParse from "remark-parse";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

export function markdownToHtml(markdown: string): string {
  return remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .processSync(matter(markdown).content)
    .toString();
}

export function markdownToPlainText(markdown: string): string {
  return remark()
    .use(remarkParse)
    .processSync(matter(markdown).content)
    .toString();
}
