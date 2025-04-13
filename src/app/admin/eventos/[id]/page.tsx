import { FinalizarEventoForm } from "../components/finalizar-evento-form";
import { EventoForm } from "../components/evento-form";
import { notFound } from "next/navigation";
import { getEventById } from "../actions";

export default async function EditarEventoPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params
    const evento = await getEventById(id)

    if (!evento) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Editar Evento</h1>

            <EventoForm evento={evento} />

            {evento.status === "em_andamento" && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Finalizar Evento</h2>
                    <FinalizarEventoForm evento={evento} />
                </div>
            )}
        </div>
    );
}
