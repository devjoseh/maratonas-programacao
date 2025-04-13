"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button, Input, Label, Textarea, useToast, Switch } from "@/components";
import { createCategoria, updateCategoria } from "../actions";
import type { CategoriaDocumento } from "@/utils/types/types";
import { useState, useEffect } from "react";
import type React from "react";

interface CategoriaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categoria: CategoriaDocumento | null;
    onSuccess: () => void;
}

export function CategoriaDialog({
    open,
    onOpenChange,
    categoria,
    onSuccess,
}: CategoriaDialogProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nome, setNome] = useState("");
    const [slug, setSlug] = useState("");
    const [descricao, setDescricao] = useState("");
    const [ativo, setAtivo] = useState(true);

    // Preencher o formulário quando estiver editando
    useEffect(() => {
        if (categoria) {
            setNome(categoria.nome);
            setSlug(categoria.slug);
            setDescricao(categoria.descricao || "");
            setAtivo(categoria.ativo);
        } else {
            setNome("");
            setSlug("");
            setDescricao("");
            setAtivo(true);
        }
    }, [categoria, open]);

    // Gerar slug a partir do nome
    const handleNomeChange = (value: string) => {
        setNome(value);
        setSlug(value
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "")
        );
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        try {
            if (categoria) {
                formData.append("id", categoria.id);
                await updateCategoria(formData);
                toast({
                    title: "Categoria atualizada",
                    description: "A categoria foi atualizada com sucesso.",
                });
            } else {
                await createCategoria(formData);
                toast({
                    title: "Categoria adicionada",
                    description: "A categoria foi adicionada com sucesso.",
                });
            }
            onSuccess();
        } catch (error) {
            toast({
                title: "Erro",
                description: error instanceof Error
                    ? error.message
                    : "Ocorreu um erro ao salvar a categoria",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {categoria ? "Editar Categoria" : "Nova Categoria"}
                        </DialogTitle>
                        <DialogDescription>
                            {categoria
                                ? "Edite os detalhes da categoria de documentos."
                                : "Adicione uma nova categoria para organizar os documentos."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nome" className="text-right">
                                Nome
                            </Label>
                            <Input
                                id="nome"
                                name="nome"
                                value={nome}
                                onChange={(e) => handleNomeChange(e.target.value)}
                                placeholder="Nome da categoria"
                                className="col-span-3"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="slug" className="text-right">
                                Slug
                            </Label>
                            <Input
                                id="slug"
                                name="slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="slug-da-categoria"
                                className="col-span-3"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="descricao" className="text-right">
                                Descrição
                            </Label>
                            <Textarea
                                id="descricao"
                                name="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descrição da categoria (opcional)"
                                className="col-span-3"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ativo" className="text-right">
                                Ativo
                            </Label>
                            <div className="col-span-3 flex items-center space-x-2">
                                <Switch
                                    id="ativo"
                                    name="ativo"
                                    checked={ativo}
                                    onCheckedChange={setAtivo}
                                    disabled={isSubmitting}
                                />
                                <span className="text-sm text-gray-500">
                                    {ativo
                                        ? "Categoria ativa"
                                        : "Categoria inativa"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? "Salvando..." : categoria
                                ? "Atualizar" : "Criar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
