interface TermsSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function TermsSection({ title, children }: TermsSectionProps) {
    return (
        <section className="mb-6">
            <h2 className="text-xl font-semibold text-primary-dark mb-3 border-b-2 border-accent-yellow pb-2">
                {title}
            </h2>
            <div className="text-base leading-relaxed text-primary-dark/90">
                {children}
            </div>
        </section>
    );
}
