import Image from "next/image";
import Link from "next/link";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
return (
<div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-2">
{/* {/* Left Side /} */}
<div className="flex items-center justify-center px-6 py-10">
<div className="w-full max-w-md">

<div className="mb-8">
<div className="mb-6 flex items-center gap-2">
<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
E
</div>

          <span className="text-xl font-bold text-slate-800">
            E-Shop
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Reset your password
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter your new password below to secure your account.
        </p>
      </div>

      {/* Form */}
      <ResetPasswordForm />

       {/* Back to Login  */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium text-indigo-600 hover:text-indigo-700"
        >
          Sign in
        </Link>
      </p>
    </div>
  </div>

{/* Right Side  */}
  <div className="relative hidden overflow-hidden lg:block">
    <Image
      src="/images/login.jpg"
      alt="Reset Password"
      fill
      priority
      className="object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-indigo-900/40 to-slate-900/30" />

    <div className="absolute inset-0 flex items-end p-12">
      <div className="max-w-lg text-white">
        <h2 className="text-5xl font-bold leading-tight">
          Create a new password and get back in.
        </h2>

        <p className="mt-4 text-white/80">
          Choose a strong password to keep your account safe.
        </p>
      </div>
    </div>
  </div>
</div>


);
}