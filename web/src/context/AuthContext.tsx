"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { User } from "firebase/auth"
import { auth, isFirebaseEnabled } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"

export type AppUserRole = "admin" | "user" | "guest"

export type AuthState = {
  user: User | null
  loading: boolean
  role: AppUserRole
}

const AuthContext = createContext<AuthState>({ user: null, loading: true, role: "guest" })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseEnabled() || !auth) {
      // If Firebase isn’t configured, treat as guest and stop loading to avoid blank screen
      setUser(null)
      setLoading(false)
      return
    }

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  const role: AppUserRole = useMemo(() => {
    // Simple role derivation: if email ends with company domain or custom claim could be used
    const email = user?.email || ""
    if (!email) return "user"
    // Example: admins could be a list; keep it safe and non-throwing
    return email.endsWith("@mulilo.com") ? "admin" : "user"
  }, [user])

  const value = useMemo<AuthState>(() => ({ user, loading, role }), [user, loading, role])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}