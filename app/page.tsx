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
        backgroundColor: "#f8f9fa", // 少しだけグレーにすると白カードが際立ちます
        color: "#333",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{ textAlign: "center", marginBottom: "40px", fontSize: "2rem" }}
      >
        ドラゴンクエスト 作品一覧
      </h1>

      {/* ✅ gridTemplateColumns を "repeat(3, 1fr)" にすることで横3列に固定 
         ✅ maxWidth を設定して、横に広がりすぎないように調整
      */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "40px",
          maxWidth: "1100px",
          margin: "0 auto",
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
                border: "1px solid #eee",
                borderRadius: "16px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                backgroundColor: "#fff",
                height: "100%", // カードの高さを揃える
                transition: "transform 0.3s ease",
              }}
              // ホバー時に少し浮き上がるようなスタイルを追加したい場合はここを調整
            >
              {dq.main_image ? (
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    marginBottom: "15px",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={dq.main_image.url}
                    alt={dq.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // 画像の端を切ってサイズを統一
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    backgroundColor: "#eee",
                    borderRadius: "8px",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#aaa" }}>No Image</span>
                </div>
              )}
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  lineHeight: "1.4",
                }}
              >
                {dq.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
