"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Participante } from "@/utils/types/types";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inscreverEquipe } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface InscricaoFormProps {
    evento: any;
}

export function InscricaoForm({ evento }: InscricaoFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [participantes, setParticipantes] = useState<Participante[]>([
        { nome: "", serie: "", funcao: "aluno", periodo: "Manhã" },
    ]);

    const handleAddParticipante = () => {
        if (participantes.length < 4) {
            setParticipantes([
                ...participantes,
                {
                    nome: "",
                    serie: "",
                    funcao: "aluno",
                    periodo: "Manhã",
                },
            ]);
        }
    };

    const handleRemoveParticipante = (index: number) => {
        const newParticipantes = [...participantes];
        newParticipantes.splice(index, 1);
        setParticipantes(newParticipantes);
    };

    const handleParticipanteChange = (
        index: number,
        field: keyof Participante,
        value: any
    ) => {
        const newParticipantes = [...participantes];
        newParticipantes[index] = {
            ...newParticipantes[index],
            [field]: value,
        };
        setParticipantes(newParticipantes);
    };

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);

        // Validar participantes
        const isValid = participantes.every((p) => p.nome && p.serie);
        if (!isValid) {
            toast({
                title: "Erro",
                description:
                    "Preencha todos os campos de todos os participantes",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }

        // Adicionar participantes e evento_id ao formData
        formData.set("participantes", JSON.stringify(participantes));
        formData.set("evento_id", evento.id);

        try {
            await inscreverEquipe(formData);
            toast({
                title: "Sucesso",
                description: "Inscrição realizada com sucesso!",
            });
            router.push("/inscricao/sucesso");
        } catch (error) {
            setIsSubmitting(false);
            toast({
                title: "Erro",
                description:
                    error instanceof Error
                        ? error.message
                        : "Ocorreu um erro ao realizar a inscrição",
                variant: "destructive",
            });
        }
    };

    return (
        <form action={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="nome_equipe">Nome da Equipe</Label>
                    <Input
                        id="nome_equipe"
                        name="nome_equipe"
                        required
                        disabled={isSubmitting}
                        placeholder="Digite o nome da sua equipe"
                    />
                </div>

                <div>
                    <Label htmlFor="email">Email para Contato</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={isSubmitting}
                        placeholder="Digite um email para contato"
                    />
                </div>
            </div>

            <Card className="py-6">
                <CardHeader>
                    <CardTitle>Participantes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {participantes.map((participante, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-md"
                        >
                            <div className="md:col-span-2">
                                <Label>Nome</Label>
                                <Input
                                    value={participante.nome}
                                    onChange={(e) =>
                                        handleParticipanteChange(
                                            index,
                                            "nome",
                                            e.target.value
                                        )
                                    }
                                    disabled={isSubmitting}
                                    placeholder="Nome completo"
                                    required
                                />
                            </div>

                            <div>
                                <Label>Período</Label>
                                <Select
                                    value={participante.periodo}
                                    onValueChange={(value) =>
                                        handleParticipanteChange(
                                            index,
                                            "periodo",
                                            value
                                        )
                                    }
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Período" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Manhã">
                                            Manhã
                                        </SelectItem>
                                        <SelectItem value="Tarde">
                                            Tarde
                                        </SelectItem>
                                        <SelectItem value="Noite">
                                            Noite
                                        </SelectItem>
                                        <SelectItem value="Integral">
                                            Integral
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Série/Turma</Label>
                                <Input
                                    value={participante.serie}
                                    onChange={(e) =>
                                        handleParticipanteChange(
                                            index,
                                            "serie",
                                            e.target.value
                                        )
                                    }
                                    disabled={isSubmitting}
                                    placeholder="Ex: 3º DS"
                                    required
                                />
                            </div>

                            <div className="flex items-end">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() =>
                                        handleRemoveParticipante(index)
                                    }
                                    disabled={
                                        isSubmitting ||
                                        participantes.length <= 1
                                    }
                                    className="w-8 h-8"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {participantes.length < 4 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddParticipante}
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Adicionar Participante{" "}
                            {participantes.length === 3 ? "(Reserva)" : ""}
                        </Button>
                    )}

                    <p className="text-sm text-gray-500 mt-2">
                        Adicione entre 1 e 3 participantes titulares. O 4º
                        participante será considerado reserva.
                    </p>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar Inscrição"}
                </Button>
            </div>
        </form>
    );
}
