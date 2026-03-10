"use client"

import { handleLogout} from "@/services/userService"

export default function Logout(){
    return(<>
        <button onClick={handleLogout} className="bg-red-600 text-white rounded cursor-pointer font-bold px-4">Logout</button>
    </>)
}