"use client"
import React from "react"
import { AuthProvider } from "@/context/AuthContext"
import { SurveyProvider } from "@/context/SurveyContext"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SurveyProvider>
        {children}
      </SurveyProvider>
    </AuthProvider>
  )
}