export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container grid gap-6 md:gap-12 md:grid-cols-[200px_1fr]">
      {children}
    </div>
  );
}
