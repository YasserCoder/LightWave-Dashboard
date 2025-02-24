describe("template spec", () => {
    it("passes", () => {
        cy.visit("/home");
        cy.url().should("include", "/login");
        cy.contains(/lightwave/i);
        cy.get("button").click();

        cy.url().should("include", "/home");
    });
});
