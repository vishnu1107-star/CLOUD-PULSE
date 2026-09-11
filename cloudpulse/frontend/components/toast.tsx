'use client'

import React, { createContext, useContext, useState } from 'react'
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react'

export interface ToastMessage {
  id: string
  type: 'success' | 'warning' | 'info' | 'error'
  title: string
  description?: string
}

interface ToastContextType {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: ToastMessage = { ...toast, id }
    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success'
          const isWarning = toast.type === 'warning'
          const isError = toast.type === 'error'
          
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 flex items-start space-x-3 ${
                isSuccess
                  ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                  : isWarning
                  ? 'bg-amber-950/90 border-amber-500/40 text-amber-200'
                  : isError
                  ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
                  : 'bg-slate-900/95 border-slate-700 text-slate-200'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                {isError && <XCircle className="w-5 h-5 text-rose-400" />}
                {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-cyan-400" />}
              </div>

              <div className="flex-1 text-xs">
                <p className="font-bold text-white text-sm">{toast.title}</p>
                {toast.description && <p className="mt-0.5 opacity-90">{toast.description}</p>}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    return {
      showToast: (toast: Omit<ToastMessage, 'id'>) => {
        console.log('Toast:', toast.title, toast.description)
      }
    }
  }
  return context
}
