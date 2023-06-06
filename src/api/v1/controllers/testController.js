// import puppeteer from 'puppeteer-extra';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import dotenv from 'dotenv';
// const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
// dotenv.config();

// console.log(`Running test server`)

// const example_plaform = 'example website'
// let gmail

// puppeteer.use(StealthPlugin());
// let launchOptions = { 
//     headless: 'new',
//     ignoreDefaultArgs: ['--enable-automation'],
//     args:['--disable-setuid-sandbox','--no-sandbox','--single-process','--no-zygote'],
//     executablePath:
//         process.env.NODE_ENV === 'production'
//           ? process.env.PUPPETEER_EXECUTABLE_PATH
//           : puppeteer.executablePath(),
// };

// const browser = await puppeteer.launch(launchOptions);
// const page = await browser.newPage();
// await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
// await page.setViewport({width: 1080, height: 1024}); 

// console.log(`Starting ${example_plaform}`)

// await page.goto('https://developer.chrome.com/');
// await page.setViewport({ width: 1080, height: 1024 });

// const cookieBannerSelector = '.cookie-banner';
// await page.waitForSelector(cookieBannerSelector);

// const logStatement = `Cookie banner found!`;

// export const generateEmail = async(req, res) => {
//     res.send(logStatement)
//     console.log(logStatement)
// }


import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import dotenv from 'dotenv';
const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
dotenv.config();

console.log('Running test server')
const platform = 'Snapinbox'

let gmail

puppeteer.use(StealthPlugin());
let launchOptions = { 
    headless: false,
    ignoreDefaultArgs: ['--enable-automation'],
    executablePath:
        process.env.NODE_ENV === 'production'
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
};

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();
await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
await page.setViewport({width: 1080, height: 1024}); 

console.log(`Starting ${platform}`)

const url =`https://www.emailnator.com/`;
await page.goto(url);
console.log('Go to working')

await page.waitForSelector("input[placeholder='Email Address']")
console.log(`${platform} loaded successfully`)

let username
let domain
let email

while (domain !== 'gmail.com') {
    const inputElement = await page.$('input[placeholder="Email Address"]');
    email = await page.evaluate(inputElement => inputElement?.value.trim() || '', inputElement);
    
    if (typeof email === 'string' && email.length > 0) {
        [username, domain] = email.split('@');
    } else {
        console.log('Error: Invalid email address or input element not found.');
        break;
    }
    
    await page.click('button.form-control');
    await waitFor(1000);
}

await page.click('button[name="goBtn"]')
await page.waitForSelector(".message_container")

console.log("Inbox loaded successfully")
gmail = email


export const generateEmail = async(req, res) => {
    res.send(gmail)
    console.log(gmail)
}

