/* eslint-disable @next/next/no-img-element */
import { client } from "@/lib/microcms";

type Character = {
  name: string;
  image: { url: string };
  description: string;
};

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const dq = await client.get({ endpoint: "dq-series", contentId: params.id });

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{dq.title}</h1>
      {/* altを追加 */}
      <img src={dq.main_image?.url} alt={dq.title} style={{ width: "100%" }} />

      <h2>ストーリー</h2>
      <div dangerouslySetInnerHTML={{ __html: dq.story }} />

      <h2>登場人物</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* char: any を char: Character に変更 */}
        {dq.characters?.map((char: Character, index: number) => (
          <div key={index} style={{ width: "150px" }}>
            <img
              src={char.image?.url}
              alt={char.name}
              style={{ width: "100%" }}
            />
            <p>
              <strong>{char.name}</strong>
            </p>
            <p style={{ fontSize: "0.8rem" }}>{char.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
