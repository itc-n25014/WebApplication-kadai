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
    <main
      style={{
        padding: "40px 20px",
        backgroundColor: "#fff",
        color: "#333",
        minHeight: "100vh",
      }}
    >
      <h1>ドラゴンクエスト 作品一覧</h1>
      {/* グリッドの設定を大きく変更 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // 200pxから300pxへ大きく
          gap: "30px", // 間隔も少し広めに
        }}
      >
        {data.contents.map((dq: DQTitle) => (
          <Link
            href={`/series/${dq.id}`}
            key={dq.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {/* カードのデザイン：影をつけて高級感を出す */}
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "20px", // 中の余白を広く
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // 柔らかい影
                transition: "transform 0.2s", // 動きの準備
                backgroundColor: "#fff",
              }}
            >
              {dq.main_image && (
                <img
                  src={dq.main_image.url}
                  alt={dq.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                />
              )}
              <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                {dq.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
