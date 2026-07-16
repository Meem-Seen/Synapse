<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=40&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=SYNAPSE;Real-Time+Collaboration;Code+%7C+Draw+%7C+AI" alt="Synapse" />

### 🚀 Real-Time Collaborative Workspace with Live Code Editing, Shared Whiteboard & AI Assistance

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

[🌐 Live Demo](https://synapse-seven-puce.vercel.app/) &nbsp;&nbsp;•&nbsp;&nbsp; [📖 Documentation](https://docs.google.com/document/d/1ltT3Ogx0Z4F6qBDX1ouSMQ3eDoWhRkEUOJzd7p8x4Sg/edit?tab=t.0) &nbsp;&nbsp;•&nbsp;&nbsp; &nbsp;&nbsp;
</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Shared Whiteboard** | Real-time collaborative canvas powered by **Excalidraw** — draw shapes, sketch diagrams, and annotate together with instant sync across all members |
| 💻 **Live Code Editor** | Multi-language editor powered by **Ace Editor** with syntax highlighting, multiple themes, and in-browser **JavaScript execution** |
| 🤖 **Synapty AI Assistant** | Built-in AI chatbot powered by **Groq + Llama 3.3** — ask questions, get code reviews, and debug together as a team |
| 🔐 **Authentication System** | Secure email/password signup and login powered by **Supabase Auth** |
| 🏠 **Workspace Rooms** | Create and join collaborative rooms, each with its own persistent whiteboard, code session, and chat history |
| ⚡ **Real-Time Sync** | Sub-150ms WebSocket broadcasting via **Supabase Realtime Channels** — every keystroke and stroke syncs instantly |

---

## 🧰 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-563D7C?style=flat-square&logo=bootstrap&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

### Collaboration Libraries
![Excalidraw](https://img.shields.io/badge/Excalidraw-6965DB?style=flat-square&logo=excalidraw&logoColor=white)
![AceEditor](https://img.shields.io/badge/Ace_Editor-FF0000?style=flat-square&logo=data:image/png;base64,&logoColor=white)

### Backend & Cloud
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)

### AI
![Groq](https://img.shields.io/badge/Groq_API-F55036?style=flat-square&logoColor=white)
![Llama](https://img.shields.io/badge/Llama_3.3_70B-0467DF?style=flat-square&logoColor=white)

---

## 🗂️ Project Structure

```
synapse/
├── public/                     # Static assets
├── src/
│   ├── api/                    # Supabase API layer
│   │   ├── supabaseClient.js   # Supabase client config
│   │   ├── rooms.js            # Room CRUD operations
│   │   ├── code.js             # Code session read/write
│   │   ├── whiteboard.js       # Whiteboard scene sync
│   │   ├── messages.js         # Chat messages
│   │   ├── realtime.js         # WebSocket broadcast channels
│   │   └── schema.sql          # PostgreSQL database schema
│   │
│   ├── Component/              # Reusable React components
│   │   ├── AuthContext.jsx     # Global auth state provider
│   │   ├── AuthModal.jsx       # Login/signup dialog
│   │   ├── Navbar.jsx          # Home page navigation bar
│   │   ├── WorkspaceNavbar.jsx # Workspace navigation bar
│   │   ├── CodeEditor.jsx      # Ace Editor + code runner
│   │   ├── Whiteboard.jsx      # Excalidraw collaborative canvas
│   │   ├── AIChat.jsx          # Synapty AI chat interface
│   │   ├── RoomCard.jsx        # Room listing card
│   │   ├── RoomModal.jsx       # Create room dialog
│   │   └── ShapeGrid/          # Animated landing page background
│   │
│   ├── pages/
│   │   ├── HomePage.jsx        # Landing page + room list
│   │   └── Workspace.jsx       # Main collaboration workspace
│   │
│   ├── App.jsx                 # React Router routing
│   ├── App.css                 # Global styles
│   └── main.jsx                # App entry point
│
├── .env                        # Environment variables (not committed)
├── package.json
└── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** v18.0.0 or higher → [Download](https://nodejs.org/)
- A **Supabase** account and project → [supabase.com](https://supabase.com)
- A **Groq** API key → [console.groq.com](https://console.groq.com)

### 1. Clone the Repository

```bash
git clone https://github.com/Meem-Seen/Synapse.git
cd Synapse
```

### 2. Install Dependencies

```bash
npm install
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser 🎉

---

## 🗄️ Database Schema

Synapse uses **PostgreSQL via Supabase** with **Row-Level Security (RLS)** enabled on all tables:

```
profiles          → Stores user data (synced from Supabase Auth)
rooms             → Workspace rooms (name, creator)
room_members      → Maps users to rooms (many-to-many)
chat_messages     → AI chat history per room
code_sessions     → Live code content per room (1-to-1)
whiteboard_scenes → Excalidraw JSON scene per room (1-to-1)
```

---

## 🤖 AI Chat (Synapty)

Synapty is powered by [Groq](https://groq.com) using the **Llama 3.3 70B Versatile** model.

- Ask any coding question directly in the workspace
- AI responses are **saved to the database** and **broadcasted** — the whole team sees them
- The chat history persists across sessions per room

---

## 👥 Team

| Name | Role | Contribution |
|---|---|---|
| **Mohamed Samir Kamal** | 🏆 Team Leader & Code Editor Dev | Built the live code editor, implemented syntax highlighting and code execution engine using Ace Editor. Designed the Workspace Navbar and managed the GitHub repository and task assignments. |
| **Omar Walid Fawzy** | 🏠 Frontend Dev | Developed the interactive home page, integrated the Shape Grid animated background, implemented room creation, and connected the homepage with Supabase. |
| **Malak Mahmoud Mohamed** | 🎨 Whiteboard & Auth Dev | Built the collaborative whiteboard using Excalidraw, implemented the full authentication flow (signup/login), and integrated Supabase Auth. |
| **Mohamed Adel Abdelmoly** | 🤖 AI Integration Dev | Designed and built the Synapty AI Chat interface and integrated the Groq API for LLM-powered assistance. |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by the **Synapse Team** — DEPI Graduation Project 2026

⭐ If you find this project useful, please give it a star!

</div>

