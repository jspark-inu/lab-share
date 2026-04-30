import type { Metadata } from "next";
import Script from "next/script";
import "../styles/globals.css";

const CF_ANALYTICS_TOKEN = "bbd27652b28f4d5a957d3ec8604d7993";

export const metadata: Metadata = {
  metadataBase: new URL("https://lab.haiinu.com"),
  title: {
    default: "Lab Share — HAI Lab",
    template: "%s — Lab Share",
  },
  description:
    "인천대 HAI 연구실 내부 지식 공유와 프로젝트 운영 허브",
  applicationName: "Lab Share",
  authors: [{ name: "박준성", url: "https://lab.haiinu.com/authors/jspark-inu/" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Lab Share",
    url: "https://lab.haiinu.com",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
      </head>
      <body>
        {children}
        {/* Cloudflare Web Analytics — privacy-friendly PV tracking */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon={`{"token": "${CF_ANALYTICS_TOKEN}"}`}
        />
      </body>
    </html>
  );
}
