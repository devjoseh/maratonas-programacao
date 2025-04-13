import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileIcon, DownloadIcon, ExternalLinkIcon } from "lucide-react";
import type { CategoriaDocumento } from "@/utils/types/types";
import { Button } from "@/components/ui/button";
import { getDocuments } from "../actions";

interface DocumentosListProps {
    instituicao: "ETEC Abdias" | "FATEC";
    categorias: CategoriaDocumento[];
}

export async function DocumentosList({
    instituicao,
    categorias,
}: DocumentosListProps) {
    const documentos = await getDocuments(instituicao)

    const documentosPorCategoria: Record<string, any[]> = {};

    categorias.forEach((categoria) => {
        documentosPorCategoria[categoria.id] = [];
    });

    documentos?.forEach((documento) => {
        if (documentosPorCategoria[documento.categoria_id]) {
            documentosPorCategoria[documento.categoria_id].push(documento);
        }
    });

    return (
        <div className="space-y-8">
            {categorias.map((categoria) => {
                const docs = documentosPorCategoria[categoria.id] || [];

                if (docs.length === 0) return null;

                return (
                    <Card className="py-6" key={categoria.id}>
                        <CardHeader>
                            <CardTitle>{categoria.nome}</CardTitle>
                            <CardDescription>
                                {categoria.descricao}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {docs.map((documento) => (
                                    <div key={documento.id} className="flex items-start p-4 border rounded-lg">
                                        <div className="mr-4">
                                            <FileIcon className="h-10 w-10 text-red-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium">
                                                {documento.titulo}
                                            </h3>
                                            {documento.descricao && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {documento.descricao}
                                                </p>
                                            )}
                                            <div className="flex mt-3 space-x-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={documento.arquivo_url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLinkIcon className="h-4 w-4 mr-1" />
                                                        Visualizar
                                                    </a>
                                                </Button>
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={documento.arquivo_url} download>
                                                        <DownloadIcon className="h-4 w-4 mr-1" />
                                                        Baixar
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}

            {Object.values(documentosPorCategoria).flat().length === 0 && (
                <div className="text-center p-12 border rounded-lg">
                    <FileIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                        Nenhum documento disponível
                    </h3>
                    <p className="text-gray-500">
                        Não há documentos disponíveis para {instituicao} no
                        momento.
                    </p>
                </div>
            )}
        </div>
    );
}
