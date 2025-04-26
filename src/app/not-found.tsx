import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="mx-auto mb-4">
                    <span className="text-6xl font-bold">404</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold">
                    Página não encontrada
                </h1>

                <p className="mt-4 text-lg text-gray-600">
                    Ops! A página que você procura não existe ou foi removida. Que tal voltar ao início e continuar explorando?
                </p>

                <div className="mt-8">
                    <Button
                        className="bg-gray-800 text-white px-5 py-3 sm:px-6 sm:py-4 rounded-full font-medium hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        asChild
                    >
                        <Link href="/">
                            <Home size={18} />
                            <span>Voltar ao início</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}