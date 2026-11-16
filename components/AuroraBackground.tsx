"use client";

export default function AuroraBackground() {
  return (
    <>
      <style>{`
        /* ── Aurora blob keyframes ── */
        @keyframes auroraBlob1 {
          0%,100% { transform: translate(0px, 0px)   scale(1); }
          33%     { transform: translate(40px,-30px)  scale(1.08); }
          66%     { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes auroraBlob2 {
          0%,100% { transform: translate(0px, 0px)    scale(1); }
          33%     { transform: translate(-50px, 25px)  scale(1.1); }
          66%     { transform: translate(30px,-35px)   scale(0.92); }
        }
        @keyframes auroraBlob3 {
          0%,100% { transform: translate(0px, 0px)    scale(1); }
          50%     { transform: translate(35px, 40px)   scale(1.06); }
        }
        @keyframes auroraBlob4 {
          0%,100% { transform: translate(0px, 0px)    scale(1); }
          40%     { transform: translate(-30px,-20px)  scale(1.12); }
          80%     { transform: translate(20px, 30px)   scale(0.9); }
        }
        @keyframes auroraBlob5 {
          0%,100% { transform: translate(0px, 0px)    scale(1); }
          30%     { transform: translate(50px, 20px)   scale(1.05); }
          70%     { transform: translate(-25px,-30px)  scale(0.95); }
        }

        /* ── Grain overlay ── */
        @keyframes grainShift {
          0%,100% { transform: translate(0, 0); }
          10%     { transform: translate(-2%, -3%); }
          20%     { transform: translate(3%, 2%); }
          30%     { transform: translate(-1%, 4%); }
          40%     { transform: translate(2%, -2%); }
          50%     { transform: translate(-3%, 1%); }
          60%     { transform: translate(1%, 3%); }
          70%     { transform: translate(3%, -1%); }
          80%     { transform: translate(-2%, 2%); }
          90%     { transform: translate(1%, -3%); }
        }

        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(72px);
          mix-blend-mode: screen;
          pointer-events: none;
          will-change: transform;
        }
        .aurora-b1 {
          width: 55vw; height: 55vw;
          top: -15%; left: -10%;
          background: radial-gradient(circle, rgba(139,92,246,0.55) 0%, transparent 65%);
          animation: auroraBlob1 18s ease-in-out infinite;
        }
        .aurora-b2 {
          width: 45vw; height: 45vw;
          top: 10%; right: -15%;
          background: radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 65%);
          animation: auroraBlob2 22s ease-in-out infinite;
        }
        .aurora-b3 {
          width: 50vw; height: 50vw;
          bottom: 5%; left: 20%;
          background: radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 65%);
          animation: auroraBlob3 16s ease-in-out infinite;
        }
        .aurora-b4 {
          width: 35vw; height: 35vw;
          top: 40%; left: -5%;
          background: radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 65%);
          animation: auroraBlob4 25s ease-in-out infinite;
        }
        .aurora-b5 {
          width: 40vw; height: 40vw;
          bottom: 20%; right: 5%;
          background: radial-gradient(circle, rgba(34,211,238,0.25) 0%, transparent 65%);
          animation: auroraBlob5 20s ease-in-out infinite;
        }

        /* Grain texture */
        .aurora-grain {
          position: fixed;
          inset: -50%;
          width: 200%; height: 200%;
          pointer-events: none;
          z-index: 1;
          opacity: 0.045;
          animation: grainShift 0.5s steps(1) infinite;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 300px 300px;
        }
      `}</style>

      {/* Fixed aurora layer — dưới mọi content */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: "#07050f", // deep dark purple-black thay vì đen xì
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* 5 aurora blobs */}
        <div className="aurora-blob aurora-b1" />
        <div className="aurora-blob aurora-b2" />
        <div className="aurora-blob aurora-b3" />
        <div className="aurora-blob aurora-b4" />
        <div className="aurora-blob aurora-b5" />

        {/* Vignette — tối 4 góc */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Grain overlay */}
      <div className="aurora-grain" aria-hidden />
    </>
  );
}
