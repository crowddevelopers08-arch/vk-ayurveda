import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VK Ayurveda — Pain Relief & Neuro Care",
  description:
    "NABH certified Ayurvedic hospital for pain relief, Panchakarma, stroke recovery, and neuro care.",

  icons: {
    icon: [
      { url: "/vk-logos.jpeg", sizes: "any" },
      { url: "/vk-logos.jpeg", sizes: "16x16", type: "image/png" },
      { url: "/vk-logos.jpeg", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/vk-logos.jpeg",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/vk-logos.jpeg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/vk-logos.jpeg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* Google Tag (GA4 + Google Ads) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-50TSQSZ6KT"
          strategy="afterInteractive"
        />

        {/* Google Analytics + Google Ads */}
        <Script id="google-tags" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());

            // Google Analytics (GA4)
            gtag('config', 'G-50TSQSZ6KT');

            // Google Ads Base Tag
            gtag('config', 'AW-11005175836');

            // Google Ads Phone Conversion Tracking
            gtag('config', 'AW-11005175836/tVo_COnlhKscEJzQ1v8o', {
              phone_conversion_number: '09996660102'
            });
          `}
        </Script>

        {/* Facebook Meta Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1013044221106865');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){
                (c[a].q=c[a].q||[]).push(arguments)
              };
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wpd8pc1303");
          `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col">
        {/* Facebook Pixel NoScript Fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1013044221106865&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}