import { Icons } from "@/ui/primitives"

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full !mt-0 mx-auto">
      <div className="flex justify-center items-center space-x-1 text-lg text-gray-700">
        <Icons.spinner className="stroke-gray-700 animate-spin mr-3" />
        <div>Loading ...</div>
      </div>
    </div>
  )
}
