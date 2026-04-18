# Neha Gurjar — Portfolio Website 🚀

Ek personal portfolio website jo **Neha Gurjar** (Aspiring Data Analyst) ke liye banayi gayi hai. Isme ek **space/warp themed** landing page hai aur ek **AI chatbot** ("Ask Neha") jo first-person me Neha ki tarah baat karta hai.

---

## 📑 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Project Structure](#-project-structure)
3. [Frontend — Kaise Bana Hai](#-frontend--kaise-bana-hai)
4. [Backend — Kaise Bana Hai](#-backend--kaise-bana-hai)
5. [Frontend ↔ Backend Flow](#-frontend--backend-flow)
6. [Local Development](#-local-development-setup)
7. [Render Pe Deploy Karne Ke Steps](#-render-pe-deploy-karne-ke-steps)
8. [Environment Variables](#-environment-variables)

---

## 🛠 Tech Stack

### Frontend
- **React 19** + **TypeScript**
- **TanStack Start v1** (full-stack React framework with SSR)
- **Vite 7** (build tool)
- **Tailwind CSS v4** (styling)
- **shadcn/ui** (UI components — Radix based)
- **Framer Motion** (animations)
- **TanStack Router** (file-based routing)

### Backend
- **MongoDB Atlas** (Cloud database — neha_didi_portfolio database)
- **Lovable Cloud** (managed backend for Edge Functions)
- **Deno Edge Functions** (serverless functions)
- **Groq API** (LLM provider — `llama-3.3-70b-versatile` model)

### Hosting
- Frontend → **Render** (ya Cloudflare Workers / Vercel)
- Backend (Edge Function) → **Lovable Cloud** (auto-deploy)

---

## 📁 Project Structure

```
.
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx         # Landing hero section
│   │   ├── About.tsx        # About Neha
│   │   ├── Skills.tsx       # Tech skills grid
│   │   ├── Projects.tsx     # Projects showcase
│   │   ├── Contact.tsx      # Contact section
│   │   ├── Nav.tsx          # Navigation bar
│   │   ├── StarField.tsx    # Animated star background
│   │   ├── WarpSequence.tsx # ⭐ AI Chatbot terminal UI
│   │   └── ui/              # shadcn/ui components
│   │
│   ├── routes/              # File-based routing (TanStack Router)
│   │   ├── __root.tsx       # Root layout (html/head/body)
│   │   └── index.tsx        # Home page (/)
│   │
│   ├── data/
│   │   ├── projects.ts      # Projects data
│   │   └── nehaProfile.ts   # Neha ki profile (reference text)
│   │
│   ├── integrations/mongodb/
│   │   ├── client.ts        # MongoDB client
│   │   └── types.ts         # TypeScript types for collections
│   │
│   ├── styles.css           # Tailwind + design tokens
│   └── router.tsx           # Router config
│
├── supabase/
│   └── functions/
│       └── ask-neha/
│           └── index.ts     # ⭐ Backend Edge Function
│
├── .env                     # Environment variables (auto-managed)
├── package.json
└── vite.config.ts
```

---

## 🎨 Frontend — Kaise Bana Hai

Frontend ek **single-page portfolio** hai jo TanStack Start (React 19 + Vite 7) pe bana hai.

### Key Sections (Top → Bottom)
1. **`Nav.tsx`** — Top navigation bar with smooth scroll links.
2. **`Hero.tsx`** — Big landing section with name, role, CTA buttons. Background me `StarField.tsx` se animated stars chal rahe hain.
3. **`About.tsx`** — Neha ka short intro.
4. **`Skills.tsx`** — Power BI, SQL, Python, Tableau, Excel etc.
5. **`Projects.tsx`** — `data/projects.ts` se projects list render hoti hai using `ProjectCard.tsx`.
6. **`Contact.tsx`** — Email, phone, LinkedIn links.
7. **`WarpSequence.tsx`** ⭐ — Floating AI chat terminal ("Ask Neha"). User question type karta hai → backend call → reply mil ke chat me dikh jaata hai.

### Styling
- Tailwind CSS v4 — `src/styles.css` me CSS variables (`--primary`, `--background`, etc.) define hain.
- Dark space theme — black background + neon accents.
- Framer Motion ke through entry animations & micro-interactions.

### Routing
- File-based: `src/routes/index.tsx` = `/` route.
- `src/routes/__root.tsx` = global HTML shell (head tags, SEO meta).

### Build
```bash
npm run build       # production build (SSR + client bundle)
npm run dev         # local dev server
```

---

## ⚙️ Backend — Kaise Bana Hai

Backend **MongoDB Atlas** (cloud database) ke saath hai. Database ka naam: **`neha_didi_portfolio`**

### Available Collections (MongoDB)
- **conversations** — Chat history ko store karta hai
- **portfolio** — Neha ka profile information
- **projects** — Projects list (future enhancement)
- **skills** — Skills data (future enhancement)

### File: `supabase/functions/ask-neha/index.ts`

Yeh ek **Deno-based serverless function** hai jo:

1. **CORS handle karta hai** — frontend se cross-origin request allow karta hai.
2. **Request body padhta hai**: `{ messages: [...], prompt: "..." }`.
3. **System prompt + Neha ka profile** (`NEHA_PROFILE`) ko combine karta hai. System prompt me likha hai ki AI ko **first person me Neha ki tarah** baat karni hai (warm, soft, Hinglish ok).
4. **Groq API call karta hai** (`llama-3.3-70b-versatile` model) — securely server-side, kyunki `GROQ_API_KEY` Lovable Cloud secrets me store hai (browser me kabhi expose nahi hota).
5. **Reply return karta hai**: `{ reply: "..." }`.

### Security
- ✅ `GROQ_API_KEY` server-side secret hai (Lovable Cloud Secrets).
- ✅ Browser bundle me API key kabhi nahi jaati.
- ✅ Last 8 messages hi context me bhejte hain (token cost control).

### Config: `supabase/config.toml`
```toml
[functions.ask-neha]
verify_jwt = false   # public endpoint, no auth required
```

### Auto-Deploy
Edge function **Lovable Cloud pe automatically deploy** ho jaata hai jab bhi code change hota hai. Manual deploy ki zarurat nahi.

---

## 🔄 Frontend ↔ Backend Flow

```
┌─────────────────┐
│  User types     │
│  question in    │
│  WarpSequence   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  fetch() to Edge Function       │
│  (Supabase ask-neha)            │
│  { messages, prompt }           │
└────────┬────────────────────────┘
         │ (HTTPS)
         ▼
┌─────────────────────────────────┐
│  Edge Function: ask-neha        │
│  (runs on Supabase)             │
│  - Adds system prompt           │
│  - Calls Groq with secret key   │
│  - Secured: API key nahi expose |
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Groq API       │
│  llama-3.3-70b  │
└────────┬────────┘
         │
         ▼
   Reply → frontend → chat bubble me dikh jaata hai
```

---

## 💻 Local Development Setup

```bash
# 1. Clone repo
git clone <your-repo-url>
cd <project-folder>

# 2. Install dependencies (bun ya npm)
bun install
# OR
npm install

# 3. Dev server start karo
npm run dev

# 4. Browser me kholo
http://localhost:5173
```

> **Note:** MongoDB URI aur Groq API key `.env` file me manually add karna zaroori hai.

---

## 🚀 Render Pe Deploy Karne Ke Steps

> ⚠️ **IMPORTANT:** Ye app **SSR** (Server-Side Rendered) hai, isliye Render pe **Web Service** banaना padega, Static Site nahi!

### Step 1: GitHub Pe Code Push Karo
```bash
git push -u origin main
```

### Step 2: Render Account Banao
[https://render.com](https://render.com) pe sign up karo (GitHub se login karna easiest hai).

### Step 3: New Web Service Banao (⚠️ Static Site NAHI!)

1. Render dashboard → **New +** → **Web Service** ⭐ (NOT Static Site)
2. Apni GitHub repo select karo
3. Settings fill karo:

   | Field | Value |
   |---|---|
   | **Name** | `neha-portfolio` |
   | **Environment** | `Node` |
   | **Region** | (default) |
   | **Branch** | `main` |
   | **Build Command** | `npm install && npm run build` |
   | **Start Command** | `npm start` |

### Step 4: Environment Variables Add Karo

Render → **Environment** tab → Add:

```
VITE_MONGODB_URI=mongodb+srv://jay-food-app:997763@cluster0.lvfyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_URI=mongodb+srv://jay-food-app:997763@cluster0.lvfyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB_NAME=neha_didi_portfolio
VITE_BACKEND_URL=https://ddehjkocxllhagbpqajr.functions.supabase.co/ask-neha
GROQ_API_KEY=gsk_SkpNAcjMdI3HKJePJ4DrWGdyb3FYkYG7xJ8T0L3lOAKvZJwMFnhR2D
```

### Step 5: Create Web Service!
Click **"Create Web Service"** button
- Build chalega (~1-2 min)
- Server start hoga
- Live URL mil jayega! 🎉

### Step 6: Test
1. Render URL open karo
2. Full portfolio page + AI chatbot dekho
3. Browser DevTools (F12) → Console → no errors?

### Step 7 (Optional): Custom Domain
Render → **Custom Domain** → apna domain connect karo

---

## � Troubleshooting: White Screen on Render

Agar Render pe sirf white screen aaye to:

### 1️⃣ **Environment Variables Check Karo**
```bash
Render Dashboard → Your App → Environment Tab
```
Ye sab variables add hain check karo:
- ✅ `VITE_MONGODB_URI` 
- ✅ `VITE_BACKEND_URL`
- ✅ `GROQ_API_KEY`
- ✅ `MONGODB_DB_NAME`

**Missing ko add kar!**

### 2️⃣ **Browser Console Check Karo**
```
F12 → Console tab → Red errors dikha?
```
Agar error dikh rahe hain, screenshot lo aur debug.

### 3️⃣ **Network Tab Check Karo**
```
F12 → Network tab → Reload page
```
- HTML, CSS, JS files load ho rahe hain?
- API calls fail to nahi?

### 4️⃣ **Force Redeploy**
```
Render Dashboard → Manual Deploy → Deploy Latest Commit
```
Env variables set karne ke baad ye zaroor karo!

### 5️⃣ **Clear Browser Cache**
```
Ctrl + Shift + Delete → Clear Cache → Reload
```

### 6️⃣ **Check Build Logs**
```
Render Dashboard → Your App → Logs tab
Build output dekho — errors dikha?
```

---

## �🔑 Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `VITE_MONGODB_URI` | Frontend (.env) | MongoDB Atlas connection string |
| `MONGODB_URI` | Backend (.env) | MongoDB Atlas connection string |
| `MONGODB_DB_NAME` | Backend (.env) | Database name (`neha_didi_portfolio`) |
| `GROQ_API_KEY` | **Backend** (Lovable Cloud Secrets) | 🔒 Secret — Groq LLM API key |

> ⚠️ `GROQ_API_KEY` kabhi bhi frontend code me mat daalna. Sirf backend/Lovable Cloud Secrets me rakho.

---

## ✅ Abhi Tak Kya Ho Chuka Hai

- [x] React + TanStack Start frontend setup
- [x] Space/warp themed landing page (Hero, About, Skills, Projects, Contact)
- [x] Animated star field background
- [x] Projects data with real Power BI / Tableau / SQL projects
- [x] Neha ka detailed profile (education, experience, skills, certifications)
- [x] AI Chatbot terminal UI ("Ask Neha")
- [x] **MongoDB Atlas** (neha_didi_portfolio database connected)
- [x] **MongoDB client** setup for future enhancements
- [x] **Edge Function `ask-neha`** banayi gayi (frontend ↔ backend separation)
- [x] **Groq API key securely** server-side me move ki gayi
- [x] First-person warm tone system prompt
- [x] Hinglish + English support

## 📌 Aage Kya Kar Sakte Hain

- [ ] Streaming replies (ChatGPT jaisa typing effect)
- [ ] Rate limiting (1 user, 10 questions/min)
- [ ] Chatbot questions ko DB me log karna (analytics)
- [ ] Resume PDF download button
- [ ] Project detail pages (alag routes)
- [ ] Light/Dark theme toggle

---

## 📞 Contact

**Neha Gurjar** — Aspiring Data Analyst
📧 nehagurjar992@gmail.com
📱 +91 72250 52478
🔗 [LinkedIn](https://in.linkedin.com/in/neha-gurjar-134a33222)

---

