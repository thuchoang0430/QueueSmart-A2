import { services, notifications } from "../data/mockData";

function UserDashboard() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        {/* Light attractive background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_35%),radial-gradient(circle_at_top_right,#cffafe,transparent_32%),radial-gradient(circle_at_bottom,#ecfdf5,transparent_35%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] bg-[size:52px_52px] opacity-35" />

          <div className="absolute left-[-120px] top-[-120px] h-[380px] w-[380px] rounded-full bg-sky-200/70 blur-3xl" />
          <div className="absolute right-[-150px] top-32 h-[420px] w-[420px] rounded-full bg-cyan-200/60 blur-3xl" />
          <div className="absolute bottom-[-180px] left-1/3 h-[420px] w-[420px] rounded-full bg-emerald-100/80 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <header className="mb-8 overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-xl shadow-sky-100/70 backdrop-blur-xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700 shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200">
                    Q
                  </span>
                  QUEUESMART
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  User Dashboard
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  Manage your queue, check your waiting time, and view important
                  updates in one clean dashboard.
                </p>
              </div>

              <div className="flex w-fit items-center gap-4 rounded-3xl border border-slate-100 bg-white px-5 py-4 shadow-lg shadow-sky-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-lg font-bold text-white shadow-md shadow-blue-200">
                  U
                </div>

                <div>
                  <p className="font-bold text-slate-900">Welcome back</p>
                  <p className="text-sm text-slate-500">Student User</p>
                </div>
              </div>
            </div>
          </header>

          {/* Summary Cards */}
          <section className="mb-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-blue-100 bg-white/90 p-6 shadow-xl shadow-blue-100/60 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-500">
                  Current Position
                </p>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-100">
                  Waiting
                </span>
              </div>

              <p className="mt-5 text-5xl font-extrabold text-blue-600">3</p>
              <p className="mt-2 text-sm text-slate-500">
                You are close to your turn.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-100/60 transition hover:-translate-y-1 hover:shadow-2xl">
              <p className="text-sm font-semibold text-slate-500">
                Estimated Wait
              </p>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-5xl font-extrabold text-emerald-600">15</p>
                <p className="mb-2 font-semibold text-slate-500">minutes</p>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Average wait time may change.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-indigo-100 bg-white/90 p-6 shadow-xl shadow-indigo-100/60 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-500">
                  Available Services
                </p>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                  Active
                </span>
              </div>

              <p className="mt-5 text-5xl font-extrabold text-indigo-600">
                {services.length}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Services are open now.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Current Queue */}
            <div className="rounded-[2rem] border border-slate-100 bg-white/90 p-6 shadow-xl shadow-sky-100/70 backdrop-blur-xl">
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                    Current Queue
                  </p>

                  <h2 className="mt-2 text-3xl font-extrabold text-slate-950">
                    Academic Advising
                  </h2>
                </div>

                <span className="w-fit rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700 ring-1 ring-amber-100">
                  Waiting
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-blue-100 bg-blue-50/80 p-5">
                  <p className="text-sm font-medium text-slate-500">Position</p>
                  <p className="mt-3 text-4xl font-extrabold text-blue-600">
                    3
                  </p>
                </div>

                <div className="rounded-3xl border border-emerald-100 bg-emerald-50/80 p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Estimated Wait
                  </p>
                  <p className="mt-3 text-4xl font-extrabold text-emerald-600">
                    15m
                  </p>
                </div>

                <div className="rounded-3xl border border-indigo-100 bg-indigo-50/80 p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Service Type
                  </p>
                  <p className="mt-4 text-xl font-extrabold text-indigo-600">
                    Advising
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-bold text-slate-800">Queue Progress</p>
                  <p className="font-bold text-blue-600">60%</p>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white shadow-inner">
                  <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Please stay ready. You will receive a notification when your
                  turn is close.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:from-blue-600 hover:to-cyan-500">
                  View Queue Status
                </button>

                <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-red-100 hover:bg-red-50 hover:text-red-600">
                  Leave Queue
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-[2rem] border border-slate-100 bg-white/90 p-6 shadow-xl shadow-cyan-100/60 backdrop-blur-xl">
              <div className="mb-5">
                <p className="text-sm font-bold uppercase tracking-wide text-cyan-600">
                  Updates
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-slate-950">
                  Notifications
                </h2>
              </div>

              <div className="space-y-3">
                {notifications.map((message, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4 transition hover:-translate-y-0.5 hover:border-cyan-100 hover:bg-cyan-50"
                  >
                    <div className="flex gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                      </div>

                      <p className="text-sm leading-6 text-slate-600">
                        {message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Active Services */}
          <section className="mt-6 rounded-[2rem] border border-slate-100 bg-white/90 p-6 shadow-xl shadow-sky-100/70 backdrop-blur-xl">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                  Services
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-slate-950">
                  Active Services
                </h2>
              </div>

              <button className="w-fit rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:from-blue-600 hover:to-cyan-500">
                Join New Queue
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-sky-50/70 to-cyan-50/70 p-5 shadow-lg shadow-sky-100/60 transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-2xl"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-md shadow-sky-100 ring-1 ring-sky-100">
                      🧾
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                      Open
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-950">
                    {service.name}
                  </h3>

                  <div className="mt-4 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                      Estimated Wait Time
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {service.waitTime}
                    </p>
                  </div>

                  <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-100 transition hover:-translate-y-0.5 hover:from-blue-600 hover:to-cyan-500">
                    Join Queue
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default UserDashboard;
