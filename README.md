# AI Spend Audit SaaS

A production-style AI Spend Audit SaaS platform built to help startups and developers analyze their AI subscription costs, detect overspending, compare plans, and estimate potential savings through AI-powered audit summaries.

## 🚀 Features
- **SaaS Spend Analysis:** Input current AI tool usage (seats, plans, spend) to calculate immediate savings.
- **Deterministic Audit Engine:** Hardcoded business rules detect overspending patterns and recommend downgrades or alternatives.
- **AI-Powered Summaries:** Uses Groq AI (Llama 3) to generate personalized 100-word executive summaries.
- **Shareable Reports:** Public URLs for easy sharing of audit results with team members.
- **Lead Capture:** Captures emails for lead generation linked to specific audit reports.

## 🖼️ Screenshots
*(Screenshots coming soon)*
- `[Landing Page Placeholder]`
- `[Audit Results Dashboard Placeholder]`
- `[Lead Capture Modal Placeholder]`

## 🛠️ Tech Stack
- **Frontend:** React.js, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **AI Integration:** Groq API (`llama-3.1-8b-instant`)
- **Security:** Helmet, CORS, Express Rate Limit
- **Testing:** Jest

## 💻 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd ai-spend-audit
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your MONGO_URI and GROQ_API_KEY
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

## 🚀 Deployment Instructions
- **Backend:** Deployable to Render or Heroku. Set the environment variables in the dashboard.
- **Frontend:** Deployable to Vercel or Netlify. Set the `VITE_API_URL` to the backend URL.
- **Database:** Hosted on MongoDB Atlas. Ensure network access IP is configured.

## 🏗️ Architecture Summary
The application follows a standard decoupled Client-Server architecture. The React frontend communicates with an Express API. The backend processes the deterministic financial logic locally (Audit Engine) to calculate savings. It then calls the Groq AI API asynchronously to generate a readable summary, while saving the core structured data to MongoDB Atlas.

## ⚖️ Decisions & Tradeoffs
- **Deterministic Logic vs AI for Math:** We chose hardcoded business rules over LLM agents for financial math to guarantee accuracy and avoid hallucinated numbers. AI is used strictly for generating readable textual summaries.
- **Groq over OpenAI:** Selected Groq's Llama 3 for its exceptionally low latency, which is critical for real-time audit generation on the frontend.
- **Monolithic API vs Microservices:** Kept a monolithic Express app structure for MVP speed and simplicity.

## 🔗 Live Deployment
*(Live link placeholder)*
