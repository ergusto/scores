export default function ListActionMenuBarSkeleton() {
  return (
    <div className="relative mx-auto mt-4 h-[120px] w-full animate-pulse rounded-lg border border-slate-200 md:h-[72px]">
      <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2">
          <div className="flex items-center">
            <div className="relative w-full">
              <div className="block h-[38px] w-full rounded-lg border border-slate-200 bg-gray-100"></div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3">
          <div className="flex w-full items-center space-x-3 md:w-auto">
            <div className="block h-[38px] w-full rounded-lg border border-slate-200 bg-gray-100 md:w-[110px]"></div>
            <div className="block h-[38px] w-full rounded-lg border border-slate-200 bg-gray-100 md:w-[110px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
