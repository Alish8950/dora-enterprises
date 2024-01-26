import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material";
import theme from "@/assets/theme/theme";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Head from "next/head";
import TabLogo from '../../assets/images/google.svg'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dora Enterprises",
  description: "Ecommerce Solution for Drinks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <Head>
          <link rel="icon" href={TabLogo} />
        </Head>
        <body>
          <Header />
          {children}
          {/* <Footer /> */}
        </body>
      </html>
    </ThemeProvider>
  );
}
