import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e: any) {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (name.length > 100) {
      alert("Name cannot be more than 100 characters.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    alert("Registration successful. This is only a front-end demo.");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur lg:grid-cols-2">
          {/* Left Side */}
          <section className="hidden bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-400 p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-6 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                QueueSmart
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                Start managing your queue with confidence.
              </h1>

              <p className="mt-5 max-w-md text-white/90">
                Create an account to join queues, view wait times, receive
                updates, and manage your service experience.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl bg-white/20 p-4">
                <p className="text-2xl font-bold">Easy</p>
                <p className="text-sm text-white/80">Sign Up</p>
              </div>

              <div className="rounded-2xl bg-white/20 p-4">
                <p className="text-2xl font-bold">Live</p>
                <p className="text-sm text-white/80">Queue Status</p>
              </div>

              <div className="rounded-2xl bg-white/20 p-4">
                <p className="text-2xl font-bold">Fast</p>
                <p className="text-sm text-white/80">Updates</p>
              </div>
            </div>
          </section>

          {/* Right Side */}
          <section className="bg-white p-8 text-slate-900 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Create account
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Register for QueueSmart
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter your information to create a new account.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <p className="mt-2 text-xs text-slate-500">
                  Password must be at least 8 characters.
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 hover:shadow-blue-700/40"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button className="font-semibold text-blue-600 hover:text-blue-700">
                Login
              </button>
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">
                QueueSmart Demo
              </p>
              <p className="mt-1 text-sm text-slate-500">
                This registration page is part of the QueueSmart front-end
                design for user and admin queue management.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Register;
