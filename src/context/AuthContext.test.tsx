import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "./AuthContext";
import { AuthContext } from "./AuthContextValue";
import type { AuthContextProps } from "./AuthContextValue";
import "@testing-library/jest-dom";

const TestComponent = () => {
  return (
    <AuthContext.Consumer>
      {(value: AuthContextProps | undefined) => (
        <div>
          <span>
            isAuthenticated: {value && value.isAuthenticated ? "true" : "false"}
          </span>
        </div>
      )}
    </AuthContext.Consumer>
  );
};

describe("AuthContext", () => {
  it("provides default context values", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText(/isAuthenticated: false/i)).toBeInTheDocument();
  });
});
