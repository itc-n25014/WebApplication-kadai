/* eslint-disable @next/next/no-img-element */
export const revalidate = 0;
import { client } from "@/app/lib/microcms";
import Link from "next/link";

type Character = {
  name: string;
  image?: {
    url: string;
  };
};

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
        maxWidth: "1200px",
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

      {/* 発売時期 */}
      <p
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          color: "#444",
          margin: "10px 0 30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        発売時期：
        {dq.release_date
          ? new Date(dq.release_date).toLocaleDateString("ja-JP")
          : "未設定"}
      </p>

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

      {/* 登場人物セクション */}
      {dq.character_list && (
        <section style={{ marginTop: "40px" }}>
          <h2
            style={{
              borderLeft: "5px solid #333",
              paddingLeft: "15px",
              marginBottom: "25px",
            }}
          >
            主な登場人物
          </h2>

          {/* キャラクターを並べるグリッドコンテナ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "30px",
            }}
          >
            {dq.character_list.map((char: Character, index: number) => (
              <div
                key={index}
                className="card-hover"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "210px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    marginBottom: "10px",

                    backgroundColor: "transparent",

                    border: "none",
                    padding: "5px",
                  }}
                >
                  {char.image?.url ? (
                    <img
                      src={char.image.url}
                      alt={char.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        transform: "scale(1.2)",
                      }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%" }} />
                  )}
                </div>

                {/* キャラクター名 */}
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "#333",
                    minHeight: "1.5em",
                  }}
                >
                  {char.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* おすすめBGMセクション */}
      {dq.recommended_bgm && (
        <section style={{ marginTop: "40px", marginBottom: "40px" }}>
          <h2
            style={{
              borderLeft: "5px solid #333",
              paddingLeft: "15px",
              marginBottom: "20px",
              fontSize: "2rem",
            }}
          >
            おすすめBGM
          </h2>
          <div
            className="bgm-content"
            style={{
              fontSize: "1.2rem",
              lineHeight: "1.8",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
            }}
            dangerouslySetInnerHTML={{ __html: dq.recommended_bgm }}
          />
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
