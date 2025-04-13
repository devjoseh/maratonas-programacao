"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button, Input, Label, Textarea, useToast } from "@/components"
import type { CategoriaDocumento } from "@/utils/types/types";
import { createDocumento } from "../actions";
import { useState } from "react";
import type React from "react";

interface DocumentoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categorias: CategoriaDocumento[];
    onSuccess: () => void;
}

export function DocumentoDialog({
    open,
    onOpenChange,
    categorias,
    onSuccess,
}: DocumentoDialogProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        // Validar arquivo
        if (!selectedFile) {
            toast({
                title: "Erro",
                description: "Selecione um arquivo PDF para upload",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }

        try {
            await createDocumento(formData);
            toast({
                title: "Documento adicionado",
                description: "O documento foi adicionado com sucesso.",
            });
            onSuccess();
        } catch (error) {
            toast({
                title: "Erro",
                description: error instanceof Error
                    ? error.message
                    : "Ocorreu um erro ao adicionar o documento",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type !== "application/pdf") {
                toast({
                    title: "Formato inválido",
                    description: "Por favor, selecione apenas arquivos PDF.",
                    variant: "destructive",
                });
                event.target.value = "";
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Adicionar Documento</DialogTitle>
                        <DialogDescription>
                            Faça upload de um documento PDF para uma categoria
                            específica.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="titulo" className="text-right">
                                Título
                            </Label>
                            <Input
                                id="titulo"
                                name="titulo"
                                placeholder="Título do documento"
                                className="col-span-3"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="categoria" className="text-right">
                                Categoria
                            </Label>
                            <Select
                                name="categoria_id"
                                required
                                disabled={isSubmitting}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categorias.map((categoria) => (
                                        <SelectItem
                                            key={categoria.id}
                                            value={categoria.id}
                                        >
                                            {categoria.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="instituicao" className="text-right">
                                Instituição
                            </Label>
                            <Select
                                name="instituicao"
                                required
                                disabled={isSubmitting}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Selecione uma instituição" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ETEC Abdias">
                                        ETEC Abdias
                                    </SelectItem>
                                    <SelectItem value="FATEC">FATEC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="descricao" className="text-right">
                                Descrição
                            </Label>
                            <Textarea
                                id="descricao"
                                name="descricao"
                                placeholder="Descrição do documento (opcional)"
                                className="col-span-3"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="arquivo" className="text-right">
                                Arquivo PDF
                            </Label>
                            <Input
                                id="arquivo"
                                name="arquivo"
                                type="file"
                                accept="application/pdf"
                                className="col-span-3"
                                required
                                disabled={isSubmitting}
                                onChange={handleFileChange}
                            />
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
                            {isSubmitting ? "Enviando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
