import { ThemeProvider } from "@/components/ui/theme-provider";
import { Inter } from "next/font/google";

import type { Metadata } from "next";
import type React from "react";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "HACKAS EF | Maratonas de Programação",
    description: "Maratonas de programação da ETEC Abdias do Nascimento e FATEC",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className={inter.className}>
                {/* <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                > */}
                    {children}
                {/* </ThemeProvider> */}
            </body>
        </html>
    );
}