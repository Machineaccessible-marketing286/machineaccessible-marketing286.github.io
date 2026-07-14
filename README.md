# 🚀 Enterprise-Grade Dynamic Portfolio Engine

Welcome to your next-generation professional portfolio. This application is an ultra-modern, high-performance, single-page portfolio engine built with **Vanilla HTML5/Javascript** and **Tailwind CSS**. It is fully responsive, print-optimized, and features **two integrated layers of persistence**: dynamic relative local JSON loading and a fully pre-configured **Decap CMS (formerly Netlify CMS)** admin dashboard.

---

## 🎨 Visual System & Aesthetic Modes

This engine implements a **dual-axis design system** that separates **Wireframe Layouts** from **Aesthetic Styles**. You can mix and match them directly via your portfolio metadata or CMS without changing a single line of code:

### 1. The Wireframe Layouts
- **Executive**: Focused on high-density leadership impact, summarizing high-level metrics, credentials, and top-tier case studies.
- **Creative**: Structured around storytelling, utilizing display-centric serif headers, staggered grids, and a warm editorial rhythm.
- **Builder**: A tech-forward, high-octane engineering console styled with a monospace developer layout, code socket pills, and robust container frames.

### 2. The Aesthetic Styles
- **NexStudio**: Futuristic deep dark mode with neon violet ambient glows, glassmorphism panel borders, and smooth micro-interactions.
- **Minimal**: Ultra-clean, spacious white canvas emphasizing Inter typography, high contrast, and deep negative space.
- **Editorial**: Warm, literary-focused cream aesthetic utilizing serif font pairings and high-density, print-like layout structures.
- **Rugged**: An energetic neo-brutalist theme featuring bold, thick borders, neon orange highlights, heavy shadows, and monospace titles.
- **Natural**: Earthy, organic forest-green palette designed with smooth rounded corners, soft warm backgrounds, and natural font weights.

---

## 📁 Project Directory Structure

```bash
├── public/
│   ├── admin/
│   │   └── config.yml       # Decap/Netlify CMS Schema definitions
│   ├── case_studies.json    # STAR format case studies database (JSON)
│   ├── identity.json        # Main profile, biography, and theme meta config (JSON)
│   └── media_links.json     # External articles, press links, and publications (JSON)
├── src/
│   ├── App.tsx              # Unused (retained for bundler compatibility)
│   ├── main.tsx             # Unused (retained for bundler compatibility)
│   └── index.css            # Global stylesheet compiling Tailwind CSS
├── index.html               # Main Page & dynamic Vanilla JS rendering engine
├── package.json             # Dev dependencies & scripts configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 💻 Local Quickstart

Get the project running on your local machine in under two minutes:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### 2. Clone and Install
```bash
# Clone the repository
git clone <your-github-repo-url>
cd portfolio-engine

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to preview your portfolio live!

### 4. Build for Production
To bundle and optimize the styles for deployment:
```bash
npm run build
```
This outputs a super-optimized production build in the `dist/` directory (if deploying static assets) or serves it on any hosting platform.

---

## ✍️ How to Update Your Content

You have two powerful options to modify text, metrics, case studies, or change the layouts and styles:

### Option A: The CMS Admin Dashboard (No Code)
The project includes a pre-configured **Decap CMS** admin interface inside the `public/admin` folder.
1. Connect and deploy your GitHub repository to a hosting provider that supports Netlify Identity or Git Gateway (such as **Netlify** or **Vercel**).
2. Enable the **Identity** service on your Netlify Dashboard and invite your email.
3. Visit `https://your-domain.com/admin/` in your browser.
4. Log in to access a beautiful, friendly, non-technical editor panel where you can:
   - Edit your Name, Bio, and Location.
   - Switch Layouts and Styles dynamically using dropdown menus.
   - Add/edit **STAR Case Studies** (Situation, Task, Action, Result).
   - Link social handles, media publications, or upload custom avatars.
5. Saving your changes in the CMS automatically commits the updated JSON files directly back to your GitHub repository!

### Option B: Direct JSON Editing (For Developers)
If you prefer editing code directly, all contents are stored as clean JSON feeds under the `/public` directory. Open them in your favorite editor:

#### 1. Profile, Theme, and Metrics Configuration (`/public/identity.json`)
```json
{
  "meta.layout": "executive",       // "executive" | "creative" | "builder"
  "meta.style": "nexstudio",       // "nexstudio" | "minimal" | "editorial" | "rugged" | "natural"
  "name": "Alexander Vance",
  "title": "Principal Systems Architect",
  "bio": "Designing resilient cloud-native infrastructures...",
  "avatar": "https://images.unsplash.com/...",
  "email": "alexander.vance@example.com",
  "linkedin": "https://linkedin.com/in/alexandervance",
  "github": "https://github.com/alexandervance",
  "resume": "https://example.com/resume.pdf",
  "location": "San Francisco, CA",
  "metric_1_label": "Systems Designed",
  "metric_1_val": "150+",
  "metric_2_label": "Uptime Maintained",
  "metric_2_val": "99.999%",
  "metric_3_label": "Infrastructure Savings",
  "metric_3_val": "$4.2M",
  "story_title": "The Architecture of Scale",
  "story_text": "...",
  "anecdote_title": "A Midnight Crisis Solved",
  "anecdote_text": "..."
}
```

#### 2. Case Studies Configuration (`/public/case_studies.json`)
Manage your key projects. It is recommended to frame case studies using the high-impact **STAR Method**:
```json
{
  "items": [
    {
      "id": "1",
      "title": "Automating Multi-Region Failover",
      "subtitle": "High-Availability Architecture",
      "category": "Engineering",
      "date": "2025",
      "situation": "Our legacy multi-region active-passive setup required manual intervention...",
      "task": "Design and implement a zero-data-loss active-active failover orchestration...",
      "action": "Engineered a custom raft-consensus traffic-routing layer...",
      "result": "Achieved automatic failover in 4.2 seconds under live load...",
      "metrics": "Failover in 4.2s | Recovery window -99.8%",
      "image": "https://images.unsplash.com/...",
      "featured": true
    }
  ]
}
```

#### 3. Media Publications and Press (`/public/media_links.json`)
Add technical articles, whitepapers, conference talks, or videos:
```json
{
  "items": [
    {
      "id": "1",
      "title": "Designing Invisible Infrastructure at Scale",
      "type": "Article",
      "url": "https://medium.com/example",
      "date": "2025-08",
      "platform": "Medium",
      "description": "My definitive guide to building distributed systems that handle millions of requests..."
    }
  ]
}
```

---

## 📈 Recruiter & Professional Optimizations

To maximize response rates from hiring managers, the portfolio includes:
- **Print-Friendly CSS**: If a recruiter prints the page or saves it to a PDF to share with their team, all non-essential elements (such as the floating share menu) are automatically hidden, and margins are adjusted for perfect A4 output.
- **Micro-Telemetry Integration**: Supports an optional `tracking_url` field in your `identity.json`. If provided, actions like downloading your resume, expanding case studies, or clicking LinkedIn will send a lightweight beacon to your analytics endpoint so you can measure recruiter engagement in real time!
