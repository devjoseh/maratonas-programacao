import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClockIcon, UsersIcon, CodeIcon, CheckIcon } from "lucide-react";
import { DocumentosList } from "./components/documentos-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { getCategories } from "./actions";
import { Suspense } from "react";
import Link from "next/link";

export default async function RulesPage() {
    const categorias = await getCategories();

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="code-animation"></div>
                </div>
                <div className="mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Documentos
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8">
                            Acesse os documentos oficiais das maratonas de
                            programação da ETEC Abdias e FATEC.
                        </p>
                    </div>
                </div>
            </section>

            {/* Rules Tabs Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <Tabs defaultValue="general" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-8">
                                <TabsTrigger value="general">
                                    Regras Gerais
                                </TabsTrigger>
                                <TabsTrigger value="etec">ETEC</TabsTrigger>
                                <TabsTrigger value="fatec">FATEC</TabsTrigger>
                            </TabsList>

                            {/* General Rules */}
                            <TabsContent value="general">
                                <Card className="py-4">
                                    <CardHeader>
                                        <CardTitle>
                                            Regras Gerais das Maratonas
                                        </CardTitle>
                                        <CardDescription>
                                            Diretrizes comuns a todas as
                                            maratonas de programação organizadas
                                            pelas instituições
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold mb-2 flex items-center">
                                                <UsersIcon className="w-5 h-5 mr-2 text-red-600" />
                                                Formação das Equipes
                                            </h3>
                                            <p className="text-gray-700">
                                                As equipes devem ser formadas
                                                por 3 (três) alunos titulares e,
                                                opcionalmente, 1 (um) aluno
                                                reserva. O aluno reserva só
                                                poderá participar da competição
                                                na ausência de um dos titulares.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold mb-2 flex items-center">
                                                <CodeIcon className="w-5 h-5 mr-2 text-red-600" />
                                                Linguagens Permitidas
                                            </h3>
                                            <p className="text-gray-700">
                                                As soluções podem ser
                                                implementadas nas seguintes
                                                linguagens de programação: C,
                                                C++, Java e Python. Cada equipe
                                                deve estar familiarizada com
                                                pelo menos uma dessas
                                                linguagens.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold mb-2 flex items-center">
                                                <ClockIcon className="w-5 h-5 mr-2 text-red-600" />
                                                Duração da Competição
                                            </h3>
                                            <p className="text-gray-700">
                                                A duração padrão da competição é
                                                de 5 (cinco) horas, durante as
                                                quais as equipes devem resolver
                                                o maior número possível de
                                                problemas. O tempo exato pode
                                                variar conforme especificado no
                                                regulamento de cada edição.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold mb-2 flex items-center">
                                                <CheckIcon className="w-5 h-5 mr-2 text-red-600" />
                                                Critérios de Classificação
                                            </h3>
                                            <p className="text-gray-700">
                                                As equipes são classificadas
                                                pelo número de problemas
                                                resolvidos corretamente. Em caso
                                                de empate, a classificação é
                                                determinada pelo tempo total de
                                                resolução, que inclui o tempo
                                                gasto para resolver cada
                                                problema mais penalidades por
                                                submissões incorretas.
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                                            <p className="text-gray-700 text-sm">
                                                <strong>Nota:</strong> As regras
                                                específicas de cada instituição
                                                podem apresentar variações em
                                                relação às regras gerais.
                                                Consulte sempre o regulamento
                                                oficial da competição em que
                                                você irá participar.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* ETEC */}
                            <TabsContent value="etec" className="space-y-4">
                                <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                                    <DocumentosList
                                        instituicao="ETEC Abdias"
                                        categorias={(categorias as any) || []}
                                    />
                                </Suspense>
                            </TabsContent>

                            {/* FATEC */}
                            <TabsContent value="fatec" className="space-y-4">
                                <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                                    <DocumentosList
                                        instituicao="FATEC"
                                        categorias={(categorias as any) || []}
                                    />
                                </Suspense>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>

            {/* Additional Information */}
            <section className="py-12 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                            <h3 className="text-lg font-bold mb-3 text-center">
                                Contato com a Organização
                            </h3>
                            <p className="text-gray-700 text-center mb-4">
                                Em caso de dúvidas específicas sobre as regras
                                ou para solicitar esclarecimentos, entre em
                                contato com a equipe organizadora.
                            </p>
                            <div className="flex justify-center">
                                <Button asChild>
                                    <Link href="/contato">
                                        Contatar Organização
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
