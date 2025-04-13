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
