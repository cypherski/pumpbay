// src/components/trending/TrendingTabs.tsx
import { useState } from 'react'
import { Tab } from '@headlessui/react'

export function TrendingTabs() {
  const [categories] = useState({
    'Bay Trending': [],
    'Market Trending': [],
  })

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-surface/20 p-1">
        {Object.keys(categories).map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
               ${selected
                ? 'bg-primary-500 text-white shadow'
                : 'text-gray-400 hover:bg-surface/[0.12] hover:text-white'
              }`
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {Object.values(categories).map((posts, idx) => (
          <Tab.Panel
            key={idx}
            className="rounded-xl bg-surface p-3"
          >
            {/* Panel content */}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}