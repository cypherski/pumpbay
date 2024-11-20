// src/components/admin/UserManagement.tsx
import { useState } from 'react'
import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { useUsers } from '@/hooks/useUsers'

interface User {
  id: string
  email: string
  role: 'ADMIN' | 'MODERATOR' | 'USER'
  createdAt: Date
  lastLogin: Date
  isActive: boolean
}

export function UserManagement() {
  const { users, updateUser, deleteUser, isLoading } = useUsers()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const handleRoleChange = async (userId: string, newRole: User['role']) => {
    try {
      await updateUser(userId, { role: newRole })
    } catch (error) {
      console.error('Failed to update user role:', error)
    }
  }

  const handleStatusToggle = async (userId: string, isActive: boolean) => {
    try {
      await updateUser(userId, { isActive })
    } catch (error) {
      console.error('Failed to update user status:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button
          variant="primary"
          onClick={() => setSelectedUser('new')}
        >
          Add User
        </Button>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{user.email}</h3>
                <p className="text-sm text-gray-400">Role: {user.role}</p>
                <p className="text-xs text-gray-500">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value as User['role'])}
                  className="bg-gray-800 border-gray-700 rounded-md text-sm"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="MODERATOR">Moderator</option>
                  <option value="USER">User</option>
                </select>

                <Button
                  variant={user.isActive ? 'outline' : 'ghost'}
                  size="sm"
                  onClick={() => handleStatusToggle(user.id, !user.isActive)}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-500/10"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}