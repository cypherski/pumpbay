// src/components/admin/Settings.tsx
import { useState } from 'react'
import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { useSettings } from '@/hooks/useSettings'

interface Settings {
  votingEnabled: boolean
  submissionsEnabled: boolean
  minVotesForTrending: number
  automatedVerification: boolean
  notificationSettings: {
    email: boolean
    telegram: boolean
    discord: boolean
  }
}

export function AdminSettings() {
  const { settings, updateSettings, isLoading } = useSettings()
  const [localSettings, setLocalSettings] = useState<Settings | null>(settings)

  if (!localSettings) return null

  const handleSave = async () => {
    if (!localSettings) return
    try {
      await updateSettings(localSettings)
    } catch (error) {
      console.error('Failed to update settings:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Platform Settings</h2>
        <Button
          onClick={handleSave}
          isLoading={isLoading}
        >
          Save Changes
        </Button>
      </div>

      <Card title="General Settings">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Voting</h3>
              <p className="text-sm text-gray-400">Allow users to vote on tokens</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.votingEnabled}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  votingEnabled: e.target.checked
                })}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Submissions</h3>
              <p className="text-sm text-gray-400">Allow users to submit new tokens</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={localSettings.submissionsEnabled}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  submissionsEnabled: e.target.checked
                })}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Minimum Votes for Trending
            </label>
            <input
              type="number"
              value={localSettings.minVotesForTrending}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                minVotesForTrending: parseInt(e.target.value)
              })}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      </Card>

      <Card title="Notifications">
        <div className="space-y-4">
          {Object.entries(localSettings.notificationSettings).map(([channel, enabled]) => (
            <div key={channel} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium capitalize">{channel} Notifications</h3>
                <p className="text-sm text-gray-400">
                  Receive notifications via {channel}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={enabled}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    notificationSettings: {
                      ...localSettings.notificationSettings,
                      [channel]: e.target.checked
                    }
                  })}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}