"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    PlusIcon,
    FileIcon,
    TrashIcon,
    ExternalLinkIcon,
    DownloadIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { DocumentoDialog } from "./documento-dialog";
import { deleteDocumento } from "../actions";
import { useRouter } from "next/navigation";
import type { CategoriaDocumento, Documento } from "@/utils/types/types";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createClient } from "@/utils/supabase/client";

interface DocumentosTableProps {
    categorias: CategoriaDocumento[];
}

export function DocumentosTable({ categorias }: DocumentosTableProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [documentos, setDocumentos] = useState<Documento[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Carregar documentos
    const loadDocumentos = async () => {
        setIsLoading(true);
        const supabase = createClient();
        const { data } = await supabase
            .from("documentos")
            .select("*")
            .order("data_upload", { ascending: false });

        setDocumentos((data as any) || []);
        setIsLoading(false);
    };

    // Carregar documentos na montagem do componente
    useState(() => {
        loadDocumentos();
    });

    const handleDelete = async (id: string) => {
        try {
            await deleteDocumento(new FormData(), id);
            toast({
                title: "Documento excluído",
                description: "O documento foi excluído com sucesso.",
            });
            loadDocumentos();
        } catch (error) {
            toast({
                title: "Erro",
                description:
                    error instanceof Error
                        ? error.message
                        : "Ocorreu um erro ao excluir o documento",
                variant: "destructive",
            });
        }
    };

    const getCategoriaName = (categoriaId: string) => {
        const categoria = categorias.find((c) => c.id === categoriaId);
        return categoria ? categoria.nome : "Categoria não encontrada";
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Lista de Documentos</h2>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Novo Documento
                </Button>
            </div>

            <Card className="py-6">
                <CardHeader>
                    <CardTitle>Documentos</CardTitle>
                    <CardDescription>
                        Gerencie os documentos PDF disponíveis para download no
                        site.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <p>Carregando documentos...</p>
                        </div>
                    ) : documentos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 space-y-3">
                            <FileIcon className="h-10 w-10 text-gray-400" />
                            <p className="text-gray-500">
                                Nenhum documento cadastrado
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Adicionar Documento
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Título</TableHead>
                                        <TableHead>Categoria</TableHead>
                                        <TableHead>Instituição</TableHead>
                                        <TableHead>Data de Upload</TableHead>
                                        <TableHead className="text-right">
                                            Ações
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {documentos.map((documento) => (
                                        <TableRow key={documento.id}>
                                            <TableCell className="font-medium">
                                                {documento.titulo}
                                            </TableCell>
                                            <TableCell>
                                                {getCategoriaName(
                                                    documento.categoria_id
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        documento.instituicao ===
                                                        "ETEC Abdias"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {documento.instituicao}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    documento.data_upload
                                                ).toLocaleDateString("pt-BR")}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <a
                                                            href={
                                                                documento.arquivo_url
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <ExternalLinkIcon className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <a
                                                            href={
                                                                documento.arquivo_url
                                                            }
                                                            download
                                                        >
                                                            <DownloadIcon className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="destructive"
                                                                size="icon"
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Excluir
                                                                    documento
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Tem certeza
                                                                    que deseja
                                                                    excluir este
                                                                    documento?
                                                                    Esta ação
                                                                    não pode ser
                                                                    desfeita.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>
                                                                    Cancelar
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            documento.id
                                                                        )
                                                                    }
                                                                >
                                                                    Excluir
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <p className="text-sm text-gray-500">
                        Total de documentos: {documentos.length}
                    </p>
                    <Button variant="outline" onClick={() => router.refresh()}>
                        Atualizar
                    </Button>
                </CardFooter>
            </Card>

            <DocumentoDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                categorias={categorias}
                onSuccess={() => {
                    loadDocumentos();
                    setIsDialogOpen(false);
                }}
            />
        </>
    );
}
