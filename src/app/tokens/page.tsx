// src/app/tokens/page.tsx
import { TokenSubmissionForm } from '@/components/tokens/TokenSubmissionForm'
import { TokenMetrics } from '@/components/tokens/TokenMetrics'

export default function TokensPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Submit New Token</h1>
        <p className="text-gray-400 mt-2">
          Add your token to PumpBay for community tracking and analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <TokenSubmissionForm />
        </div>
        
        <div className="space-y-6">
          <div className="bg-surface rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Submission Guidelines</h2>
            <ul className="space-y-2 text-gray-400">
              <li>• Token must be deployed on Solana mainnet</li>
              <li>• Contract must be verified</li>
              <li>• Provide accurate token information</li>
              <li>• Include valid social media links</li>
              <li>• Logo should be 200x200px minimum</li>
            </ul>
          </div>

          <div className="bg-surface rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Verification Process</h2>
            <ol className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <span className="font-bold text-primary-500 mr-2">1.</span>
                Submit token information
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary-500 mr-2">2.</span>
                Automated contract verification
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary-500 mr-2">3.</span>
                Community review period
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary-500 mr-2">4.</span>
                Final approval and listing
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}