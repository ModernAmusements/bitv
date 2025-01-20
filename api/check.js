// api/check.js
const pa11y = require('pa11y');
const chromium = require('chrome-aws-lambda');
const puppeteerCore = require('puppeteer-core');
const puppeteerLocal = require('puppeteer');

module.exports = async (req, res) => {
  // CORS headers (adjust as needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { url } = req.body || {};
  if (!url || typeof url !== 'string') {
    return res.status(400).json({
      error: 'URL wird benötigt und muss eine gültige Zeichenkette sein.',
    });
  }

  try {
    console.log(`Running Pa11y for URL: ${url}`);

    let browser;
    if (process.env.VERCEL) {
      // === Running on Vercel (Serverless) ===
      browser = await puppeteerCore.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
      });
    } else {
      // === Running locally ===
      // Use full Puppeteer which includes local Chromium
      browser = await puppeteerLocal.launch();
    }

    // Run Pa11y with the custom browser instance
    const results = await pa11y(url, { browser });

    // Clean up
    await browser.close();

    return res.status(200).json(results);
  } catch (error) {
    console.error('Pa11y Error:', error);
    return res.status(500).json({
      error: 'Fehler beim Prüfen der Barrierefreiheit.',
      details: error.message,
    });
  }
};