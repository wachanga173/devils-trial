# 😈 DEVIL'S TRIAL - Adaptive Shuffling Traps (AI Edition)

An adaptive troll platformer where traps dynamically shuffle on every respawn using real-time online AI telemetry, multi-screen level architectures, and tactical movement mechanics.

---

## 🎮 Key Features

- **🧠 Machine Learning AI Director**:
  - Monitors player playstyles (rusher, cautious, patterned) and adapts trap positions in real time.
  - Features semantic anti-checkmate guarantees: never generates impossible obstacle combinations.
- **🏃 Dynamic Shuffling Traps**:
  - **Physics-driven Rolling Boulders**: Realistic gravity descent, momentum transfer, and explosive stone rubble shattering on solid wall impacts.
  - **Spinning Sawblades (Razors)**: Fair, rhythmic rotations with radial low-profile hitboxes.
  - **Natural Piston Crushers & Dropping Spikes**: Sequential platforming beats and delayed hazard triggers.
  - **Shifting Adaptive Door**: Moves to secret destinations based on player aggression, physically slamming shut upon entry.
- **🐕 All-Fours Crawling Mechanics**:
  - Hold **S** or **▼** to drop onto all fours.
  - Move forward while crawling (**S + D** or **▼ + ▶**) to duck under low-mounted razors and squeeze through tight corridors.
- **📱 Landscape Layout Guard & PWA**:
  - Enforces wide landscape layout on phones with an animated rotate guide and fullscreen lock.
  - Progressive Web App (PWA) installable as a standalone app with Network-First online caching.
- **💾 Shared Persistent Storage & Data Management**:
  - Unified `localStorage` key (`devils_trial_save_v1`) shared 1:1 between browser tabs and installed PWA app mode.
  - Automatic saving of level progress, death statistics, themes, and AI telemetry weights.
  - Device storage location discloser with 1-click **Windows File Explorer** opening and permanent data destruction safeguard.

---

## 🕹️ Controls

| Action | Keyboard | Mobile / Touch |
| :--- | :--- | :--- |
| **Move Left / Right** | <kbd>A</kbd> / <kbd>D</kbd> or <kbd>◀</kbd> / <kbd>▶</kbd> | On-screen <kbd>◀</kbd> / <kbd>▶</kbd> |
| **Crawl on All Fours** | Hold <kbd>S</kbd> or <kbd>▼</kbd> | Hold <kbd>▼</kbd> |
| **Crawl Forward** | Hold <kbd>S</kbd> + <kbd>D</kbd> or <kbd>▼</kbd> + <kbd>▶</kbd> | Hold <kbd>▼</kbd> + <kbd>▶</kbd> |
| **Jump** | <kbd>SPACE</kbd> or <kbd>W</kbd> / <kbd>▲</kbd> | <kbd>JUMP</kbd> button |
| **Quick Restart** | <kbd>R</kbd> | Pause Menu |
| **Pause / Settings** | <kbd>ESC</kbd> | Top-left <kbd>esc</kbd> button |

---

## 🚀 Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/wachanga173/devils-trial.git
   cd devils-trial
   ```

2. Start the local server:
   ```bash
   node server.js
   ```

3. Open your browser:
   ```
   http://localhost:3333/
   ```

---

## 📂 Project Structure

- `index.html` — Main viewport, HUD overlay, landscape rotation guard, and modal dialogs.
- `game.js` — Game loop, camera tracking, PWA lifecycle, and persistent storage management.
- `physics.js` — Player kinematics, hitbox management, ground collision, and crawling state machine.
- `character.js` — Procedural character rendering with articulated limb animations.
- `traps.js` — Hazard classes: boulders, razors, crushers, spikes, bouncers, and portals.
- `levelGenerator.js` — Procedural terrain carver, cave builder, and tower gauntlets.
- `levels.js` — Level registry, themes, and difficulty progression curves.
- `ai.js` — Adaptive machine learning director and telemetry reinforcement engine.
- `server.js` — Zero-dependency HTTP server with native OS File Explorer launcher.
- `manifest.json` & `sw.js` — Progressive Web App manifest and Service Worker (Network-First caching).
- `terms.html` — Complete Terms of Service, EULA, troll platformer disclosures, and streaming permissions.
- `privacy.html` — Zero-telemetry Privacy Policy, LocalStorage JSON schema, and GDPR/CCPA user rights.
- `faq.html` — Interactive searchable Knowledge Base & FAQ covering gameplay, mechanics, AI, and saves.
- `legal.html` — Master Legal & Architectural Portal unifying compliance, licenses, and documentation.
- `legal.css` — Dedicated responsive styling and print layouts for the legal documentation suite.
- `style.css` — Retro arcade aesthetics, glowing UI elements, and responsive layout.

---

## 📜 Legal, Privacy & Compliance

- **Zero Telemetry Guarantee:** Devil's Trial collects **0% personal data**. All progression and AI weights reside strictly inside your browser's local sandbox (`localStorage`).
- **Free Streaming & Monetization:** You have full, royalty-free authorization to livestream and monetize Devil's Trial on YouTube, Twitch, TikTok, etc. Real-time procedural audio synthesis via Web Audio API guarantees **0 DMCA copyright strikes**.
- **Anti-Checkmate Guarantee:** All dynamic trap placements adhere to semantic mutual exclusion rules; softlocks are mathematically impossible.
- **Documentation:**
  - [Terms & Conditions](file:///c:/Users/Admin/Documents/GitHub/Level%20Devil/terms.html)
  - [Privacy Policy](file:///c:/Users/Admin/Documents/GitHub/Level%20Devil/privacy.html)
  - [Frequently Asked Questions (FAQ)](file:///c:/Users/Admin/Documents/GitHub/Level%20Devil/faq.html)
  - [Legal & Compliance Portal](file:///c:/Users/Admin/Documents/GitHub/Level%20Devil/legal.html)

---

## 📄 License

MIT License. Designed and built with ❤️.
