import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'PackUp - Smart Travel Packing Lists';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          height: '100%',
          backgroundColor: '#3861FB', // Royal blue from the image
          padding: '80px',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '60px',
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: '16px' }}
          >
            <path
              d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22Z"
              stroke="white"
              strokeWidth="2"
            />
            <path d="M7 8H12H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M7 16H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h1
            style={{
              fontSize: '40px',
              fontWeight: 'bold',
              margin: 0,
              color: 'white',
            }}
          >
            PackUp
          </h1>
        </div>

        {/* Main heading */}
        <h2
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            lineHeight: 1.2,
            margin: 0,
            marginBottom: '40px',
            maxWidth: '800px',
          }}
        >
          Create a smart packing list for your trip!
        </h2>

        {/* First paragraph */}
        <p
          style={{
            fontSize: '36px',
            lineHeight: 1.5,
            margin: 0,
            marginBottom: '40px',
            maxWidth: '900px',
          }}
        >
          Personalized, AI-powered packing lists in seconds. No signup needed.
        </p>

        {/* Second paragraph */}
        <p
          style={{
            fontSize: '32px',
            lineHeight: 1.5,
            margin: 0,
            maxWidth: '900px',
          }}
        >
          Save time, pack smarter, and travel stress-free with tailored recommendations for every
          journey.
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(
            new URL('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap')
          ).then((res) => res.arrayBuffer()),
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: await fetch(
            new URL('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap')
          ).then((res) => res.arrayBuffer()),
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
