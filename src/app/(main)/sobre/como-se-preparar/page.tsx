import { CodeIcon, BookIcon, GlobeIcon, AwardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PreparationPage() {
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
                            Como se Preparar
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8">
                            Dicas e recursos para aprimorar suas habilidades de
                            programação e resolução de problemas
                        </p>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8">
                            A importância da prática constante
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">
                            O aprimoramento da lógica de programação e a
                            capacidade de resolver problemas complexos são
                            habilidades desenvolvidas através da prática
                            constante. Participar de maratonas de programação é
                            uma excelente forma de acelerar esse
                            desenvolvimento.
                        </p>
                        <p className="text-lg text-gray-700 mb-6">
                            Assim como um atleta treina diariamente para
                            competições, um programador precisa exercitar
                            constantemente suas habilidades de resolução de
                            problemas e implementação de algoritmos eficientes.
                        </p>
                        <p className="text-lg text-gray-700 mb-6">
                            Nesta página, você encontrará recursos e dicas para
                            se preparar adequadamente para as maratonas de
                            programação.
                        </p>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Recursos para Estudo
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Online Judges */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                            <div className="h-2 bg-red-600"></div>
                            <div className="p-6">
                                <GlobeIcon className="w-12 h-12 text-red-600 mb-4" />
                                <h3 className="text-xl font-bold mb-4">
                                    Juízes Online
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Plataformas com problemas de programação que
                                    avaliam automaticamente suas soluções.
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                                    <li>
                                        <a
                                            href="https://www.beecrowd.com.br"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-600 hover:underline"
                                        >
                                            Beecrowd (antigo URI)
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.hackerrank.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-600 hover:underline"
                                        >
                                            HackerRank
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://leetcode.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-600 hover:underline"
                                        >
                                            LeetCode
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Books */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                            <div className="h-2 bg-red-600"></div>
                            <div className="p-6">
                                <BookIcon className="w-12 h-12 text-red-600 mb-4" />
                                <h3 className="text-xl font-bold mb-4">
                                    Livros Recomendados
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Materiais de estudo para aprofundar seus
                                    conhecimentos em algoritmos e estruturas de
                                    dados.
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                                    <li>
                                        Algoritmos: Teoria e Prática (Cormen,
                                        Leiserson, Rivest, Stein)
                                    </li>
                                    <li>
                                        Estruturas de Dados e Algoritmos em Java
                                        (Goodrich, Tamassia)
                                    </li>
                                    <li>
                                        Competitive Programming 3 (Steven Halim,
                                        Felix Halim)
                                    </li>
                                    <li>
                                        Cracking the Coding Interview (Gayle
                                        Laakmann McDowell)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Previous Competitions */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                            <div className="h-2 bg-red-600"></div>
                            <div className="p-6">
                                <AwardIcon className="w-12 h-12 text-red-600 mb-4" />
                                <h3 className="text-xl font-bold mb-4">
                                    Competições Anteriores
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Pratique com problemas de edições anteriores
                                    de maratonas de programação.
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                                    <li>
                                        <Link
                                            href="/edicoes"
                                            className="text-red-600 hover:underline"
                                        >
                                            Edições anteriores da ETEC e FATEC
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            href="https://maratona.sbc.org.br/antigas.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-600 hover:underline"
                                        >
                                            Maratona de Programação SBC
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://icpc.global/worldfinals/problems"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-600 hover:underline"
                                        >
                                            ICPC World Finals
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Study Tips Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Dicas de Estudo
                    </h2>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <span className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full mr-3">
                                    1
                                </span>
                                Estude os fundamentos
                            </h3>
                            <p className="text-gray-700">
                                Antes de avançar para algoritmos complexos,
                                certifique-se de dominar os fundamentos:
                                estruturas de dados básicas (arrays, listas,
                                pilhas, filas), algoritmos de ordenação e busca,
                                e complexidade de algoritmos.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <span className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full mr-3">
                                    2
                                </span>
                                Pratique regularmente
                            </h3>
                            <p className="text-gray-700">
                                Reserve um tempo diário ou semanal para resolver
                                problemas. A consistência é mais importante que
                                sessões longas e esporádicas de estudo.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <span className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full mr-3">
                                    3
                                </span>
                                Simule competições
                            </h3>
                            <p className="text-gray-700">
                                Pratique com seu time em condições semelhantes
                                às da competição: limite de tempo, sem consulta
                                a materiais externos (exceto os permitidos na
                                competição) e com pressão de tempo.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <span className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full mr-3">
                                    4
                                </span>
                                Aprenda com os erros
                            </h3>
                            <p className="text-gray-700">
                                Quando não conseguir resolver um problema, não
                                desista. Estude a solução, entenda o raciocínio
                                e tente implementá-la por conta própria depois.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <span className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full mr-3">
                                    5
                                </span>
                                Trabalhe em equipe
                            </h3>
                            <p className="text-gray-700">
                                Pratique com seus colegas de equipe, discuta
                                soluções e divida tarefas de acordo com as
                                habilidades de cada um. A comunicação eficiente
                                é essencial durante a competição.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <span className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full mr-3">
                                    6
                                </span>
                                Crie uma biblioteca de código
                            </h3>
                            <p className="text-gray-700">
                                Mantenha uma coleção de implementações de
                                algoritmos e estruturas de dados comuns que você
                                possa adaptar rapidamente durante as
                                competições.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-12 bg-gray-900 text-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <CodeIcon className="w-12 h-12 mx-auto mb-4 text-red-500" />
                        <h2 className="text-2xl font-bold mb-4">
                            Pronto para o desafio?
                        </h2>
                        <p className="text-gray-300 mb-6">
                            Aplique essas dicas, pratique regularmente e
                            participe da próxima maratona de programação. O
                            aprendizado contínuo e a experiência adquirida serão
                            valiosos para sua carreira em tecnologia.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button asChild variant="destructive">
                                <Link href="/">Ver próximos eventos</Link>
                            </Button>
                            <Button asChild variant="secondary">
                                <Link href="/edicoes">Edições anteriores</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
