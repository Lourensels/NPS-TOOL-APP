import { firestore } from "@/firebase"
import logger from "@/lib/logger"
import type { Department, Response, SurveyTemplate } from "@/lib/types"
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit as limitQuery,
  writeBatch,
  Timestamp,
  getDoc,
  getDocs,
  type DocumentData,
} from "firebase/firestore"

export type ResponsesOptions = {
  departmentId?: string
  limit?: number
}

function mapDocs<T = unknown>(docs: Array<{ id: string; data: () => DocumentData }>): T[] {
  return docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) })) as T[]
}

export function subscribeDepartments(onData: (depts: Department[]) => void, onError?: (err: unknown) => void) {
  const ref = collection(firestore!, "departments")
  return onSnapshot(ref, (snap) => {
    onData(mapDocs<Department>(snap.docs))
  }, (err) => {
    logger.error("Departments subscription error", err)
    onError?.(err)
  })
}

export function subscribeResponses(opts: ResponsesOptions, onData: (resps: Response[]) => void, onError?: (err: unknown) => void) {
  let q = query(collection(firestore!, "responses"), orderBy("createdAt", "desc"))
  if (opts.departmentId) {
    q = query(collection(firestore!, "responses"), where("departmentId", "==", opts.departmentId), orderBy("createdAt", "desc"))
  }
  if (opts.limit) {
    q = query(q, limitQuery(opts.limit))
  }
  return onSnapshot(q, (snap) => {
    onData(mapDocs<Response>(snap.docs))
  }, (err) => {
    logger.error("Responses subscription error", err)
    onError?.(err)
  })
}

export function subscribeUserTemplates(userId: string, onData: (tmpls: SurveyTemplate[]) => void, onError?: (err: unknown) => void) {
  const q = query(collection(firestore!, "surveyTemplates"), where("ownerId", "==", userId), orderBy("createdAt", "desc"))
  return onSnapshot(q, (snap) => {
    onData(mapDocs<SurveyTemplate>(snap.docs))
  }, (err) => {
    logger.error("Templates subscription error", err)
    onError?.(err)
  })
}

export async function addDepartment(name: string) {
  const batch = writeBatch(firestore!)
  const ref = doc(collection(firestore!, "departments"))
  batch.set(ref, { name })
  await batch.commit()
}

export async function deleteDepartment(id: string) {
  const ref = doc(firestore!, "departments", id)
  const batch = writeBatch(firestore!)
  batch.delete(ref)
  await batch.commit()
}

export async function addSurveyTemplate(name: string, ownerId: string) {
  const ref = doc(collection(firestore!, "surveyTemplates"))
  const batch = writeBatch(firestore!)
  batch.set(ref, { name, ownerId, createdAt: Timestamp.now() })
  await batch.commit()
}

export async function deleteSurveyByTemplateId(templateId: string) {
  const templateRef = doc(firestore!, "surveyTemplates", templateId)
  const snap = await getDoc(templateRef)
  if (!snap.exists()) return
  const respSnap = await getDocs(query(collection(firestore!, "responses"), where("templateId", "==", templateId)))
  const batch = writeBatch(firestore!)
  respSnap.forEach((d) => batch.delete(d.ref))
  batch.delete(templateRef)
  await batch.commit()
}