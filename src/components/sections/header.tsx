"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="mx-auto px-4 md:px-8 lg:px-16">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="Logo Maratona de Programação"
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl sm:inline-block">
                                Hackas EF
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/"
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-red-600",
                                isActive("/") ? "text-red-600" : "text-gray-700"
                            )}
                        >
                            Principal
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="link"
                                    className={cn(
                                        "text-sm font-medium p-0 h-auto transition-colors hover:text-red-600",
                                        isActive("/sobre") ? "text-red-600" : "text-gray-700"
                                    )}
                                >
                                    Sobre o Evento{" "}
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/sobre/objetivos"
                                        className="w-full"
                                    >
                                        Objetivos
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/sobre/documentos"
                                        className="w-full"
                                    >
                                        Documentos
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/sobre/como-participar"
                                        className="w-full"
                                    >
                                        Participação
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/sobre/como-se-preparar"
                                        className="w-full"
                                    >
                                        Como se Preparar
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="link"
                                    className={cn(
                                        "text-sm font-medium p-0 h-auto transition-colors hover:text-red-600",
                                        isActive("/eventos") ? "text-red-600" : "text-gray-700"
                                    )}
                                >
                                    Instituições{" "}
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/eventos/etec"
                                        className="w-full"
                                    >
                                        ETEC Abdias
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/eventos/fatec"
                                        className="w-full"
                                    >
                                        FATEC Zona Sul
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link
                            href="/edicoes"
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-red-600",
                                isActive("/edicoes") ? "text-red-600" : "text-gray-700"
                            )}
                        >
                            Edições Anteriores
                        </Link>

                        <Link
                            href="/contato"
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-red-600",
                                isActive("/contato") ? "text-red-600" : "text-gray-700"
                            )}
                        >
                            Contato
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6 text-sm" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200">
                    <div className="mx-auto px-4 md:px-8 lg:px-16 py-4 space-y-4">
                        <Link
                            href="/"
                            className={cn(
                                "block py-2 text-base font-medium transition-colors hover:text-red-600",
                                isActive("/") ? "text-red-600" : "text-gray-700"
                            )}
                            onClick={closeMenu}
                        >
                            Principal
                        </Link>

                        <div className="py-2">
                            <div
                                className={cn(
                                    "text-base font-medium mb-2",
                                    isActive("/sobre") ? "text-red-600" : "text-gray-700"
                                )}
                            >
                                Sobre o Evento
                            </div>
                            <div className="pl-4 space-y-2">
                                <Link
                                    href="/sobre/objetivos"
                                    className="block py-1 text-sm text-gray-600 hover:text-red-600"
                                    onClick={closeMenu}
                                >
                                    Objetivos
                                </Link>
                                <Link
                                    href="/sobre/documentos"
                                    className="block py-1 text-sm text-gray-600 hover:text-red-600"
                                    onClick={closeMenu}
                                >
                                    Documentos
                                </Link>
                                <Link
                                    href="/sobre/como-participar"
                                    className="block py-1 text-sm text-gray-600 hover:text-red-600"
                                    onClick={closeMenu}
                                >
                                    Como Participar
                                </Link>
                            </div>
                        </div>

                        <div className="py-2">
                            <div
                                className={cn(
                                    "text-base font-medium mb-2",
                                    isActive("/eventos") ? "text-red-600" : "text-gray-700"
                                )}
                            >
                                Instituições
                            </div>
                            <div className="pl-4 space-y-2">
                                <Link
                                    href="/eventos/etec"
                                    className="block py-1 text-sm text-gray-600 hover:text-red-600"
                                    onClick={closeMenu}
                                >
                                    ETEC Abdias
                                </Link>
                                <Link
                                    href="/eventos/fatec"
                                    className="block py-1 text-sm text-gray-600 hover:text-red-600"
                                    onClick={closeMenu}
                                >
                                    FATEC Zona Sul
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="/edicoes"
                            className={cn(
                                "block py-2 text-base font-medium transition-colors hover:text-red-600",
                                isActive("/edicoes") ? "text-red-600" : "text-gray-700"
                            )}
                            onClick={closeMenu}
                        >
                            Edições Anteriores
                        </Link>

                        <Link
                            href="/contato"
                            className={cn(
                                "block py-2 text-base font-medium transition-colors hover:text-red-600",
                                isActive("/contato") ? "text-red-600" : "text-gray-700"
                            )}
                            onClick={closeMenu}
                        >
                            Contato
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
