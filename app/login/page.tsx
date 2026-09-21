import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md ">
          <div className="mb-8">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
                E
              </div>

              <span className="text-xl font-bold text-slate-800">E-Shop</span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to your account to continue
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-700"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="/images/login.jpg"
          alt="Login"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-indigo-900/40 to-slate-900/30" />

        <div className="absolute inset-0 flex items-end p-12">
          <div className="max-w-lg text-white">
            <h2 className="text-5xl font-bold leading-tight">
              Everything you need all in one place.
            </h2>

            <p className="mt-4 text-white/80">
              Manage your account, stay connected, and get more done.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
