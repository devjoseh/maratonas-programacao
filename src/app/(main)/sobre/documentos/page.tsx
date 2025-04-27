import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClockIcon, UsersIcon, CodeIcon, CheckIcon } from "lucide-react";
import { DocumentosList } from "./components/documentos-list";
import { PageTitle, Button, Skeleton } from "@/components";
import { getCategories } from "./actions";
import { Suspense } from "react";
import Link from "next/link";

export default async function RulesPage() {
    const categorias = await getCategories();

    return (
        <div className="flex flex-col w-full">
            <PageTitle title="Documentos" />

            {/* Rules Tabs Section */}
            <section className="pb-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <Tabs defaultValue="etec" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="etec">ETEC Abdias</TabsTrigger>
                                <TabsTrigger value="fatec">FATEC Zona Sul</TabsTrigger>
                            </TabsList>

                            {/* ETEC */}
                            <TabsContent value="etec" className="space-y-4">
                                <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                                    <DocumentosList
                                        instituicao="ETEC Abdias"
                                        categorias={(categorias as any) || []}
                                    />
                                </Suspense>
                            </TabsContent>

                            {/* FATEC */}
                            <TabsContent value="fatec" className="space-y-4">
                                <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                                    <DocumentosList
                                        instituicao="FATEC"
                                        categorias={(categorias as any) || []}
                                    />
                                </Suspense>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>
        </div>
    );
}
