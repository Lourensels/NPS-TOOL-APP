"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useAuth } from "./AuthContext"
import logger from "@/lib/logger"
import type { CommercialDepartmentData, Department, Response, SurveyTemplate } from "@/lib/types"
import * as surveyData from "@/data/survey"
import env from "@/config/env"

// Mock data
const mockDepartments: Department[] = [
  { id: "1", name: "Sales" },
  { id: "2", name: "Support" },
]

const mockResponses: Response[] = [
  { id: "1", departmentId: "1", score: 8, comment: "Great service!", createdAt: new Date() as any },
  { id: "2", departmentId: "2", score: 4, comment: "Slow response time.", createdAt: new Date() as any },
]

const mockSurveyTemplates: SurveyTemplate[] = [
  { id: "1", ownerId: "1", name: "Customer Feedback", createdAt: new Date() as any },
]

const SurveyContext = createContext<CommercialDepartmentData>({
  departments: [],
  responses: [],
  surveyTemplates: [],
  loading: true,
  addDepartment: async () => {},
  deleteDepartment: async () => {},
  addSurveyTemplate: async () => {},
  deleteSurvey: async () => {},
})

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [departments, setDepartments] = useState<Department[]>([])
  const [responses, setResponses] = useState<Response[]>([])
  const [surveyTemplates, setSurveyTemplates] = useState<SurveyTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleError = (err: unknown) => {
    setError(err instanceof Error ? err.message : "Unknown error")
  }

  useEffect(() => {
    if (env.USE_MOCK_DATA) {
      setLoading(true)
      setDepartments(mockDepartments)
      setResponses(mockResponses)
      if (user?.uid) {
        setSurveyTemplates(mockSurveyTemplates)
      } else {
        setSurveyTemplates([])
      }
      setLoading(false)
      return
    }

    if (!user?.uid) {
      setDepartments([])
      setResponses([])
      setSurveyTemplates([])
      setLoading(false)
      return
    }

    setLoading(true)
    const unsubscribes = [
      surveyData.subscribeDepartments(setDepartments, handleError),
      surveyData.subscribeResponses({}, setResponses, handleError),
      surveyData.subscribeUserTemplates(user.uid, setSurveyTemplates, handleError),
    ]

    setLoading(false)

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe())
    }
  }, [user?.uid])

  async function addDepartment(name: string) {
    try {
      // For demonstration, we'll just add to the local state
      const newDepartment = { id: String(departments.length + 1), name }
      setDepartments([...departments, newDepartment])
      // await surveyData.addDepartment(name)
    } catch (err) {
      logger.error("addDepartment failed", err)
      setError("Failed to add department")
    }
  }

  async function deleteDepartment(id: string) {
    try {
      // For demonstration, we'll just remove from the local state
      setDepartments(departments.filter((d) => d.id !== id))
      // await surveyData.deleteDepartment(id)
    } catch (err) {
      logger.error("deleteDepartment failed", err)
      setError("Failed to delete department")
    }
  }

  async function addSurveyTemplate(name: string) {
    if (!user?.uid) return
    try {
      // For demonstration, we'll just add to the local state
      const newTemplate = { id: String(surveyTemplates.length + 1), ownerId: user.uid, name, createdAt: new Date() as any }
      setSurveyTemplates([...surveyTemplates, newTemplate])
      // await surveyData.addSurveyTemplate(name, user.uid)
    } catch (err) {
      logger.error("addSurveyTemplate failed", err)
      setError("Failed to add survey template")
    }
  }

  async function deleteSurvey(id: string) {
    try {
      // For demonstration, we'll just remove from the local state
      setSurveyTemplates(surveyTemplates.filter((s) => s.id !== id))
      // await surveyData.deleteSurvey(id)
    } catch (err) {
      logger.error("deleteSurvey failed", err)
      setError("Failed to delete survey")
    }
  }

  const value = useMemo(
    () => ({
      departments,
      responses,
      surveyTemplates,
      loading,
      error,
      addDepartment,
      deleteDepartment,
      addSurveyTemplate,
      deleteSurvey,
    }),
    [departments, responses, surveyTemplates, loading, error],
  )

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
}

export const useSurvey = () => useContext(SurveyContext)