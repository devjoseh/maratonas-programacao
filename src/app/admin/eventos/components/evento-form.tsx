"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch, Button, Input, Label, Editor, Card, CardContent, useToast } from "@/components"
import { createEvento, updateEvento } from "../actions";
import type { Evento } from "@/utils/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type React from "react";
import Image from "next/image";

interface EventoFormProps {
    evento?: Evento;
}

export function EventoForm({ evento }: EventoFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        evento?.imagem_url || null
    );

    const [inscricaoExterna, setInscricaoExterna] = useState<boolean>(
        evento?.inscricao_externa || false
    );

    const [descricao, setDescricao] = useState<string>(evento?.descricao || "");

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);

        // Adicionar a descrição do editor
        formData.set("descricao", descricao);

        try {
            if (evento) {
                await updateEvento(formData);
            } else {
                await createEvento(formData);
            }
        } catch (error) {
            setIsSubmitting(false);
            toast({
                title: "Erro",
                description: error instanceof Error
                    ? error.message
                    : "Ocorreu um erro ao salvar o evento",
                variant: "destructive",
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    // Verificar se o evento está finalizado
    const isFinalized = evento?.status === "finalizado";

    return (
        <form action={handleSubmit} className="space-y-6">
            {evento && <input type="hidden" name="id" value={evento.id} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="titulo">Título</Label>
                        <Input
                            id="titulo"
                            name="titulo"
                            defaultValue={evento?.titulo}
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="ano">Ano</Label>
                            <Input
                                id="ano"
                                name="ano"
                                type="number"
                                defaultValue={evento?.ano || new Date().getFullYear()}
                                required
                                disabled={isSubmitting || isFinalized}
                            />
                        </div>

                        <div>
                            <Label htmlFor="instituicao">Instituição</Label>
                            <Select
                                name="instituicao"
                                defaultValue={evento?.instituicao || "ETEC Abdias"}
                                disabled={isSubmitting || isFinalized}
                            >
                                <SelectTrigger id="instituicao">
                                    <SelectValue placeholder="Selecione a instituição" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ETEC Abdias">
                                        ETEC Abdias
                                    </SelectItem>
                                    <SelectItem value="FATEC">FATEC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="data_inicio">Data de Início</Label>
                            <Input
                                id="data_inicio"
                                name="data_inicio"
                                type="datetime-local"
                                defaultValue={evento?.data_inicio
                                    ? new Date(evento.data_inicio).toISOString().slice(0, 16)
                                    : ""
                                }
                                required
                                disabled={isSubmitting || isFinalized}
                            />
                        </div>

                        <div>
                            <Label htmlFor="data_fim">Data de Término</Label>
                            <Input
                                id="data_fim"
                                name="data_fim"
                                type="datetime-local"
                                defaultValue={evento?.data_fim
                                    ? new Date(evento.data_fim).toISOString().slice(0, 16)
                                    : ""
                                }
                                required
                                disabled={isSubmitting || isFinalized}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                            name="status"
                            defaultValue={evento?.status || "planejado"}
                            disabled={isSubmitting || isFinalized}
                        >
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="planejado">
                                    Planejado
                                </SelectItem>
                                <SelectItem value="em_andamento">
                                    Em Andamento
                                </SelectItem>
                                {evento && (
                                    <SelectItem value="finalizado">
                                        Finalizado
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="inscricao_externa">
                                Inscrição Externa
                            </Label>
                            <Switch
                                id="inscricao_externa"
                                name="inscricao_externa"
                                checked={inscricaoExterna}
                                onCheckedChange={setInscricaoExterna}
                                disabled={isSubmitting || isFinalized}
                            />
                        </div>
                        <p className="text-sm text-gray-500">
                            Ative esta opção se as inscrições serão feitas em
                            outro site (Google Forms, Even3, etc.)
                        </p>
                    </div>

                    {inscricaoExterna && (
                        <div>
                            <Label htmlFor="url_inscricao_externa">
                                URL para Inscrição Externa
                            </Label>
                            <Input
                                id="url_inscricao_externa"
                                name="url_inscricao_externa"
                                type="url"
                                placeholder="https://..."
                                defaultValue={evento?.url_inscricao_externa || ""}
                                required={inscricaoExterna}
                                disabled={isSubmitting || isFinalized}
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="imagem">Imagem</Label>
                        <Input
                            id="imagem"
                            name="imagem"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={isSubmitting}
                        />

                        {previewUrl && (
                            <Card className="mt-2">
                                <CardContent className="p-2">
                                    <div className="relative h-64 w-full">
                                        <Image
                                            src={previewUrl || "/placeholder.svg"}
                                            alt="Preview"
                                            fill
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Editor
                    value={descricao}
                    onChange={setDescricao}
                    disabled={isSubmitting}
                />
            </div>

            <div className="flex justify-end space-x-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/eventos")}
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? "Salvando..." : evento
                        ? "Atualizar" : "Criar"}
                </Button>
            </div>
        </form>
    );
}
