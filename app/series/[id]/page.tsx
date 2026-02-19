/* eslint-disable @next/next/no-img-element */
export const revalidate = 0;
import { client } from "@/app/lib/microcms";
import Link from "next/link";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const dq = await client.get({
    endpoint: "dq-series",
    contentId: id,
  });

  if (!dq) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        作品データが見つかりませんでした。
      </div>
    );
  }

  return (
    <main
      style={{
        padding: "40px 20px",
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "#fff",
        color: "#333",
        minHeight: "100vh",
      }}
    >
      {/* 作品タイトル */}
      <h1
        style={{
          fontSize: "2.5rem",
          borderBottom: "2px solid #333",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        {dq.title}
      </h1>

      {/* 発売時期 */}
      <p style={{ color: "#666", marginBottom: "30px", fontSize: "1.1rem" }}>
        📅 発売時期：
        {dq.release_date
          ? new Date(dq.release_date).toLocaleDateString("ja-JP")
          : "未設定"}
      </p>

      {/* メイン画像 */}
      {dq.main_image?.url && (
        <img
          src={dq.main_image.url}
          alt={dq.title}
          style={{
            width: "100%",
            borderRadius: "15px",
            marginBottom: "40px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        />
      )}

      {/* ストーリー */}
      {dq.story && (
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              borderLeft: "5px solid #333",
              paddingLeft: "15px",
              marginBottom: "20px",
            }}
          >
            ストーリー
          </h2>
          <div
            style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
            dangerouslySetInnerHTML={{ __html: dq.story }}
          />
        </section>
      )}

      {/* 登場人物 */}
      {dq.characters && (
        <section>
          <h2
            style={{
              borderLeft: "5px solid #333",
              paddingLeft: "15px",
              marginBottom: "20px",
            }}
          >
            主な登場人物
          </h2>
          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.8",
              fontSize: "1.1rem",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
            }}
          >
            {dq.characters}
          </div>
        </section>
      )}

      {/* 戻るボタン */}
      <div style={{ marginTop: "60px", textAlign: "center" }}>
        <Link
          href="/"
          style={{
            padding: "12px 24px",
            border: "1px solid #333",
            borderRadius: "30px",
            textDecoration: "none",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          ← 作品一覧に戻る
        </Link>
      </div>
    </main>
  );
}
