"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// Ações para Documentos
export async function createDocumento(formData: FormData) {
    const supabase = await createClient();

    const titulo = formData.get("titulo") as string;
    const categoria_id = formData.get("categoria_id") as string;
    const instituicao = formData.get("instituicao") as "ETEC Abdias" | "FATEC";
    const descricao = formData.get("descricao") as string;
    const arquivo = formData.get("arquivo") as File;

    // Validar dados
    if (!titulo || !categoria_id || !instituicao || !arquivo) {
        throw new Error("Todos os campos obrigatórios devem ser preenchidos");
    }

    // Verificar se a categoria existe
    const { data: categoria } = await supabase
        .from("categorias_documentos")
        .select("id")
        .eq("id", categoria_id)
        .single();

    if (!categoria) {
        throw new Error("Categoria não encontrada");
    }

    // Fazer upload do arquivo
    const fileExt = arquivo.name.split(".").pop();
    const fileName = `${Date.now()}_${titulo
        .toLowerCase()
        .replace(/\s+/g, "-")}.${fileExt}`;
    const filePath = `documentos/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from("maratona")
        .upload(filePath, arquivo, {
            cacheControl: "3600",
            upsert: false,
        });

    if (uploadError) {
        throw new Error(
            `Erro ao fazer upload do arquivo: ${uploadError.message}`
        );
    }

    // Obter URL pública do arquivo
    const { data: urlData } = supabase.storage
        .from("maratona")
        .getPublicUrl(filePath);
    const arquivo_url = urlData.publicUrl;

    // Criar documento
    const { error } = await supabase.from("documentos").insert({
        titulo,
        categoria_id,
        instituicao,
        descricao: descricao || null,
        arquivo_url,
        data_upload: new Date().toISOString(),
    });

    if (error) {
        // Remover arquivo se houver erro ao criar o documento
        await supabase.storage.from("maratona").remove([filePath]);
        throw new Error(`Erro ao criar documento: ${error.message}`);
    }

    revalidatePath("/admin/documentos");
}

export async function deleteDocumento(formData: FormData, id?: string) {
    const supabase = await createClient();

    const documentoId = id || (formData.get("id") as string);

    if (!documentoId) {
        throw new Error("ID do documento não fornecido");
    }

    // Buscar documento para obter URL do arquivo
    const { data: documento } = await supabase
        .from("documentos")
        .select("arquivo_url")
        .eq("id", documentoId)
        .single();

    if (!documento) {
        throw new Error("Documento não encontrado");
    }

    // Extrair caminho do arquivo da URL
    const filePath = documento.arquivo_url.split("/").pop();
    if (filePath) {
        // Remover arquivo do storage
        await supabase.storage
            .from("maratona")
            .remove([`documentos/${filePath}`]);
    }

    // Remover documento
    const { error } = await supabase
        .from("documentos")
        .delete()
        .eq("id", documentoId);

    if (error) {
        throw new Error(`Erro ao excluir documento: ${error.message}`);
    }

    revalidatePath("/admin/documentos");
}

// Ações para Categorias
export async function createCategoria(formData: FormData) {
    const supabase = await createClient();

    const nome = formData.get("nome") as string;
    const slug = formData.get("slug") as string;
    const descricao = formData.get("descricao") as string;
    const ativo =
        formData.get("ativo") === "on" || formData.get("ativo") === "true";

    // Validar dados
    if (!nome || !slug) {
        throw new Error("Nome e slug são obrigatórios");
    }

    // Verificar se já existe uma categoria com o mesmo slug
    const { data: categoriaExistente } = await supabase
        .from("categorias_documentos")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

    if (categoriaExistente) {
        throw new Error("Já existe uma categoria com este slug");
    }

    // Criar categoria
    const { error } = await supabase.from("categorias_documentos").insert({
        nome,
        slug,
        descricao: descricao || null,
        ativo,
    });

    if (error) {
        throw new Error(`Erro ao criar categoria: ${error.message}`);
    }

    revalidatePath("/admin/documentos");
}

export async function updateCategoria(formData: FormData) {
    const supabase = await createClient();

    const id = formData.get("id") as string;
    const nome = formData.get("nome") as string;
    const slug = formData.get("slug") as string;
    const descricao = formData.get("descricao") as string;
    const ativo =
        formData.get("ativo") === "on" || formData.get("ativo") === "true";

    // Validar dados
    if (!id || !nome || !slug) {
        throw new Error("ID, nome e slug são obrigatórios");
    }

    // Verificar se já existe outra categoria com o mesmo slug
    const { data: categoriaExistente } = await supabase
        .from("categorias_documentos")
        .select("id")
        .eq("slug", slug)
        .neq("id", id)
        .maybeSingle();

    if (categoriaExistente) {
        throw new Error("Já existe outra categoria com este slug");
    }

    // Atualizar categoria
    const { error } = await supabase
        .from("categorias_documentos")
        .update({
            nome,
            slug,
            descricao: descricao || null,
            ativo,
        })
        .eq("id", id);

    if (error) {
        throw new Error(`Erro ao atualizar categoria: ${error.message}`);
    }

    revalidatePath("/admin/documentos");
}

export async function deleteCategoria(formData: FormData, id?: string) {
    const supabase = await createClient();

    const categoriaId = id || (formData.get("id") as string);

    if (!categoriaId) {
        throw new Error("ID da categoria não fornecido");
    }

    // Buscar documentos associados à categoria
    const { data: documentos } = await supabase
        .from("documentos")
        .select("id, arquivo_url")
        .eq("categoria_id", categoriaId);

    // Remover arquivos do storage
    if (documentos && documentos.length > 0) {
        const filePaths = documentos
            .map((doc) => {
                const filePath = doc.arquivo_url.split("/").pop();
                return filePath ? `documentos/${filePath}` : null;
            })
            .filter(Boolean) as string[];

        if (filePaths.length > 0) {
            await supabase.storage.from("maratona").remove(filePaths);
        }
    }

    // Remover categoria (os documentos serão removidos automaticamente pela constraint ON DELETE CASCADE)
    const { error } = await supabase
        .from("categorias_documentos")
        .delete()
        .eq("id", categoriaId);

    if (error) {
        throw new Error(`Erro ao excluir categoria: ${error.message}`);
    }

    revalidatePath("/admin/documentos");
}
