import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button, EventScheduleCard } from "@/components";
import { CodeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FATECEventPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative w-full h-[400px] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/banners/fateczs.jpg" 
                        alt="Fatec Zona Sul – Dom Paulo Evaristo Arns"
                        fill
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                
                <div className="mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 relative z-10 h-full flex items-center">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Fatec Zona Sul – Dom Paulo Evaristo Arns
                        </h1>
                        <p className="text-xl md:text-2xl text-white mb-8">
                            Maratona de Programação
                        </p>
                    </div>
                </div>
            </section>

            <EventScheduleCard school="FATEC" />

            {/* Event Stages Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Etapas do Evento
                    </h2>
                    <h3 className="text-2xl text-center mb-12">
                        Sem Informações
                    </h3>
                    
                    {/* <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

                            <div className="relative flex flex-col md:flex-row items-start mb-12">
                                <div className="flex items-center md:w-1/2 md:pr-8 md:text-right">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white font-bold mr-4">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">
                                            Formação das Equipes
                                        </h3>
                                        <p className="text-gray-600">
                                            Forme sua equipe com até 3
                                            participantes titulares e 1 reserva.
                                            O participante reserva só poderá
                                            participar na falta de algum dos
                                            titulares.
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-8 h-8 rounded-full bg-red-700 items-center justify-center text-white font-bold">
                                    1
                                </div>
                                <div className="md:w-1/2 md:pl-8 md:mt-0 mt-4 ml-8 md:ml-0"></div>
                            </div>

                            <div className="relative flex flex-col md:flex-row items-start mb-12">
                                <div className="md:w-1/2 md:pr-8 md:text-right md:block hidden"></div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-8 h-8 rounded-full bg-red-700 items-center justify-center text-white font-bold">
                                    2
                                </div>
                                <div className="flex items-center md:w-1/2 md:pl-8">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white font-bold mr-4">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">
                                            Inscrições das Equipes
                                        </h3>
                                        <p className="text-gray-600">
                                            Todas as inscrições são realizadas
                                            através da plataforma Even3. Fique
                                            atento aos prazos de inscrição.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex flex-col md:flex-row items-start mb-12">
                                <div className="flex items-center md:w-1/2 md:pr-8 md:text-right">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white font-bold mr-4">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">
                                            Primeira Fase
                                        </h3>
                                        <p className="text-gray-600">
                                            Fase eliminatória, onde serão
                                            selecionados 5 grupos do período da
                                            manhã e 5 grupos do período da tarde
                                            para a fase final.
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-8 h-8 rounded-full bg-red-700 items-center justify-center text-white font-bold">
                                    3
                                </div>
                                <div className="md:w-1/2 md:pl-8 md:mt-0 mt-4 ml-8 md:ml-0"></div>
                            </div>

                            <div className="relative flex flex-col md:flex-row items-start">
                                <div className="md:w-1/2 md:pr-8 md:text-right md:block hidden"></div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-8 h-8 rounded-full bg-red-700 items-center justify-center text-white font-bold">
                                    4
                                </div>
                                <div className="flex items-center md:w-1/2 md:pl-8">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white font-bold mr-4">
                                        4
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">
                                            Fase Final
                                        </h3>
                                        <p className="text-gray-600">
                                            Todos os 10 grupos selecionados
                                            competem pela premiação final. Esta
                                            fase apresenta problemas mais
                                            desafiadores.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Perguntas Frequentes
                    </h2>

                    <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Quantos alunos cada equipe deve ter?
                                </AccordionTrigger>
                                <AccordionContent>
                                    As equipes são formadas por três (3) alunos
                                    titulares e opcionalmente um (1) reserva,
                                    que deverá participar do evento apenas no
                                    caso da ausência de um dos titulares.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    Como posso me preparar?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Acesse a seção{" "}
                                    <Link
                                        href="/sobre/como-se-preparar"
                                        className="text-red-700 hover:underline"
                                    >
                                        Como se preparar
                                    </Link>{" "}
                                    para saber mais.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Quais linguagens de programação posso
                                    utilizar?
                                </AccordionTrigger>
                                <AccordionContent>
                                    As equipes podem enviar suas
                                    soluções em C, C++, Java ou Python.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    Como podemos fazer a inscrição?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Quando as inscrições estiverem abertas, 
                                    o link será disponibilizado neste site.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </section>

            {/* Programming Practice Section */}
            <section className="py-12 bg-gray-900 text-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <CodeIcon className="w-12 h-12 mx-auto mb-4 text-red-500" />
                        <h2 className="text-2xl font-bold mb-4">
                            A prática diária é o caminho para a excelência
                        </h2>
                        <p className="text-gray-300 mb-6">
                            O aprimoramento da lógica de programação e a
                            capacidade de resolver problemas complexos são
                            habilidades desenvolvidas através da prática
                            constante. Participar de maratonas de programação é
                            uma excelente forma de acelerar esse
                            desenvolvimento.
                        </p>
                        <Button asChild variant="destructive">
                            <Link href="/sobre/como-se-preparar">
                                Saiba mais
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
