"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Evento, Vencedor } from "@/utils/types/types";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { finalizarEvento } from "../actions";
import { useState, useEffect } from "react";

interface FinalizarEventoFormProps {
    evento: Evento;
}

export function FinalizarEventoForm({ evento }: FinalizarEventoFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [equipes, setEquipes] = useState<any[]>([]);
    const [vencedores, setVencedores] = useState<Vencedor[]>([]);
    const [problemas, setProblemas] = useState<number>(0);

    useEffect(() => {
        const fetchEquipes = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from("equipes")
                .select("*")
                .eq("evento_id", evento.id)
                .eq("status_inscricao", "confirmada");

            if (data) {
                setEquipes(data);
            }
        };

        fetchEquipes();
    }, [evento.id]);

    const handleAddVencedor = () => {
        setVencedores([
            ...vencedores,
            {
                equipe_id: "",
                nome_equipe: "",
                posicao: vencedores.length + 1,
                problemas_resolvidos: 0,
            },
        ]);
    };

    const handleRemoveVencedor = (index: number) => {
        const newVencedores = [...vencedores];
        newVencedores.splice(index, 1);
        // Reordenar posições
        newVencedores.forEach((v, i) => {
            v.posicao = i + 1;
        });
        setVencedores(newVencedores);
    };

    const handleVencedorChange = (
        index: number,
        field: keyof Vencedor,
        value: any
    ) => {
        const newVencedores = [...vencedores];

        if (field === "equipe_id" && value) {
            const equipe = equipes.find((e) => e.id === value);
            if (equipe) {
                newVencedores[index] = {
                    ...newVencedores[index],
                    equipe_id: value,
                    nome_equipe: equipe.nome_equipe,
                };
            }
        } else {
            newVencedores[index] = {
                ...newVencedores[index],
                [field]: value,
            };
        }

        setVencedores(newVencedores);
    };

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);

        // Adicionar vencedores ao formData
        formData.set("vencedores", JSON.stringify(vencedores));
        formData.set("problemas_resolvidos", problemas.toString());

        try {
            await finalizarEvento(formData);
            toast({
                title: "Sucesso",
                description: "Evento finalizado com sucesso!",
            });
        } catch (error) {
            setIsSubmitting(false);
            toast({
                title: "Erro",
                description:
                    error instanceof Error
                        ? error.message
                        : "Ocorreu um erro ao finalizar o evento",
                variant: "destructive",
            });
        }
    };

    return (
        <form action={handleSubmit} className="space-y-6">
            <input type="hidden" name="id" value={evento.id} />

            <Card className="py-6">
                <CardHeader>
                    <CardTitle>Registrar Vencedores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="problemas_resolvidos">
                            Total de Problemas na Competição
                        </Label>
                        <Input
                            id="problemas_resolvidos"
                            type="number"
                            value={problemas}
                            onChange={(e) =>
                                setProblemas(
                                    Number.parseInt(e.target.value) || 0
                                )
                            }
                            min={0}
                            className="max-w-xs"
                        />
                    </div>

                    {vencedores.map((vencedor, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-md"
                        >
                            <div>
                                <Label>Posição</Label>
                                <Input value={vencedor.posicao} disabled />
                            </div>

                            <div>
                                <Label>Equipe</Label>
                                <Select
                                    value={vencedor.equipe_id}
                                    onValueChange={(value) =>
                                        handleVencedorChange(
                                            index,
                                            "equipe_id",
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione uma equipe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {equipes.map((equipe) => (
                                            <SelectItem
                                                key={equipe.id}
                                                value={equipe.id}
                                            >
                                                {equipe.nome_equipe}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Problemas Resolvidos</Label>
                                <Input
                                    type="number"
                                    value={vencedor.problemas_resolvidos}
                                    onChange={(e) =>
                                        handleVencedorChange(
                                            index,
                                            "problemas_resolvidos",
                                            Number.parseInt(e.target.value) || 0
                                        )
                                    }
                                    min={0}
                                    max={problemas}
                                />
                            </div>

                            <div className="flex items-end">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => handleRemoveVencedor(index)}
                                >
                                    Remover
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddVencedor}
                    >
                        Adicionar Vencedor
                    </Button>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isSubmitting || vencedores.length === 0}
                >
                    {isSubmitting ? "Finalizando..." : "Finalizar Evento"}
                </Button>
            </div>
        </form>
    );
}
