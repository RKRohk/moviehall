import { test, expect } from "@playwright/test"

const URL = "https://moviehall.rohankakar.me/"
test('Sign In is visible before signing in', async ({ page }) => {
    await page.goto(URL)
    const locator = page.locator("text=Sign In >> nth=0")
    await expect(locator).toHaveText("Sign In")
})

test('Cannot create room when not signed in', async ({ page }) => {
    await page.goto(URL)
    const inputMovie = page.locator("input")
    inputMovie.type("/movie.mp4")
    const locator = page.locator("button:has-text('Create Room')")
    await locator.click({ button: "left" })
    expect(page.url()).toBe(URL)
})

test("Cannot enter room without signing in", async ({ page }) => {
    await page.goto(URL + "room/abcd")
    const signInWithGoogleButton = page.locator("button", { hasText: "Sign in with Google" })
    await expect(signInWithGoogleButton).toHaveText("Sign in with Google")
})