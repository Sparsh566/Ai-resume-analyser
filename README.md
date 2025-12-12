#🧠 AI Resume Analyzer

An intelligent resume-analysis tool powered by the OpenAI API.
Upload a resume (PDF or text), and the system evaluates it based on job descriptions, identifies strengths, highlights weaknesses, and provides a detailed improvement report.

##🚀 Features
✅ Resume Upload

Supports PDF, DOCX, and Text format resumes.

✅ AI-Powered Scoring

The AI analyzes and scores the resume based on:

Skills match

Experience relevance

Clarity & structure

ATS compatibility

Grammar & readability

✅ Job Description Match

Paste a job description and get a match percentage and relevant improvements.

✅ Detailed Feedback

Strengths

Weaknesses

Missing skills

Suggested improvements

Rewrite of weak sections
##
🎯 Clean UI

Built with a simple front-end for easy interaction.

##🏗️ Tech Stack
Frontend

HTML / CSS / JavaScript (or React – depending on your build)

Backend

Node.js

Express

OpenAI API

##📁 Project Structure
Resume-AI/
│── server.js
│── package.json
│── .gitignore
│── .env       (NOT uploaded to GitHub)
│── public/
│    ├── index.html
│    ├── style.css
│    └── script.js

##🔐 Environment Variables

Create a .env file (do NOT upload to GitHub):

OPENAI_API_KEY=your_api_key_here
PORT=3000

##▶️ Running the Project
Install modules
npm install

Start the server
npm start


##Server will run at:
👉 http://localhost:3000

##📦 Deployment

You can deploy on:

Render

Railway

Vercel (only frontend)


##🛡️ Notes

Never expose your API key in frontend code.

.env should ALWAYS be in .gitignore.
