import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { PostsProvider } from '@/context/PostsContext';
import { Header } from "@/components/Header";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
        <title>TFT News</title>
        <meta name="description" content="En guncel haberler icin takipte kalin." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <PostsProvider>
          {children}
        </PostsProvider>
        <Footer />
      </body>
    </html>
  );
}
