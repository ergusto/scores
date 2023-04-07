export default function GameTableSkeleton() {
  return (
    <div className="mt-4 animate-pulse overflow-hidden rounded-md border border-slate-200">
      <div>
        <div className="h-[48px] bg-gray-100 border-b border-slate-200" />
        <div className="h-[48px]" />
        <div className="h-[48px]" />
        <div className="h-[48px]" />
        <div className="h-[48px]" />
      </div>
    </div>
  );
}
