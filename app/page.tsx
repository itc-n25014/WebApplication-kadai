/* eslint-disable @next/next/no-img-element */

import { client } from "@/app/lib/microcms";
import Link from "next/link";

type DQTitle = {
  id: string;
  title: string;
  main_image?: {
    url: string;
  };
};

export default async function Page() {
  const data = await client.get({
    endpoint: "dq-series",
    queries: { limit: 20 },
  });

  return (
    <main style={{ padding: "20px", backgroundColor: "#000", color: "#fff" }}>
      <h1>ドラゴンクエスト 作品一覧</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {data.contents.map((dq: DQTitle) => (
          <Link
            href={`/series/${dq.id}`}
            key={dq.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "2px solid #fff",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {/* メイン画像がある場合に表示 */}
              {dq.main_image && (
                <img
                  src={dq.main_image.url}
                  alt={dq.title}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                {dq.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
