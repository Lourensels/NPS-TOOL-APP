"use client"
export const dynamic = "force-static"
import { useAuth } from "@/context/AuthContext"
import { auth, isFirebaseEnabled } from "@/firebase"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

export default function LoginPage() {
  const { user, loading } = useAuth()

  async function handleGoogleLogin() {
    if (!isFirebaseEnabled() || !auth) return
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  async function handleLogout() {
    if (!isFirebaseEnabled() || !auth) return
    await signOut(auth)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl border border-zinc-200 bg-white p-8 text-center dark:border-white/20 dark:bg-black">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Sign in</h1>
        {!isFirebaseEnabled() && (
          <div className="w-full rounded-md border border-yellow-300 bg-yellow-50 p-3 text-yellow-800 dark:border-yellow-700/50 dark:bg-yellow-950/40 dark:text-yellow-300">
            Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables.
          </div>
        )}
        {loading && (
          <div className="w-full rounded-md border border-zinc-200 bg-zinc-50 p-3 text-zinc-700 dark:border-white/20 dark:bg-black/30 dark:text-zinc-300">
            Checking your session...
          </div>
        )}
        {!loading && user && (
          <div className="flex w-full flex-col items-center gap-4">
            <p className="text-zinc-700 dark:text-zinc-300">Signed in as</p>
            <div className="rounded-md border border-zinc-200 p-4 dark:border-white/20">
              <p className="font-medium text-black dark:text-zinc-50">{user.email || user.displayName || user.uid}</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-2 w-full rounded-full border border-zinc-300 px-4 py-2 text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-white/20 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        )}
        {!loading && !user && (
          <button
            onClick={handleGoogleLogin}
            disabled={!isFirebaseEnabled()}
            className="w-full rounded-full bg-foreground px-4 py-2 text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
          >
            Continue with Google
          </button>
        )}
      </main>
    </div>
  )
}