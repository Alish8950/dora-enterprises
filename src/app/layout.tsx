import type { Metadata } from "next";
import { Inter } from "next/font/google";
import theme from "@/assets/theme/theme";
import "./globals.scss";
import { ThemeProvider } from "@mui/material";
import { AppProvider } from "@/context/productList";
import { TestimonialsProvider } from "@/context/testimonialsContext";
import { CartProvider } from "@/context/cartContext";
import { AddressProvider } from "@/context/addressContext";
import { AuthAppProvider } from "@/context/authContext";
import {
  GlobalLoader,
  LoaderProvider,
  useLoader,
} from "@/context/loaderContext";
import Loader from "@/components/Loader";
import { OrderContextProvider } from "@/context/ordersContext";
import { RouterProvider } from "@/context/routeContext";
import Head from "next/head";
import TabLogo from '../assets/images/google.svg'

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
    <html lang="en">
       <Head>
          <link rel="icon" href={TabLogo} />
        </Head>
      <body>
        <RouterProvider>
          <LoaderProvider>
            <AuthAppProvider>
              <AppProvider>
                <CartProvider>
                  <AddressProvider>
                    <OrderContextProvider>
                      <TestimonialsProvider>
                        {children}
                        <GlobalLoader />
                      </TestimonialsProvider>
                    </OrderContextProvider>
                  </AddressProvider>
                </CartProvider>
              </AppProvider>
            </AuthAppProvider>
          </LoaderProvider>
        </RouterProvider>
      </body>
    </html>
  );
}
