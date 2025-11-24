"use client";
export const dynamic = "force-static";
import { useSurvey } from "@/context/SurveyContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function PublishPage() {
  const { loading, error, departments, responses, surveyTemplates } = useSurvey();

  const isEmpty = !loading && !error && departments.length === 0 && responses.length === 0 && surveyTemplates.length === 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-6 rounded-xl border border-zinc-200 bg-white p-8 dark:border-white/20 dark:bg-black">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Publish</h1>
        {loading && (
          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 text-zinc-700 dark:border-white/20 dark:bg-black/30 dark:text-zinc-300">
            Loading publish data...
          </div>
        )}
        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-red-700 dark:border-red-500/50 dark:bg-red-950/40 dark:text-red-300">
            Error: {error}
          </div>
        )}
        {isEmpty && (
          <div className="rounded-md border border-dashed border-zinc-300 p-3 text-zinc-600 dark:border-white/20 dark:text-zinc-400">
            No data available to publish yet. Create a department or a survey template first.
          </div>
        )}
        {!loading && !error && (
          <div className="rounded-md border border-zinc-200 p-4 dark:border-white/20">
            <p className="text-zinc-700 dark:text-zinc-300">Draft UI for publish is not implemented yet.</p>
            <p className="text-zinc-700 dark:text-zinc-300">Data snapshot:</p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300">
              <li>Departments: {departments.length}</li>
              <li>Survey templates: {surveyTemplates.length}</li>
              <li>Responses: {responses.length}</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ProtectedPublishPage() {
  return (
    <ProtectedRoute>
      <PublishPage />
    </ProtectedRoute>
  );
}