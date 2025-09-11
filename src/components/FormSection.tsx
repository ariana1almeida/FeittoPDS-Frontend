interface FormSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormSection({
  title,
  children,
  className = ""
}: FormSectionProps) {
  return (
    <div className={className}>
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-primary-dark">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
