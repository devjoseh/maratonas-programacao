"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import type { Evento } from "@/utils/types/types";
import { Home } from "lucide-react";
import Link from "next/link";

interface InscricaoBreadcrumbProps {
    evento: Evento;
}

export function InscricaoBreadcrumb({
    evento
}: InscricaoBreadcrumbProps) {
    return (
        <div className="container mx-auto px-4 py-2">
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

                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/eventos/${evento.instituicao === "ETEC Abdias" ? "etec" : "fatec"}`}>
                                {evento.instituicao === "ETEC Abdias" ? "ETEC" : "FATEC"}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Inscrição: {evento.titulo}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
