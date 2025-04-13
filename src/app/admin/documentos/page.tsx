import { Tabs, TabsContent, TabsList, TabsTrigger, Skeleton } from "@/components"
import { DocumentosTable } from "./components/documentos-table";
import { CategoriasTable } from "./components/categorias-table";
import { getDocuments } from "./actions";
import { Suspense } from "react";

export default async function DocumentosPage() {
    const categorias = await getDocuments()

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
                    <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                        <DocumentosTable categorias={categorias as any || []} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="categorias" className="space-y-4">
                    <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                        <CategoriasTable categorias={categorias as any || []} />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    );
}
