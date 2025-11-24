import type { Timestamp } from "firebase/firestore"

export type Department = {
  id: string
  name: string
}

export type Response = {
  id: string
  departmentId: string
  templateId?: string
  surveyName?: string
  score?: number
  comment?: string
  createdAt: Timestamp
}

export type SurveyTemplate = {
  id: string
  ownerId: string
  name: string
  createdAt: Timestamp
}

export type CommercialDepartmentData = {
  departments: Department[]
  responses: Response[]
  surveyTemplates: SurveyTemplate[]
  loading: boolean
  error?: string | undefined
  addDepartment: (name: string) => Promise<void>
  deleteDepartment: (id: string) => Promise<void>
  addSurveyTemplate: (name: string) => Promise<void>
  deleteSurvey: (templateId: string) => Promise<void>
}