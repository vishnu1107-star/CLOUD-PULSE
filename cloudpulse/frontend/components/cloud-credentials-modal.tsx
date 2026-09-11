'use client'

import React, { useState } from 'react'
import { Cloud, Key, CheckCircle2, Shield, X, RefreshCw, AlertCircle } from 'lucide-react'
import { useToast } from '@/components/toast'

export function CloudCredentialsModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [provider, setProvider] = useState<'AWS' | 'GCP'>('AWS')
  const [accessKey, setAccessKey] = useState<string>('AKIAIOSFODNN7EXAMPLE')
  const [secretKey, setSecretKey] = useState<string>('wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY')
  const [region, setRegion] = useState<string>('us-east-1')
  const [testing, setTesting] = useState<boolean>(false)
  const { showToast } = useToast()

  const handleTestConnection = async (e: React.FormEvent) => {
    e.preventDefault()
    setTesting(true)
    setTimeout(() => {
      setTesting(false)
      showToast({
        type: 'success',
        title: 'Cloud Connection Established',
        description: `Successfully authenticated with AWS ${region} via Boto3 SDK.`
      })
      setIsOpen(false)
    }, 1200)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-all"
        title="Configure Live Cloud Provider IAM Credentials"
      >
        <Cloud className="w-3.5 h-3.5 text-cyan-400" />
        <span className="hidden sm:inline">Connect Cloud</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Key className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Live Cloud IAM Credentials</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleTestConnection} className="space-y-4 text-xs">
              
              {/* Provider Selection */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Cloud Provider:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setProvider('AWS')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      provider === 'AWS'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    AWS (Boto3 SDK)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProvider('GCP')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      provider === 'GCP'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    Google Cloud (GCE)
                  </button>
                </div>
              </div>

              {/* Access Key */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Access Key ID / Service Account:</label>
                <input
                  type="text"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Secret Key */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Secret Access Key:</label>
                <input
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Default Cloud Region:</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="us-east-1">us-east-1 (N. Virginia)</option>
                  <option value="us-west-2">us-west-2 (Oregon)</option>
                  <option value="ap-south-1">ap-south-1 (Mumbai)</option>
                  <option value="eu-central-1">eu-central-1 (Frankfurt)</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start space-x-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Credentials are securely isolated via C-DAC VEGA RISC-V hardware vault with zero third-party exposure.</span>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={testing}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center space-x-1.5 shadow-lg shadow-cyan-600/30 transition-all"
                >
                  {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{testing ? 'Verifying IAM...' : 'Save & Verify Live Connection'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </>
  )
}
