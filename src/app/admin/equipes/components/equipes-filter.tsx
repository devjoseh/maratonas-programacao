"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button, Badge, Popover, PopoverContent, PopoverTrigger } from "@/components"
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FilterOption {
    value: string;
    label: string;
}

interface FilterProps {
    name: string;
    label: string;
    options: FilterOption[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
}

function Filter({
    label,
    options,
    selectedValues,
    onChange,
}: FilterProps) {
    const [open, setOpen] = useState(false);

    const handleSelect = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((item) => item !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    const clearFilter = () => {
        onChange([]);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between min-w-[180px]"
                >
                    <span className="truncate">
                        {selectedValues.length > 0
                            ? `${label} (${selectedValues.length})`
                            : label}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder={`Buscar ${label.toLowerCase()}...`}
                    />
                    <CommandList>
                        <CommandEmpty>
                            Nenhum resultado encontrado.
                        </CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={() => handleSelect(option.value)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedValues.includes(
                                                option.value
                                            )
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    {selectedValues.length > 0 && (
                        <div className="border-t p-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-center text-xs"
                                onClick={clearFilter}
                            >
                                Limpar filtro
                            </Button>
                        </div>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
}

interface EquipesFilterProps {
    eventos: { id: string; titulo: string; ano: number; instituicao: string }[];
}

export function EquipesFilter({ eventos }: EquipesFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        eventos: searchParams.getAll("evento") || [],
        status: searchParams.getAll("status") || [],
        periodos: searchParams.getAll("periodo") || [],
    });

    const statusOptions = [
        { value: "confirmada", label: "Confirmada" },
        { value: "pendente", label: "Pendente" },
    ];

    const periodoOptions = [
        { value: "Manhã", label: "Manhã" },
        { value: "Tarde", label: "Tarde" },
        { value: "Noite", label: "Noite" }
    ];

    const eventoOptions = eventos.map((evento) => ({
        value: evento.id,
        label: `${evento.titulo} (${evento.ano} - ${evento.instituicao})`,
    }));

    useEffect(() => {
        const params = new URLSearchParams();

        filters.eventos.forEach((evento) => {
            params.append("evento", evento);
        });

        filters.status.forEach((status) => {
            params.append("status", status);
        });

        filters.periodos.forEach((periodo) => {
            params.append("periodo", periodo);
        });

        router.push(`/admin/equipes?${params.toString()}`);
    }, [filters, router]);

    const handleFilterChange =
        (filterName: keyof typeof filters) => (values: string[]) => {
            setFilters((prev) => ({
                ...prev,
                [filterName]: values,
            }));
        };

    const clearAllFilters = () => {
        setFilters({
            eventos: [],
            status: [],
            periodos: [],
        });
    };

    const hasActiveFilters =
        filters.eventos.length > 0 ||
        filters.status.length > 0 ||
        filters.periodos.length > 0;

    return (
        <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-2">
                <Filter
                    name="evento"
                    label="Evento"
                    options={eventoOptions}
                    selectedValues={filters.eventos}
                    onChange={handleFilterChange("eventos")}
                />
                <Filter
                    name="status"
                    label="Status"
                    options={statusOptions}
                    selectedValues={filters.status}
                    onChange={handleFilterChange("status")}
                />
                <Filter
                    name="periodo"
                    label="Período"
                    options={periodoOptions}
                    selectedValues={filters.periodos}
                    onChange={handleFilterChange("periodos")}
                />

                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="flex items-center gap-1"
                    >
                        <X className="h-4 w-4" />
                        Limpar todos
                    </Button>
                )}
            </div>

            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {filters.eventos.map((eventoId) => {
                        const evento = eventoOptions.find(
                            (e) => e.value === eventoId
                        );
                        return evento ? (
                            <Badge
                                key={eventoId}
                                variant="secondary"
                                className="px-2 py-1"
                            >
                                {evento.label}
                                <X
                                    className="ml-1 h-3 w-3 cursor-pointer"
                                    onClick={() =>
                                        handleFilterChange("eventos")(
                                            filters.eventos.filter(
                                                (id) => id !== eventoId
                                            )
                                        )
                                    }
                                />
                            </Badge>
                        ) : null;
                    })}

                    {filters.status.map((status) => {
                        const statusOption = statusOptions.find(
                            (s) => s.value === status
                        );
                        return statusOption ? (
                            <Badge
                                key={status}
                                variant="secondary"
                                className="px-2 py-1"
                            >
                                {statusOption.label}
                                <X
                                    className="ml-1 h-3 w-3 cursor-pointer"
                                    onClick={() =>
                                        handleFilterChange("status")(
                                            filters.status.filter(
                                                (s) => s !== status
                                            )
                                        )
                                    }
                                />
                            </Badge>
                        ) : null;
                    })}

                    {filters.periodos.map((periodo) => {
                        const periodoOption = periodoOptions.find(
                            (p) => p.value === periodo
                        );
                        return periodoOption ? (
                            <Badge
                                key={periodo}
                                variant="secondary"
                                className="px-2 py-1"
                            >
                                {periodoOption.label}
                                <X
                                    className="ml-1 h-3 w-3 cursor-pointer"
                                    onClick={() =>
                                        handleFilterChange("periodos")(
                                            filters.periodos.filter(
                                                (p) => p !== periodo
                                            )
                                        )
                                    }
                                />
                            </Badge>
                        ) : null;
                    })}
                </div>
            )}
        </div>
    );
}
