import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { CodeIcon, ExternalLink } from "lucide-react";
import { getEventsByName } from "../../actions";
import { CountdownTimer } from "@/components";

export default async function ETECEventPage() {
    const event = await getEventsByName("ETEC Abdias");
    const upcomingEvent = (event || []).sort(
        (a, b) =>
            new Date(a.data_inicio).getTime() -
            new Date(b.data_inicio).getTime()
    );

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative w-full bg-gradient-to-br from-red-600 via-red-700 to-red-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="code-animation"></div>
                </div>
                <div className="mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Maratona de Programação ETEC
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-100 mb-8">
                            ETEC Abdias do Nascimento
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Próximos Eventos
                    </h2>
                    {upcomingEvent.length > 0 ? (
                        <div
                            className={`grid grid-cols-1 md:grid-cols-1 gap-8`}
                        >
                            {upcomingEvent.map((event) => (
                                <div
                                    key={event.id}
                                    className={`bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl ${
                                        upcomingEvent.length === 1
                                            ? "md:max-w-[50%] md:mx-auto"
                                            : ""
                                    }`}
                                >
                                    <div
                                        className={`h-2 ${
                                            event.instituicao === "ETEC Abdias"
                                                ? "bg-red-600"
                                                : "bg-red-700"
                                        }`}
                                    ></div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-2">
                                            {event.titulo}
                                        </h3>
                                        <p className="text-gray-700 font-medium mb-4">
                                            {event.instituicao}
                                        </p>
                                        <p className="text-gray-600 mb-6">
                                            {new Date(
                                                event.data_inicio
                                            ).toLocaleDateString("pt-BR", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                        <div className="mb-6">
                                            <CountdownTimer
                                                targetDate={event.data_inicio}
                                            />
                                        </div>
                                        {event.inscricao_externa ? (
                                            <Button
                                                asChild
                                                className="w-full"
                                                variant="destructive"
                                            >
                                                <a
                                                    href={
                                                        event.url_inscricao_externa ||
                                                        "#"
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Inscrever-se{" "}
                                                    <ExternalLink className="ml-2 h-4 w-4" />
                                                </a>
                                            </Button>
                                        ) : (
                                            <Button
                                                asChild
                                                className="w-full"
                                                variant="destructive"
                                            >
                                                <Link
                                                    href={`/inscricao/${event.id}`}
                                                >
                                                    Inscrever-se
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-gray-50 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">
                                Nenhum evento programado no momento
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Fique atento às nossas redes sociais para
                                informações sobre os próximos eventos.
                            </p>
                            <Button asChild variant="outline">
                                <Link href="/edicoes">
                                    Ver edições anteriores
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Event Stages Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Etapas do Evento
                    </h2>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

                            {/* Stage 1 */}
                            <div className="relative flex flex-col md:flex-row items-start mb-12">
                                <div className="flex items-center md:w-1/2 md:pr-8 md:text-right">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">
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
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-8 h-8 rounded-full bg-red-600 items-center justify-center text-white font-bold">
                                    1
                                </div>
                                <div className="md:w-1/2 md:pl-8 md:mt-0 mt-4 ml-8 md:ml-0"></div>
                            </div>

                            {/* Stage 2 */}
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

                            {/* Stage 3 */}
                            <div className="relative flex flex-col md:flex-row items-start mb-12">
                                <div className="flex items-center md:w-1/2 md:pr-8 md:text-right">
                                    <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">
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
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-8 h-8 rounded-full bg-red-600 items-center justify-center text-white font-bold">
                                    3
                                </div>
                                <div className="md:w-1/2 md:pl-8 md:mt-0 mt-4 ml-8 md:ml-0"></div>
                            </div>

                            {/* Stage 4 */}
                            <div className="relative flex flex-col md:flex-row items-start">
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
                    </div>
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
                                    Além da leitura de materiais, existem sites
                                    com problemas de edições anteriores da
                                    InterFatecs e de outras maratonas. Acesse a
                                    seção{" "}
                                    <Link
                                        href="/sobre/como-se-preparar"
                                        className="text-red-600 hover:underline"
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
                                    Assim como na maratona brasileira, as
                                    equipes podem enviar suas soluções em C,
                                    C++, Java ou Python.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    Como podemos fazer a inscrição?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Todas as inscrições dos eventos são
                                    realizados pelo Even3. Quando as inscrições
                                    estiverem abertas, o link será
                                    disponibilizado neste site.
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
