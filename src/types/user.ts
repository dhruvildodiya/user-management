export type User = {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "user"
  created_at: string
  total_count?: number
}

export type RpcResponse<T> = {
  data: T | null
  error: string | null
}