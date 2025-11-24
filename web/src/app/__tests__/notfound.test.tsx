import { render, screen } from "@testing-library/react"
import NotFoundView from "@/components/NotFoundView"

describe("NotFoundView", () => {
  it("renders not found message and links", () => {
    render(<NotFoundView />)
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Go home/i })).toHaveAttribute("href", "/")
    expect(screen.getByRole("link", { name: /Health/i })).toHaveAttribute("href", "/health")
  })
})