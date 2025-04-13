"use server";

import { createClient } from "@/utils/supabase/server";

export async function getStastistics() {
    const supabase = await createClient();

    const { data: eventosCount } = await supabase
        .from("eventos")
        .select();

    const { data: equipesCount } = await supabase
        .from("equipes")
        .select();

    const { data: eventosAtivos } = await supabase
        .from("eventos")
        .select("*")
        .in("status", ["planejado", "em_andamento"])
        .order("data_inicio", { ascending: true })
        .limit(5);

    return { eventosCount, equipesCount, eventosAtivos };
}