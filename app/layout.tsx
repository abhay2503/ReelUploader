import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ReelUploader",
  description: "Demo of ReelUploader integration with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>

      </body>
    </html>
  );
}
