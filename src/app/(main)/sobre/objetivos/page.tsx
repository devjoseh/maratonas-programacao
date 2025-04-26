import {
    BookOpenIcon,
    CodeIcon,
    UsersIcon,
    BrainIcon,
    TrophyIcon,
    RocketIcon,
} from "lucide-react";

export default function ObjectivesPage() {
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
                            Objetivos
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8">
                            Conheça os propósitos e benefícios das maratonas de
                            programação
                        </p>
                    </div>
                </div>
            </section>

            {/* <section className="py-8">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold">
                            Objetivos
                        </h2>
                    </div>
                </div>
            </section> */}

            {/* Main Objectives Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8">
                            Propósito das Maratonas de Programação
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">
                            As maratonas de programação organizadas pela ETEC
                            Abdias do Nascimento e FATEC têm como objetivo
                            principal promover a prática da programação, o
                            desenvolvimento do raciocínio lógico e o trabalho em
                            equipe entre os estudantes.
                        </p>
                        <p className="text-lg text-gray-700 mb-6">
                            Estas competições são inspiradas na Maratona de
                            Programação da SBC (Sociedade Brasileira de
                            Computação) e no ICPC (International Collegiate
                            Programming Contest), eventos de renome mundial que
                            desafiam estudantes a resolver problemas complexos
                            utilizando conhecimentos de algoritmos, estruturas
                            de dados e programação.
                        </p>
                        <p className="text-lg text-gray-700 mb-10">
                            Além de ser uma atividade divertida e desafiadora,
                            as maratonas preparam os estudantes para o mercado
                            de trabalho, desenvolvendo habilidades essenciais
                            para profissionais de tecnologia.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <CodeIcon className="w-8 h-8 text-red-600 mr-3" />
                                    <h3 className="text-xl font-bold">
                                        Aprimoramento Técnico
                                    </h3>
                                </div>
                                <p className="text-gray-700">
                                    Desenvolver as habilidades dos estudantes
                                    nas técnicas de projeto e implementação de
                                    algoritmos eficientes, estimulando o
                                    pensamento computacional e a resolução de
                                    problemas complexos.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <UsersIcon className="w-8 h-8 text-red-600 mr-3" />
                                    <h3 className="text-xl font-bold">
                                        Trabalho em Equipe
                                    </h3>
                                </div>
                                <p className="text-gray-700">
                                    Promover o desenvolvimento da capacidade de
                                    trabalho em equipe, incentivando a
                                    colaboração, a comunicação eficiente e a
                                    divisão estratégica de tarefas entre os
                                    membros.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <BrainIcon className="w-8 h-8 text-red-600 mr-3" />
                                    <h3 className="text-xl font-bold">
                                        Criatividade e Pressão
                                    </h3>
                                </div>
                                <p className="text-gray-700">
                                    Estimular o uso da criatividade e o
                                    aperfeiçoamento na habilidade de resolver
                                    problemas sob pressão, preparando os
                                    estudantes para situações reais do mercado
                                    de trabalho.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <TrophyIcon className="w-8 h-8 text-red-600 mr-3" />
                                    <h3 className="text-xl font-bold">
                                        Competição Saudável
                                    </h3>
                                </div>
                                <p className="text-gray-700">
                                    Promover um ambiente de competição saudável
                                    que incentive a superação de limites, a
                                    busca por excelência e o reconhecimento do
                                    mérito acadêmico.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Benefícios para os Participantes
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white mr-4">
                                    <BookOpenIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Aprendizado Acelerado
                                    </h3>
                                    <p className="text-gray-700">
                                        A preparação e participação em maratonas
                                        de programação aceleram o aprendizado de
                                        conceitos avançados de algoritmos e
                                        estruturas de dados, complementando o
                                        conhecimento adquirido em sala de aula.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white mr-4">
                                    <RocketIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Destaque Profissional
                                    </h3>
                                    <p className="text-gray-700">
                                        Participar de maratonas de programação é
                                        um diferencial no currículo, sendo
                                        valorizado por empresas de tecnologia
                                        que buscam profissionais com habilidades
                                        avançadas de resolução de problemas e
                                        programação.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white mr-4">
                                    <UsersIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Networking
                                    </h3>
                                    <p className="text-gray-700">
                                        As competições proporcionam
                                        oportunidades de networking com outros
                                        estudantes, professores e profissionais
                                        da área, ampliando a rede de contatos e
                                        possibilitando trocas de experiências
                                        valiosas.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white mr-4">
                                    <TrophyIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Reconhecimento e Premiações
                                    </h3>
                                    <p className="text-gray-700">
                                        Além da satisfação pessoal de superar
                                        desafios, os participantes com melhor
                                        desempenho recebem reconhecimento e
                                        premiações, incentivando a busca pela
                                        excelência e a dedicação aos estudos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 text-center">
                                Impacto na Formação Acadêmica
                            </h3>
                            <p className="text-gray-700 text-center">
                                As maratonas de programação complementam a
                                formação acadêmica tradicional, oferecendo
                                desafios práticos que estimulam o
                                desenvolvimento de habilidades técnicas e
                                comportamentais essenciais para o sucesso
                                profissional na área de tecnologia.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
