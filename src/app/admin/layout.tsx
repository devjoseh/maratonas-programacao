import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CalendarIcon, UsersIcon, HomeIcon, LogOutIcon, MenuIcon, FileTextIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut as signOutAction } from "@/utils/actions/auth";
import { isAuthenticated } from "@/utils/actions/auth";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Admin - Maratona de Programação",
    description: "Painel de administração para gerenciar maratonas de programação",
};

export default async function AdminLayout({ children }: {
    children: React.ReactNode;
}) {
    const user = await isAuthenticated();

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Mobile Sidebar Trigger */}
            <div className="fixed top-4 left-4 z-40 md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="bg-white">
                            <MenuIcon className="h-5 w-5" />
                            <span className="sr-only">Abrir menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <MobileSidebar />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <Link href="/admin" className="font-bold text-xl text-gray-900">
                            Admin Maratona
                        </Link>
                    </div>
                    <div className="mt-8 flex flex-col flex-1">
                        <nav className="flex-1 px-2 pb-4 space-y-1">
                            <Link
                                href="/admin"
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                            >
                                <HomeIcon className="mr-3 h-5 w-5 text-gray-500" />
                                Dashboard
                            </Link>
                            <Link
                                href="/admin/eventos"
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                            >
                                <CalendarIcon className="mr-3 h-5 w-5 text-gray-500" />
                                Eventos
                            </Link>
                            <Link
                                href="/admin/equipes"
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                            >
                                <UsersIcon className="mr-3 h-5 w-5 text-gray-500" />
                                Equipes
                            </Link>
                            <Link
                                href="/admin/documentos"
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                            >
                                <FileTextIcon className="mr-3 h-5 w-5 text-gray-500" />
                                Documentos
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-end h-16 items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center space-x-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src="/placeholder.svg"
                                                alt="Avatar"
                                            />
                                            <AvatarFallback>AD</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">
                                            {user.email}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Minha Conta
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                        <form action={signOutAction}>
                                            <Button variant="ghost">
                                                <LogOutIcon className="mr-2 h-4 w-4" />
                                                Sair
                                            </Button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                <main className="flex-1 pb-8">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// Mobile Sidebar Component
function MobileSidebar() {
    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex items-center justify-between px-4 py-5 border-b">
                <Link href="/admin" className="font-bold text-xl text-gray-900">
                    Admin Maratona
                </Link>
            </div>
            <div className="flex-1 px-4 py-6">
                <nav className="flex-1 space-y-4">
                    <Link
                        href="/admin"
                        className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
                    >
                        <HomeIcon className="mr-3 h-5 w-5 text-gray-500" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/eventos"
                        className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
                    >
                        <CalendarIcon className="mr-3 h-5 w-5 text-gray-500" />
                        Eventos
                    </Link>
                    <Link
                        href="/admin/equipes"
                        className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
                    >
                        <UsersIcon className="mr-3 h-5 w-5 text-gray-500" />
                        Equipes
                    </Link>
                    <Link
                        href="/admin/documentos"
                        className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
                    >
                        <FileTextIcon className="mr-3 h-5 w-5 text-gray-500" />
                        Documentos
                    </Link>
                </nav>
            </div>
            <div className="px-4 py-4 border-t">
                <Button variant="destructive" className="w-full flex items-center justify-center" asChild>
                    <Link href="/logout">
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
}
