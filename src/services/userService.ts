import { supabase } from "@/lib/supabase/client"
import { User } from "@/types/user"


export async function getUsers(page: number,
    pageSize: number,
    searchText: string) {

    const { data, error } = await supabase.rpc('get_users', {
        page,
        page_size: pageSize,
        search_text: searchText,
    })
     if (error) {
    throw new Error(error.message)
  }

  return data as User[]
}

export async function handleLogout(){
  if (confirm("Log out ?")) {
      await supabase.auth.signOut();
  } 
}