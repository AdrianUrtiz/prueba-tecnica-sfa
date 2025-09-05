import { useState } from "react"

export interface ApiUser {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    phone: string
    is_staff: boolean
}

export interface User extends ApiUser {
    department?: string
    status?: "Activo" | "Inactivo" | "Suspendido"
    lastAccess?: string
    role?: "Administrador" | "Usuario"
}

const API_URL = "http://localhost:8000/api/users/"

function mapRole(is_staff: boolean): User["role"] {
    return is_staff ? "Administrador" : "Usuario"
}

export function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [nextPage, setNextPage] = useState<string | null>(null)
    const [prevPage, setPrevPage] = useState<string | null>(null)

    const fetchUsers = (url = API_URL) => {
        setLoading(true)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const apiUsers: ApiUser[] = data.results || data
                const usersFromApi: User[] = apiUsers.map((u) => ({
                    ...u,
                    role: mapRole(u.is_staff),
                    status: "Activo",
                    department: "",
                }))
                setUsers(usersFromApi)
                setNextPage(data.next)
                setPrevPage(data.previous)
                setLoading(false)
            })
    }

    const addUser = async (payload: Omit<User, "id" | "role" | "status" | "department" | "lastAccess"> & { password: string }) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        if (response.ok) {
            const created = await response.json()
            setUsers(prev => [
                ...prev,
                {
                    ...created,
                    role: mapRole(created.is_staff),
                    status: "Activo",
                    department: "",
                },
            ])
            return true
        }
        return false
    }

    const updateUser = async (
        id: number,
        payload: Partial<Omit<User, "id" | "role" | "status" | "department" | "lastAccess"> & { password?: string }>
    ) => {
        const response = await fetch(`${API_URL}${id}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        if (response.ok) {
            const updated = await response.json()
            setUsers(prev =>
                prev.map(u =>
                    u.id === id
                        ? { ...u, ...updated, role: mapRole(updated.is_staff), status: u.status, department: u.department }
                        : u
                )
            )
            return true
        }
        return false
    }

    const deleteUser = async (id: number) => {
        const response = await fetch(`${API_URL}${id}/`, { method: "DELETE" })
        if (response.ok) {
            setUsers(prev => prev.filter(u => u.id !== id))
            return true
        }
        return false
    }

    return {
        users,
        loading,
        nextPage,
        prevPage,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
    }
}