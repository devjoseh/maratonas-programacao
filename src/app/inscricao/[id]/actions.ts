"use server";

import type { EquipeInsert, Participante } from "@/utils/types/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getEventById(eventId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", eventId)
        .in("status", ["planejado", "em_andamento"])
        .single();

    if (error || !data) return false;
    return data;
}

export async function inscreverEquipe(formData: FormData) {
    const supabase = await createClient();

    const evento_id = formData.get("evento_id") as string;
    const nome_equipe = formData.get("nome_equipe") as string;
    const email = formData.get("email") as string;

    // Processar participantes
    const participantesJson = formData.get("participantes") as string;
    let participantes: Participante[] = [];

    try {
        participantes = JSON.parse(participantesJson);
    } catch (error) {
        throw new Error("Formato inválido para participantes");
    }

    // Validar dados
    if (!evento_id || !nome_equipe || !email || !participantes.length) {
        throw new Error("Todos os campos obrigatórios devem ser preenchidos");
    }

    // Verificar se o evento existe e está aberto para inscrições
    const { data: evento } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", evento_id)
        .in("status", ["planejado", "em_andamento"])
        .single();

    if (!evento) {
        throw new Error(
            "Evento não encontrado ou não está aceitando inscrições"
        );
    }

    // Verificar se o evento usa inscrição externa
    if (evento.inscricao_externa) {
        throw new Error(
            "Este evento utiliza um sistema externo para inscrições"
        );
    }

    // Verificar se já existe uma equipe com o mesmo nome
    const { data: equipeExistente } = await supabase
        .from("equipes")
        .select("id")
        .eq("evento_id", evento_id)
        .eq("nome_equipe", nome_equipe)
        .maybeSingle();

    if (equipeExistente) {
        throw new Error("Já existe uma equipe com este nome neste evento");
    }

    // Adicionar email aos metadados
    const metadados = { email };

    // Determinar o período da equipe (para compatibilidade com o código existente)
    const periodoCount: Record<string, number> = {};
    participantes.forEach((p) => {
        if (p.periodo) {
            periodoCount[p.periodo] = (periodoCount[p.periodo] || 0) + 1;
        }
    });

    let periodo = "Manhã"; // valor padrão
    let maxCount = 0;

    for (const [p, count] of Object.entries(periodoCount)) {
        if (count > maxCount) {
            maxCount = count;
            periodo = p;
        }
    }

    // Criar equipe
    const novaEquipe: EquipeInsert = {
        evento_id,
        nome_equipe,
        periodo,
        status_inscricao: "pendente",
        participantes,
        tipo_equipe: "competidores",
    };

    const { error } = await supabase.from("equipes").insert(novaEquipe);

    if (error) {
        throw new Error(`Erro ao criar equipe: ${error.message}`);
    }

    revalidatePath("/admin/equipes");
    revalidatePath("/admin/eventos");
}
