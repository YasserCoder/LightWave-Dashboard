describe("display stats", () => {
    beforeEach(() => {
        cy.visit("/home");
        cy.mockAuthSession();
        cy.intercept(
            "GET",
            `${Cypress.env("SUPABASE_URL")}/rest/v1/category?select=*`,
            {
                fixture: "categories.json",
            }
        ).as("mockCategories");

        cy.intercept(
            "GET",
            `${Cypress.env(
                "SUPABASE_URL"
            )}/rest/v1/profile?select=authority&authority=eq.user`,
            {
                statusCode: 200,
                headers: { "content-range": "0-0/55" },
                body: [],
            }
        ).as("mockProfile");
        cy.intercept("GET", `${Cypress.env("SUPABASE_URL")}/rest/v1/order*`, {
            statusCode: 200,
            fixture: "orders.json",
        }).as("mockOrder");
        cy.intercept(
            "GET",
            `${Cypress.env("SUPABASE_URL")}/rest/v1/orderItems*`,
            {
                fixture: "orderItems.json",
            }
        ).as("mockOrderItems");
        cy.intercept(
            "GET",
            `${Cypress.env(
                "SUPABASE_URL"
            )}/rest/v1/order?select=id&status=eq.pending`,
            {
                statusCode: 200,
                headers: { "content-range": "0-0/1" },
                body: [],
            }
        ).as("mockPendingOrder");

        cy.contains(/dashboard/i);
    });
    it("should displays the cards with the correct stats", () => {
        cy.getDataTest("total-users").find("h2").should("have.text", "55");
        cy.getDataTest("total-pending").find("h2").should("have.text", "1");
    });
    it("displays the most sold products with the correct order", () => {
        cy.getDataTest("Lamp-1").contains("[data-test=prod-order]", "1");
        cy.getDataTest("Lamp-1").contains("[data-test=prod-quantity]", "8");

        cy.getDataTest("Socket-1").contains("[data-test=prod-order]", "2");
        cy.getDataTest("Socket-1").contains("[data-test=prod-quantity]", "7");

        cy.getDataTest("Screwdriver-1").contains("[data-test=prod-order]", "3");
        cy.getDataTest("Screwdriver-1").contains(
            "[data-test=prod-quantity]",
            "3"
        );

        cy.getDataTest("Data-Cable-1").contains("[data-test=prod-order]", "4");
        cy.getDataTest("Data-Cable-1").contains(
            "[data-test=prod-quantity]",
            "2"
        );
    });
});
