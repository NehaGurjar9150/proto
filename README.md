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
│  supabase.functions.invoke(     │
│    "ask-neha",                  │
│    { body: { messages, prompt }}│
│  )                              │
└────────┬────────────────────────┘
         │ (HTTPS)
         ▼
┌─────────────────────────────────┐
│  Edge Function: ask-neha        │
│  (runs on Lovable Cloud)        │
│  - Adds system prompt           │
│  - Calls Groq with secret key   │
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

> ⚠️ **Important:** Sirf **frontend** Render pe deploy hoga. Backend (Edge Function) toh already Lovable Cloud pe live hai — usko alag deploy karne ki zarurat nahi.

### Step 1: GitHub Pe Code Push Karo
Lovable editor me top-right **GitHub** button → Connect → repo create ho jayegi.

### Step 2: Render Account Banao
[https://render.com](https://render.com) pe sign up karo (GitHub se login karna easiest hai).

### Step 3: New Static Site Create Karo

1. Render dashboard → **New +** → **Static Site**
2. Apni GitHub repo select karo
3. Settings fill karo:

   | Field | Value |
   |---|---|
   | **Name** | `neha-portfolio` (kuch bhi) |
   | **Branch** | `main` |
   | **Build Command** | `npm install && npm run build` |
   | **Publish Directory** | `dist` |

### Step 4: Environment Variables Add Karo

Render dashboard → **Environment** tab → ye variables add karo:

```
VITE_MONGODB_URI=mongodb+srv://jay-food-app:997763@cluster0.lvfyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_URI=mongodb+srv://jay-food-app:997763@cluster0.lvfyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB_NAME=neha_didi_portfolio
GROQ_API_KEY=<apni Groq API key>
```

> Values `.env` file se copy kar lo (root me hai).

### Step 5: SPA Routing Fix (Important!)

Single Page App hai, isliye refresh pe 404 na aaye — **Redirects/Rewrites** add karo:

Render dashboard → **Redirects/Rewrites** → Add:
- **Source:** `/*`
- **Destination:** `/index.html`
- **Action:** `Rewrite`

### Step 6: Deploy!

**Create Static Site** click karo. Render automatically:
1. GitHub se code pull karega
2. `npm install && npm run build` chalayega
3. `dist/` folder serve karega
4. Free `.onrender.com` URL dega (e.g. `https://neha-portfolio.onrender.com`)

### Step 7: Verify Karo

1. URL kholo
2. AI chatbot (Ask Neha) test karo — agar reply aa raha hai → backend bhi sahi connected hai ✅
3. DevTools → Network tab → check karo ki Groq API key kahin expose toh nahi ho rahi (nahi honi chahiye)

### Step 8 (Optional): Custom Domain
Render dashboard → **Settings** → **Custom Domain** → apna domain add karo (e.g. `nehagurjar.com`).

---

## 🔑 Environment Variables

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

