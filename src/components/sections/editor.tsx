"use client";

import { useRef, useState } from "react";
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link,
    ImageIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "@/components/ui/card";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function Editor({ value, onChange, disabled = false }: EditorProps) {
    const [activeTab, setActiveTab] = useState<string>("edit");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleFormat = (format: string) => {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;
        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;
        const selectedText = value.substring(selectionStart, selectionEnd);

        if (selectionStart === selectionEnd) return; // Nenhum texto selecionado

        let prefix = "";
        let suffix = "";

        switch (format) {
            case "bold":
                prefix = "**";
                suffix = "**";
                break;
            case "italic":
                prefix = "*";
                suffix = "*";
                break;
            case "underline":
                prefix = "<u>";
                suffix = "</u>";
                break;
            case "list":
                // Para listas, precisamos tratar cada linha
                const lines = selectedText.split("\n");
                const formattedText = lines
                    .map((line) => `- ${line}`)
                    .join("\n");
                const newValue =
                    value.substring(0, selectionStart) +
                    formattedText +
                    value.substring(selectionEnd);
                onChange(newValue);
                return;
            case "ordered-list":
                // Para listas ordenadas, precisamos tratar cada linha
                const orderedLines = selectedText.split("\n");
                const formattedOrderedText = orderedLines
                    .map((line, i) => `${i + 1}. ${line}`)
                    .join("\n");
                const newOrderedValue =
                    value.substring(0, selectionStart) +
                    formattedOrderedText +
                    value.substring(selectionEnd);
                onChange(newOrderedValue);
                return;
            case "align-left":
                prefix = '<div style="text-align: left">';
                suffix = "</div>";
                break;
            case "align-center":
                prefix = '<div style="text-align: center">';
                suffix = "</div>";
                break;
            case "align-right":
                prefix = '<div style="text-align: right">';
                suffix = "</div>";
                break;
            case "link":
                const url = prompt("Digite a URL do link:", "https://");
                if (url) {
                    prefix = "[";
                    suffix = `](${url})`;
                } else {
                    return;
                }
                break;
            case "image":
                const imgUrl = prompt("Digite a URL da imagem:", "https://");
                if (imgUrl) {
                    prefix = "![";
                    suffix = `](${imgUrl})`;
                } else {
                    return;
                }
                break;
        }

        // Aplicar a formatação
        const newValue =
            value.substring(0, selectionStart) +
            prefix +
            selectedText +
            suffix +
            value.substring(selectionEnd);

        onChange(newValue);

        // Restaurar o foco e a seleção após a formatação
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                selectionStart + prefix.length,
                selectionEnd + prefix.length
            );
        }, 0);
    };

    const renderPreview = () => {
        const html = value
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>")
            .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/!\[(.*?)\]$$(.*?)$$/g, '<img src="$2" alt="$1" style="max-width: 100%;" />')
            .replace(/^- (.*)/gm, "<li>$1</li>")
            .replace(/^(\d+)\. (.*)/gm, "<li>$2</li>")
            .replace(/<li>(.*)<\/li>/g, "<ul><li>$1</li></ul>")
            .replace(/<\/ul><ul>/g, "")
            .replace(/<div style="text-align: (.*?)">([\s\S]*?)<\/div>/g, '<div style="text-align: $1">$2</div>')
            .replace(/\n/g, "<br />")

        return { __html: html };
    };

    return (
        <Card className="border rounded-md">
            <Tabs
                defaultValue="edit"
                value={activeTab}
                onValueChange={setActiveTab}
            >
                <div className="flex items-center justify-between border-b p-2">
                    <ToggleGroup type="multiple" className="flex flex-wrap">
                        <ToggleGroupItem
                            value="bold"
                            aria-label="Negrito"
                            onClick={() => handleFormat("bold")}
                            disabled={disabled || activeTab === "preview"}
                        >
                            <Bold className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="italic"
                            aria-label="Itálico"
                            onClick={() => handleFormat("italic")}
                            disabled={disabled || activeTab === "preview"}
                        >
                            <Italic className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="underline"
                            aria-label="Sublinhado"
                            onClick={() => handleFormat("underline")}
                            disabled={disabled || activeTab === "preview"}
                        >
                            <Underline className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="list"
                            aria-label="Lista"
                            onClick={() => handleFormat("list")}
                            disabled={disabled || activeTab === "preview"}
                        >
                            <List className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="ordered-list"
                            aria-label="Lista Ordenada"
                            onClick={() => handleFormat("ordered-list")}
                            disabled={disabled || activeTab === "preview"}
                        >
                            <ListOrdered className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="align-left"
                            aria-label="Alinhar à Esquerda"
                            onClick={() => handleFormat("align-left")}
                            disabled={disabled || activeTab === "preview"}
                        >
                            <AlignLeft className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="align-center"
                            aria-label="Centralizar"
                            onClick={() => handleFormat("align-center")}
                            disabled={disabled || activeTab === "preview"}
                        >
                            <AlignCenter className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="align-right"
                            aria-label="Alinhar à Direita"
                            onClick={() => handleFormat("align-right")}
                            disabled={disabled || activeTab === "preview"}
                        >
                            <AlignRight className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="link"
                            aria-label="Link"
                            onClick={() => handleFormat("link")}
                            disabled={disabled || activeTab === "preview"}
                        >
                            <Link className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="image"
                            aria-label="Imagem"
                            onClick={() => handleFormat("image")}
                            disabled={disabled || activeTab === "preview"}
                        >
                            <ImageIcon className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>

                    <TabsList>
                        <TabsTrigger value="edit">Editar</TabsTrigger>
                        <TabsTrigger value="preview">Visualizar</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="edit" className="p-0">
                    <Textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="min-h-[300px] border-0 focus-visible:ring-0 resize-none"
                        placeholder="Digite a descrição do evento aqui..."
                        disabled={disabled}
                    />
                </TabsContent>

                <TabsContent value="preview" className="p-4 min-h-[300px]">
                    <div
                        dangerouslySetInnerHTML={renderPreview()}
                        className="prose max-w-none"
                    />
                </TabsContent>
            </Tabs>
        </Card>
    );
}
