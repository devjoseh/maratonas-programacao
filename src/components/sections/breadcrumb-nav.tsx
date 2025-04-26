"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const pathMap: Record<string, string> = {
    eventos: "Eventos",
    etec: "ETEC Abdias do Nascimento",
    fatec: "FATEC Zona Sul",
    sobre: "Sobre",
    objetivos: "Objetivos",
    regras: "Regras",
    "como-participar": "Como Participar",
    "como-se-preparar": "Como se Preparar",
    edicoes: "Edições Anteriores",
    contato: "Contato",
    inscricao: "Inscrição",
    sucesso: "Sucesso",
    admin: "Admin",
    equipes: "Equipes",
    documentos: "Documentos",
    nova: "Nova",
    novo: "Novo",
};

const nonLinkableSegments = new Set(['sobre', 'eventos']);

const getSegmentName = (segment: string) => {
    if (segment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        return "Detalhes";
    }

    return (
        pathMap[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    );
};

export function BreadcrumbNav() {
    const pathname = usePathname();

    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);

    if (segments[0] === "admin" && segments.length === 1) return null;

    return (
        <div className="mx-auto px-4 md:px-8 lg:px-16 py-2">
        {/* <div className="container mx-auto px-4 py-2"> */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">
                                <Home className="h-4 w-4" />
                                <span className="sr-only">Início</span>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {segments.map((segment, index) => {
                        const href = `/${segments.slice(0, index + 1).join("/")}`;
                        const isLast = index === segments.length - 1;
                        const isNonLinkable = nonLinkableSegments.has(segment);

                        return (
                            <React.Fragment key={segment}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {isLast || isNonLinkable ? (
                                        <BreadcrumbPage>
                                            {getSegmentName(segment)}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link href={href}>
                                                {getSegmentName(segment)}
                                            </Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}