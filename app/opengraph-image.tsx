import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          color: '#f8fafc',
          background: 'radial-gradient(circle at 80% 20%, #123d57 0, #0b1726 38%, #060a11 78%)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              padding: '12px 20px',
              borderRadius: 14,
              background: 'linear-gradient(110deg, #2563eb, #06b6d4)',
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            IMZO
          </div>
          <div style={{ color: '#94a3b8', fontSize: 24 }}>RASMIY DILER · RISHTON</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 920 }}>
          <div style={{ fontSize: 68, lineHeight: 1.08, fontWeight: 800 }}>
            Plastik va alyuminiy romlar, eshiklar
          </div>
          <div style={{ color: '#67e8f9', fontSize: 32 }}>Narxni hisoblang · Bepul o‘lchov</div>
        </div>
        <div style={{ color: '#94a3b8', fontSize: 24 }}>IMZO Rishton shourumi · Farg‘ona viloyati</div>
      </div>
    ),
    size,
  );
}
