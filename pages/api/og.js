import { ImageResponse } from 'next/og'

export const config = {
  runtime: 'edge',
}

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0d1117',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #58a6ff 0%, #bc8cff 50%, #58a6ff 100%)',
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#e6edf3',
            letterSpacing: '-2px',
            marginBottom: '16px',
          }}
        >
          Othmen Mzeh
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: '#58a6ff',
            marginBottom: '40px',
            letterSpacing: '0.5px',
          }}
        >
          Engineering Manager & AI-Driven Leader
        </div>

        {/* Separator */}
        <div
          style={{
            width: '80px',
            height: '2px',
            backgroundColor: '#30363d',
            marginBottom: '40px',
          }}
        />

        {/* Tags */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['15+ ans d\'expérience', 'Tunisie · Remote', 'IA Générative'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 20px',
                backgroundColor: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '20px',
                color: '#8b949e',
                fontSize: '18px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            fontSize: '20px',
            color: '#484f58',
          }}
        >
          omzeh.tn
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
