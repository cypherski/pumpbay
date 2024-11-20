// src/hooks/useUsers.ts
import { useState, useEffect } from 'react'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (userId: string, updates: Partial<User>) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })
      
      if (!response.ok) throw new Error('Failed to update user')
      
      await fetchUsers()
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUser = async (userId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete user')
      
      await fetchUsers()
    } finally {
      setIsLoading(false)
    }
  }

  return {
    users,
    updateUser,
    deleteUser,
    isLoading,
  }
}