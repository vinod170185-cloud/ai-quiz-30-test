# AI Quiz Assistant — 30-Question Performance Challenge

A free Kahoot-style **single-player** static quiz for testing an iOS quiz-answer assistant. No login, database, or API key required.

## Publish on GitHub Pages

1. On GitHub, create a new **public** repository, for example `ai-quiz-30-test`.
2. Choose **Add file → Upload files**. Upload `index.html`, `style.css`, `app.js`, and `questions.json` from this folder **into the repository root** (not inside a subfolder). Commit changes.
3. Open repository **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
4. Once deployment completes, open `https://YOUR-USERNAME.github.io/ai-quiz-30-test/` (replace YOUR-USERNAME and the repository name with your actual values).
5. The intro page displays a QR code for its own live URL. Scan with the AI Quiz Assistant's QR scanner, or open the URL directly.

**Note:** GitHub Pages may take several minutes to publish. The QR code uses a third-party JavaScript library loaded from jsDelivr, but the QR is rendered locally; the quiz itself has no backend and still works if QR loading fails. This is a single-player practice site, not multiplayer Kahoot.

## Test checklist

- Scan QR → page opens in in-app browser.
- Start quiz → AI detects question and all four options.
- AI suggestion is highlighted without selecting or submitting.
- Tap an option → explicit `Correct answer: ...` feedback appears.
- Verify Answer History auto-grading where supported. Some quiz detector/verification versions may require adapting to this site's DOM; do not assume compatibility until tested.
- Tap Next question → AI updates, no stale answers.
- Finish all 30 → review correct answers and score.
- Check elapsed response times and correct/wrong/unverified counts.

## Answer key

The `correct` field in `questions.json` is a **zero-based index** (0=A, 1=B, 2=C, 3=D). This is public client-side data for testing, not a secure exam.
