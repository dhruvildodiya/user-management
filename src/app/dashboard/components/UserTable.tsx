"use client"

import { useEffect, useState } from "react"
import { getUsers } from "@/services/userService"
import { supabase } from "@/lib/supabase/client"
import { User } from "@/types/user"

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [totalPages, setTotalPages] = useState(1)

  const PAGE_SIZE = 10

  const fetchUsers = async () => {
    setLoading(true)

    try {
      const data = await getUsers(page, PAGE_SIZE, search)

      setUsers(data || [])

      if (data.length > 0) {
        const total = data[0].total_count || 0
        setTotalPages(Math.ceil(total / PAGE_SIZE))
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [page, search])

  //realtime side effect
  useEffect(() => {
    const channel = supabase
      .channel("users-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
        },
        () => {
          fetchUsers()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border px-3 py-2 rounded w-full"
          value={search}
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">

          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">

        {loading ? (
          <p className="text-center py-4">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center py-4">No users found</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg p-4 shadow-sm bg-gray-50"
            >
              <div className="font-semibold text-lg">{user.name}</div>

              <div className="text-sm text-gray-600 mt-1">
                {user.email}
              </div>

              <div className="text-sm mt-2">
                📞 {user.phone}
              </div>

              <div className="text-sm mt-1 capitalize">
                Role: {user.role}
              </div>

              <div className="text-xs text-gray-500 mt-2">
                Created: {new Date(user.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        )}

      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">

        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 w-full sm:w-auto"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 w-full sm:w-auto"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>

      </div>

    </div>
  )
}