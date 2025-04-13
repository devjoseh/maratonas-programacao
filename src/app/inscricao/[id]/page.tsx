import { InscricaoForm } from "./components/inscricao-form";
import { notFound } from "next/navigation";
import { getEventById } from "./actions";

export default async function InscricaoPage({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const evento = await getEventById(id)

    if (!evento) {
        notFound();
    }

    // Verificar se o período de inscrição está aberto
    const now = new Date();
    const dataInicio = new Date(evento.data_inicio);
    const inscricoesAbertas = now < dataInicio;

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="code-animation"></div>
                </div>
                <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Inscrição
                        </h1>
                        <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                            {evento.titulo} - {evento.instituicao}
                        </h2>
                        <p className="text-lg text-gray-200 mb-4">
                            Data do evento:{" "}
                            {new Date(evento.data_inicio).toLocaleDateString(
                                "pt-BR",
                                {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        {inscricoesAbertas ? (
                            <>
                                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                                    <p className="text-green-800">
                                        As inscrições estão abertas! Preencha o
                                        formulário abaixo para inscrever sua
                                        equipe.
                                    </p>
                                </div>

                                <InscricaoForm evento={evento} />
                            </>
                        ) : (
                            <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                                <h3 className="text-xl font-bold mb-4 text-yellow-800">
                                    Inscrições Encerradas
                                </h3>
                                <p className="text-yellow-800 mb-4">
                                    O período de inscrições para este evento já
                                    foi encerrado.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
