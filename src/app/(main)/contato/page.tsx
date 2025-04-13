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
                                    <div className="w-16 h-16 relative mr-4">
                                        <Image
                                            src="/placeholder.svg?height=64&width=64"
                                            alt="Logo ETEC Abdias do Nascimento"
                                            width={64}
                                            height={64}
                                            className="object-contain"
                                        />
                                    </div>
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
                                                Rua Doutor Nuno Guerner de
                                                Almeida, 54
                                                <br />
                                                Jardim São João (Zona Leste)
                                                <br />
                                                São Paulo - SP, 03918-090
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
                                                (11) 2546-0756
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Mail className="w-6 h-6 text-red-600 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                E-mail
                                            </h4>
                                            <p className="text-gray-600">
                                                e254dir@cps.sp.gov.br
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
                                                href="https://www.etecabdias.com.br"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-red-600 hover:underline"
                                            >
                                                www.etecabdias.com.br
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
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
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Button asChild className="w-full">
                                        <Link
                                            href="https://www.google.com/maps?q=ETEC+Abdias+do+Nascimento"
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
                                    <div className="w-16 h-16 relative mr-4">
                                        <Image
                                            src="/placeholder.svg?height=64&width=64"
                                            alt="Logo FATEC"
                                            width={64}
                                            height={64}
                                            className="object-contain"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold">
                                        FATEC São Paulo
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
                                                Av. Tiradentes, 615
                                                <br />
                                                Bom Retiro
                                                <br />
                                                São Paulo - SP, 01101-010
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
                                                (11) 3322-2200
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Mail className="w-6 h-6 text-red-700 mr-4 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">
                                                E-mail
                                            </h4>
                                            <p className="text-gray-600">
                                                f001dir@cps.sp.gov.br
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
                                                href="https://www.fatecsp.br"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-red-700 hover:underline"
                                            >
                                                www.fatecsp.br
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
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
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Button asChild className="w-full">
                                        <Link
                                            href="https://www.google.com/maps?q=FATEC+São+Paulo"
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
                        <div className="mt-12 p-8 bg-gray-50 rounded-lg border border-gray-100 max-w-3xl mx-auto">
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
