import { Database } from "./database.types";

export type Evento = Database["public"]["Tables"]["eventos"]["Row"];
export type EventoInsert = Database["public"]["Tables"]["eventos"]["Insert"];
export type EventoUpdate = Database["public"]["Tables"]["eventos"]["Update"];

export type Equipe = Database["public"]["Tables"]["equipes"]["Row"];
export type EquipeInsert = Database["public"]["Tables"]["equipes"]["Insert"];
export type EquipeUpdate = Database["public"]["Tables"]["equipes"]["Update"];

export type Participante = {
    nome: string;
    serie: string;
    funcao: "aluno" | "professor" | "juiz";
    periodo?: "Manhã" | "Tarde" | "Noite";
};

export type Vencedor = {
    equipe_id: string;
    nome_equipe: string;
    posicao: number;
    problemas_resolvidos: number;
};

export type CategoriaDocumento = {
    id: string;
    nome: string;
    slug: string;
    descricao: string | null;
    ativo: boolean;
    created_at: string;
    updated_at: string;
};

export type Documento = {
    id: string;
    categoria_id: string;
    instituicao: "ETEC Abdias" | "FATEC";
    titulo: string;
    descricao: string | null;
    arquivo_url: string;
    data_upload: string;
    created_at: string;
    updated_at: string;
};
