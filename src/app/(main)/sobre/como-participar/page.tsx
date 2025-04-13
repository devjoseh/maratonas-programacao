import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    CheckCircleIcon,
    ClipboardListIcon,
    UsersIcon,
    CalendarIcon,
    AwardIcon,
} from "lucide-react";

export default function HowToParticipatePage() {
    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="code-animation"></div>
                </div>
                <div className="mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Como Participar
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8">
                            Guia completo para participar das maratonas de
                            programação
                        </p>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Passos para Participar
                        </h2>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

                            {/* Step 1 */}
                            <div className="relative flex flex-col md:flex-row items-start mb-12">
                                <div className="flex items-center md:w-1/2 md:pr-8 md:text-right">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">
                                            Forme sua Equipe
                                        </h3>
                                        <p className="text-gray-600">
                                            Reúna uma equipe de 3 alunos
                                            titulares e, opcionalmente, 1 aluno
                                            reserva. Escolha colegas com
                                            habilidades complementares para
                                            maximizar as chances de sucesso.
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-8 h-8 rounded-full bg-red-600 items-center justify-center text-white font-bold">
                                    1
                                </div>
                                <div className="md:w-1/2 md:pl-8 md:mt-0 mt-4 ml-8 md:ml-0"></div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative flex flex-col md:flex-row items-start mb-12">
                                <div className="md:w-1/2 md:pr-8 md:text-right md:block hidden"></div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-8 h-8 rounded-full bg-red-600 items-center justify-center text-white font-bold">
                                    2
                                </div>
                                <div className="flex items-center md:w-1/2 md:pl-8">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">
                                            Verifique os Requisitos
                                        </h3>
                                        <p className="text-gray-600">
                                            Certifique-se de que todos os
                                            membros da equipe atendem aos
                                            requisitos de elegibilidade, como
                                            estar regularmente matriculado na
                                            instituição e não ter excedido o
                                            limite de participações em edições
                                            anteriores.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative flex flex-col md:flex-row items-start mb-12">
                                <div className="flex items-center md:w-1/2 md:pr-8 md:text-right">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">
                                            Faça a Inscrição
                                        </h3>
                                        <p className="text-gray-600">
                                            Realize a inscrição da equipe
                                            através da plataforma Even3 dentro
                                            do prazo estabelecido. Fique atento
                                            às datas de abertura e encerramento
                                            das inscrições.
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-8 h-8 rounded-full bg-red-600 items-center justify-center text-white font-bold">
                                    3
                                </div>
                                <div className="md:w-1/2 md:pl-8 md:mt-0 mt-4 ml-8 md:ml-0"></div>
                            </div>

                            {/* Step 4 */}
                            <div className="relative flex flex-col md:flex-row items-start mb-12">
                                <div className="md:w-1/2 md:pr-8 md:text-right md:block hidden"></div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-8 h-8 rounded-full bg-red-600 items-center justify-center text-white font-bold">
                                    4
                                </div>
                                <div className="flex items-center md:w-1/2 md:pl-8">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">
                                        4
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">
                                            Prepare-se
                                        </h3>
                                        <p className="text-gray-600">
                                            Estude e pratique com sua equipe.
                                            Resolva problemas de edições
                                            anteriores, familiarize-se com as
                                            linguagens de programação permitidas
                                            e desenvolva estratégias de trabalho
                                            em equipe.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className="relative flex flex-col md:flex-row items-start">
                                <div className="flex items-center md:w-1/2 md:pr-8 md:text-right">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">
                                        5
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">
                                            Participe da Competição
                                        </h3>
                                        <p className="text-gray-600">
                                            No dia do evento, compareça com
                                            antecedência ao local da competição,
                                            com documento de identificação. Siga
                                            as instruções dos organizadores e
                                            divirta-se resolvendo os problemas!
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-8 h-8 rounded-full bg-red-600 items-center justify-center text-white font-bold">
                                    5
                                </div>
                                <div className="md:w-1/2 md:pl-8 md:mt-0 mt-4 ml-8 md:ml-0"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Institution Specific Information */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Informações por Instituição
                        </h2>

                        <Tabs defaultValue="etec" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="etec">
                                    ETEC Abdias do Nascimento
                                </TabsTrigger>
                                <TabsTrigger value="fatec">FATEC</TabsTrigger>
                            </TabsList>

                            {/* ETEC Information */}
                            <TabsContent value="etec">
                                <Card>
                                    <CardContent className="py-6">
                                        <h3 className="text-xl font-bold mb-6 text-center">
                                            ETEC Abdias do Nascimento
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <div className="flex items-center mb-4">
                                                    <UsersIcon className="w-6 h-6 text-red-600 mr-2" />
                                                    <h3 className="text-lg font-bold">
                                                        Elegibilidade
                                                    </h3>
                                                </div>
                                                <p className="text-gray-700 mb-4">
                                                    Podem participar alunos
                                                    regularmente matriculados
                                                    nos cursos técnicos e ensino
                                                    médio da ETEC Abdias do
                                                    Nascimento.
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex items-center mb-4">
                                                    <CalendarIcon className="w-6 h-6 text-red-600 mr-2" />
                                                    <h3 className="text-lg font-bold">
                                                        Cronograma
                                                    </h3>
                                                </div>
                                                <p className="text-gray-700 mb-4">
                                                    As maratonas da ETEC
                                                    geralmente ocorrem no
                                                    primeiro semestre do ano.
                                                    Consulte o calendário
                                                    oficial para datas
                                                    específicas.
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex items-center mb-4">
                                                    <ClipboardListIcon className="w-6 h-6 text-red-600 mr-2" />
                                                    <h3 className="text-lg font-bold">
                                                        Processo de Inscrição
                                                    </h3>
                                                </div>
                                                <p className="text-gray-700 mb-4">
                                                    As inscrições são realizadas
                                                    exclusivamente pela
                                                    plataforma Even3. O link
                                                    será disponibilizado no site
                                                    oficial e nas redes sociais
                                                    da instituição.
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex items-center mb-4">
                                                    <AwardIcon className="w-6 h-6 text-red-600 mr-2" />
                                                    <h3 className="text-lg font-bold">
                                                        Premiação
                                                    </h3>
                                                </div>
                                                <p className="text-gray-700 mb-4">
                                                    As equipes vencedoras
                                                    recebem certificados e
                                                    prêmios que variam a cada
                                                    edição. Detalhes específicos
                                                    são divulgados no
                                                    regulamento do evento.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-center">
                                            <Button asChild>
                                                <Link href="/eventos/etec">
                                                    Mais informações sobre a
                                                    Maratona ETEC
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* FATEC Information */}
                            <TabsContent value="fatec">
                                <Card>
                                    <CardContent className="py-6">
                                        <h3 className="text-xl font-bold mb-6 text-center">
                                            FATEC São Paulo
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <div className="flex items-center mb-4">
                                                    <UsersIcon className="w-6 h-6 text-red-700 mr-2" />
                                                    <h3 className="text-lg font-bold">
                                                        Elegibilidade
                                                    </h3>
                                                </div>
                                                <p className="text-gray-700 mb-4">
                                                    Podem participar alunos
                                                    regularmente matriculados
                                                    nos cursos de graduação da
                                                    FATEC, com limite de
                                                    participação de até 3
                                                    maratonas por aluno.
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex items-center mb-4">
                                                    <CalendarIcon className="w-6 h-6 text-red-700 mr-2" />
                                                    <h3 className="text-lg font-bold">
                                                        Cronograma
                                                    </h3>
                                                </div>
                                                <p className="text-gray-700 mb-4">
                                                    As maratonas da FATEC
                                                    geralmente ocorrem no
                                                    segundo semestre do ano.
                                                    Consulte o calendário
                                                    oficial para datas
                                                    específicas.
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex items-center mb-4">
                                                    <ClipboardListIcon className="w-6 h-6 text-red-700 mr-2" />
                                                    <h3 className="text-lg font-bold">
                                                        Processo de Inscrição
                                                    </h3>
                                                </div>
                                                <p className="text-gray-700 mb-4">
                                                    As inscrições são realizadas
                                                    pela plataforma Even3 e
                                                    requerem a aprovação de um
                                                    professor orientador.
                                                    Documentos adicionais podem
                                                    ser solicitados.
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex items-center mb-4">
                                                    <AwardIcon className="w-6 h-6 text-red-700 mr-2" />
                                                    <h3 className="text-lg font-bold">
                                                        Premiação
                                                    </h3>
                                                </div>
                                                <p className="text-gray-700 mb-4">
                                                    Além de certificados e
                                                    prêmios, as equipes
                                                    vencedoras podem ser
                                                    indicadas para representar a
                                                    instituição em competições
                                                    regionais como a Maratona de
                                                    Programação da SBC.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-center">
                                            <Button asChild>
                                                <Link href="/eventos/fatec">
                                                    Mais informações sobre a
                                                    Maratona FATEC
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>

            {/* Tips Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Dicas para Participantes
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <CheckCircleIcon className="w-6 h-6 text-red-600 mr-2" />
                                    <h3 className="text-lg font-bold">
                                        Antes da Competição
                                    </h3>
                                </div>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">
                                            •
                                        </span>
                                        <span>
                                            Pratique regularmente com problemas
                                            de competições anteriores
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">
                                            •
                                        </span>
                                        <span>
                                            Familiarize-se com o ambiente de
                                            programação que será utilizado
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">
                                            •
                                        </span>
                                        <span>
                                            Defina funções claras para cada
                                            membro da equipe
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">
                                            •
                                        </span>
                                        <span>
                                            Crie uma biblioteca de algoritmos e
                                            estruturas de dados comuns
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">
                                            •
                                        </span>
                                        <span>
                                            Estude os problemas das edições
                                            anteriores para entender o padrão
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <CheckCircleIcon className="w-6 h-6 text-red-600 mr-2" />
                                    <h3 className="text-lg font-bold">
                                        Durante a Competição
                                    </h3>
                                </div>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">
                                            •
                                        </span>
                                        <span>
                                            Leia todos os problemas antes de
                                            começar a resolver
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">
                                            •
                                        </span>
                                        <span>
                                            Comece pelos problemas mais fáceis
                                            para ganhar confiança
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">
                                            •
                                        </span>
                                        <span>
                                            Teste suas soluções com casos
                                            extremos antes de submeter
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">
                                            •
                                        </span>
                                        <span>
                                            Mantenha a comunicação clara entre
                                            os membros da equipe
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">
                                            •
                                        </span>
                                        <span>
                                            Gerencie bem o tempo disponível para
                                            cada problema
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-bold mb-4 text-center">
                                Recursos Adicionais
                            </h3>
                            <p className="text-gray-700 text-center mb-6">
                                Para se preparar adequadamente, consulte nossa
                                página de recursos e dicas de estudo.
                            </p>
                            <div className="flex justify-center">
                                <Button asChild>
                                    <Link href="/sobre/como-se-preparar">
                                        Como se Preparar
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-12 bg-gray-900 text-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Pronto para o Desafio?
                        </h2>
                        <p className="text-gray-300 mb-6">
                            Forme sua equipe, prepare-se e participe da próxima
                            edição da Maratona de Programação. Desafie suas
                            habilidades e mostre seu potencial!
                        </p>
                        <Button asChild size="lg" variant="destructive">
                            <Link href="/">Ver Próximos Eventos</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}