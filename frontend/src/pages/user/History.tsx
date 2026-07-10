import { useAuth } from '../../context/AuthContext'

const mockHistory = [
  {
    id: 1,
    date: 'July 6, 2026',
    serviceName: 'Academic Advising',
    outcome: 'Served',
    waitTime: '18 minutes',
  },
  {
    id: 2,
    date: 'July 4, 2026',
    serviceName: 'Financial Aid',
    outcome: 'Left Queue',
    waitTime: '10 minutes',
  },
  {
    id: 3,
    date: 'July 1, 2026',
    serviceName: 'IT Help Desk',
    outcome: 'Served',
    waitTime: '12 minutes',
  },
]

export default function History() {
  const { currentUser } = useAuth()

  function getOutcomeClass(outcome: string) {
    if (outcome === 'Served') return 'bg-green-100 text-green-700'
    if (outcome === 'Left Queue') return 'bg-yellow-100 text-yellow-700'
    return 'bg-slate-100 text-slate-700'
  }

  if (!currentUser) {
    return (
      <div>
        <div className="page-header">
          <h1>History</h1>
          <p>Please log in to view your queue history.</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">No user is currently logged in.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1>Queue History</h1>
        <p>Review your past queue activity, service names, dates, and outcomes.</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Past Queues</h2>
          <p className="text-sm text-slate-600">
            History for {currentUser.name} ({currentUser.email})
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Service Name</th>
                <th className="px-6 py-3">Wait Time</th>
                <th className="px-6 py-3">Outcome</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {mockHistory.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 text-slate-700">{record.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {record.serviceName}
                  </td>
                  <td className="px-6 py-4 text-slate-700">{record.waitTime}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getOutcomeClass(
                        record.outcome
                      )}`}
                    >
                      {record.outcome}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
        This page uses mock history data for Assignment 2 because backend storage is not required yet.
      </div>
    </div>
  )
}
