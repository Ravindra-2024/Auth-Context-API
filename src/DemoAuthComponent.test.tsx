import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DemoAuthComponent from "./DemoAuthComponent";
import { AuthProvider } from "./context/AuthContext";
import "@testing-library/jest-dom";

// Helper to wrap with AuthProvider
const renderWithProvider = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("DemoAuthComponent", () => {
  it("renders login button when not authenticated", () => {
    renderWithProvider(<DemoAuthComponent />);
    expect(screen.getByText(/login as demo user/i)).toBeInTheDocument();
  });

  it("shows loading spinner when logging in", async () => {
    renderWithProvider(<DemoAuthComponent />);
    fireEvent.click(screen.getByText(/login as demo user/i));
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    jest.advanceTimersByTime(1500);
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
  });

  it("shows welcome message after login", async () => {
    renderWithProvider(<DemoAuthComponent />);
    fireEvent.click(screen.getByText(/login as demo user/i));
    jest.advanceTimersByTime(1500);
    await waitFor(() =>
      expect(screen.getByText(/welcome, user@example.com/i)).toBeInTheDocument()
    );
  });

  it("can logout after login", async () => {
    renderWithProvider(<DemoAuthComponent />);
    fireEvent.click(screen.getByText(/login as demo user/i));
    jest.advanceTimersByTime(1500);
    await waitFor(() =>
      expect(screen.getByText(/welcome, user@example.com/i)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText(/logout/i));
    expect(screen.getByText(/login as demo user/i)).toBeInTheDocument();
  });
});
