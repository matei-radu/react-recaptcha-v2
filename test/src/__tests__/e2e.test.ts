import puppeteer, { Browser, Page } from "puppeteer";
import handler from "serve-handler";
import * as http from "http";

const PORT = 3000;
const BUILD_DIR = "build";

describe("ReCaptcha", () => {
  let browser: Browser;
  let page: Page;
  let server: http.Server;

  beforeAll(async () => {
    server = http.createServer((request, response) => {
      return handler(request, response, {
        public: BUILD_DIR,
      });
    });

    server.listen(PORT);
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("cleans the DOM after unmounting", async () => {
    await page.goto(`http://localhost:${PORT}`);
    const DomBeforeMounting = await page.content();

    await page.click("#show-captcha-btn"); // Mount ReCaptcha
    await page.waitForSelector("#recaptcha");

    await page.click("#show-captcha-btn"); // Unmount ReCaptcha
    const DomAfterUnmounting = await page.content();

    expect(DomBeforeMounting).toEqual(DomAfterUnmounting);
  });

  afterAll(() => {
    server.close();
    browser.close();
  });
});
