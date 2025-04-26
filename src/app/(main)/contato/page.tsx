import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Clock, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Contact Information */}
            <section className="py-16 bg-white">
                <div className="mx-auto px-4 md:px-8 lg:px-16">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Informações de Contato
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* ETEC Contact Information */}
                            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                                <div className="flex items-center mb-6">
                                    {/* <div className="w-16 h-16 relative mr-4">
                                        <Image
                                            src="/placeholder.svg?height=64&width=64"
                                            alt="Logo ETEC Abdias do Nascimento"
                                            width={64}
                                            height={64}
                                            className="object-contain"
                                        />
                                    </div> */}
                                    <h3 className="text-2xl font-bold">
                                        ETEC Abdias do Nascimento
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <MapPin className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                Endereço
                                            </h4>
                                            <p className="text-gray-600">
                                                Rua Dr. José Augusto de Souza de Silva, s/nº - Jardim Parque Morumbi (Paraisópolis) 
                                                <br />
                                                05712-040 - São Paulo/SP
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Phone className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                Telefone
                                            </h4>
                                            <p className="text-gray-600">
                                                (11) 3507-7491
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Mail className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                E-mails
                                            </h4>
                                            <p className="text-gray-600">
                                                Diretoria: {" "}
                                                <Link 
                                                    key="e224dir@cps.sp.gov.br"
                                                    href="mailto:e224dir@cps.sp.gov.br"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="e224dir@cps.sp.gov.br"
                                                    className="text-red-600 hover:underline"
                                                >
                                                    e224dir@cps.sp.gov.br
                                                </Link>
                                            </p>
                                            <p className="text-gray-600">
                                                Diretoria Administrativa: {" "}
                                                <Link 
                                                    key="e224adm@cps.sp.gov.br"
                                                    href="mailto:e224adm@cps.sp.gov.br"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="e224adm@cps.sp.gov.br"
                                                    className="text-red-600 hover:underline"
                                                >
                                                    e224adm@cps.sp.gov.br
                                                </Link>
                                            </p>
                                            <p className="text-gray-600">
                                                Diretoria Acadêmica: {" "}
                                                <Link 
                                                    key="e224acad@cps.sp.gov.br"
                                                    href="mailto:e224acad@cps.sp.gov.br"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="e224acad@cps.sp.gov.br"
                                                    className="text-red-600 hover:underline"
                                                >
                                                    e224acad@cps.sp.gov.br
                                                </Link>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Globe className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                Website
                                            </h4>
                                            <Link
                                                href="https://etecabdiasnascimento.cps.sp.gov.br/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-red-600 hover:underline"
                                            >
                                                www.etecabdiasnascimento.cps.sp.gov.br
                                            </Link>
                                        </div>
                                    </div>

                                    {/* <div className="flex items-start">
                                        <Clock className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                Horário de Atendimento
                                            </h4>
                                            <ul className="space-y-1 text-gray-600">
                                                <li className="flex justify-between">
                                                    <span>
                                                        Seg a Sex:
                                                    </span>
                                                    <span>8h às 21h</span>
                                                </li>
                                                <li className="flex justify-between">
                                                    <span>Sábado:</span>
                                                    <span>8h às 12h</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                                </div>

                                <div className="mt-8">
                                    <Button asChild className="w-full">
                                        <Link
                                            href="https://maps.app.goo.gl/koSQYcRDB5m8wwhL6"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Ver no Mapa
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* FATEC Contact Information */}
                            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                                <div className="flex items-center mb-6">
                                    {/* <div className="w-16 h-16 relative mr-4">
                                        <Image
                                            src="/placeholder.svg?height=64&width=64"
                                            alt="Logo FATEC"
                                            width={64}
                                            height={64}
                                            className="object-contain"
                                        />
                                    </div> */}
                                    <h3 className="text-2xl font-bold">
                                        FATEC Zona Sul – Dom Paulo Evaristo Arns
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <MapPin className="w-6 h-6 text-red-700 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                Endereço
                                            </h4>
                                            <p className="text-gray-600">
                                                Rua Frederico Grotte, 322 - Jardim São Luiz 
                                                <br/>
                                                CEP: 05818-270 - São Paulo/SP
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Phone className="w-6 h-6 text-red-700 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                Telefone
                                            </h4>
                                            <p className="text-gray-600">
                                                (11) 5851-5829 / 5851-8949
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Mail className="w-6 h-6 text-red-700 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                E-mails
                                            </h4>
                                            <p className="text-gray-600">
                                                Diretoria: {" "}
                                                <Link 
                                                    key="f137dir@cps.sp.gov.br"
                                                    href="mailto:f137dir@cps.sp.gov.br"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="f137dir@cps.sp.gov.br"
                                                    className="text-red-700 hover:underline"
                                                >
                                                    f137dir@cps.sp.gov.br
                                                </Link>
                                            </p>
                                            <p className="text-gray-600">
                                                Diretoria Administrativa: {" "}
                                                <Link 
                                                    key="f137adm@cps.sp.gov.br"
                                                    href="mailto:f137adm@cps.sp.gov.br"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="f137adm@cps.sp.gov.br"
                                                    className="text-red-700 hover:underline"
                                                >
                                                    f137adm@cps.sp.gov.br
                                                </Link>
                                            </p>
                                            <p className="text-gray-600">
                                                Diretoria Acadêmica: {" "}
                                                <Link 
                                                    key="f137acad@cps.sp.gov.br"
                                                    href="mailto:f137acad@cps.sp.gov.br"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="f137acad@cps.sp.gov.br"
                                                    className="text-red-700 hover:underline"
                                                >
                                                    f137acad@cps.sp.gov.br
                                                </Link>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Globe className="w-6 h-6 text-red-700 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                Website
                                            </h4>
                                            <Link
                                                href="https://fateczonasul.edu.br/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-red-700 hover:underline"
                                            >
                                                www.fateczonasul.edu.br
                                            </Link>
                                        </div>
                                    </div>

                                    {/* <div className="flex items-start">
                                        <Clock className="w-6 h-6 text-red-700 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                Horário de Atendimento
                                            </h4>
                                            <ul className="space-y-1 text-gray-600">
                                                <li className="flex justify-between">
                                                    <span>
                                                        Seg a Sex:
                                                    </span>
                                                    <span>8h às 21h</span>
                                                </li>
                                                <li className="flex justify-between">
                                                    <span>Sábado:</span>
                                                    <span>8h às 12h</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                                </div>

                                <div className="mt-8">
                                    <Button asChild className="w-full">
                                        <Link
                                            href="https://maps.app.goo.gl/6LwPQ79q9aUpuhTJ9"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Ver no Mapa
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Maratona de Programação Contact */}
                        {/* <div className="mt-12 p-8 bg-gray-50 rounded-lg border border-gray-100 max-w-3xl mx-auto">
                            <h3 className="text-2xl font-bold mb-6 text-center">
                                Contato da Organização da Maratona
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <Mail className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                    <div>
                                        <h4 className="text-lg font-semibold mb-1">
                                            E-mail
                                        </h4>
                                        <p className="text-gray-600">
                                            maratona.programacao@cps.sp.gov.br
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Phone className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                    <div>
                                        <h4 className="text-lg font-semibold mb-1">
                                            Telefone
                                        </h4>
                                        <p className="text-gray-600">
                                            (11) 9876-5432
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-center mt-6">
                                    Para dúvidas específicas sobre as maratonas
                                    de programação, entre em contato diretamente
                                    com a equipe organizadora.
                                </p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </div>
    );
}
