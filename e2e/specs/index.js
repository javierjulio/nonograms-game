describe("React App", () => {
  beforeEach(async () => {
    await page.goto(baseURL);
  })

  it("should have a page title of 'React App'", async () => {
    expect(await page.title()).toBe('React App');
  });

  it("opens React website on clicking 'Learn React' link", async () => {
    await page.click('"Learn React"');
    expect(page.url()).toBe("https://reactjs.org/");
    await page.screenshot({ path: "e2e/screenshots/example.png" });
  })
});
