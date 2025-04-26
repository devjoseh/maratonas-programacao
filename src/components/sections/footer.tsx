import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="mx-auto px-4 md:px-12 lg:px-32 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Links Rápidos
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                    Página Inicial
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre/objetivos" className="text-gray-400 hover:text-white transition-colors">
                                    Sobre o Evento
                                </Link>
                            </li>
                            <li>
                                <Link href="/edicoes" className="text-gray-400 hover:text-white transition-colors">
                                    Edições Anteriores
                                </Link>
                            </li>
                            <li>
                                <Link href="/eventos/etec" className="text-gray-400 hover:text-white transition-colors">
                                    Eventos ETEC
                                </Link>
                            </li>
                            <li>
                                <Link href="/eventos/fatec" className="text-gray-400 hover:text-white transition-colors">
                                    Eventos FATEC
                                </Link>
                            </li>
                            <li>
                                <Link href="/contato" className="text-gray-400 hover:text-white transition-colors">
                                    Contato
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Objectives */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Objetivos das Maratonas
                        </h3>
                        <p className="text-gray-400">
                            A competição possui como objetivos principais o
                            aprimoramento dos estudantes nas técnicas de projeto
                            e implementação de algoritmos, o desenvolvimento da
                            sua capacidade de trabalho em equipe e também o
                            estímulo ao uso da criatividade e do aperfeiçoamento
                            na habilidade de resolver problemas sob pressão.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} Hackas EF. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
