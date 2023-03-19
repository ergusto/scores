interface VerifyRequestPageProps {
  url: URL
}

export default function Verify({ url }: VerifyRequestPageProps) {
  return (
    <div className='min-h-screen'>
      <div className="container flex flex-col items-center justify-center w-screen h-screen mx-auto">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
            <p className="text-sm text-slate-500">A sign in link has been sent to your email address.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
