"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px]" />,
});

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

export function QuillEditor({
    value,
    onChange,
    disabled = false,
    placeholder = "Digite aqui...",
}: QuillEditorProps) {
    const [editorValue, setEditorValue] = useState(value);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setEditorValue(value);
    }, [value]);

    const handleChange = (content: string) => {
        setEditorValue(content);
        onChange(content);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link", "image"],
            ["clean"],
            [{ color: [] }],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "align",
        "link",
        "image",
        "color",
    ];

    return (
        <div className="border rounded-md">
            {mounted ? (
                <ReactQuill
                    theme="snow"
                    value={editorValue}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    readOnly={disabled}
                    placeholder={placeholder}
                    className="min-h-[300px]"
                />
            ) : (
                <Skeleton className="w-full h-[300px]" />
            )}
        </div>
    );
}
