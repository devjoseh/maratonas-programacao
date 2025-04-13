import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function InscricaoSucessoPage() {
    return (
        <div className="flex flex-col w-full">
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold mb-4">
                            Inscrição Realizada com Sucesso!
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            Sua inscrição foi recebida e está sendo processada.
                            Em breve, você receberá um email com mais
                            informações sobre o evento.
                        </p>

                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 mb-8">
                            <h2 className="text-xl font-bold mb-4">
                                Próximos Passos
                            </h2>
                            <ul className="text-left space-y-2">
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">
                                        •
                                    </span>
                                    <span>
                                        Aguarde a confirmação da sua inscrição
                                        por email
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">
                                        •
                                    </span>
                                    <span>
                                        Prepare-se para o evento estudando
                                        algoritmos e estruturas de dados
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">
                                        •
                                    </span>
                                    <span>
                                        Verifique as regras e requisitos do
                                        evento na página de informações
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button asChild>
                                <Link href="/">
                                    Voltar para a Página Inicial
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/sobre/como-se-preparar">
                                    Como se Preparar
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
