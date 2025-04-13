import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    FileIcon,
    DownloadIcon,
    ClockIcon,
    UsersIcon,
    CodeIcon,
    CheckIcon,
} from "lucide-react";

export default function RulesPage() {
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
                            Regras
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8">
                            Conheça as regras e diretrizes das maratonas de
                            programação
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

                            {/* ETEC Rules */}
                            <TabsContent value="etec">
                                <Card className="py-4">
                                    <CardHeader>
                                        <CardTitle>
                                            Regras da Maratona ETEC
                                        </CardTitle>
                                        <CardDescription>
                                            Regulamento específico para as
                                            maratonas realizadas na ETEC Abdias
                                            do Nascimento
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                                            <FileIcon className="w-16 h-16 text-red-600 mb-4" />
                                            <h3 className="text-xl font-bold mb-2">
                                                Regulamento Completo
                                            </h3>
                                            <p className="text-gray-700 text-center mb-6">
                                                O regulamento completo da
                                                Maratona de Programação da ETEC
                                                Abdias do Nascimento está
                                                disponível para download no
                                                formato PDF.
                                            </p>
                                            <div className="flex gap-4">
                                                <Button
                                                    asChild
                                                    className="flex items-center gap-2"
                                                >
                                                    <a
                                                        href="#"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <DownloadIcon className="w-4 h-4" />
                                                        Baixar PDF
                                                    </a>
                                                </Button>
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                >
                                                    <a
                                                        href="#"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Visualizar Online
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-4">
                                            <h3 className="text-lg font-bold">
                                                Destaques do Regulamento ETEC
                                            </h3>

                                            <div className="space-y-4">
                                                <div className="p-4 bg-white rounded-lg border border-gray-200">
                                                    <h4 className="font-semibold mb-1">
                                                        Elegibilidade
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        Podem participar alunos
                                                        regularmente
                                                        matriculados nos cursos
                                                        técnicos e ensino médio
                                                        da ETEC Abdias do
                                                        Nascimento.
                                                    </p>
                                                </div>

                                                <div className="p-4 bg-white rounded-lg border border-gray-200">
                                                    <h4 className="font-semibold mb-1">
                                                        Fases da Competição
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        A competição é dividida
                                                        em fase eliminatória e
                                                        fase final, com
                                                        critérios específicos de
                                                        classificação para cada
                                                        etapa.
                                                    </p>
                                                </div>

                                                <div className="p-4 bg-white rounded-lg border border-gray-200">
                                                    <h4 className="font-semibold mb-1">
                                                        Materiais Permitidos
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        Durante a competição, é
                                                        permitido o uso de
                                                        materiais impressos como
                                                        livros, apostilas e
                                                        anotações. Não é
                                                        permitido o uso de
                                                        dispositivos eletrônicos
                                                        além do computador
                                                        fornecido.
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-600 italic mt-4">
                                                Para informações detalhadas,
                                                consulte o regulamento completo
                                                ou entre em contato com a
                                                coordenação do evento.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* FATEC Rules */}
                            <TabsContent value="fatec">
                                <Card className="py-4">
                                    <CardHeader>
                                        <CardTitle>
                                            Regras da Maratona FATEC
                                        </CardTitle>
                                        <CardDescription>
                                            Regulamento específico para as
                                            maratonas realizadas na FATEC
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                                            <FileIcon className="w-16 h-16 text-red-700 mb-4" />
                                            <h3 className="text-xl font-bold mb-2">
                                                Regulamento Completo
                                            </h3>
                                            <p className="text-gray-700 text-center mb-6">
                                                O regulamento completo da
                                                Maratona de Programação da FATEC
                                                está disponível para download no
                                                formato PDF.
                                            </p>
                                            <div className="flex gap-4">
                                                <Button
                                                    asChild
                                                    className="flex items-center gap-2"
                                                >
                                                    <a
                                                        href="#"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <DownloadIcon className="w-4 h-4" />
                                                        Baixar PDF
                                                    </a>
                                                </Button>
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                >
                                                    <a
                                                        href="#"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Visualizar Online
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-4">
                                            <h3 className="text-lg font-bold">
                                                Destaques do Regulamento FATEC
                                            </h3>

                                            <div className="space-y-4">
                                                <div className="p-4 bg-white rounded-lg border border-gray-200">
                                                    <h4 className="font-semibold mb-1">
                                                        Elegibilidade
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        Podem participar alunos
                                                        regularmente
                                                        matriculados nos cursos
                                                        de graduação da FATEC,
                                                        com limite de
                                                        participação de até 3
                                                        maratonas por aluno.
                                                    </p>
                                                </div>

                                                <div className="p-4 bg-white rounded-lg border border-gray-200">
                                                    <h4 className="font-semibold mb-1">
                                                        Ambiente de Competição
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        A competição utiliza o
                                                        sistema BOCA para
                                                        submissão e avaliação
                                                        automática das soluções.
                                                        Cada equipe terá acesso
                                                        a um computador com as
                                                        ferramentas necessárias
                                                        instaladas.
                                                    </p>
                                                </div>

                                                <div className="p-4 bg-white rounded-lg border border-gray-200">
                                                    <h4 className="font-semibold mb-1">
                                                        Premiação
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        As equipes vencedoras
                                                        recebem certificados e
                                                        prêmios conforme
                                                        especificado no
                                                        regulamento da edição. A
                                                        equipe campeã pode ser
                                                        indicada para
                                                        representar a
                                                        instituição em
                                                        competições regionais.
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-600 italic mt-4">
                                                Para informações detalhadas,
                                                consulte o regulamento completo
                                                ou entre em contato com a
                                                coordenação do evento.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>

            {/* Additional Information */}
            <section className="py-12 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        {/* <h2 className="text-2xl font-bold mb-6 text-center">
                            Informações Adicionais
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold mb-3">
                                    Código de Conduta
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    Todos os participantes devem seguir um
                                    código de conduta que promove o respeito
                                    mútuo, a integridade acadêmica e o espírito
                                    esportivo. Comportamentos antiéticos podem
                                    resultar em desclassificação.
                                </p>
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/sobre/codigo-de-conduta">
                                        Ler o código de conduta
                                    </Link>
                                </Button>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-bold mb-3">
                                    Dúvidas Frequentes
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    Consulte nossa seção de perguntas frequentes
                                    para esclarecer dúvidas comuns sobre as
                                    regras, procedimentos e critérios de
                                    avaliação das maratonas.
                                </p>
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/faq">
                                        Ver perguntas frequentes
                                    </Link>
                                </Button>
                            </div>
                        </div> */}

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
