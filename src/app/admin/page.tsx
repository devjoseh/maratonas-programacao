import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, UsersIcon, CheckCircleIcon, ClockIcon } from "lucide-react";
import { isAuthenticated } from "@/utils/actions/auth";
import { Button } from "@/components/ui/button";
import { getStastistics } from "./actions";
import Link from "next/link";

export default async function AdminDashboard() {
    const { equipesCount, eventosAtivos, eventosCount } = await getStastistics()

    return (
        <div className="mx-auto px-4 md:px-8 lg:px-16 py-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardContent className="py-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-full mr-4">
                                <CalendarIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total de Eventos
                                </p>
                                <p className="text-2xl font-bold">
                                    {eventosCount?.length || 0}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="py-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-full mr-4">
                                <UsersIcon className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total de Equipes
                                </p>
                                <p className="text-2xl font-bold">
                                    {equipesCount?.length || 0}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="py-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-full mr-4">
                                <ClockIcon className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Eventos Planejados
                                </p>
                                <p className="text-2xl font-bold">
                                    {eventosAtivos?.filter(
                                        (e) => e.status === "planejado"
                                    ).length || 0}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="py-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-full mr-4">
                                <CheckCircleIcon className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Eventos em Andamento
                                </p>
                                <p className="text-2xl font-bold">
                                    {eventosAtivos?.filter(
                                        (e) => e.status === "em_andamento"
                                    ).length || 0}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="py-6">
                    <CardHeader>
                        <CardTitle>Eventos Recentes</CardTitle>
                        <CardDescription>
                            Lista dos eventos mais recentes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {eventosAtivos && eventosAtivos.length > 0 ? (
                            <div className="space-y-4">
                                {eventosAtivos.map((evento) => (
                                    <div
                                        key={evento.id}
                                        className="flex justify-between items-center p-4 border rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {evento.titulo}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(
                                                    evento.data_inicio
                                                ).toLocaleDateString(
                                                    "pt-BR"
                                                )}{" "}
                                                - {evento.instituicao}
                                            </p>
                                        </div>
                                        <div>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    evento.status ===
                                                    "planejado"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-green-100 text-green-800"
                                                }`}
                                            >
                                                {evento.status === "planejado"
                                                    ? "Planejado"
                                                    : "Em Andamento"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                Nenhum evento ativo no momento.
                            </p>
                        )}

                        <div className="mt-4">
                            <Button asChild variant="outline">
                                <Link href="/admin/eventos">
                                    Ver todos os eventos
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="py-6">
                    <CardHeader>
                        <CardTitle>Ações Rápidas</CardTitle>
                        <CardDescription>
                            Atalhos para ações comuns
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Button asChild className="w-full">
                                <Link href="/admin/eventos/novo">
                                    Criar Novo Evento
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="w-full"
                            >
                                <Link href="/admin/equipes/nova">
                                    Cadastrar Nova Equipe
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="w-full"
                            >
                                <Link href="/admin/eventos">
                                    Gerenciar Eventos
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
