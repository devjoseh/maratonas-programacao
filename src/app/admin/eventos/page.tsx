import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { deleteEvento, getEvents } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EventosPage() {
    const eventos = await getEvents()

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Eventos</h1>
                <Button asChild>
                    <Link href="/admin/eventos/novo">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Novo Evento
                    </Link>
                </Button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Ano
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Instituição
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Título
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Data Início
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Equipes
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {eventos && eventos.length > 0 ? (
                                eventos.map((evento) => (
                                    <tr key={evento.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {evento.ano}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {evento.instituicao}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {evento.titulo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(
                                                evento.data_inicio
                                            ).toLocaleDateString("pt-BR")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    evento.status === "planejado"
                                                        ? "bg-yellow-100 text-yellow-800" : evento.status === "em_andamento"
                                                        ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {evento.status === "planejado"
                                                    ? "Planejado" : evento.status === "em_andamento"
                                                    ? "Em Andamento" : "Finalizado"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {Array.isArray(evento.equipes_inscritas)
                                                ? evento.equipes_inscritas.length
                                                : 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Button asChild variant="ghost" size="sm">
                                                    <Link href={`/admin/eventos/${evento.id}`}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <form action={deleteEvento}>
                                                    <input type="hidden" name="id" value={evento.id}/>
                                                    <Button variant="ghost" size="sm" type="submit" className="text-red-600 hover:text-red-800">
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                                        Nenhum evento encontrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
