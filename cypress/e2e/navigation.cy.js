describe("navigate trought the app", () => {
    beforeEach(() => {
        cy.visit("/home");
        cy.mockAuthSession();
    });
    it("should navigate to the products page", () => {
        cy.get("a")
            .contains(/products/i)
            .click();
        cy.url().should("include", "/products");
        cy.get("h1").contains(/products/i);
    });
    it("should navigate to the categories page", () => {
        cy.get("a")
            .contains(/categories/i)
            .click();
        cy.url().should("include", "/categories");
        cy.get("h1").contains(/categories/i);
    });
    it("should navigate to the deals page", () => {
        cy.get("a").contains(/deals/i).click();
        cy.url().should("include", "/deals");
        cy.get("h1").contains(/deals/i);
    });
    it("should navigate to the orders page", () => {
        cy.get("a")
            .contains(/orders/i)
            .click();
        cy.url().should("include", "/orders");
        cy.get("h1").contains(/orders/i);
    });
    it("should navigate to the users page", () => {
        cy.get("a").contains(/users/i).click();
        cy.url().should("include", "/users");
        cy.get("h1").contains(/users/i);
    });
    it("should navigate to the inbox page", () => {
        cy.get("a").contains(/inbox/i).click();
        cy.url().should("include", "/inbox");
        cy.get("h1").contains(/inbox/i);
    });
    it("should navigate to the profile page", () => {
        cy.get("a")
            .contains(/profile/i)
            .click();
        cy.url().should("include", "/profile");
        cy.get("h1").contains(/profile/i);
    });
});

describe("visit unavailable page", () => {
    beforeEach(() => {
        cy.visit("/unavailable-page");
        cy.mockAuthSession();
    });
    it("should show the 404 page", () => {
        cy.get("h1").contains(/404/i);
    });
    it("should navigate to the home page when click on go home button", () => {
        cy.contains(/go home/i).click();
        cy.url().should("include", "/home");
    });
});
