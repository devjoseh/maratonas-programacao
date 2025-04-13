"use server";

import { createClient } from "@/utils/supabase/server";

export async function getEvents() {
    const supabase = await createClient();

    const { data: eventosETEC } = await supabase
    .from("eventos")
    .select("*")
    .eq("instituicao", "ETEC Abdias")
    .in("status", ["planejado", "em_andamento"])
    .order("data_inicio", { ascending: true })
    .limit(1);

    const { data: eventosFATEC } = await supabase
    .from("eventos")
    .select("*")
    .eq("instituicao", "FATEC")
    .in("status", ["planejado", "em_andamento"])
    .order("data_inicio", { ascending: true })
    .limit(1);

    return { eventosETEC, eventosFATEC };
}

export async function getEventsByName(school:"ETEC Abdias"|"FATEC") {
    const supabase = await createClient();
    
    const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .eq("instituicao", school)
    .in("status", ["planejado", "em_andamento"])
    .order("data_inicio", { ascending: true })
    .limit(1);

    if(!data || error) return null;
    return data;
}