import { render, screen } from "@testing-library/react"
import * as SurveyModule from "@/context/SurveyContext"
import Home from "@/app/page"

function mockUseSurvey(value: Partial<ReturnType<typeof SurveyModule.useSurvey>>) {
  vi.spyOn(SurveyModule, "useSurvey").mockReturnValue({
    departments: [],
    responses: [],
    surveyTemplates: [],
    loading: false,
    addDepartment: async () => {},
    deleteDepartment: async () => {},
    addSurveyTemplate: async () => {},
    deleteSurvey: async () => {},
    ...value,
  } as any)
}

describe("Home status banners", () => {
  it("shows loading banner when loading", () => {
    mockUseSurvey({ loading: true })
    render(<Home />)
    expect(screen.getByText(/Fetching latest data/i)).toBeInTheDocument()
  })

  it("shows error banner when error present", () => {
    mockUseSurvey({ loading: false, error: "Failed to load" })
    render(<Home />)
    expect(screen.getByText(/Error: Failed to load/i)).toBeInTheDocument()
  })

  it("shows empty banner when no data", () => {
    mockUseSurvey({ loading: false, error: undefined, departments: [], responses: [], surveyTemplates: [] })
    render(<Home />)
    expect(screen.getByText(/No data yet/i)).toBeInTheDocument()
  })
})