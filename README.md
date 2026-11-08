# AI Quiz Assistant — 50-Question Performance Challenge

50 fixed questions from the original 100-question bank: 35 single-answer and all 15 select-all-that-apply questions. Original question IDs and answer keys are preserved, including previously problematic questions (basket/mangoes, basketball, cricket, pencils, tulips, books, sheep). Questions appear in a fixed order for comparable repeat tests.

## Update the existing GitHub Pages site
Upload all five files (`index.html`, `style.css`, `app.js`, `questions.json`, `README.md`) to the existing repository root, replacing the current versions. Keep GitHub Pages configured to main / (root). The existing website URL and QR code remain valid.

## iOS testing
The quiz supports both single-answer and select-all questions. Select-all questions require tapping Check Answers. Website correct-answer outlines appear after submission and are separate from any app-added AI suggestion outline. A score of 50/50 is a website score for answers submitted, not necessarily a direct measure of AI suggestion accuracy.

## Loading and caching
The page uses `app.js?v=6C2G4`, and JavaScript fetches `questions.json?v=6C2G4-50` without caching. If the page says Unable to load questions, confirm all five files were uploaded and refresh.

## Privacy
Static website. No accounts, tracking, or paid API. QR rendering uses a CDN library; the quiz itself needs no external service.
