// src/app/admin/dashboard/page.tsx
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard'
import { TokenVerification } from '@/components/admin/TokenVerification'
import { UserManagement } from '@/components/admin/UserManagement'
import { AdminSettings } from '@/components/admin/Settings'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-lg">
          <h3 className="text-gray-400 mb-2">Total Users</h3>
          <p className="text-3xl font-bold">12,345</p>
          <span className="text-green-500 text-sm">+5.2% this week</span>
        </div>
        <div className="bg-surface p-6 rounded-lg">
          <h3 className="text-gray-400 mb-2">Active Tokens</h3>
          <p className="text-3xl font-bold">1,234</p>
          <span className="text-green-500 text-sm">+12 today</span>
        </div>
        <div className="bg-surface p-6 rounded-lg">
          <h3 className="text-gray-400 mb-2">Pending Verification</h3>
          <p className="text-3xl font-bold">23</p>
          <span className="text-yellow-500 text-sm">Needs review</span>
        </div>
        <div className="bg-surface p-6 rounded-lg">
          <h3 className="text-gray-400 mb-2">System Status</h3>
          <p className="text-3xl font-bold text-green-500">Healthy</p>
          <span className="text-gray-400 text-sm">All systems operational</span>
        </div>
      </div>

      <AnalyticsDashboard />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TokenVerification />
        <UserManagement />
      </div>

      <AdminSettings />
    </div>
  )
}