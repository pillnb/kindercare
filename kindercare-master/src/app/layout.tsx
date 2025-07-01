import { Poppins } from "next/font/google"
import "./globals.css"
import { Metadata, Viewport } from "next"
import PWAStatus from "@/components/PWAStatus"
import OfflineIndicator from "@/components/OfflineIndicator"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins", // gunakan variable CSS
  display: "swap",
})

export const metadata: Metadata = {
  title: "KinderCare - Edukasi Perlindungan Anak",
  description: "Aplikasi edukasi perlindungan anak dengan materi interaktif, tips parenting, dan webinar",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["edukasi", "anak", "perlindungan", "parenting", "keamanan", "pendidikan"],
  authors: [{ name: "KinderCare Team" }],
  creator: "KinderCare",
  publisher: "KinderCare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon/icon-192x192.png",
    shortcut: "/icon/icon-192x192.png",
    apple: "/icon/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "KinderCare",
  },
  openGraph: {
    type: "website",
    siteName: "KinderCare",
    title: "KinderCare - Edukasi Perlindungan Anak",
    description: "Aplikasi edukasi perlindungan anak dengan materi interaktif, tips parenting, dan webinar",
    images: ["/icon/icon-512x512.png"],
  },
  twitter: {
    card: "summary",
    title: "KinderCare - Edukasi Perlindungan Anak",
    description: "Aplikasi edukasi perlindungan anak dengan materi interaktif, tips parenting, dan webinar",
    images: ["/icon/icon-512x512.png"],
    creator: "@kindercare",
  },
}

export const viewport: Viewport = {
  themeColor: "#ec4899",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={poppins.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="KinderCare" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileImage" content="/icon/icon-144x144.png" />
        <meta name="msapplication-TileColor" content="#ec4899" />
      </head>
      <body className="font-poppins">
        <OfflineIndicator />
        {children}
        <PWAStatus />
      </body>
    </html>
  )
}
