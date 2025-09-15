import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { dimensions: string[] } }
) {
  try {
    const resolvedParams = await params;
    const [width, height] = resolvedParams.dimensions;
    const w = parseInt(width) || 600;
    const h = parseInt(height) || 400;
    
    // Limit dimensions for security
    const maxDimension = 2000;
    const finalWidth = Math.min(w, maxDimension);
    const finalHeight = Math.min(h, maxDimension);
    
    // Create SVG placeholder
    const svg = `
      <svg width="${finalWidth}" height="${finalHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect x="10" y="10" width="${finalWidth - 20}" height="${finalHeight - 20}" fill="none" stroke="#d1d5db" stroke-width="2" stroke-dasharray="5,5"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.min(finalWidth, finalHeight) / 15}" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
          ${finalWidth} × ${finalHeight}
        </text>
        <circle cx="${finalWidth * 0.3}" cy="${finalHeight * 0.3}" r="${Math.min(finalWidth, finalHeight) / 20}" fill="#e5e7eb"/>
        <polygon points="${finalWidth * 0.2},${finalHeight * 0.7} ${finalWidth * 0.4},${finalHeight * 0.5} ${finalWidth * 0.6},${finalHeight * 0.8}" fill="#e5e7eb"/>
      </svg>
    `;
    
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating placeholder:', error);
    return new NextResponse('Error generating placeholder', { status: 500 });
  }
}