import { CodeIcon, BookOpenIcon, ExternalLink } from "lucide-react";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { Button } from "@/components/index";
import { getEvents } from "./actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const { eventosETEC, eventosFATEC } = await getEvents();

    const upcomingEvents = [
        ...(eventosETEC || []),
        ...(eventosFATEC || []),
    ].sort(
        (a, b) =>
            new Date(a.data_inicio).getTime() -
            new Date(b.data_inicio).getTime()
    );

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 text-white">
                {/* Background Animation */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
                </div>

                <div className="mx-auto px-4 md:px-8 lg:px-16 relative z-10 py-24 md:py-32">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Maratona de Programação
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-slate-300">
                            Desafie suas habilidades de programação e resolução
                            de problemas em equipe
                        </p>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Próximos Eventos
                    </h2>

                    {upcomingEvents.length > 0 ? (
                        <div
                            className={`grid grid-cols-1 ${
                                upcomingEvents.length > 1
                                    ? "md:grid-cols-2"
                                    : "md:grid-cols-1"
                            } gap-8`}
                        >
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className={`bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl ${
                                        upcomingEvents.length === 1
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

            {/* Organizers Section */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        Organizadores
                    </h2>
                    <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                        As maratonas de programação são organizadas na  ETEC Abdias do Nascimento 
                        e FATEC Zona Sul
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                        <div className="flex flex-col items-center">
                            <div className="w-48 h-48 relative mb-4">
                                <Image
                                    src="/placeholder.svg?height=192&width=192"
                                    alt="Logo ETEC Abdias do Nascimento"
                                    width={192}
                                    height={192}
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold">
                                ETEC Abdias do Nascimento
                            </h3>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-48 h-48 relative mb-4">
                                <Image
                                    src="/placeholder.svg?height=192&width=192"
                                    alt="Logo FATEC"
                                    width={192}
                                    height={192}
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold">FATEC</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schools Information Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Nossas Instituições
                    </h2>

                    {/* ETEC Information */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                        <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
                            <Image
                                src="/placeholder.svg?height=400&width=600"
                                alt="ETEC Abdias do Nascimento"
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-2xl font-bold mb-4">
                                ETEC Abdias do Nascimento
                            </h3>
                            <p className="text-gray-700 mb-6">
                                A ETEC Abdias do Nascimento é uma escola técnica
                                estadual que oferece cursos de ensino médio
                                integrado ao técnico, formando profissionais
                                qualificados em diversas áreas da tecnologia.
                                Com foco na qualidade de ensino e na preparação
                                para o mercado de trabalho, a ETEC se destaca
                                pela excelência acadêmica e infraestrutura
                                moderna.
                            </p>
                            <Button asChild variant="outline">
                                <Link
                                    href="https://www.etecabdias.com.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visitar site oficial
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* FATEC Information */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                        <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
                            <Image
                                src="/placeholder.svg?height=400&width=600"
                                alt="FATEC"
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-2xl font-bold mb-4">FATEC</h3>
                            <p className="text-gray-700 mb-6">
                                A FATEC (Faculdade de Tecnologia do Estado de
                                São Paulo) é uma instituição de ensino superior
                                pública que oferece cursos de graduação
                                tecnológica de alta qualidade. Reconhecida pela
                                formação de profissionais altamente capacitados,
                                a FATEC mantém forte conexão com o mercado de
                                trabalho e investe constantemente em inovação e
                                pesquisa.
                            </p>
                            <Button asChild variant="outline">
                                <Link
                                    href="https://www.fatec.sp.gov.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visitar site oficial
                                </Link>
                            </Button>
                        </div>
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
                        <Button
                            asChild
                            variant="destructive"
                            className="border-red-500"
                        >
                            <Link href="/sobre/como-se-preparar">
                                Saiba mais
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* School Events Access Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Acesse os Eventos por Instituição
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 text-center shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
                            <div className="w-24 h-24 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
                                <BookOpenIcon className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">
                                ETEC Abdias do Nascimento
                            </h3>
                            <p className="text-gray-700 mb-6">
                                Acesse informações específicas sobre as
                                maratonas de programação realizadas na ETEC
                                Abdias do Nascimento.
                            </p>
                            <Button asChild variant="destructive">
                                <Link href="/eventos/etec">Ver eventos</Link>
                            </Button>
                        </div>

                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 text-center shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
                            <div className="w-24 h-24 mx-auto mb-6 bg-red-700 rounded-full flex items-center justify-center">
                                <BookOpenIcon className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">FATEC</h3>
                            <p className="text-gray-700 mb-6">
                                Acesse informações específicas sobre as
                                maratonas de programação realizadas na FATEC.
                            </p>
                            <Button asChild variant="destructive">
                                <Link href="/eventos/fatec">Ver eventos</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
