"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { EventoInsert, EventoUpdate } from "@/utils/types/types";

export async function getEvents() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .order("ano", { ascending: false })
        .order("data_inicio", { ascending: false });

    if (error) throw error;
    return data;
}

export async function getEventById(eventId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", eventId)
        .single();

    if (error || !data) return false;
    return data;
}

export async function createEvento(formData: FormData) {
    const supabase = await createClient();

    const titulo = formData.get("titulo") as string;
    const ano = Number.parseInt(formData.get("ano") as string);
    const instituicao = formData.get("instituicao") as "ETEC Abdias" | "FATEC";
    const descricao = formData.get("descricao") as string;
    const data_inicio = formData.get("data_inicio") as string;
    const data_fim = formData.get("data_fim") as string;
    const status = formData.get("status") as
        | "planejado"
        | "em_andamento"
        | "finalizado";
    const inscricao_externa =
        formData.get("inscricao_externa") === "on" ||
        formData.get("inscricao_externa") === "true";
    const url_inscricao_externa = formData.get("url_inscricao_externa") as
        | string
        | null;

    // Validar dados
    if (
        !titulo ||
        !ano ||
        !instituicao ||
        !data_inicio ||
        !data_fim ||
        !status
    ) {
        throw new Error("Todos os campos obrigatórios devem ser preenchidos");
    }

    // Validar URL de inscrição externa se necessário
    if (inscricao_externa && !url_inscricao_externa) {
        throw new Error(
            "A URL para inscrição externa é obrigatória quando a inscrição externa está ativada"
        );
    }

    // Verificar se já existe um evento para o mesmo ano e instituição
    const { data: existingEvent } = await supabase
        .from("eventos")
        .select("id")
        .eq("ano", ano)
        .eq("instituicao", instituicao)
        .maybeSingle();

    if (existingEvent) {
        throw new Error(
            `Já existe um evento para ${instituicao} no ano ${ano}`
        );
    }

    // Processar upload de imagem se houver
    let imagem_url = null;
    const imagem = formData.get("imagem") as File;

    if (imagem && imagem.size > 0) {
        const fileExt = imagem.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `eventos/${fileName}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
            .from("maratona")
            .upload(filePath, imagem, {
                cacheControl: "3600",
                upsert: false,
            });

        if (uploadError) {
            throw new Error(
                `Erro ao fazer upload da imagem: ${uploadError.message}`
            );
        }

        const { data: urlData } = supabase.storage
            .from("maratona")
            .getPublicUrl(filePath);

        imagem_url = urlData.publicUrl;
    }

    // Criar evento
    const novoEvento: EventoInsert = {
        titulo,
        ano,
        instituicao,
        descricao,
        data_inicio,
        data_fim,
        status,
        imagem_url,
        equipes_inscritas: [],
        vencedores: [],
        problemas_resolvidos: 0,
        metadados: {},
        inscricao_externa,
        url_inscricao_externa: inscricao_externa ? url_inscricao_externa : null,
    };

    const { error } = await supabase.from("eventos").insert(novoEvento);

    if (error) {
        throw new Error(`Erro ao criar evento: ${error.message}`);
    }

    revalidatePath("/admin/eventos");
    redirect("/admin/eventos");
}

export async function updateEvento(formData: FormData) {
    const supabase = await createClient();

    const id = formData.get("id") as string;
    const titulo = formData.get("titulo") as string;
    const ano = Number.parseInt(formData.get("ano") as string);
    const instituicao = formData.get("instituicao") as "ETEC Abdias" | "FATEC";
    const descricao = formData.get("descricao") as string;
    const data_inicio = formData.get("data_inicio") as string;
    const data_fim = formData.get("data_fim") as string;
    const status = formData.get("status") as
        | "planejado"
        | "em_andamento"
        | "finalizado";
    const inscricao_externa =
        formData.get("inscricao_externa") === "on" ||
        formData.get("inscricao_externa") === "true";
    const url_inscricao_externa = formData.get("url_inscricao_externa") as
        | string
        | null;

    // Validar dados
    if (
        !id ||
        !titulo ||
        !ano ||
        !instituicao ||
        !data_inicio ||
        !data_fim ||
        !status
    ) {
        throw new Error("Todos os campos obrigatórios devem ser preenchidos");
    }

    // Validar URL de inscrição externa se necessário
    if (inscricao_externa && !url_inscricao_externa) {
        throw new Error(
            "A URL para inscrição externa é obrigatória quando a inscrição externa está ativada"
        );
    }

    // Buscar evento atual para verificar o status
    const { data: eventoAtual } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", id)
        .single();

    if (!eventoAtual) {
        throw new Error("Evento não encontrado");
    }

    // Verificar se já existe outro evento para o mesmo ano e instituição
    if (eventoAtual.ano !== ano || eventoAtual.instituicao !== instituicao) {
        const { data: existingEvent } = await supabase
            .from("eventos")
            .select("id")
            .eq("ano", ano)
            .eq("instituicao", instituicao)
            .neq("id", id)
            .maybeSingle();

        if (existingEvent) {
            throw new Error(
                `Já existe um evento para ${instituicao} no ano ${ano}`
            );
        }
    }

    // Processar upload de imagem se houver
    let imagem_url = eventoAtual.imagem_url;
    const imagem = formData.get("imagem") as File;

    if (imagem && imagem.size > 0) {
        const fileExt = imagem.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `eventos/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from("maratona")
            .upload(filePath, imagem, {
                cacheControl: "3600",
                upsert: false,
            });

        if (uploadError) {
            throw new Error(
                `Erro ao fazer upload da imagem: ${uploadError.message}`
            );
        }

        const { data: urlData } = supabase.storage
            .from("maratona")
            .getPublicUrl(filePath);

        imagem_url = urlData.publicUrl;

        // Remover imagem antiga se existir
        if (eventoAtual.imagem_url) {
            const oldPath = eventoAtual.imagem_url.split("/").pop();
            if (oldPath) {
                await supabase.storage
                    .from("maratona")
                    .remove([`eventos/${oldPath}`]);
            }
        }
    }

    // Preparar dados para atualização
    const eventoAtualizado: EventoUpdate = {
        titulo,
        descricao,
        imagem_url,
        status,
        inscricao_externa,
        url_inscricao_externa: inscricao_externa ? url_inscricao_externa : null,
    };

    // Se o evento não estiver finalizado, permitir atualizar ano, instituição e datas
    if (eventoAtual.status !== "finalizado") {
        eventoAtualizado.ano = ano;
        eventoAtualizado.instituicao = instituicao;
        eventoAtualizado.data_inicio = data_inicio;
        eventoAtualizado.data_fim = data_fim;
    } else if (status !== "finalizado") {
        // Não permitir mudar o status de finalizado para outro
        throw new Error(
            "Não é possível alterar o status de um evento finalizado"
        );
    }

    // Atualizar evento
    const { error } = await supabase
        .from("eventos")
        .update(eventoAtualizado)
        .eq("id", id);

    if (error) {
        throw new Error(`Erro ao atualizar evento: ${error.message}`);
    }

    revalidatePath("/admin/eventos");
    revalidatePath(`/admin/eventos/${id}`);
    redirect("/admin/eventos");
}

