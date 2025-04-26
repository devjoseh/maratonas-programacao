import { Header, Footer, BreadcrumbNav } from "@/components/index";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <BreadcrumbNav />
            {children}
            <Footer />
        </>
    );
}