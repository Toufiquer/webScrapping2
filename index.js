const puppeteer = require('puppeteer');

async function saveWebpageAsPDF(url, outputPath) {
  try {
    // Launch the browser
    const browser = await puppeteer.launch({headless: true,    args: ['--no-sandbox'] });
    // Open a new page
    const page = await browser.newPage();
    // Navigate to the URL
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForNetworkIdle();

    // Wait for a specific selector that indicates the page is fully loaded
    // You may need to change the selector to something appropriate for the BBC website
    const selector = 'body'; // Replace with a suitable selector
    await page.waitForSelector(selector, { timeout: 60000 });

    // Set the PDF options
    const pdfOptions = {
      format: 'A4',
      printBackground: true,
      margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
      path: outputPath
    };
//     page.on('console', msg => console.log('Page Console:', msg.text()));
// page.on('pageerror', error => console.error('Page Error:', error));

    // Save the page as a PDF
    await page.pdf(pdfOptions);
    // Close the browser
    await browser.close();
    console.log(`PDF saved to ${outputPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

// Replace 'path/to/output.pdf' with the desired output path for the PDF
const url = 'https://www.bbc.com/';
const outputPath = 'output.pdf';

saveWebpageAsPDF(url, outputPath);