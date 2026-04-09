import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const placeholderEnv = '# Placeholder env for Flutter web asset lookup\n';

export function GET() {
  return new NextResponse(placeholderEnv, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export function HEAD() {
  return new NextResponse(null, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
