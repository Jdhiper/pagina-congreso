import Container from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  children,
  className,
}: SectionProps) {
  return (
    <section className={`py-24 ${className ?? ""}`}>
      <Container>{children}</Container>
    </section>
  );
}