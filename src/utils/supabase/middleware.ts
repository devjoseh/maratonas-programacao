import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
    try {
        let response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        });

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value }) =>
                            request.cookies.set(name, value)
                        );
                        response = NextResponse.next({
                            request,
                        });
                        cookiesToSet.forEach(({ name, value, options }) =>
                            response.cookies.set(name, value, options)
                        );
                    },
                },
            }
        );

        const user = await supabase.auth.getUser();

        // Lista de rotas protegidas
        const protectedRoutes = ["/admin", "/sign-up"];

        // Verifica se a rota atual requer autenticação
        const isProtectedRoute = protectedRoutes.some((route) =>
            request.nextUrl.pathname.startsWith(route)
        );

        // Redireciona para login se não autenticado
        if (isProtectedRoute && user.error) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }

        // Redireciona usuários autenticados da raiz
        if (request.nextUrl.pathname === "/" && !user.error) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }

        return response;
    } catch (e) {
        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        });
    }
};
