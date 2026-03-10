"use client"

import { exportToExcel } from "@/utils/exportExcel"
import { supabase } from "@/lib/supabase/client"

export default function ExportUsers() {

  const handleExport = async () => {

    const { data, error } = await supabase.rpc("export_users")

    if (error) {
      console.error(error)
      return
    }

    exportToExcel(data, "users")
  }

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white px-2 py-2 rounded cursor-pointer font-bold"
    >
      Export Users
    </button>
  )
}