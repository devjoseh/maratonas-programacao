import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { getEvents } from "./actions";
import Link from "next/link";

export default async function PreviousEditions() {
    const eventos = await getEvents();

    const etecEditions = eventos?.filter((e) => e.instituicao === "ETEC Abdias") || [];
    const fatecEditions = eventos?.filter((e) => e.instituicao === "FATEC") || [];

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
                            Edições Anteriores
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8">
                            Conheça o histórico das maratonas de programação
                            realizadas pela ETEC Abdias do Nascimento e FATEC
                        </p>
                    </div>
                </div>
            </section>

            {/* ETEC Previous Editions */}
            <section id="etec" className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        ETEC Abdias do Nascimento
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {etecEditions.length > 0 ? (
                            etecEditions.map((edition) => (
                                <Link
                                    key={edition.id}
                                    href={`/edicoes/${edition.id}`}
                                    className="group"
                                >
                                    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-red-200 group-hover:-translate-y-1">
                                        <div className="h-2 bg-red-600"></div>
                                        <div className="p-6 text-center">
                                            <CalendarIcon className="w-10 h-10 mx-auto mb-4 text-red-600" />
                                            <h3 className="text-2xl font-bold mb-2">
                                                {edition.ano}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {edition.titulo}
                                            </p>
                                            <Button variant="outline" className="w-full">
                                                Ver detalhes
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center p-8">
                                <p className="text-gray-600">
                                    Nenhuma edição anterior encontrada.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* FATEC Previous Editions */}
            <section id="fatec" className="py-16 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        FATEC
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {fatecEditions.length > 0 ? (
                            fatecEditions.map((edition) => (
                                <Link
                                    key={edition.id}
                                    href={`/edicoes/${edition.id}`}
                                    className="group"
                                >
                                    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-red-200 group-hover:-translate-y-1">
                                        <div className="h-2 bg-red-700"></div>
                                        <div className="p-6 text-center">
                                            <CalendarIcon className="w-10 h-10 mx-auto mb-4 text-red-700" />
                                            <h3 className="text-2xl font-bold mb-2">
                                                {edition.ano}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {edition.titulo}
                                            </p>
                                            <Button variant="outline" className="w-full">
                                                Ver detalhes
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center p-8">
                                <p className="text-gray-600">
                                    Nenhuma edição anterior encontrada.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
