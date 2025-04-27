import { CheckCircleIcon, ClipboardListIcon, UsersIcon, CalendarIcon, AwardIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowToParticipatePage() {
    return (
        <div className="flex flex-col w-full">
            {/* Steps Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Passos para Participar
                            <hr className="mt-4 mb-8 border-t-2 border-black-200 w-full" />
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
                                            reserva.
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
                                            Faça a inscrição.
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
                            </div>

                            {/* Step 3 */}
                            <div className="relative flex flex-col md:flex-row items-start mb-12">
                                <div className="flex items-center md:w-1/2 md:pr-8 md:text-right">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">
                                        3
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
                                            Participe da Competição
                                        </h3>
                                        <p className="text-gray-600">
                                            No dia do evento, compareça com
                                            antecedência ao local da competição. Siga
                                            as instruções dos organizadores e
                                            divirta-se!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Institution Specific Information */}
            {/* <section className="py-16 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Informações por Instituição
                        </h2>

                        <Tabs defaultValue="etec" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="etec">
                                    ETEC Abdias
                                </TabsTrigger>
                                <TabsTrigger value="fatec">FATEC</TabsTrigger>
                            </TabsList>

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
                                                    FATEC
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
            </section> */}

            {/* Tips Section */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Dicas para Participantes
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
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
                                            Evite noites mal dormidas 
                                            nos dias anteriores à maratona.
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">
                                            •
                                        </span>
                                        <span>
                                        Controle o estresse: calma evita decisões erradas.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
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

                        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
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
        </div>
    );
}