import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Button, FormMessage, Message, SubmitButton } from "@/components/index";
import { signUp as signUpAction } from "@/utils/actions/auth";
import { isAuthenticated } from "@/utils/actions/auth";
import { Home } from "lucide-react";
import Link from "next/link";

export default async function Signup(props: { searchParams: Promise<Message> }) {
    await isAuthenticated()

    const searchParams = await props.searchParams;
    if ("message" in searchParams) {
        return (
            <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
                <FormMessage message={searchParams} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black-700 flex items-center justify-center p-4 relative">

            <div className="w-full max-w-md z-10">
                <Card className="border-1 shadow-xl bg-white backdrop-blur-sm pt-5 pb-5">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Criar novo Usuário
                        </CardTitle>
                        <CardDescription className="text-center">
                            Digite abaixo o e-mail e senha do novo usuário
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex-1 flex flex-col min-w-64">
                            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-4">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    placeholder="email@example.com"
                                    required
                                />
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Senha de acesso"
                                    minLength={6}
                                    required
                                />
                                <Label htmlFor="confirmPassword">Confirme a Senha</Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirme sua senha"
                                    minLength={6}
                                    required
                                />
                                <SubmitButton
                                    formAction={signUpAction}
                                    pendingText="Criando conta..."
                                >
                                    Registrar
                                </SubmitButton>
                                <FormMessage message={searchParams} />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Link className="w-full" href="/">
                            <Button variant="outline" className="w-full cursor-pointer">
                                <Home className="mr-2 h-4 w-4" />
                                Voltar para o site
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
