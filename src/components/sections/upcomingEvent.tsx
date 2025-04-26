"use client";

import { Database } from "@/utils/types/database.types"
import { CountdownTimer, Button, LoadingSpinner, LoadingSkeleton } from "@/components";
import { getEventsByName } from "@/app/(main)/actions";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface EventScheduleCardProps {
    school: "ETEC Abdias" | "FATEC";
}

export function EventScheduleCard({ school }: EventScheduleCardProps) {
    const [upcomingEvents, setUpcomingEvents] = useState<Database["public"]["Tables"]["eventos"]["Row"][]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const events = await getEventsByName(school);
                if (events) {
                    const upcomingEvent = (events || []).sort((a, b) => new Date(a.data_inicio).getTime() - new Date(b.data_inicio).getTime());
                    setUpcomingEvents(upcomingEvent);
                } else {
                    setUpcomingEvents([]);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
                setUpcomingEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [school]);

    if (loading) {
        return (
            <LoadingSpinner text="Carregando eventos..." />
        )
    }

    return (
        <section className="py-16 bg-white">
            <div className="mx-auto px-4 md:px-8 lg:px-16">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Próximos Eventos
                </h2>
                {upcomingEvents.length > 0 ? (
                    <div className={`grid grid-cols-1 md:grid-cols-1 gap-8`}>
                        {upcomingEvents.map((event) => (
                            <div
                                key={event.id}
                                className={`bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl ${
                                    upcomingEvents.length === 1 ? "md:max-w-[50%] md:mx-auto" : ""}`}>
                                <div className={`h-2 ${event.instituicao === "ETEC Abdias" ? "bg-red-600" : "bg-red-700"}`}></div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">
                                        {event.titulo}
                                    </h3>
                                    <p className="text-gray-700 font-medium mb-4">
                                        {event.instituicao}
                                    </p>
                                    <p className="text-gray-600 mb-6">
                                        {new Date(event.data_inicio).toLocaleDateString("pt-BR", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <div className="mb-6">
                                        <CountdownTimer targetDate={event.data_inicio}/>
                                    </div>
                                    {event.inscricao_externa ? (
                                        <Button asChild className="w-full" variant="destructive">
                                            <a href={event.url_inscricao_externa || "#"} target="_blank" rel="noopener noreferrer">
                                                Inscrever-se{" "}
                                                <ExternalLink className="ml-2 h-4 w-4" />
                                            </a>
                                        </Button>
                                    ) : (
                                        <Button asChild className="w-full" variant="destructive">
                                            <Link href={`/inscricao/${event.id}`}>
                                                Inscrever-se
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4">
                            Nenhum evento programado no momento
                        </h3>
                        <Button asChild variant="outline">
                            <Link href="/edicoes">
                                Ver edições anteriores
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
