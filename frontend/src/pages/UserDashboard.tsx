import { services, notifications } from "../data/mockData";

const teamMembers = [
  "Andy L Do",
  "Ayush Kharel",
  "Ngoc Thang Nguyen",
  "Tom Hoang",
];

function UserDashboard() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950 p-6 text-white lg:block">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold shadow-lg shadow-blue-600/30">
                QS
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight">QueueSmart</h2>
                <p className="text-xs text-slate-400">Smart Queue Management</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
                Team Product
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                Software Design Group 20
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Built by our team for the QueueSmart front-end project.
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              <span className="flex items-center gap-3">
                <span>📊</span>
                Dashboard
              </span>
              <span className="h-2 w-2 rounded-full bg-white"></span>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <span>➕</span>
              Join Queue
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <span>⏱️</span>
              Queue Status
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <span>🕘</span>
              History
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <span>🔔</span>
              Notifications
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <span>👥</span>
              Team Members
            </a>
          </nav>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">👨‍💻 Group 20</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Team members: Andy, Ayush, Ngoc Thang, and Tom.
            </p>

            <button className="mt-4 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-slate-100">
              View Team
            </button>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Software Design Group 20
                </p>

                <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                  QueueSmart Dashboard
                </h1>

                <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                  A smart queue management product built by our team.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:block">
                  🕘 View History
                </button>

                <button className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800">
                  ➕ Join Queue
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  U
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Product / Team Banner */}
            <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[1.4fr_0.6fr]">
                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      🚀 QueueSmart
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      👥 Group 20
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      💻 Software Design Project
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    Smart Queue Management Application
                  </h2>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                    QueueSmart is our team product for Software Design Group 20.
                    It helps users join a queue, track their position, estimate
                    wait time, and receive service updates in one simple system.
                  </p>
                </div>

                <div className="border-t border-slate-200 bg-slate-950 p-6 text-white lg:border-l lg:border-t-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
                    Product Owner Team
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    Software Design Group 20
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    This dashboard belongs to our QueueSmart team project.
                  </p>
                </div>
              </div>
            </section>

            {/* Team Members */}
            <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                    👥 Team Members
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-950">
                    Software Design Group 20
                  </h2>
                </div>

                <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  4 Students
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={member}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                        {member
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-bold text-slate-950">{member}</p>
                        <p className="text-xs text-slate-500">
                          Team Member {index + 1}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Welcome card */}
            <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div>
                  <p className="text-sm font-semibold text-blue-700">
                    Welcome back, Student User
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    Your queue is currently active
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    You are waiting for Academic Advising. Stay ready and check
                    your notifications for status updates.
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
                  <p className="text-sm font-medium text-slate-500">
                    Current Status
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-700"></span>
                    <p className="font-bold text-blue-800">Waiting</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="mb-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">
                    🎫 Current Position
                  </p>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    Active
                  </span>
                </div>

                <p className="mt-4 text-4xl font-bold text-slate-950">3</p>
                <p className="mt-1 text-sm text-slate-500">
                  You are close to your turn.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                  ⏱️ Estimated Wait
                </p>

                <div className="mt-4 flex items-end gap-2">
                  <p className="text-4xl font-bold text-slate-950">15</p>
                  <p className="mb-1 text-sm font-semibold text-slate-500">
                    minutes
                  </p>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Time may change based on service speed.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                  🏢 Available Services
                </p>

                <p className="mt-4 text-4xl font-bold text-slate-950">
                  {services.length}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Services currently open.
                </p>
              </div>
            </section>

            {/* Main dashboard grid */}
            <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              {/* Current queue */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                      🎯 Current Queue
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-950">
                      Academic Advising
                    </h2>
                  </div>

                  <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                    Waiting
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-500">
                      Position
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-950">3</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-500">
                      Estimated Wait
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-950">
                      15m
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-500">
                      Service Type
                    </p>
                    <p className="mt-3 text-lg font-bold text-slate-950">
                      Advising
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-semibold text-slate-900">
                      Queue Progress
                    </p>

                    <p className="text-sm font-bold text-blue-700">60%</p>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-blue-100">
                    <div className="h-full w-3/5 rounded-full bg-blue-700"></div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Please stay ready. You will receive a notification when your
                    turn is close.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800">
                    View Queue Status
                  </button>

                  <button className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                    Leave Queue
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                      🔔 Updates
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-950">
                      Notifications
                    </h2>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {notifications.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {notifications.map((message, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <div className="flex gap-3">
                        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-700"></div>

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
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                    🏢 Services
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-950">
                    Active Services
                  </h2>
                </div>

                <button className="w-fit rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                  View All Services
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                        🧾
                      </div>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        Open
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-950">
                      {service.name}
                    </h3>

                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-sm font-medium text-slate-500">
                        Estimated Wait Time
                      </p>

                      <p className="mt-1 font-bold text-slate-950">
                        {service.waitTime}
                      </p>
                    </div>

                    <button className="mt-4 w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
                      Join Queue
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default UserDashboard;
