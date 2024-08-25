const { test, expect, request } = require("@playwright/test");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

// Generate a first name
const firstName = faker.person.firstName();
// Generate an email
const jobTitle = faker.person.jobTitle();

test.describe("API Testing with Playwright", () => {
  let apiContext;

  // Initialize API Context before all tests
  test.beforeAll(async () => {
    const baseUrl = process.env.BASE_URL_API;
    apiContext = await request.newContext({
      baseURL: baseUrl,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
      },
    });
  });

  test("Create user", async () => {
    const newUser = {
      name: firstName,
      job: jobTitle,
    };
    const response = await apiContext.post("/api/users", {
      data: newUser,
    });
    // Assert ok response
    expect(response.ok()).toBeTruthy();
    // Assert response code
    expect(response.status()).toBe(201);
    const data = await response.json();
    // Assert id property
    expect(data).toHaveProperty("id");
    // Assert name value
    expect(data.name).toBe(firstName);
  });
});
