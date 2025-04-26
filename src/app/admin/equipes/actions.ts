"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { EquipeInsert, EquipeUpdate, Participante } from "@/utils/types/types";

export async function getAllEvents() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("eventos")
        .select("id, titulo, ano, instituicao")
        .order("ano", { ascending: false })

    if (error) throw error;
    return data;
}

export async function query(searchParams: { [key:string]: string | string[] | undefined }) {
    const supabase = await createClient();
    
    const events = await getAllEvents()

    const eventoIds = Array.isArray(searchParams.evento)
        ? searchParams.evento : searchParams.evento
        ? [searchParams.evento] : []

    const statusValues = Array.isArray(searchParams.status)
        ? searchParams.status : searchParams.status
        ? [searchParams.status] : []

    const periodoValues = Array.isArray(searchParams.periodo)
        ? searchParams.periodo : searchParams.periodo
        ? [searchParams.periodo] : []
    
    let query = supabase
    .from("equipes")
    .select(`
        *,
        eventos:evento_id (
            titulo,
            ano,
            instituicao
        )
    `)

    if (eventoIds.length > 0) {
        query = query.in("evento_id", eventoIds)
    }
    
    if (statusValues.length > 0) {
        query = query.in("status_inscricao", statusValues)
    }
    
    if (periodoValues.length > 0) {
        query = query.in("periodo", periodoValues)
    }

    const { data, error } = await query.order("created_at", { ascending: false })
    
    if (error) throw error;
    return data;
}

export async function getTeams() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("equipes")
        .select(`
            *,
            eventos:evento_id (
                titulo,
                ano,
                instituicao
            )
        `)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}

export async function getTeamById(teamId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("equipes")
        .select(`
            *,
            eventos:evento_id (
                id,
                titulo,
                ano,
                instituicao,
                status
            )
        `)
        .eq("id", teamId)
        .single();

    if (error || !data) return false;
    return data;
}

export async function createEquipe(formData: FormData) {
    const supabase = await createClient();

    const evento_id = formData.get("evento_id") as string;
    const nome_equipe = formData.get("nome_equipe") as string;
    const status_inscricao = formData.get("status_inscricao") as | "pendente" | "confirmada";
    const tipo_equipe = formData.get("tipo_equipe") as | "competidores" | "organizacao";

    const participantesJson = formData.get("participantes") as string;
    let participantes: Participante[] = [];

    try {
        participantes = JSON.parse(participantesJson);
    } catch (error) {
        throw new Error("Formato inválido para participantes");
    }

    if (!evento_id || !nome_equipe || !status_inscricao || !participantes.length) {
        throw new Error("Todos os campos obrigatórios devem ser preenchidos");
    }

    const { data: evento } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", evento_id)
        .single();

    if (!evento) {
        throw new Error("Evento não encontrado");
    }

    if (evento.status === "finalizado") {
        throw new Error("Não é possível adicionar equipes a um evento finalizado");
    }

    // Determinar o período da equipe
    // Usaremos o período mais comum entre os participantes
    const periodoCount: Record<string, number> = {};
    participantes.forEach((p) => {
        if (p.periodo) {
            periodoCount[p.periodo] = (periodoCount[p.periodo] || 0) + 1;
        }
    });

    let periodo = "Manhã";
    let maxCount = 0;

    for (const [p, count] of Object.entries(periodoCount)) {
        if (count > maxCount) {
            maxCount = count;
            periodo = p;
        }
    }

    const novaEquipe: EquipeInsert = {
        evento_id,
        nome_equipe,
        periodo,
        status_inscricao,
        participantes,
        tipo_equipe,
    };

    const { error } = await supabase.from("equipes").insert(novaEquipe);

    if (error) {
        throw new Error(`Erro ao criar equipe: ${error.message}`);
    }

    revalidatePath("/admin/equipes");
    revalidatePath("/admin/eventos");
    redirect("/admin/equipes");
}

export async function updateEquipe(formData: FormData) {
    const supabase = await createClient();

    const id = formData.get("id") as string;
    const nome_equipe = formData.get("nome_equipe") as string;
    const status_inscricao = formData.get("status_inscricao") as | "pendente" | "confirmada";
    const tipo_equipe = formData.get("tipo_equipe") as | "competidores" | "organizacao";

    const participantesJson = formData.get("participantes") as string;
    let participantes: Participante[] = [];

    try {
        participantes = JSON.parse(participantesJson);
    } catch (error) {
        throw new Error("Formato inválido para participantes");
    }

    if (!id || !nome_equipe || !status_inscricao || !participantes.length) {
        throw new Error("Todos os campos obrigatórios devem ser preenchidos");
    }

    const { data: equipe } = await supabase
        .from("equipes")
        .select("evento_id")
        .eq("id", id)
        .single();

    if (!equipe || !equipe.evento_id) {
        throw new Error("Equipe não encontrada");
    }

    const { data: evento } = await supabase
        .from("eventos")
        .select("status")
        .eq("id", equipe.evento_id)
        .single();

    if (evento?.status === "finalizado") {
        throw new Error("Não é possível editar equipes de um evento finalizado");
    }

    const periodoCount: Record<string, number> = {};
    participantes.forEach((p) => {
        if (p.periodo) {
            periodoCount[p.periodo] = (periodoCount[p.periodo] || 0) + 1;
        }
    });

    let periodo = "Manhã";
    let maxCount = 0;

    for (const [p, count] of Object.entries(periodoCount)) {
        if (count > maxCount) {
            maxCount = count;
            periodo = p;
        }
    }

    const equipeAtualizada: EquipeUpdate = {
        nome_equipe,
        periodo,
        status_inscricao,
        participantes,
        tipo_equipe,
    };

    const { error } = await supabase
        .from("equipes")
        .update(equipeAtualizada)
        .eq("id", id);

    if (error) {
        throw new Error(`Erro ao atualizar equipe: ${error.message}`);
    }

    revalidatePath("/admin/equipes");
    revalidatePath("/admin/eventos");
    redirect("/admin/equipes");
}

export async function deleteEquipe(formData: FormData) {
    const supabase = await createClient();

    const id = formData.get("id") as string;

    if (!id) {
        throw new Error("ID da equipe não fornecido");
    }

    const { data: equipe } = await supabase
        .from("equipes")
        .select("evento_id")
        .eq("id", id)
        .single();

    if (!equipe || !equipe.evento_id) {
        throw new Error("Equipe não encontrada");
    }

    const { data: evento } = await supabase
        .from("eventos")
        .select("status")
        .eq("id", equipe.evento_id)
        .single();

    if (evento?.status === "finalizado") {
        throw new Error("Não é possível excluir equipes de um evento finalizado");
    }

    const { error } = await supabase.from("equipes").delete().eq("id", id);

    if (error) {
        throw new Error(`Erro ao excluir equipe: ${error.message}`);
    }

    revalidatePath("/admin/equipes");
    revalidatePath("/admin/eventos");
}
