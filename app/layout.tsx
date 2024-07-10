import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
    title: "Quanta Bank",
    description:
        "Financial platform for real-time bank account management and fund transfers",
    icons: {
        icon: "/icons/logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
                <NextTopLoader showSpinner={false} />
                {children}
            </body>
        </html>
    );
}
