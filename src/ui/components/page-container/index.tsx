import { cn } from "@/lib/utils";

export default function PageContainer({
  children,
  hasSidebar = false,
  fullHeight = false,
}: {
  children: React.ReactNode;
  hasSidebar?: boolean;
  fullHeight?: boolean;
}) {
  return (
    <div
      className={cn("container", {
        "grid gap-6 md:grid-cols-[200px_1fr] md:gap-12": !!hasSidebar,
        "!mt-0 h-[calc(100vh-128px)] min-h-[400px]": !!fullHeight,
        "!mt-0": !fullHeight && !hasSidebar,
      })}
    >
      {children}
    </div>
  );
}
