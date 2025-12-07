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
        <h2 className="text-sm font-medium mb-2 text-neutral-dark">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
