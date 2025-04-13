"use server";

import { createClient } from "@/utils/supabase/server";

export async function getEvents() {
    const supabase = await createClient();

    const { data } = await supabase
    .from("eventos")
    .select("*")
    .in("status", ["finalizado", "em_andamento", "planejado"])
    .order("ano", { ascending: false })

    return data;
}

export async function getEventbyId(eventId:string) {
    const supabase = await createClient();

    const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .eq("id", eventId)
    .in("status", ["finalizado", "em_andamento", "planejado"])
    .single()

    if(error || !data) return false;
    return data;
}

export async function getEventTeams(eventId:string) {
    const supabase = await createClient();

    const { data } = await supabase
    .from("equipes")
    .select("*")
    .eq("evento_id", eventId)
    .eq("status_inscricao", "confirmada");

    return data
}