import { EquipeForm } from "../components/equipe-form";
import { notFound } from "next/navigation";
import { getTeamById } from "../actions";

export default async function EditarEquipePage({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const equipe = await getTeamById(id)
    
    if (!equipe) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Editar Equipe</h1>
            <EquipeForm equipe={equipe} />
        </div>
    );
}