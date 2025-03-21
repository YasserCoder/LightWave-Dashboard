describe("Login", () => {
    beforeEach(() => {
        cy.visit("/login");
    });
    it("simulate a successful login to the dashboard", () => {
        cy.intercept(
            "GET",
            `${Cypress.env(
                "SUPABASE_URL"
            )}/rest/v1/profile?select=authority&id=eq.mocked-user-id`,
            {
                statusCode: 200,
                body: { authority: "admin" },
            }
        ).as("checkProfile");
        cy.window().then((win) => {
            cy.stub(win.supabase.auth, "signInWithPassword").resolves({
                data: {
                    user: {
                        id: "mocked-user-id",
                        email: "test@example.com",
                        role: "authenticated",
                        user_metadata: { name: "John Doe" },
                    },
                    session: {
                        access_token: "mocked-access-token",
                        refresh_token: "mocked-refresh-token",
                    },
                },
                error: null,
            });
        });
        cy.mockAuthSession();

        cy.contains(/lightwave/i);
        cy.get("input[type=text]").clear().type("test@example.com");
        cy.get("input[type=password]").clear().type("password");
        cy.get("button").contains(/login/i).click();
        cy.wait("@checkProfile");

        cy.url().should("include", "/home");
        cy.contains(/welcome, John/i);
    });
    it("simulate a failed login to the dashboard", () => {
        cy.window().then((win) => {
            cy.stub(win.supabase.auth, "signInWithPassword").resolves({
                data: "",
                error: {
                    message: "Provided email or password are incorrect",
                },
            });
        });

        cy.contains(/lightwave/i);
        cy.get("input[type=text]").clear().type("testfailed@example.com");
        cy.get("input[type=password]").clear().type("password");
        cy.get("button").contains(/login/i).click();

        cy.contains(/Provided email or password are incorrect/i);
    });
});

describe("Logout", () => {
    beforeEach(() => {
        cy.visit("/home");
    });
    it("simulate a successful logout", () => {
        cy.mockAuthSession();
        cy.contains(/dashboard/i);
        cy.get("button")
            .contains(/logout/i)
            .click();

        cy.get("button.swal2-confirm").click();
        cy.url().should("include", "/login");
        cy.contains(/lightwave/i);
    });
});
