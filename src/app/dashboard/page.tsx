import ImportUsers from "./components/ImportUsers"
import ExportUsers from "./components/ExportUsers"
import UserTable from "./components/UserTable"
import Logout from "./components/Logout"
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Admin Dashboard</p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              User Management
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Import users from Excel, export the current list, and search users quickly.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="flex gap-2 rounded-xl bg-white/70 p-2 shadow-sm ring-1 ring-slate-900/10 backdrop-blur">
              <ImportUsers />
              <ExportUsers />
            </div>

            <Logout />
          </div>
        </div>


        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/10">
            <p className="text-sm font-medium text-slate-500">Tip</p>
            <p className="mt-2 text-sm text-slate-700">
              Import expects columns: <span className="font-semibold">name, email, phone, role</span>.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/10">
            <p className="text-sm font-medium text-slate-500">Duplicates</p>
            <p className="mt-2 text-sm text-slate-700">
              Emails are treated as unique (case-insensitive). Existing emails are skipped.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/10">
            <p className="text-sm font-medium text-slate-500">Search</p>
            <p className="mt-2 text-sm text-slate-700">
              Use the search box to filter users and page through results.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/10">
          <div className="border-b border-slate-200/60 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">Users</h2>
            <p className="mt-1 text-sm text-slate-600">Browse, search, and paginate through users.</p>
          </div>

          <div className="p-5">
            <UserTable />
          </div>
        </div>
      </div>
    </div>
  )
}