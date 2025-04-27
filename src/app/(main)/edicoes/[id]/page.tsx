import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Clock, Users, CheckCircle, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getEventbyId, getEventTeams } from "../actions";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function EventoAnteriorPage({ params }: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    const evento = await getEventbyId(id);

    if (!evento) {
        notFound();
    }

    const equipes = await getEventTeams(evento.id);

    const totalEquipes = equipes?.length || 0;
    const totalParticipantes = equipes
    ?.filter((equipe) => equipe.tipo_equipe !== "organizacao")
    ?.reduce((acc, equipe) => {
        return (acc + (Array.isArray(equipe.participantes)
            ? equipe.participantes.length
            : 0)
        );
    }, 0) || 0;

    const totalAlunos = equipes?.reduce((acc, equipe) => {
        return (acc + (Array.isArray(equipe.participantes)
            ? equipe.participantes.filter((p: any) => p.funcao === "aluno").length
            : 0)
        );
    }, 0) || 0;

    const totalProfessores = equipes?.reduce((acc, equipe) => {
        return (acc + (Array.isArray(equipe.participantes)
            ? equipe.participantes.filter((p: any) => p.funcao === "professor").length
            : 0)
        );
    }, 0) || 0;

    const totalJuizes = equipes?.reduce((acc, equipe) => {
        return (acc + (Array.isArray(equipe.participantes)
            ? equipe.participantes.filter((p: any) => p.funcao === "juiz").length
            : 0)
        );
    }, 0) || 0;

    const vencedores: any = Array.isArray(evento.vencedores)
        ? [...evento.vencedores].sort((a: any, b: any) => a.posicao - b.posicao)
        : [];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative w-full h-[400px] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={evento.instituicao === "ETEC Abdias" 
                            ? "/banners/etecabdias.jpg" 
                            : "/banners/fateczs.jpg"} 
                        alt="ETEC Abdias do Nascimento"
                        fill
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                
                <div className="mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 relative z-10 h-full flex items-center">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {evento.titulo}
                        </h1>
                        <p className="text-xl md:text-2xl text-white mb-8">
                            {evento.instituicao} - {evento.ano}
                        </p>
                    </div>
                </div>
            </section>

            {/* Description Section */}
            {evento.descricao && (
                <section className="py-12 bg-white">
                    <div className="mx-auto px-4 md:px-8 lg:px-16">
                        <div className="max-w-6xl mx-auto">
                        <div
                            className="prose max-w-none text-justify ql-editor"
                            dangerouslySetInnerHTML={{ __html: evento.descricao }}
                        />
                        </div>
                    </div>
                </section>
            )}

            {/* Key Information Section */}
            <section className="py-12 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-200">
                                <Clock className="w-10 h-10 text-red-600 mb-4" />
                                <h3 className="text-lg font-bold mb-2">
                                    Data do Evento
                                </h3>
                                <p className="text-gray-700">
                                    {new Date(evento.data_inicio).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-200">
                                <Users className="w-10 h-10 text-red-600 mb-4" />
                                <h3 className="text-lg font-bold mb-2">
                                    Participantes
                                </h3>
                                <p className="text-gray-700">
                                    {totalParticipantes} participantes
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-200">
                                <CheckCircle className="w-10 h-10 text-red-600 mb-4" />
                                <h3 className="text-lg font-bold mb-2">
                                    Problemas
                                </h3>
                                <p className="text-gray-700">
                                    {evento.problemas_resolvidos} problemas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Winners Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Pódio da Maratona
                        </h2>

                        {vencedores.length > 0 ? (
                            <>
                                {/* Desktop Podium (hidden on mobile) */}
                                <div className="hidden md:flex md:flex-row justify-center items-end gap-8 mb-16">
                                    {/* 2nd Place */}
                                    {vencedores.length > 1 && (
                                        <div className="w-1/3">
                                            <div className="bg-gray-50 rounded-t-lg border border-gray-200 p-6 text-center h-[350px] flex flex-col justify-end">
                                                <div className="mb-4 flex justify-center">
                                                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <Trophy className="w-10 h-10 text-gray-700" />
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-bold mb-1">
                                                    2º Lugar
                                                </h3>
                                                <p className="text-lg font-semibold text-red-600 mb-3">
                                                    {vencedores[1].nome_equipe}
                                                </p>
                                                <p className="text-sm font-medium bg-gray-200 rounded-full py-1 px-4 inline-block">
                                                    {vencedores[1].problemas_resolvidos}{" "}
                                                    problemas resolvidos
                                                </p>
                                            </div>
                                            <div className="h-4 bg-gray-300"></div>
                                        </div>
                                    )}

                                    {/* 1st Place */}
                                    <div className="w-1/3">
                                        <div className="bg-gray-50 rounded-t-lg border border-gray-200 p-6 text-center h-[400px] flex flex-col justify-end">
                                            <div className="mb-4 flex justify-center">
                                                <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
                                                    <Trophy className="w-12 h-12 text-yellow-500" />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-1">
                                                1º Lugar
                                            </h3>
                                            <p className="text-xl font-semibold text-red-600 mb-3">
                                                {vencedores[0].nome_equipe}
                                            </p>
                                            <p className="text-sm font-medium bg-yellow-100 rounded-full py-1 px-4 inline-block">
                                                {vencedores[0].problemas_resolvidos}{" "}
                                                problemas resolvidos
                                            </p>
                                        </div>
                                        <div className="h-6 bg-yellow-400"></div>
                                    </div>

                                    {/* 3rd Place */}
                                    {vencedores.length > 2 && (
                                        <div className="w-1/3">
                                            <div className="bg-gray-50 rounded-t-lg border border-gray-200 p-6 text-center h-[300px] flex flex-col justify-end">
                                                <div className="mb-4 flex justify-center">
                                                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                                                        <Trophy className="w-8 h-8 text-orange-500" />
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold mb-1">
                                                    3º Lugar
                                                </h3>
                                                <p className="text-lg font-semibold text-red-600 mb-3">
                                                    {vencedores[2].nome_equipe}
                                                </p>
                                                <p className="text-sm font-medium bg-orange-100 rounded-full py-1 px-4 inline-block">
                                                    {vencedores[2].problemas_resolvidos}{" "}
                                                    problemas resolvidos
                                                </p>
                                            </div>
                                            <div className="h-3 bg-orange-400"></div>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Podium (hidden on desktop) */}
                                <div className="md:hidden space-y-8 mb-16">
                                    {/* 1st Place */}
                                    <div className="w-full">
                                        <div className="bg-gray-50 rounded-t-lg border border-gray-200 p-6 text-center flex flex-col items-center">
                                            <div className="mb-4">
                                                <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
                                                    <Trophy className="w-10 h-10 text-yellow-500" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-1">
                                                1º Lugar
                                            </h3>
                                            <p className="text-lg font-semibold text-red-600 mb-3">
                                                {vencedores[0].nome_equipe}
                                            </p>
                                            <p className="text-sm font-medium bg-yellow-100 rounded-full py-1 px-4 inline-block">
                                                {vencedores[0].problemas_resolvidos}{" "}
                                                problemas resolvidos
                                            </p>
                                        </div>
                                        <div className="h-4 bg-yellow-400"></div>
                                    </div>

                                    {/* 2nd Place */}
                                    {vencedores.length > 1 && (
                                        <div className="w-full">
                                            <div className="bg-gray-50 rounded-t-lg border border-gray-200 p-6 text-center flex flex-col items-center">
                                                <div className="mb-4">
                                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <Trophy className="w-8 h-8 text-gray-700" />
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold mb-1">
                                                    2º Lugar
                                                </h3>
                                                <p className="text-lg font-semibold text-red-600 mb-3">
                                                    {vencedores[1].nome_equipe}
                                                </p>
                                                <p className="text-sm font-medium bg-gray-200 rounded-full py-1 px-4 inline-block">
                                                    {vencedores[1].problemas_resolvidos}{" "}
                                                    problemas resolvidos
                                                </p>
                                            </div>
                                            <div className="h-3 bg-gray-300"></div>
                                        </div>
                                    )}

                                    {/* 3rd Place */}
                                    {vencedores.length > 2 && (
                                        <div className="w-full">
                                            <div className="bg-gray-50 rounded-t-lg border border-gray-200 p-6 text-center flex flex-col items-center">
                                                <div className="mb-4">
                                                    <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
                                                        <Trophy className="w-7 h-7 text-orange-500" />
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold mb-1">
                                                    3º Lugar
                                                </h3>
                                                <p className="text-lg font-semibold text-red-600 mb-3">
                                                    {vencedores[2].nome_equipe}
                                                </p>
                                                <p className="text-sm font-medium bg-orange-100 rounded-full py-1 px-4 inline-block">
                                                    {vencedores[2].problemas_resolvidos}{" "}
                                                    problemas resolvidos
                                                </p>
                                            </div>
                                            <div className="h-2 bg-orange-400"></div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
                                <p className="text-gray-600">
                                    Informações sobre os vencedores não
                                    disponíveis.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Teams Section */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Equipes Participantes
                        </h2>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[180px]">
                                            Nome da Equipe
                                        </TableHead>
                                        <TableHead>Participantes</TableHead>
                                        <TableHead className="w-[100px]">
                                            Períodos
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {equipes && equipes.length > 0 ? (
                                        equipes.map((equipe) => (
                                            <TableRow key={equipe.id}>
                                                <TableCell className="font-medium">
                                                    {equipe.nome_equipe}
                                                </TableCell>
                                                <TableCell>
                                                    {Array.isArray(equipe.participantes)
                                                        ? equipe.participantes.filter((p: any) => p.funcao === "aluno")
                                                            .map((p: any) => p.nome)
                                                            .join(", ")
                                                        : ""}
                                                </TableCell>
                                                <TableCell>
                                                    {Array.isArray(equipe.participantes)
                                                        ? [...new Set(equipe.participantes
                                                            .map((p: any) => p.periodo))]
                                                            .join(", ")
                                                        : equipe.periodo}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center">
                                                Nenhuma equipe encontrada
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Em Números
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <Card>
                                <CardContent className="py-6 flex flex-col items-center text-center">
                                    <Users className="w-12 h-12 text-red-600 mb-4" />
                                    <h3 className="text-4xl font-bold mb-2">
                                        {totalEquipes}
                                    </h3>
                                    <p className="text-gray-600">Equipes</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="py-6 flex flex-col items-center text-center">
                                    <Users className="w-12 h-12 text-red-600 mb-4" />
                                    <h3 className="text-4xl font-bold mb-2">
                                        {totalAlunos}
                                    </h3>
                                    <p className="text-gray-600">Alunos</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="py-6 flex flex-col items-center text-center">
                                    <Users className="w-12 h-12 text-red-600 mb-4" />
                                    <h3 className="text-4xl font-bold mb-2">
                                        {totalProfessores}
                                    </h3>
                                    <p className="text-gray-600">Professores</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="py-6 flex flex-col items-center text-center">
                                    <Award className="w-12 h-12 text-red-600 mb-4" />
                                    <h3 className="text-4xl font-bold mb-2">
                                        {totalJuizes}
                                    </h3>
                                    <p className="text-gray-600">Juízes</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-12 bg-gray-900 text-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Prepare-se para a próxima edição!
                        </h2>
                        <p className="text-gray-300 mb-6">
                            Quer participar da próxima Maratona de Programação?
                            Comece a se preparar agora!
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button asChild variant="destructive">
                                <Link href="/sobre/como-se-preparar">
                                    Como se Preparar
                                </Link>
                            </Button>
                            <Button asChild variant="secondary">
                                <Link href="/">Próximos Eventos</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
