<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# 🚀 HireFilter — HR Resume Screening Frontend

A production-grade React frontend for HR teams to filter and shortlist candidates based on company requirements.

---

## ✨ Features

- **Requirements Panel** — Set job title, required skills, experience level, education, and minimum match score
- **Smart Scoring** — Candidates are dynamically scored based on how well they match requirements
- **PDF Resume Upload** — Upload PDF resumes per candidate via drag-and-drop or file browser
- **Shortlisting** — Mark candidates and view them in a dedicated tab
- **Sort & Filter** — Sort by match score, name, or experience
- **Stats Dashboard** — See total, filtered, shortlisted count, and average match score at a glance

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **No backend required** — Pure frontend, all state in memory
- **Fonts**: Syne, Space Mono, DM Sans (Google Fonts)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Install & Run

```bash
npm install
npm start
```

App runs at: http://localhost:3000

---

## 📁 Project Structure

```
src/
├── App.js                    # Main app with state management
├── data.js                   # Mock candidates + constants
├── index.js                  # React entry point
├── index.css                 # Global styles & CSS variables
└── components/
    ├── RequirementsPanel.jsx  # Left sidebar: filter controls
    ├── CandidateCard.jsx      # Candidate card with PDF upload
    └── StatsBar.jsx           # Top stats dashboard
```

---

## 📄 PDF Resume Feature

Each candidate card has an expandable section with a **PDF uploader**:

- Drag & drop a `.pdf` file onto the upload zone
- Or click "browse" to select from your file system
- Once uploaded, a **VIEW** button opens the PDF in a new tab
- You can replace an uploaded resume anytime

> ⚠️ Only PDF files are accepted. Files are stored in-memory (not sent to any server).

---

## 🔧 How Scoring Works

When you click **Filter Candidates**, each candidate receives a match score:

1. **Skills match** — % of required skills the candidate has
2. **Experience bonus/penalty** — ±5–10 points based on experience level match
3. **Education bonus/penalty** — ±5–8 points based on education level

Candidates scoring below the **Min Match Score** threshold are hidden.

---

## 🔌 Backend Integration (Future)

To connect to a real backend:
- Replace mock data in `src/data.js` with API calls
- POST requirements to `/api/filter` and receive scored candidates
- Store uploaded PDFs via multipart form upload to your server

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `build/` folder, ready to deploy on Vercel, Netlify, or any static host.
>>>>>>> upstream/jobportelteam
