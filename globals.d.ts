declare namespace NodeJS {
  // 環境変数名の定義
  interface ProcessEnv {
    /** 現在の Node.js 実行環境 */
    readonly NODE_ENV: "development" | "production" | "test";

    readonly MICRO_CMS_URL: string;
    readonly MICRO_CMS_DOMAIN: string;
    readonly MICRO_CMS_API_KEY: string;
    readonly URL: string;
  }
}