export async function deleteEvento(formData: FormData) {
    const supabase = await createClient();

    const id = formData.get("id") as string;

    if (!id) {
        throw new Error("ID do evento não fornecido");
    }

    // Buscar evento para verificar se tem imagem
    const { data: evento } = await supabase
        .from("eventos")
        .select("imagem_url")
        .eq("id", id)
        .single();

    // Remover imagem se existir
    if (evento?.imagem_url) {
        const path = evento.imagem_url.split("/").pop();
        if (path) {
            await supabase.storage.from("maratona").remove([`eventos/${path}`]);
        }
    }

    // Remover evento
    const { error } = await supabase.from("eventos").delete().eq("id", id);

    if (error) {
        throw new Error(`Erro ao excluir evento: ${error.message}`);
    }

    revalidatePath("/admin/eventos");
}

export async function finalizarEvento(formData: FormData) {
    const supabase = await createClient();

    const id = formData.get("id") as string;
    const vencedoresJson = formData.get("vencedores") as string;
    const problemas_resolvidos =
        Number.parseInt(formData.get("problemas_resolvidos") as string) || 0;

    if (!id || !vencedoresJson) {
        throw new Error("Dados incompletos para finalizar o evento");
    }

    // Converter JSON de vencedores
    let vencedores;
    try {
        vencedores = JSON.parse(vencedoresJson);
    } catch (error) {
        throw new Error("Formato inválido para vencedores");
    }

    // Atualizar evento
    const { error } = await supabase
        .from("eventos")
        .update({
            status: "finalizado",
            vencedores,
            problemas_resolvidos,
        })
        .eq("id", id);

    if (error) {
        throw new Error(`Erro ao finalizar evento: ${error.message}`);
    }

    revalidatePath("/admin/eventos");
    revalidatePath(`/admin/eventos/${id}`);
    redirect("/admin/eventos");
}
