import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
 return (
    <div className="h-screen overflow-hidden bg-slate-100 lg:grid lg:grid-cols-2 ">
      {/* Register Section */}
      <div className="h-screen overflow-y-auto scrollbar-hide">
        <div className="flex min-h-full items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              {/* Logo */}
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
                  E
                </div>

                <span className="text-xl font-bold text-slate-800">
                  E-Shop
                </span>
              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                Create an account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Create your account and start shopping with us
              </p>
            </div>

            <RegisterForm />

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-indigo-600 transition hover:text-indigo-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="/images/login.jpg"
          alt="Create account"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-indigo-900/40 to-slate-900/30" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end p-12">
          <div className="max-w-lg text-white">
            <h2 className="text-5xl font-bold leading-tight">
              Join us and start shopping.
            </h2>

            <p className="mt-4 text-white/80">
              Create your account and enjoy a simple and convenient
              shopping experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
