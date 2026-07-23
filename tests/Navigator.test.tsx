import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Navigator from "../src/Navigator";
import Outlet from "../src/Outlet";
import { navigate, resetStore } from "../src/store";

const Home = () => <div data-testid="page-home">Home Page</div>;
const About = () => <div data-testid="page-about">About Page <Outlet /></div>;
const AboutDetail = () => <div data-testid="page-about-detail">About Detail Page</div>;

const routes = [
    { 
        path: "/about", 
        component: About,
        children: [
            { path: "/detail", component: AboutDetail }
        ]
    },
    { path: "/", component: Home }
];

describe("Navigator Core Scenarios", () => {
    beforeEach(() => {
        window.location.hash = "";
        resetStore();
    });

    it("should render initial route and forward navigation", async () => {
        render(<Navigator routes={routes} />);
        
        // Initial render should show Home
        expect(screen.getByTestId("page-home")).toBeVisible();
        expect(screen.queryByTestId("page-about")).not.toBeInTheDocument();

        // Navigate forward to About
        act(() => {
            navigate("/about");
        });

        // Now both should be in the document
        expect(screen.getByTestId("page-home")).toBeInTheDocument();
        expect(screen.getByTestId("page-about")).toBeInTheDocument();
        
        // Home should have display: none via RouteProvider inactive
        const homeProvider = screen.getByTestId("page-home").closest("[data-testid='route-provider']");
        const aboutProvider = screen.getByTestId("page-about").closest("[data-testid='route-provider']");
        
        expect(homeProvider).toHaveStyle({ display: "none" });
        expect(aboutProvider).not.toHaveStyle({ display: "none" });
    });

    it("should handle backward navigation", async () => {
        render(<Navigator routes={routes} />);
        
        act(() => {
            navigate("/about");
        });

        expect(screen.getByTestId("page-about")).toBeVisible();
        
        // Navigate backward
        act(() => {
            window.history.back();
        });

        await waitFor(() => {
            // About should be unmounted or hidden? 
            // Based on pop behavior, the records length is truncated, so it unmounts from DOM.
            expect(screen.queryByTestId("page-about")).not.toBeInTheDocument();
        });
        
        // Home should be visible again
        const homeProvider = screen.getByTestId("page-home").closest("[data-testid='route-provider']");
        expect(homeProvider).not.toHaveStyle({ display: "none" });
    });

    it("should handle direct URL navigation", async () => {
        navigate("/about", { replace: true });
        
        render(<Navigator routes={routes} />);
        
        // Should immediately show about
        expect(screen.getByTestId("page-about")).toBeVisible();
        expect(screen.queryByTestId("page-home")).not.toBeInTheDocument();
        
        const aboutProvider = screen.getByTestId("page-about").closest("[data-testid='route-provider']");
        expect(aboutProvider).not.toHaveStyle({ display: "none" });
    });

    it("should handle nested routes via Outlet", async () => {
        navigate("/about/detail", { replace: true });
        
        render(<Navigator routes={routes} />);

        // Both About and AboutDetail should be visible
        expect(screen.getByTestId("page-about")).toBeVisible();
        expect(screen.getByTestId("page-about-detail")).toBeVisible();
    });
});
