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
import { PlusIcon, FolderIcon, TrashIcon, PencilIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CategoriaDialog } from "./categoria-dialog";
import { deleteCategoria } from "../actions";
import { useRouter } from "next/navigation";
import type { CategoriaDocumento } from "@/utils/types/types";
import { Switch } from "@/components/ui/switch";
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

interface CategoriasTableProps {
    categorias: CategoriaDocumento[];
}

export function CategoriasTable({
    categorias: initialCategorias,
}: CategoriasTableProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categorias, setCategorias] =
        useState<CategoriaDocumento[]>(initialCategorias);
    const [editingCategoria, setEditingCategoria] =
        useState<CategoriaDocumento | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Carregar categorias
    const loadCategorias = async () => {
        setIsLoading(true);
        const supabase = createClient();
        const { data } = await supabase
            .from("categorias_documentos")
            .select("*")
            .order("nome", { ascending: true });

        setCategorias((data as any) || []);
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCategoria(new FormData(), id);
            toast({
                title: "Categoria excluída",
                description: "A categoria foi excluída com sucesso.",
            });
            loadCategorias();
        } catch (error) {
            toast({
                title: "Erro",
                description:
                    error instanceof Error
                        ? error.message
                        : "Ocorreu um erro ao excluir a categoria",
                variant: "destructive",
            });
        }
    };

    const handleEdit = (categoria: CategoriaDocumento) => {
        setEditingCategoria(categoria);
        setIsDialogOpen(true);
    };

    const handleToggleAtivo = async (categoria: CategoriaDocumento) => {
        try {
            const supabase = createClient();
            const { error } = await supabase
                .from("categorias_documentos")
                .update({ ativo: !categoria.ativo })
                .eq("id", categoria.id);

            if (error) throw new Error(error.message);

            toast({
                title: categoria.ativo
                    ? "Categoria desativada"
                    : "Categoria ativada",
                description: `A categoria foi ${
                    categoria.ativo ? "desativada" : "ativada"
                } com sucesso.`,
            });

            loadCategorias();
        } catch (error) {
            toast({
                title: "Erro",
                description:
                    error instanceof Error
                        ? error.message
                        : "Ocorreu um erro ao atualizar a categoria",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    Categorias de Documentos
                </h2>
                <Button
                    onClick={() => {
                        setEditingCategoria(null);
                        setIsDialogOpen(true);
                    }}
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Nova Categoria
                </Button>
            </div>

            <Card className="py-6">
                <CardHeader>
                    <CardTitle>Categorias</CardTitle>
                    <CardDescription>
                        Gerencie as categorias de documentos disponíveis no
                        sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <p>Carregando categorias...</p>
                        </div>
                    ) : categorias.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 space-y-3">
                            <FolderIcon className="h-10 w-10 text-gray-400" />
                            <p className="text-gray-500">
                                Nenhuma categoria cadastrada
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setEditingCategoria(null);
                                    setIsDialogOpen(true);
                                }}
                            >
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Adicionar Categoria
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Descrição</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Ações
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categorias.map((categoria) => (
                                        <TableRow key={categoria.id}>
                                            <TableCell className="font-medium">
                                                {categoria.nome}
                                            </TableCell>
                                            <TableCell>
                                                {categoria.slug}
                                            </TableCell>
                                            <TableCell>
                                                {categoria.descricao || "-"}
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={categoria.ativo}
                                                    onCheckedChange={() =>
                                                        handleToggleAtivo(
                                                            categoria
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleEdit(
                                                                categoria
                                                            )
                                                        }
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
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
                                                                    categoria
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Tem certeza
                                                                    que deseja
                                                                    excluir esta
                                                                    categoria?
                                                                    Todos os
                                                                    documentos
                                                                    associados a
                                                                    ela também
                                                                    serão
                                                                    excluídos.
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
                                                                            categoria.id
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
                        Total de categorias: {categorias.length}
                    </p>
                    <Button variant="outline" onClick={() => router.refresh()}>
                        Atualizar
                    </Button>
                </CardFooter>
            </Card>

            <CategoriaDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                categoria={editingCategoria}
                onSuccess={() => {
                    loadCategorias();
                    setIsDialogOpen(false);
                    setEditingCategoria(null);
                }}
            />
        </>
    );
}
