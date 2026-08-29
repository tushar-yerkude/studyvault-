# StudyVault 📚

A clean, responsive **student study dashboard** built with vanilla HTML, CSS and JavaScript. StudyVault helps students manage daily tasks, organize subjects, and run focused Pomodoro sessions — with **no backend or account required**.

## ✨ Features

- 📊 Daily progress dashboard
- ✅ Add, complete and delete study tasks
- 🏷️ Task priorities and subjects
- 📚 Subject cards with progress indicators
- ⏱️ 25-minute Pomodoro focus timer + break mode
- 💾 Automatic persistence with `localStorage`
- 🌙 Lightweight dark-mode toggle
- 📱 Responsive layout for mobile and desktop
- 🔒 Local-first: your data stays in your browser

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Browser `localStorage`

No framework, build step, or server is required.

## 🚀 Run locally

```bash
git clone https://github.com/YOUR_USERNAME/studyvault.git
cd studyvault
```

Then open `index.html` in your browser.

For the best local development experience, use VS Code + Live Server, or any static HTTP server:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## 📁 Project structure

```text
studyvault/
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── feature_request.md
├── assets/
├── app.js
├── index.html
├── styles.css
├── .gitignore
├── LICENSE
└── README.md
```

## 🧠 Design goals

StudyVault intentionally keeps the architecture simple. It is designed as a portfolio-friendly project that demonstrates DOM manipulation, state management, responsive UI, browser storage, dialogs, and timer logic without hiding the implementation behind a framework.

## 🗺️ Roadmap

- [ ] Edit existing tasks
- [ ] Weekly analytics chart
- [ ] Drag-and-drop task ordering
- [ ] Export/import study data as JSON
- [ ] Keyboard shortcuts
- [ ] Optional PWA/offline install support

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss the idea.

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a pull request

## 📄 License

MIT License — see [LICENSE](LICENSE).

---

Built for students who want to **study smarter, not louder**.
