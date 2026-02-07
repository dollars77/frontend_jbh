export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');
    
    if (!targetUrl) {
      return new Response('URL parameter is required', { status: 400 });
    }

    // ดึงเนื้อหาจากเว็บเป้าหมาย
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      return new Response('Failed to fetch content', { status: response.status });
    }

    let html = await response.text();
    
    // แก้ไข relative URLs ให้เป็น absolute
    const baseUrl = new URL(targetUrl).origin;
    html = html.replace(/href="\/([^"]*)"/g, `href="${baseUrl}/$1"`);
    html = html.replace(/src="\/([^"]*)"/g, `src="${baseUrl}/$1"`);
    
    // เพิ่ม CSS เพื่อป้องกันการคลิก
    html = html.replace('</head>', `
      <style>
        * { pointer-events: none !important; }
        body { overflow-x: hidden; }
      </style>
      </head>
    `);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'DENY'
      }
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}