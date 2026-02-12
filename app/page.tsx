/* eslint-disable @next/next/no-img-element */
import { client } from "../lib/microcms";
import Link from "next/link";

export default async function Page() {
  const data = await client.get({ endpoint: "dq-series" }); // エンドポイント名は作成したものに合わせてください

  return (
    <main style={{ padding: "20px", backgroundColor: "#000", color: "#fff" }}>
      <h1>ドラゴンクエスト 作品一覧</h1>\
    </main>
  );
}
