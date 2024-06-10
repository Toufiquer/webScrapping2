## Web Scrapping PDF Generator

This project uses Puppeteer to capture web pages and convert them to PDF documents. It allows you to specify a website URL, the maximum number of files to save, and the delay between screenshots.

**Features:**

-   **Full-page screenshots:** Captures the entire webpage, including content that extends beyond the visible viewport.
-   **PDF conversion:** Converts screenshots into high-quality PDF documents.
-   **User input:** Prompts the user for the website URL, the maximum number of files to save, and the delay between screenshots.
-   **File management:** Creates a dedicated folder (`save-pdf`) to store the generated PDF files with unique filenames based on the capture time.

**Dependencies:**

-   `puppeteer`: For browser automation.
-   `pdfkit`: For creating PDF documents.
-   `pngjs`: For reading and manipulating PNG images.

**Installation:**

1. Ensure you have Node.js and npm (or yarn) installed.
2. Navigate to the project directory in your terminal.
3. Run the following command to install the dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

**Usage:**

1. Run the script:

    ```bash
    npm start
    ```

    or

    ```bash
    yarn start
    ```

2. You will be prompted to enter the following information:

    - **Enter url:** The website URL you want to capture.
    - **Max number of files to save:** The maximum number of PDF files to generate.
    - **Delay between screenshots (in seconds):** The delay between capturing screenshots (e.g., 5 seconds).

3. The script will automatically capture the specified number of screenshots, convert them to PDFs, and save them in the `save-pdf` folder.

**Example:**

```
Enter url: https://www.example.com
Max number of files to save: 5
Delay between screenshots (in seconds): 10
```

This will capture 5 screenshots of the `https://www.example.com` webpage every 10 seconds and save them as PDFs in the `save-pdf` folder.

**Notes:**

-   The script requires a headless browser (Chromium) to be installed.
-   The script currently saves the captured images in PNG format before converting them to PDF. You can modify the code to use a different image format if desired.
-   You can adjust the `delayBetweenScreenshots` variable in the code to control the frequency of captures.
-   The `folderName` variable can be modified to change the directory where the PDFs are saved.

**Further Enhancements:**

-   **Error handling:** Implement robust error handling to catch issues like network errors, invalid URLs, or problems during PDF creation.
-   **Customization:** Allow users to adjust parameters like image quality, page size, and margins.
-   **Logging:** Add logging functionality to track captured URLs, filenames, and any encountered errors.
-   **Scheduled execution:** Use a scheduler (like Node-Schedule) to automate the PDF generation process at regular intervals.

This README provides a detailed overview of the project. Feel free to modify and expand it based on the specific features and functionalities of your application.
