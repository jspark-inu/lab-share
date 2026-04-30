import type { Metadata } from "next";
import "../styles/globals.css";

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
      <body>{children}</body>
    </html>
  );
}
