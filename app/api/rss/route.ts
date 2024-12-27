// filepath: /app/api/rss/route.ts
import { NextRequest, NextResponse } from "next/server";

const RSS_FEEDS: { [key: string]: string } = { //Burada RSS feedlerini tanımlıyoruz.
  ekonomi: "https://www.ntv.com.tr/ekonomi.rss",
  dunya: "https://www.ntv.com.tr/dunya.rss",
  egitim: "https://www.ntv.com.tr/egitim.rss",
  spor: "https://www.ntv.com.tr/spor.rss",
  teknoloji: "https://www.ntv.com.tr/teknoloji.rss",
  saglik: "https://www.ntv.com.tr/saglik.rss",
  otomobil: "https://www.ntv.com.tr/otomobil.rss",
  sondakika: "https://www.ntv.com.tr/son-dakika.rss",
  anasayfa: "https://www.ntv.com.tr/gundem.rss",
};

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category"); //Kategori parametresini alıyoruz.

  if (!category || !RSS_FEEDS[category]) {
    return NextResponse.json( //Eğer kategori yoksa veya RSS_FEEDS'de kategori yoksa hata döndürüyoruz.
      { error: "Geçersiz kategori veya RSS URL'si." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(RSS_FEEDS[category]);
    if (!response.ok) {
      throw new Error(`RSS alınamadı: ${response.statusText}`);
    }
    const xmlData = await response.text(); //RSS verisini alıyoruz.
    const sanitizedData = xmlData.replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;"); //Özel karakterleri düzeltiyoruz.

    return NextResponse.json({ data: sanitizedData }, { status: 200 });
  } catch (error: any) {
    console.error("API Proxy Hatası:", error.message);
    return NextResponse.json(
      { error: "RSS beslemesi alınamadı.", detail: error.message },
      { status: 500 }
    );
  }
}
