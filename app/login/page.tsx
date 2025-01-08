import Link from 'next/link'
import { Form as LoginForm } from './form'

export default function Page() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Login</h1>
        <LoginForm />
        <p className="text-center">
          Need to create an account?{' '}
          <Link className="text-indigo-500 hover:underline" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}