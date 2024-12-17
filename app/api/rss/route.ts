import { NextResponse } from "next/server";

export async function GET() {
  const RSS_URL = "https://www.ntv.com.tr/son-dakika.rss";

  try {
    const response = await fetch(RSS_URL);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch RSS" },
        { status: response.status }
      );
    }

    let xmlData = await response.text();

    // Özel karakterleri düzelt
    xmlData = xmlData.replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;");

    return new Response(xmlData, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
