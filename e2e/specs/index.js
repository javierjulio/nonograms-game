describe("React App", () => {
  beforeEach(async () => {
    await page.goto(baseURL);
  })

  it("should have a page title of 'React App'", async () => {
    expect(await page.title()).toBe('React App');
  });

  it("tests sample Playwright actions", async () => {
    const rect = await page.evaluate(() => {
      // It’s important that we return a serializable object here because
      // we’re passing data back and forth between the headless Chromium
      // instance and our Node script. If we just passed the result of
      // getBoundingClientRect, it would become contextified within the
      // browser, which means that it wouldn’t be able to get passed through.
      // https://egghead.io/lessons/netlify-using-playwright-to-screenshot-the-dom-and-return-an-image-from-a-netlify-function
      const firstCell = document.querySelector('.nonogram-grid > :first-child')
      const { x, y } = firstCell.getBoundingClientRect()
      return { x, y, width: firstCell.offsetWidth, height: firstCell.offsetHeight }
    })
    await page.mouse.move(rect.x, rect.y);
    await page.mouse.down();
    // await page.mouse.move(rect.x, (rect.y + (rect.height * 1)));
    // await page.mouse.move(rect.x, (rect.y + (rect.height * 2)));
    // await page.mouse.move(rect.x, (rect.y + (rect.height * 3)));
    await page.mouse.move(rect.x, (rect.y + (rect.height * 4)), { steps: 4 });
    await page.mouse.up();

    await page.click('.nonogram-grid > :last-child');
    await page.click('.nonogram-grid > :last-child');

    await page.click('.nonogram-grid > :nth-child(2)');
    await page.click('.nonogram-grid > :nth-child(2)');

    await page.screenshot({ path: "e2e/screenshots/grid.png" });
  })
});
