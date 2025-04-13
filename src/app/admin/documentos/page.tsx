import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { DocumentosTable } from "./components/documentos-table";
import { CategoriasTable } from "./components/categorias-table";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DocumentosPage() {
    const supabase = await createClient();

    // Buscar categorias
    const { data: categorias } = await supabase
        .from("categorias_documentos")
        .select()
        .order("nome", { ascending: true });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Documentos
                </h1>
                <p className="text-muted-foreground">
                    Gerencie documentos PDF para diferentes categorias e
                    instituições.
                </p>
            </div>

            <Tabs defaultValue="documentos">
                <TabsList>
                    <TabsTrigger value="documentos">Documentos</TabsTrigger>
                    <TabsTrigger value="categorias">Categorias</TabsTrigger>
                </TabsList>
                <TabsContent value="documentos" className="space-y-4">
                    <Suspense
                        fallback={<Skeleton className="h-[400px] w-full" />}
                    >
                        <DocumentosTable categorias={categorias as any || []} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="categorias" className="space-y-4">
                    <Suspense
                        fallback={<Skeleton className="h-[400px] w-full" />}
                    >
                        <CategoriasTable categorias={categorias as any || []} />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    );
}
