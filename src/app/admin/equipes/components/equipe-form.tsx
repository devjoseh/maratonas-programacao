"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Label,
    Input,
    Button,
    useToast,
    RadioGroup,
    RadioGroupItem,
} from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Participante } from "@/utils/types/types";
import { createEquipe, updateEquipe } from "../actions";
import { createClient } from "@/utils/supabase/client";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface EquipeFormProps {
    equipe?: any;
}

export function EquipeForm({ equipe }: EquipeFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [eventos, setEventos] = useState<any[]>([]);
    const [selectedEventoId, setSelectedEventoId] = useState<string>(
        equipe?.evento_id || ""
    );
    const [selectedEvento, setSelectedEvento] = useState<any>(null);
    const [participantes, setParticipantes] = useState<Participante[]>(
        equipe?.participantes?.map((p: Participante) => ({
            ...p,
            periodo: p.periodo || "Manhã",
        })) || [{ nome: "", serie: "", funcao: "aluno", periodo: "Manhã" }]
    );
    const [tipoEquipe, setTipoEquipe] = useState<
        "competidores" | "organizacao"
    >(equipe?.tipo_equipe || "competidores");

    // Verificar se o evento é da ETEC Abdias
    const isEtecAbdias =
        selectedEvento?.instituicao === "ETEC Abdias" ||
        equipe?.eventos?.instituicao === "ETEC Abdias";

    // Buscar eventos disponíveis
    useEffect(() => {
        const fetchEventos = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from("eventos")
                .select("*")
                .in("status", ["planejado", "em_andamento"])
                .order("data_inicio", { ascending: false });

            if (data) {
                setEventos(data);

                // Se não for edição e houver eventos, selecionar o primeiro
                if (!equipe && data.length > 0 && !selectedEventoId) {
                    setSelectedEventoId(data[0].id);
                    setSelectedEvento(data[0]);
                }

                // Se for edição, buscar o evento selecionado
                if (equipe && equipe.evento_id) {
                    const evento = data.find((e) => e.id === equipe.evento_id);
                    if (evento) {
                        setSelectedEvento(evento);
                    }
                }
            }
        };

        fetchEventos();
    }, [equipe, selectedEventoId]);

    // Atualizar o evento selecionado quando mudar o ID
    useEffect(() => {
        if (selectedEventoId && eventos.length > 0) {
            const evento = eventos.find((e) => e.id === selectedEventoId);
            if (evento) {
                setSelectedEvento(evento);
            }
        }
    }, [selectedEventoId, eventos]);

    const handleAddParticipante = () => {
        setParticipantes([
            ...participantes,
            {
                nome: "",
                serie: "",
                funcao: tipoEquipe === "competidores" ? "aluno" : "professor",
                periodo: "Manhã",
            },
        ]);
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

    // Função para atualizar a série formatada (para ETEC Abdias)
    const handleSerieChange = (index: number, serie: string, turma: string) => {
        const newParticipantes = [...participantes];
        newParticipantes[index] = {
            ...newParticipantes[index],
            serie: `${serie} ${turma}`,
        };
        setParticipantes(newParticipantes);
    };

    // Extrair série e turma de um participante (para ETEC Abdias)
    const extractSerieAndTurma = (participante: Participante) => {
        if (!participante.serie) return { serie: "", turma: "" };

        const parts = participante.serie.split(" ");
        if (parts.length >= 2) {
            return {
                serie: parts[0],
                turma: parts[1],
            };
        }

        return { serie: participante.serie, turma: "" };
    };

    const handleTipoEquipeChange = (value: "competidores" | "organizacao") => {
        setTipoEquipe(value);

        // Atualizar a função dos participantes com base no tipo de equipe
        if (participantes.length > 0) {
            const defaultFuncao =
                value === "competidores" ? "aluno" : "professor";
            const newParticipantes = participantes.map((p) => ({
                ...p,
                funcao:
                    value === "competidores"
                        ? "aluno"
                        : p.funcao === "aluno"
                        ? defaultFuncao
                        : p.funcao,
            }));
            setParticipantes(newParticipantes as any);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);

        // Adicionar participantes ao formData
        formData.set("participantes", JSON.stringify(participantes));
        formData.set("tipo_equipe", tipoEquipe);

        try {
            if (equipe) {
                await updateEquipe(formData);
            } else {
                await createEquipe(formData);
            }
        } catch (error) {
            setIsSubmitting(false);
            toast({
                title: "Erro",
                description:
                    error instanceof Error
                        ? error.message
                        : "Ocorreu um erro ao salvar a equipe",
                variant: "destructive",
            });
        }
    };

    // Verificar se o evento está finalizado
    const isEventoFinalizado = equipe?.eventos?.status === "finalizado";

    return (
        <form action={handleSubmit} className="space-y-6">
            {equipe && <input type="hidden" name="id" value={equipe.id} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="evento_id">Evento</Label>
                        {equipe ? (
                            <>
                                <input
                                    type="hidden"
                                    name="evento_id"
                                    value={equipe.evento_id}
                                />
                                <Input
                                    value={`${equipe.eventos?.titulo} (${equipe.eventos?.ano} - ${equipe.eventos?.instituicao})`}
                                    disabled
                                />
                            </>
                        ) : (
                            <Select
                                name="evento_id"
                                value={selectedEventoId}
                                onValueChange={setSelectedEventoId}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger id="evento_id">
                                    <SelectValue placeholder="Selecione um evento" />
                                </SelectTrigger>
                                <SelectContent>
                                    {eventos.map((evento) => (
                                        <SelectItem
                                            key={evento.id}
                                            value={evento.id}
                                        >
                                            {evento.titulo} ({evento.ano} -{" "}
                                            {evento.instituicao})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="nome_equipe">Nome da Equipe</Label>
                        <Input
                            id="nome_equipe"
                            name="nome_equipe"
                            defaultValue={equipe?.nome_equipe}
                            required
                            disabled={isSubmitting || isEventoFinalizado}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>Tipo de Equipe</Label>
                        <RadioGroup
                            value={tipoEquipe}
                            onValueChange={(v) =>
                                handleTipoEquipeChange(
                                    v as "competidores" | "organizacao"
                                )
                            }
                            className="flex flex-col space-y-1"
                            disabled={isSubmitting || isEventoFinalizado}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="competidores"
                                    id="competidores"
                                />
                                <Label
                                    htmlFor="competidores"
                                    className="cursor-pointer"
                                >
                                    Equipe de Competidores
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="organizacao"
                                    id="organizacao"
                                />
                                <Label
                                    htmlFor="organizacao"
                                    className="cursor-pointer"
                                >
                                    Equipe de Organização
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div>
                        <Label htmlFor="status_inscricao">
                            Status da Inscrição
                        </Label>
                        <Select
                            name="status_inscricao"
                            defaultValue={
                                equipe?.status_inscricao || "pendente"
                            }
                            disabled={isSubmitting || isEventoFinalizado}
                        >
                            <SelectTrigger id="status_inscricao">
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pendente">
                                    Pendente
                                </SelectItem>
                                <SelectItem value="confirmada">
                                    Confirmada
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div>
                    <Card className="py-6">
                        <CardHeader>
                            <CardTitle>
                                {tipoEquipe === "competidores"
                                    ? "Participantes"
                                    : "Membros da Organização"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {participantes.map((participante, index) => {
                                // Extrair série e turma para ETEC Abdias
                                const { serie, turma } = isEtecAbdias
                                    ? extractSerieAndTurma(participante)
                                    : { serie: "", turma: "" };

                                return (
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
                                                disabled={
                                                    isSubmitting ||
                                                    isEventoFinalizado
                                                }
                                                placeholder="Nome completo"
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
                                                disabled={
                                                    isSubmitting ||
                                                    isEventoFinalizado
                                                }
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
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {isEtecAbdias &&
                                        tipoEquipe === "competidores" ? (
                                            // Campos específicos para ETEC Abdias
                                            <div className="md:col-span-1 grid grid-cols-2 gap-2">
                                                <div>
                                                    <Label>Série</Label>
                                                    <Select
                                                        value={serie}
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            handleSerieChange(
                                                                index,
                                                                value,
                                                                turma
                                                            )
                                                        }
                                                        disabled={
                                                            isSubmitting ||
                                                            isEventoFinalizado
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Série" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1º">
                                                                1º
                                                            </SelectItem>
                                                            <SelectItem value="2º">
                                                                2º
                                                            </SelectItem>
                                                            <SelectItem value="3º">
                                                                3º
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label>Turma</Label>
                                                    <Select
                                                        value={turma}
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            handleSerieChange(
                                                                index,
                                                                serie,
                                                                value
                                                            )
                                                        }
                                                        disabled={
                                                            isSubmitting ||
                                                            isEventoFinalizado
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Turma" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="DS">
                                                                DS
                                                            </SelectItem>
                                                            <SelectItem value="ADM">
                                                                ADM
                                                            </SelectItem>
                                                            <SelectItem value="RH">
                                                                RH
                                                            </SelectItem>
                                                            <SelectItem value="ST">
                                                                ST
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        ) : (
                                            // Campo padrão para outras instituições ou equipes de organização
                                            <div>
                                                <Label>
                                                    {tipoEquipe ===
                                                    "competidores"
                                                        ? "Série/Turma"
                                                        : "Cargo/Função"}
                                                </Label>
                                                <Input
                                                    value={participante.serie}
                                                    onChange={(e) =>
                                                        handleParticipanteChange(
                                                            index,
                                                            "serie",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        isSubmitting ||
                                                        isEventoFinalizado
                                                    }
                                                    placeholder={
                                                        tipoEquipe ===
                                                        "competidores"
                                                            ? "Ex: 3º DS"
                                                            : "Ex: Coordenador"
                                                    }
                                                />
                                            </div>
                                        )}

                                        {tipoEquipe === "organizacao" && (
                                            <div className="md:col-span-2">
                                                <Label>Função</Label>
                                                <Select
                                                    value={participante.funcao}
                                                    onValueChange={(value) =>
                                                        handleParticipanteChange(
                                                            index,
                                                            "funcao",
                                                            value as any
                                                        )
                                                    }
                                                    disabled={
                                                        isSubmitting ||
                                                        isEventoFinalizado
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione a função" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="professor">
                                                            Professor
                                                        </SelectItem>
                                                        <SelectItem value="juiz">
                                                            Juiz
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}

                                        {!isEventoFinalizado && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() =>
                                                    handleRemoveParticipante(
                                                        index
                                                    )
                                                }
                                                disabled={
                                                    isSubmitting ||
                                                    participantes.length <= 1
                                                }
                                                className="md:col-span-4 w-8 h-8"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                );
                            })}

                            {!isEventoFinalizado && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleAddParticipante}
                                    disabled={isSubmitting}
                                    className="w-full"
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Adicionar{" "}
                                    {tipoEquipe === "competidores"
                                        ? "Participante"
                                        : "Membro"}
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/equipes")}
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={
                        isSubmitting ||
                        isEventoFinalizado ||
                        participantes.length === 0
                    }
                >
                    {isSubmitting
                        ? "Salvando..."
                        : equipe
                        ? "Atualizar"
                        : "Criar"}
                </Button>
            </div>
        </form>
    );
}
