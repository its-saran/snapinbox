import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import dotenv from 'dotenv';
const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
dotenv.config();

console.log(`Running test server`)

const example_plaform = 'example website'
let gmail

puppeteer.use(StealthPlugin());
let launchOptions = { 
    headless: 'new',
    ignoreDefaultArgs: ['--enable-automation'],
    args:['--disable-setuid-sandbox','--no-sandbox','--single-process','--no-zygote'],
    executablePath:
        process.env.NODE_ENV === 'production'
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
};

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();
await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
await page.setViewport({width: 1080, height: 1024}); 

console.log(`Starting ${example_plaform}`)

await page.goto('https://developer.chrome.com/');
await page.setViewport({ width: 1080, height: 1024 });

const cookieBannerSelector = '.cookie-banner';
await page.waitForSelector(cookieBannerSelector);

const logStatement = `Cookie banner found!`;

export const generateEmail = async(req, res) => {
    res.send(logStatement)
    console.log(logStatement)
}
