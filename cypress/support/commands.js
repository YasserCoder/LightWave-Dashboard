// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getDataTest", (dataTest) => {
    return cy.get(`[data-test=${dataTest}]`);
});

Cypress.Commands.add("mockAuthSession", () => {
    cy.window().then((win) => {
        cy.stub(win.supabase.auth, "getSession").resolves({
            data: {
                session: {
                    access_token: Cypress.env("SUPABASE_ANON_KEY"),
                    refresh_token: "mocked-refresh-token",
                    user: {
                        id: "mocked-user-id",
                        email: "test@example.com",
                        role: "authenticated",
                    },
                },
            },
            error: null,
        });

        cy.stub(win.supabase.auth, "getUser").resolves({
            data: {
                user: {
                    id: "mocked-user-id",
                    email: "test@example.com",
                    role: "authenticated",
                    user_metadata: {
                        name: "John Doe",
                        email: "test@example.com",
                        phone: "1234567890",
                        adress: "1234 Main St",
                        city: "Anytown",
                        country: "USA",
                        postCode: "12345",
                    },
                },
            },
            error: null,
        });
    });
});
