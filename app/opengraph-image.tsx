import { ImageResponse } from "next/og";

export const alt = "Panier Perdu — Récupère les paniers abandonnés de ta boutique";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f1e7",
          color: "#14110f",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700 }}>Panier Perdu</div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          Récupère les paniers que tes clients abandonnent.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 36,
          }}
        >
          <span>29 € par mois · relances illimitées</span>
          <span
            style={{
              background: "#c2410c",
              color: "#ffffff",
              padding: "14px 28px",
              fontWeight: 700,
            }}
          >
            Commencer
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
