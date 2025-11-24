import { render, screen } from "@testing-library/react"
import Health from "@/components/Health"

describe("Health", () => {
  it("renders health status", () => {
    render(<Health />)
    expect(screen.getByText(/Health Check/i)).toBeInTheDocument()
    expect(screen.getByText(/Status: OK/i)).toBeInTheDocument()
  })
})