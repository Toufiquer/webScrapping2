/*
|-----------------------------------------
| setting up Index for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: webScrapping, June, 2024
|-----------------------------------------
*/
import puppeteer from 'puppeteer'
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import PDFDocument from 'pdfkit'
import pngjs from 'pngjs'
import fs from 'fs'

const folderName = './save-pdf'

const rl = readline.createInterface({ input, output })

const runApp = async () => {
    const url = await rl.question('Enter url\t')
    const count = await rl.question('Max number of files to save\t')
    const delayBetweenScreenshots = await rl.question(
        'Delay between screenshots (in seconds)\t'
    )

    const convertImgToPdf = (pages, size) => {
        const doc = new PDFDocument({ margin: 0, size })
        for (let index = 0; index < pages.length; index++) {
            doc.image(pages[index], 0, 0, {
                fit: size,
                align: 'center',
                valign: 'center',
            })
            if (pages.length != index + 1) doc.addPage()
        }
        doc.end()
        return doc
    }

    const getAndSavePdf = async () => {
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName)
            }
        } catch (err) {
            console.error(err)
        }
        const browser = await puppeteer.launch({
            headless: false,
            timeout: 60000,
        })
        const page = await browser.newPage()
        await page.setViewport({
            width: 1440,
            height: 960,
            deviceScaleFactor: 1,
            hasTouch: false,
            isMobile: false,
        })

        await page.goto(`${url}`, { waitUntil: 'networkidle2' })

        for (let i = 0; i < parseInt(count); i++) {
            const fileName = `${new Date().toISOString()}`
                .replaceAll('-', '_')
                .replaceAll('.', '_')
                .replaceAll(':', '_')
            const imagePath = folderName + '/' + fileName + '.png'
            const pdfPath = folderName + '/' + fileName + '.pdf'

            try {
                await page.waitForSelector('img', { visible: true })
                await page.screenshot({
                    path: imagePath,
                    fullPage: true,
                    captureBeyondViewport: true,
                })
            } catch (err) {
                console.error('Error saving image:', err)
            }

            // ! Convert to pdf
            const pages = [imagePath]
            try {
                // ! Get Height and Width
                const imageBuffer = fs.readFileSync(imagePath)
                const reader = new pngjs.PNG({ filterType: 4 }) // Create a PNG reader

                await new Promise((resolve, reject) => {
                    reader.parse(imageBuffer, (err, data) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    })
                })
                const width = reader.width
                const height = reader.height
                convertImgToPdf(pages, [width, height]).pipe(
                    fs.createWriteStream(pdfPath)
                )
            } catch (err) {
                console.error('Error saving pdf :', err)
            }

            /* Delete the image after successful PDF creation */
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image:', err)
                }
            })

            // Add a delay to allow the website to change
            await new Promise((resolve) =>
                setTimeout(resolve, parseInt(delayBetweenScreenshots) * 1000)
            )
        }
        await browser.close()
    }

    getAndSavePdf()
    console.log('Please wait...')
    rl.close()
    console.log('Successfully saved your pdf.')
}
runApp()
