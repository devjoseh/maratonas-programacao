export interface SimplePageTitleProps {
    title: string;
}

export function PageTitle({ title }: SimplePageTitleProps) {
    return (
        <section className="pt-8 pb-4">
            <div className="mx-auto px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <hr className="mt-4 mb-8 border-t-2 border-black-200 w-full" />
                </div>
            </div>
        </section>
    );
}