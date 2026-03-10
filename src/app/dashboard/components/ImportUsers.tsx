"use client"

import { parseExcel } from "@/utils/parseExcel"
import { supabase } from "@/lib/supabase/client"
import { useState } from "react"

export default function ImportUsers() {
  const [loading, setLoading] = useState(false)

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    setLoading(true)

    try {
      const raw = (await parseExcel(file)) as any[]
      const users = raw.map((row) => ({
        name: row.name ?? row.Name ?? row["Full Name"] ?? null,
        email:
          (row.email ?? row.Email ?? row["Email Address"] ?? null)?.toString().trim().toLowerCase() ??
          null,
        phone: (row.phone ?? row.Phone ?? null)?.toString().trim() ?? null,
        role: (row.role ?? row.Role ?? "user")?.toString().trim() ?? "user",
      }))

      const { data: insertedCount, error } = await supabase.rpc("import_users_bulk", { users })
      if (error) {
        console.error(error)
        alert(`Import failed: ${error.message}`)
        return
      }

      alert(`Imported ${insertedCount ?? 0} users`)
    } catch (err) {
      console.error(err)
      alert("Import failed")
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center gap-4">

      <label className="bg-blue-600 text-white px-2 py-2 rounded cursor-pointer font-bold">
        {loading ? "Importing..." : "Import Excel"}

        <input
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={handleImport}
        />
      </label>

    </div>
  )
}