import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { deleteEquipe, getTeams } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EquipesPage() {
    const equipes = await getTeams()

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Equipes</h1>
                <Button asChild>
                    <Link href="/admin/equipes/nova">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Nova Equipe
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
                                    Nome da Equipe
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Evento
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Período
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Participantes
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
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
                            {equipes && equipes.length > 0 ? (
                                equipes.map((equipe) => (
                                    <tr key={equipe.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {equipe.nome_equipe}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {equipe.eventos?.titulo} (
                                            {equipe.eventos?.ano} -{" "}
                                            {equipe.eventos?.instituicao})
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {equipe.periodo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {Array.isArray(equipe.participantes)
                                                ? equipe.participantes.length
                                                : 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    equipe.status_inscricao ===
                                                    "confirmada"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {equipe.status_inscricao ===
                                                "confirmada"
                                                    ? "Confirmada"
                                                    : "Pendente"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={`/admin/equipes/${equipe.id}`}
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <form action={deleteEquipe}>
                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={equipe.id}
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        type="submit"
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        Nenhuma equipe encontrada
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
