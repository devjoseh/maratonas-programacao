"use server";

import { createClient } from "@/utils/supabase/server";

export async function getCategories() {
    const supabase = await createClient();

    const { data } = await supabase
    .from("categorias_documentos")
    .select("*")
    .eq("ativo", true)
    .order("nome", { ascending: true });

    return data;
}

export async function getDocuments(instituicao:string) {
    const supabase = await createClient();

    const { data } = await supabase
    .from("documentos")
    .select("*")
    .eq("instituicao", instituicao)
    .order("data_upload", { ascending: false });

    return data;
}