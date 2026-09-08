// game.js - Infinite Progressive Devil's Trial with AI Director & Adaptive Shifting Door
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.physics = new Physics();
        this.renderer = new CharacterRenderer();
        this.trapManager = new TrapManager();
        this.ai = new DevilAI(); // ML Behavioral Telemetry Model
        this.levelGen = new AILevelGenerator(); // Procedural AI Level Architect

        this.currentLevelIndex = 0;
        this.currentLevel = LEVELS[0];
        this.currentThemeKey = 'inferno';
        this.theme = THEMES[this.currentThemeKey];

        this.deathCount = 0;
        this.gameState = 'playing';
        this.respawnTimer = 0;
        this.winTimer = 0;

        // Screen Shake
        this.shakeTimer = 0;
        this.shakeIntensity = 0;

        // Input
        this.input = {
            left: false,
            right: false,
            down: false,
            jump: false,
            jumpPressed: false
        };

        this.particles = [];

        // Player (Compact 24px nimble silhouette)
        this.player = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            width: 12,
            height: 24,
            facing: 1,
            onGround: false,
            alive: true,
            isJumping: false,
            isCrawling: false,
            coyoteTimer: 0,
            jumpBufferTimer: 0,
            stepTimer: 0,
            die: (reason, trapType) => this.playerDie(reason, trapType)
        };

        this.currentSolids = [];
        this.door = null;

        // Dynamic 2D Camera for multi-screen vertical & expansive exploration
        this.camera = { x: 0, y: 0, targetX: 0, targetY: 0 };

        this.initInput();
        this.bindUI();
        this.initPWA();

        // Automatic Persistent Storage Restoration
        const restored = this.loadGame();
        this.loadLevel(this.currentLevelIndex);
        if (restored) {
            const lvlNum = this.currentLevel ? this.currentLevel.id : (this.currentLevelIndex + 1);
            this.showToast(`💾 Progress Restored: Level ${lvlNum} (${this.deathCount} Deaths)`);
        }

        requestAnimationFrame((t) => this.loop(t));
    }

    bindUI() {
        this.deathDisplay = document.getElementById('deathCount');
        this.levelDisplay = document.getElementById('levelNumber');
        this.levelTitleDisplay = document.getElementById('levelTitle');
        this.modeToggleBtn = document.getElementById('modeToggle');
        this.aiBadge = document.getElementById('aiBadge');
        this.pauseOverlay = document.getElementById('pauseOverlay');
        this.themeSelector = document.getElementById('themeSelector');
        this.resumeBtn = document.getElementById('resumeBtn');
        this.restartBtn = document.getElementById('restartBtn');

        if (this.modeToggleBtn) {
            this.modeToggleBtn.addEventListener('click', () => {
                this.trapManager.chaosMode = !this.trapManager.chaosMode;
                this.updateModeButton();
                this.respawnPlayer(false);
                this.saveGame();
            });
        }

        if (this.themeSelector) {
            this.themeSelector.value = this.currentThemeKey;
            this.themeSelector.addEventListener('change', (e) => {
                this.currentThemeKey = e.target.value;
                this.theme = THEMES[this.currentThemeKey];
                this.saveGame();
            });
        }

        if (this.resumeBtn) {
            this.resumeBtn.addEventListener('click', () => this.togglePause());
        }

        if (this.restartBtn) {
            this.restartBtn.addEventListener('click', () => {
                this.togglePause();
                this.respawnPlayer(true);
            });
        }

        const btnLeft = document.getElementById('btnLeft');
        const btnDown = document.getElementById('btnDown');
        const btnRight = document.getElementById('btnRight');
        const btnJump = document.getElementById('btnJump');

        const bindTouch = (el, pressAction, releaseAction) => {
            if (!el) return;
            el.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (window.soundFX) window.soundFX.init();
                pressAction();
            }, { passive: false });
            el.addEventListener('touchend', (e) => { e.preventDefault(); releaseAction(); }, { passive: false });
            el.addEventListener('touchcancel', (e) => { e.preventDefault(); releaseAction(); }, { passive: false });
            el.addEventListener('mousedown', (e) => {
                e.preventDefault();
                if (window.soundFX) window.soundFX.init();
                pressAction();
            });
            el.addEventListener('mouseup', (e) => { e.preventDefault(); releaseAction(); });
            el.addEventListener('mouseleave', (e) => { releaseAction(); });
        };

        bindTouch(btnLeft, () => { this.input.left = true; }, () => { this.input.left = false; });
        bindTouch(btnDown, () => { this.input.down = true; }, () => { this.input.down = false; });
        bindTouch(btnRight, () => { this.input.right = true; }, () => { this.input.right = false; });
        bindTouch(btnJump, () => {
            this.input.jump = true;
            this.input.jumpPressed = true;
        }, () => {
            this.input.jump = false;
        });

        // D-pad continuous sliding touch tracker (smooth thumb gliding)
        const dpad = document.querySelector('.dpad');
        if (dpad && btnLeft && btnRight) {
            const handleDpadMove = (e) => {
                e.preventDefault();
                if (window.soundFX) window.soundFX.init();
                const touches = e.targetTouches;
                if (!touches || touches.length === 0) return;
                const touch = touches[0];
                const rLeft = btnLeft.getBoundingClientRect();
                const rRight = btnRight.getBoundingClientRect();
                const rDown = btnDown ? btnDown.getBoundingClientRect() : null;

                const inLeft = touch.clientX >= rLeft.left - 10 && touch.clientX <= rLeft.right &&
                               touch.clientY >= rLeft.top - 10 && touch.clientY <= rLeft.bottom + 10;
                const inRight = touch.clientX >= rRight.left && touch.clientX <= rRight.right + 10 &&
                                touch.clientY >= rRight.top - 10 && touch.clientY <= rRight.bottom + 10;
                const inDown = rDown && touch.clientX >= rDown.left - 5 && touch.clientX <= rDown.right + 5 &&
                               touch.clientY >= rDown.top - 5 && touch.clientY <= rDown.bottom + 15;

                this.input.left = inLeft;
                this.input.right = inRight;
                this.input.down = inDown;
            };

            dpad.addEventListener('touchmove', handleDpadMove, { passive: false });
        }

        const escBtn = document.getElementById('escBtn');
        if (escBtn) {
            escBtn.addEventListener('click', () => this.togglePause());
        }

        const headerStorageBtn = document.getElementById('headerStorageBtn');
        const openStorageBtn = document.getElementById('openStorageBtn');
        const closeStorageBtn = document.getElementById('closeStorageBtn');
        const backFromStorageBtn = document.getElementById('backFromStorageBtn');
        const destroyDataBtn = document.getElementById('destroyDataBtn');
        const btnForceLandscape = document.getElementById('btnForceLandscape');

        if (headerStorageBtn) {
            headerStorageBtn.addEventListener('click', () => {
                if (this.gameState === 'playing') this.togglePause();
                this.toggleStorageModal(true);
            });
        }
        if (openStorageBtn) {
            openStorageBtn.addEventListener('click', () => {
                this.toggleStorageModal(true);
            });
        }
        if (closeStorageBtn) {
            closeStorageBtn.addEventListener('click', () => {
                this.toggleStorageModal(false);
            });
        }
        if (backFromStorageBtn) {
            backFromStorageBtn.addEventListener('click', () => {
                this.toggleStorageModal(false);
            });
        }
        if (destroyDataBtn) {
            destroyDataBtn.addEventListener('click', () => {
                this.deleteAndDestroySaveData();
            });
        }

        if (btnForceLandscape) {
            btnForceLandscape.addEventListener('click', async () => {
                try {
                    const docEl = document.documentElement;
                    if (!document.fullscreenElement) {
                        if (docEl.requestFullscreen) {
                            await docEl.requestFullscreen();
                        } else if (docEl.webkitRequestFullscreen) {
                            await docEl.webkitRequestFullscreen();
                        } else if (docEl.msRequestFullscreen) {
                            await docEl.msRequestFullscreen();
                        }
                    }
                    if (screen.orientation && screen.orientation.lock) {
                        await screen.orientation.lock('landscape').catch(() => {});
                    } else if (screen.lockOrientation) {
                        screen.lockOrientation('landscape');
                    }
                } catch (err) {
                    console.log('[Landscape Lock]:', err);
                }
            });
        }

        const pwaInstallBtn = document.getElementById('pwaInstallBtn');
        const pausePwaInstallBtn = document.getElementById('pausePwaInstallBtn');
        const closePwaGuideBtn = document.getElementById('closePwaGuideBtn');
        const closePwaGuideActionBtn = document.getElementById('closePwaGuideActionBtn');

        if (pwaInstallBtn) {
            pwaInstallBtn.addEventListener('click', () => this.triggerPwaInstall());
        }
        if (pausePwaInstallBtn) {
            pausePwaInstallBtn.addEventListener('click', () => {
                this.togglePause();
                this.triggerPwaInstall();
            });
        }
        if (closePwaGuideBtn) {
            closePwaGuideBtn.addEventListener('click', () => this.togglePwaGuideModal(false));
        }
        if (closePwaGuideActionBtn) {
            closePwaGuideActionBtn.addEventListener('click', () => this.togglePwaGuideModal(false));
        }

        // Clickable Storage Location & Save Data Viewer Wireups
        const deviceStoragePath = document.getElementById('deviceStoragePath');
        const openFolderActionBtn = document.getElementById('openFolderActionBtn');
        const copyLocationBtn = document.getElementById('copyLocationBtn');
        const viewRawDataBtn = document.getElementById('viewRawDataBtn');
        const closeSaveViewerBtn = document.getElementById('closeSaveViewerBtn');
        const closeSaveViewerActionBtn = document.getElementById('closeSaveViewerActionBtn');
        const copyJsonBtn = document.getElementById('copyJsonBtn');
        const downloadSaveFileBtn = document.getElementById('downloadSaveFileBtn');

        if (deviceStoragePath) {
            deviceStoragePath.addEventListener('click', () => this.openStorageLocation());
            deviceStoragePath.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openStorageLocation();
                }
            });
        }
        if (openFolderActionBtn) {
            openFolderActionBtn.addEventListener('click', () => this.openStorageLocation());
        }
        if (copyLocationBtn) {
            copyLocationBtn.addEventListener('click', () => this.copyStorageLocation());
        }
        if (viewRawDataBtn) {
            viewRawDataBtn.addEventListener('click', () => this.openSaveDataViewer());
        }
        if (closeSaveViewerBtn) {
            closeSaveViewerBtn.addEventListener('click', () => this.toggleSaveViewer(false));
        }
        if (closeSaveViewerActionBtn) {
            closeSaveViewerActionBtn.addEventListener('click', () => this.toggleSaveViewer(false));
        }
        if (copyJsonBtn) {
            copyJsonBtn.addEventListener('click', () => this.copySaveJson());
        }
        if (downloadSaveFileBtn) {
            downloadSaveFileBtn.addEventListener('click', () => this.downloadSaveFile());
        }
    }

    initPWA() {
        this.deferredPwaPrompt = null;

        if (typeof window === 'undefined') return;

        // Check if already running in standalone installed PWA mode
        const isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || (window.navigator && window.navigator.standalone === true);
        if (isStandalone) {
            this.markAppInstalled();
        }

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPwaPrompt = e;
            const pwaBtn = document.getElementById('pwaInstallBtn');
            const pauseBtn = document.getElementById('pausePwaInstallBtn');
            if (pwaBtn) pwaBtn.style.display = 'inline-flex';
            if (pauseBtn) pauseBtn.style.display = 'block';
        });

        window.addEventListener('appinstalled', () => {
            this.deferredPwaPrompt = null;
            this.markAppInstalled();
            this.showToast("🎉 Devil's Trial installed as app! Shared storage active.");
        });
    }

    markAppInstalled() {
        const pwaBtn = document.getElementById('pwaInstallBtn');
        const pauseBtn = document.getElementById('pausePwaInstallBtn');
        if (pwaBtn) {
            pwaBtn.classList.add('installed');
            pwaBtn.innerHTML = `<span class="pwa-icon">✓</span> <span class="pwa-text">APP MODE</span>`;
            pwaBtn.title = "Running in standalone app mode with shared storage";
        }
        if (pauseBtn) {
            pauseBtn.innerText = "✓ INSTALLED (APP MODE)";
            pauseBtn.disabled = true;
            pauseBtn.style.opacity = "0.7";
        }
    }

    triggerPwaInstall() {
        if (this.deferredPwaPrompt) {
            this.deferredPwaPrompt.prompt();
            this.deferredPwaPrompt.userChoice.then((choiceResult) => {
                if (choiceResult && choiceResult.outcome === 'accepted') {
                    this.showToast("🎉 Installing Devil's Trial App...");
                    this.markAppInstalled();
                }
                this.deferredPwaPrompt = null;
            }).catch((err) => {
                console.warn('[PWA] userChoice notice:', err);
            });
        } else {
            // If prompt not natively supported (e.g. iOS Safari, or desktop manual), show guide
            this.openPwaGuideModal();
        }
    }

    openPwaGuideModal() {
        const modal = document.getElementById('pwaGuideModal');
        const container = document.getElementById('pwaGuideSteps');
        if (!modal || !container) return;

        const ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : '';
        const isIOS = /iPhone|iPad|iPod/i.test(ua) || (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const isAndroid = /Android/i.test(ua);

        let stepsHtml = '';
        if (isIOS) {
            stepsHtml = `
                <div class="pwa-step-item">
                    <div class="pwa-step-num">1</div>
                    <div class="pwa-step-text">Tap the <strong>Share</strong> button (square with arrow ⎋) at the bottom or top of Safari.</div>
                </div>
                <div class="pwa-step-item">
                    <div class="pwa-step-num">2</div>
                    <div class="pwa-step-text">Scroll down and tap <strong>Add to Home Screen (+)</strong>.</div>
                </div>
                <div class="pwa-step-item">
                    <div class="pwa-step-num">3</div>
                    <div class="pwa-step-text">Launch from your Home Screen! It opens directly into <strong>fullscreen landscape</strong> and shares all your saved stages & deaths.</div>
                </div>
            `;
        } else if (isAndroid) {
            stepsHtml = `
                <div class="pwa-step-item">
                    <div class="pwa-step-num">1</div>
                    <div class="pwa-step-text">Tap the browser menu (<strong>⋮</strong> three dots) in the top-right corner.</div>
                </div>
                <div class="pwa-step-item">
                    <div class="pwa-step-num">2</div>
                    <div class="pwa-step-text">Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</div>
                </div>
                <div class="pwa-step-item">
                    <div class="pwa-step-num">3</div>
                    <div class="pwa-step-text">Open the app icon on your home screen for full landscape immersion with your saved data.</div>
                </div>
            `;
        } else {
            stepsHtml = `
                <div class="pwa-step-item">
                    <div class="pwa-step-num">1</div>
                    <div class="pwa-step-text">Look at the right side of your browser address bar for the <strong>Install App icon (⊕ or 💻)</strong>.</div>
                </div>
                <div class="pwa-step-item">
                    <div class="pwa-step-num">2</div>
                    <div class="pwa-step-text">Click <strong>"Install"</strong> to add Devil's Trial to your desktop or apps menu.</div>
                </div>
                <div class="pwa-step-item">
                    <div class="pwa-step-num">3</div>
                    <div class="pwa-step-text">Launch anytime as a standalone app! It reads and writes to the <strong>exact same local storage</strong>.</div>
                </div>
            `;
        }

        container.innerHTML = stepsHtml;
        modal.classList.add('active');
    }

    togglePwaGuideModal(open) {
        const modal = document.getElementById('pwaGuideModal');
        if (!modal) return;
        if (open) {
            this.openPwaGuideModal();
        } else {
            modal.classList.remove('active');
        }
    }

    showToast(message, duration = 2800) {
        const toast = document.getElementById('gameToast');
        if (!toast) return;
        toast.innerText = message;
        toast.classList.add('visible');
        if (this._toastTimeout) clearTimeout(this._toastTimeout);
        this._toastTimeout = setTimeout(() => {
            toast.classList.remove('visible');
        }, duration);
    }

    saveGame() {
        try {
            if (typeof localStorage === 'undefined') return false;
            const SAVE_KEY = 'devils_trial_save_v1';
            const payload = {
                version: 1,
                game: "DEVIL'S TRIAL",
                currentLevelIndex: this.currentLevelIndex,
                deathCount: this.deathCount,
                currentThemeKey: this.currentThemeKey,
                chaosMode: this.trapManager.chaosMode,
                lastSaved: new Date().toISOString(),
                ai: (this.ai && this.ai.serializeTelemetry) ? this.ai.serializeTelemetry() : null
            };
            localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
            return true;
        } catch (e) {
            console.warn('[Storage] Failed to auto-save game:', e);
            return false;
        }
    }

    loadGame() {
        try {
            if (typeof localStorage === 'undefined') return false;
            const SAVE_KEY = 'devils_trial_save_v1';
            const LEGACY_KEY = ['level', 'devil', 'save', 'v1'].join('_');
            let raw = localStorage.getItem(SAVE_KEY);
            // Automatic legacy migration if upgrading from earlier save key
            if (!raw) {
                raw = localStorage.getItem(LEGACY_KEY);
                if (raw) {
                    try {
                        localStorage.setItem(SAVE_KEY, raw);
                        localStorage.removeItem(LEGACY_KEY);
                    } catch (migrationErr) {}
                }
            }
            if (!raw) return false;
            const data = JSON.parse(raw);
            if (!data || typeof data !== 'object') return false;

            if (typeof data.currentLevelIndex === 'number' && data.currentLevelIndex >= 0) {
                this.currentLevelIndex = data.currentLevelIndex;
            }
            if (typeof data.deathCount === 'number' && data.deathCount >= 0) {
                this.deathCount = data.deathCount;
                if (this.deathDisplay) this.deathDisplay.innerText = this.deathCount;
            }
            if (data.currentThemeKey && THEMES[data.currentThemeKey]) {
                this.currentThemeKey = data.currentThemeKey;
                this.theme = THEMES[this.currentThemeKey];
                if (this.themeSelector) this.themeSelector.value = this.currentThemeKey;
            }
            if (typeof data.chaosMode === 'boolean') {
                this.trapManager.chaosMode = data.chaosMode;
                this.updateModeButton();
            }
            if (data.ai && this.ai && this.ai.deserializeTelemetry) {
                this.ai.deserializeTelemetry(data.ai);
            }
            return true;
        } catch (e) {
            console.warn('[Storage] Corrupt save data found, skipping:', e);
            return false;
        }
    }

    getDeviceStorageDetails() {
        const ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : '';
        let detectedOS = 'Detected: Generic Web Browser';
        let storagePath = 'Browser profile sandbox directory';

        const isWin = /Windows/i.test(ua);
        const isMac = /Macintosh|Mac OS X/i.test(ua);
        const isAndroid = /Android/i.test(ua);
        const isIOS = /iPhone|iPad|iPod/i.test(ua) || (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const isLinux = /Linux/i.test(ua) && !isAndroid;

        if (isWin) {
            const isBrave = (typeof navigator !== 'undefined' && (navigator.brave && typeof navigator.brave.isBrave === 'function')) || /Brave/i.test(ua);
            if (isBrave) {
                detectedOS = 'Windows (Brave Browser)';
                storagePath = '%LocalAppData%\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Local Storage\\leveldb\\';
            } else if (/OPR|Opera/i.test(ua)) {
                if (/Opera GX/i.test(ua)) {
                    detectedOS = 'Windows (Opera GX)';
                    storagePath = '%AppData%\\Opera Software\\Opera GX Stable\\Local Storage\\leveldb\\';
                } else {
                    detectedOS = 'Windows (Opera)';
                    storagePath = '%AppData%\\Opera Software\\Opera Stable\\Local Storage\\leveldb\\';
                }
            } else if (/Vivaldi/i.test(ua)) {
                detectedOS = 'Windows (Vivaldi)';
                storagePath = '%LocalAppData%\\Vivaldi\\User Data\\Default\\Local Storage\\leveldb\\';
            } else if (/Edg/i.test(ua)) {
                detectedOS = 'Windows (Microsoft Edge)';
                storagePath = '%LocalAppData%\\Microsoft\\Edge\\User Data\\Default\\Local Storage\\leveldb\\';
            } else if (/Firefox/i.test(ua)) {
                detectedOS = 'Windows (Mozilla Firefox)';
                storagePath = '%AppData%\\Mozilla\\Firefox\\Profiles\\<Profile>\\storage\\default\\';
            } else if (/Chrome/i.test(ua)) {
                detectedOS = 'Windows (Google Chrome)';
                storagePath = '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\';
            } else {
                detectedOS = 'Windows (Desktop)';
                storagePath = '%LocalAppData%\\<Browser>\\User Data\\Default\\Local Storage\\leveldb\\';
            }
        } else if (isAndroid) {
            if (/SamsungBrowser/i.test(ua)) {
                detectedOS = 'Android (Samsung Internet)';
                storagePath = '/data/data/com.sec.android.app.sbrowser/app_sbrowser/Default/Local Storage/leveldb/';
            } else if (/Chrome/i.test(ua)) {
                detectedOS = 'Android (Google Chrome)';
                storagePath = '/data/data/com.android.chrome/app_chrome/Default/Local Storage/leveldb/';
            } else {
                detectedOS = 'Android (Mobile)';
                storagePath = '/data/data/<browser.package>/app_chrome/Default/Local Storage/leveldb/';
            }
        } else if (isIOS) {
            detectedOS = 'Apple iOS (iPhone / iPad WebKit)';
            storagePath = 'iOS App Sandbox: /private/var/mobile/Containers/Data/Application/<App-UUID>/Library/WebKit/WebsiteData/Default/LocalStorage/';
        } else if (isMac) {
            if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
                detectedOS = 'macOS (Apple Safari)';
                storagePath = '~/Library/Containers/com.apple.Safari/Data/Library/LocalStorage/';
            } else if (/Chrome/i.test(ua)) {
                detectedOS = 'macOS (Google Chrome)';
                storagePath = '~/Library/Application Support/Google/Chrome/Default/Local Storage/leveldb/';
            } else {
                detectedOS = 'macOS';
                storagePath = '~/Library/Application Support/<Browser>/Default/Local Storage/leveldb/';
            }
        } else if (isLinux) {
            detectedOS = 'Linux';
            storagePath = '~/.config/google-chrome/Default/Local Storage/leveldb/';
        }

        let raw = null;
        try {
            if (typeof localStorage !== 'undefined') {
                const LEGACY_KEY = ['level', 'devil', 'save', 'v1'].join('_');
                raw = localStorage.getItem('devils_trial_save_v1') || localStorage.getItem(LEGACY_KEY);
            }
        } catch (e) {}

        const charCount = raw ? raw.length : 0;
        const sizeBytes = charCount * 2; // UTF-16 in LocalStorage
        const sizeKB = (sizeBytes / 1024).toFixed(2);

        let progressStr = `Level ${this.currentLevel ? this.currentLevel.id : ((this.currentLevelIndex || 0) + 1)} | ${this.deathCount || 0} Deaths | E${(this.ai && this.ai.learningEpochs) || 0}`;
        let lastSavedStr = 'Not saved yet';

        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (parsed.lastSaved) {
                    lastSavedStr = new Date(parsed.lastSaved).toLocaleString();
                }
                if (typeof parsed.currentLevelIndex === 'number' && typeof parsed.deathCount === 'number') {
                    progressStr = `Level ${parsed.currentLevelIndex + 1} | ${parsed.deathCount} Deaths | E${(parsed.ai && parsed.ai.learningEpochs) || 0} Epochs`;
                }
            } catch (e) {}
        }

        return {
            detectedOS,
            storagePath,
            origin: (typeof window !== 'undefined' && window.location && window.location.origin) ? window.location.origin : 'http://localhost:3333',
            sizeText: raw ? `${sizeKB} KB (${charCount} characters)` : '0.00 KB (No Saved Data)',
            progressStr,
            lastSavedStr,
            hasData: !!raw
        };
    }

    refreshStorageModalUI() {
        const details = this.getDeviceStorageDetails();
        const elOS = document.getElementById('deviceDetectedOS');
        const elPathText = document.getElementById('deviceStoragePathText');
        const elOrigin = document.getElementById('storageOrigin');
        const elSize = document.getElementById('storageSize');
        const elProgress = document.getElementById('storageProgress');
        const elLastSaved = document.getElementById('storageLastSaved');
        const banner = document.getElementById('locationActionFeedback');

        if (elOS) elOS.innerText = details.detectedOS;
        if (elPathText) elPathText.innerText = details.storagePath;
        if (elOrigin) {
            elOrigin.innerText = `${details.origin} ↗`;
            elOrigin.href = details.origin;
        }
        if (elSize) elSize.innerText = details.sizeText;
        if (elProgress) elProgress.innerText = details.progressStr;
        if (elLastSaved) elLastSaved.innerText = details.lastSavedStr;
        if (banner) banner.style.display = 'none';

        // Query local server to resolve dynamic on-disk profile path (e.g. Firefox ddjl38xb.default-release)
        if (typeof fetch !== 'undefined') {
            const ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : '';
            fetch(`/api/detect-storage-path?ua=${encodeURIComponent(ua)}`)
                .then(r => r.json())
                .then(data => {
                    if (data && data.success && data.resolvedPath) {
                        this.resolvedStoragePath = data.resolvedPath;
                        if (elPathText) elPathText.innerText = data.resolvedPath;
                        if (elOS && data.detectedOS) elOS.innerText = data.detectedOS;
                    }
                })
                .catch(() => {});
        }
    }

    openStorageLocation() {
        const details = this.getDeviceStorageDetails();
        const targetPath = this.resolvedStoragePath || details.storagePath;

        // 1. Copy path to clipboard immediately
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(targetPath).catch(() => {});
        }

        // 2. Call local server endpoint to open in File Explorer if running locally
        fetch(`/api/open-storage-dir?path=${encodeURIComponent(targetPath)}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.success) {
                    const opened = data.openedPath || targetPath;
                    this.showLocationFeedback(`🚀 Opened in Windows File Explorer: ${opened}`, 'success');
                    this.showToast('📂 Opened folder in Windows File Explorer!');
                } else {
                    this.showLocationFeedback(`📋 Path copied to clipboard! Press Win + R, paste (Ctrl+V) & hit Enter to open.`, 'info');
                    this.showToast('📋 Storage path copied to clipboard!');
                }
            })
            .catch(() => {
                // If API is unavailable (e.g. static host or offline PWA), fallback to clipboard + instructions
                this.showLocationFeedback(`📋 Path copied to clipboard! Press Win + R, paste (Ctrl+V) & hit Enter to open.`, 'info');
                this.showToast('📋 Storage path copied to clipboard!');
            });
    }

    copyStorageLocation() {
        const details = this.getDeviceStorageDetails();
        const targetPath = this.resolvedStoragePath || details.storagePath;
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(targetPath)
                .then(() => {
                    this.showToast('📋 Storage path copied to clipboard!');
                    this.showLocationFeedback('✓ Path copied to clipboard! Paste into Windows File Explorer address bar.', 'info');
                })
                .catch(() => {
                    this.showToast('Failed to copy to clipboard.');
                });
        }
    }

    showLocationFeedback(msg, type = 'success') {
        const banner = document.getElementById('locationActionFeedback');
        if (!banner) return;
        banner.className = `location-feedback-banner ${type}`;
        banner.innerText = msg;
        banner.style.display = 'block';
    }

    openSaveDataViewer() {
        const LEGACY_KEY = ['level', 'devil', 'save', 'v1'].join('_');
        const raw = (typeof localStorage !== 'undefined')
            ? (localStorage.getItem('devils_trial_save_v1') || localStorage.getItem(LEGACY_KEY))
            : null;
        const pre = document.getElementById('rawSaveDataPre');
        const modal = document.getElementById('saveDataViewerModal');
        if (pre) {
            if (raw) {
                try {
                    const parsed = JSON.parse(raw);
                    pre.innerText = JSON.stringify(parsed, null, 2);
                } catch (e) {
                    pre.innerText = raw;
                }
            } else {
                pre.innerText = JSON.stringify({
                    notice: 'No save data yet. Clear a level or die to generate save data!',
                    key: 'devils_trial_save_v1',
                    origin: (typeof window !== 'undefined' && window.location) ? window.location.origin : 'http://localhost:3333'
                }, null, 2);
            }
        }
        if (modal) modal.classList.add('active');
    }

    toggleSaveViewer(open) {
        const modal = document.getElementById('saveDataViewerModal');
        if (!modal) return;
        if (open) modal.classList.add('active');
        else modal.classList.remove('active');
    }

    copySaveJson() {
        const pre = document.getElementById('rawSaveDataPre');
        if (pre && typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(pre.innerText)
                .then(() => this.showToast('📋 Save JSON copied to clipboard!'))
                .catch(() => this.showToast('Failed to copy JSON.'));
        }
    }

    downloadSaveFile() {
        const LEGACY_KEY = ['level', 'devil', 'save', 'v1'].join('_');
        const raw = (typeof localStorage !== 'undefined')
            ? (localStorage.getItem('devils_trial_save_v1') || localStorage.getItem(LEGACY_KEY))
            : null;
        const content = raw || JSON.stringify({ game: "Devil's Trial", date: new Date().toISOString() }, null, 2);
        try {
            const blob = new Blob([content], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `devils_trial_save_${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
            this.showToast('💾 Save file downloaded to your PC!');
        } catch (err) {
            this.showToast('Download initiated.');
        }
    }

    toggleStorageModal(open) {
        const modal = document.getElementById('storageOverlay');
        if (!modal) return;
        if (open) {
            this.refreshStorageModalUI();
            modal.classList.add('active');
        } else {
            modal.classList.remove('active');
        }
    }

    deleteAndDestroySaveData() {
        const confirmed = (typeof window !== 'undefined' && window.confirm) ? window.confirm(
            "⚠️ PERMANENT DATA DESTRUCTION WARNING\n\n" +
            "Are you absolutely sure you want to delete all saved history from local storage?\n\n" +
            "• Progress will be reset to Level 1\n" +
            "• Total death count will reset to 0\n" +
            "• AI learning memory and weights will be permanently wiped\n\n" +
            "This action cannot be undone."
        ) : true;

        if (!confirmed) return;

        try {
            if (typeof localStorage !== 'undefined') {
                const LEGACY_KEY = ['level', 'devil', 'save', 'v1'].join('_');
                localStorage.removeItem('devils_trial_save_v1');
                localStorage.removeItem(LEGACY_KEY);
            }
        } catch (err) {
            console.warn('[Storage] Error deleting key:', err);
        }

        this.currentLevelIndex = 0;
        this.deathCount = 0;
        this.currentThemeKey = 'inferno';
        this.theme = THEMES[this.currentThemeKey];
        this.trapManager.chaosMode = true;
        this.ai = new DevilAI();

        if (this.deathDisplay) this.deathDisplay.innerText = '0';
        if (this.themeSelector) this.themeSelector.value = this.currentThemeKey;
        this.updateModeButton();
        this.loadLevel(0);

        this.refreshStorageModalUI();
        this.showToast('🗑️ All local storage data has been permanently destroyed.');
    }

    updateModeButton() {
        if (!this.modeToggleBtn) return;
        if (this.trapManager.chaosMode) {
            this.modeToggleBtn.innerHTML = `<span>🧠 AI DIRECTOR:</span> <strong style="color: #ffca28;">ADAPTIVE ON</strong>`;
        } else {
            this.modeToggleBtn.innerHTML = `<span>🧠 AI DIRECTOR:</span> <strong style="color: #90caf9;">STATIC FIXED</strong>`;
        }
    }

    updateAIBadge() {
        if (!this.aiBadge) return;
        const profile = this.ai.currentProfile;
        const conf = this.ai.confidence;
        const epochs = this.ai.learningEpochs || 0;
        const skill = (this.ai.playerSkillEstimate || 1.0).toFixed(1);
        let color = '#ffca28';
        if (profile === 'RUSHER') color = '#ff5252';
        else if (profile === 'CAUTIOUS') color = '#69f0ae';
        else if (profile === 'HOPPER') color = '#40c4ff';

        this.aiBadge.innerHTML = `<span>AI PREDICTION:</span> <strong style="color: ${color};">${profile} (${conf}%)</strong> <span style="opacity: 0.8; font-size: 11px; margin-left: 4px;">| LEARN: E${epochs}</span>`;
        this.aiBadge.title = `${this.ai.activeCounterStrategy} (Skill: ${skill}x, Creativity: ${(this.ai.creativityLevel || 1.0).toFixed(1)})`;
    }

    loadLevel(index) {
        this.currentLevelIndex = index;

        if (this.currentLevelIndex < LEVELS.length) {
            this.currentLevel = LEVELS[this.currentLevelIndex];
        } else {
            const newLevelNumber = this.currentLevelIndex + 1;
            this.currentLevel = this.levelGen.generateLevel(newLevelNumber, this.ai);
            LEVELS.push(this.currentLevel);
        }

        if (this.currentLevel.theme && THEMES[this.currentLevel.theme]) {
            this.currentThemeKey = this.currentLevel.theme;
            this.theme = THEMES[this.currentThemeKey];
            if (this.themeSelector) this.themeSelector.value = this.currentThemeKey;
        }

        const genTag = this.currentLevel.isAIGenerated ? " [AI GEN]" : "";
        if (this.levelDisplay) this.levelDisplay.innerText = `LEVEL ${this.currentLevel.id}${genTag}`;
        if (this.levelTitleDisplay) this.levelTitleDisplay.innerText = this.currentLevel.title;

        this.respawnPlayer(false);
        this.saveGame();
    }

    respawnPlayer(incrementDeath = false) {
        if (incrementDeath) {
            this.deathCount++;
            if (this.deathDisplay) this.deathDisplay.innerText = this.deathCount;
            this.saveGame();
        }

        const spawn = this.currentLevel.playerSpawn;
        this.player.x = spawn.x;
        this.player.y = spawn.y;
        this.player.vx = 0;
        this.player.vy = 0;
        this.player.facing = spawn.facing || 1;
        this.player.alive = true;
        this.player.onGround = false;
        this.player.isCrawling = false;
        this.player.width = 12;
        this.player.height = 24;
        this.player.coyoteTimer = 0;
        this.player.jumpBufferTimer = 0;
        this.gameState = 'playing';

        // 1. Setup / Shuffle traps adapted by AI model
        this.trapManager.setupLevel(this.currentLevel, this.ai);

        // 2. Initialize the Adaptive Shifting Door (reacts to player playstyle!)
        this.door = new AdaptiveDoor(this.currentLevel.door, this.currentLevel, this.ai);

        // 3. Recalculate solids: dynamically slice floor around active vanishing floors
        this.currentSolids = getActiveLevelSolids(this.currentLevel, this.trapManager.traps);

        // 4. Snap camera immediately to player spawn location
        const maxCamX = Math.max(0, this.currentLevel.bounds.width - 840);
        const maxCamY = Math.max(0, this.currentLevel.bounds.height - 480);
        this.camera.x = Math.max(0, Math.min(maxCamX, spawn.x - 420));
        this.camera.y = Math.max(0, Math.min(maxCamY, spawn.y - 240));
        this.camera.targetX = this.camera.x;
        this.camera.targetY = this.camera.y;

        this.updateAIBadge();
    }

    playerDie(reason, trapType = null) {
        if (!this.player.alive) return;
        this.player.alive = false;
        this.gameState = 'dying';
        this.respawnTimer = 36;

        this.deathCount++;
        if (this.deathDisplay) this.deathDisplay.innerText = this.deathCount;

        const fatalTrap = trapType || (reason === 'pit' ? 'collapsing_floor' : reason);
        this.ai.recordDeath(reason, this.player.x, this.player.y, this.currentLevel.id, fatalTrap);

        this.shake(12, 6);
        if (window.soundFX) window.soundFX.playDeath();

        this.spawnDeathParticles(this.player.x, this.player.y - 12, this.player.vx, this.player.vy);
        this.updateAIBadge();
        this.saveGame();
    }

    shake(duration, intensity) {
        this.shakeTimer = duration;
        this.shakeIntensity = intensity;
    }

    togglePause() {
        if (this.gameState === 'paused') {
            this.gameState = 'playing';
            if (this.pauseOverlay) this.pauseOverlay.classList.remove('active');
        } else if (this.gameState === 'playing') {
            this.gameState = 'paused';
            if (this.pauseOverlay) this.pauseOverlay.classList.add('active');
        }
    }

    initInput() {
        window.addEventListener('keydown', (e) => {
            if (window.soundFX) window.soundFX.init();

            if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                this.input.left = true;
            } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                this.input.right = true;
            } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                this.input.down = true;
            } else if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
                if (!this.input.jump) {
                    this.input.jumpPressed = true;
                }
                this.input.jump = true;
            } else if (e.code === 'Escape') {
                this.togglePause();
            } else if (e.code === 'KeyR') {
                this.respawnPlayer(true);
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                this.input.left = false;
            } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                this.input.right = false;
            } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                this.input.down = false;
            } else if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
                this.input.jump = false;
            }
        });

        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.saveGame();
            }
        });

        window.addEventListener('beforeunload', () => {
            this.saveGame();
        });
    }

    loop(timestamp) {
        this.update();
        this.draw();

        this.input.jumpPressed = false;
        requestAnimationFrame((t) => this.loop(t));
    }

    update() {
        if (this.gameState === 'paused') return;

        if (this.shakeTimer > 0) this.shakeTimer--;

        // AI Telemetry Learning
        if (this.gameState === 'playing') {
            this.ai.recordFrame(this.player, this.input);
        }

        // Particle updates
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity || 0.35;
            p.vx *= 0.96;
            p.life--;
            if (p.rotation !== undefined && p.rotSpeed) {
                p.rotation += p.rotSpeed;
            }
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        // Dynamic Camera Smooth Lerp Tracking
        if (this.currentLevel && this.currentLevel.bounds) {
            const maxCamX = Math.max(0, this.currentLevel.bounds.width - 840);
            const maxCamY = Math.max(0, this.currentLevel.bounds.height - 480);
            this.camera.targetX = Math.max(0, Math.min(maxCamX, this.player.x - 420));
            this.camera.targetY = Math.max(0, Math.min(maxCamY, this.player.y - 240));

            this.camera.x += (this.camera.targetX - this.camera.x) * 0.12;
            this.camera.y += (this.camera.targetY - this.camera.y) * 0.12;
        }

        if (this.gameState === 'playing') {
            // Physics with dynamic solids
            this.physics.update(
                this.player,
                this.input,
                this.currentSolids,
                this.trapManager.traps,
                this.currentLevel.bounds
            );

            // Traps update
            this.trapManager.update(this.player, this, (trap) => {
                this.shake(5, 2.5);
            });

            // Update Adaptive Door (reacts to player velocity/jump/hesitation!)
            if (this.door) {
                this.door.update(this.player, this.ai, this);
            }

            // Hazards collision
            if (this.physics.checkHazards(this.player, this.trapManager.activeHazards)) {
                const fatalHazard = this.physics.lastCollidingHazard;
                const trapType = (fatalHazard && fatalHazard.trapType) ? fatalHazard.trapType : "hazard";
                this.player.die("hazard", trapType);
            }

            // Door check
            if (this.door && this.physics.checkDoor(this.player, this.door)) {
                this.startDoorEntry();
            }
        } else if (this.gameState === 'door_entering') {
            // Player steps inside door threshold, and door physically slams shut!
            this.door.update(this.player, this.ai, this);
            const doorTargetX = this.door.x + this.door.w / 2;
            this.player.x += (doorTargetX - this.player.x) * 0.25;
            this.player.vx = 0;
            this.player.vy = 0;
        } else if (this.gameState === 'dying') {
            this.respawnTimer--;
            if (this.respawnTimer <= 0) {
                this.respawnPlayer(false);
            }
        } else if (this.gameState === 'level_complete') {
            this.winTimer--;
            if (this.winTimer <= 0) {
                this.loadLevel(this.currentLevelIndex + 1);
            }
        }
    }

    startDoorEntry() {
        this.gameState = 'door_entering';
        this.player.vx = 0;
        this.player.vy = 0;
        if (this.door) {
            this.door.startShutting(() => {
                this.winLevel();
            });
        } else {
            this.winLevel();
        }
    }

    winLevel() {
        this.gameState = 'level_complete';
        this.winTimer = 48;
        if (window.soundFX) window.soundFX.playWin();

        // Feed stage completion to AI model for online adaptation
        this.ai.recordStageClear(this.currentLevel.id, this.ai.telemetry.totalFrames);
        this.updateAIBadge();
        this.saveGame();

        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            const speed = 2.0 + Math.random() * 4.0;
            this.particles.push({
                x: this.door.x + this.door.w / 2,
                y: this.door.y + this.door.h / 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1.5,
                life: 40,
                maxLife: 40,
                color: ['#ffca28', '#ff9800', '#69f0ae', '#ffffff'][Math.floor(Math.random() * 4)],
                size: 3,
                gravity: 0.12
            });
        }
    }

    spawnDust(x, y) {
        for (let i = 0; i < 6; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 16,
                y: y - 2,
                vx: (Math.random() - 0.5) * 2.5,
                vy: -Math.random() * 1.5,
                life: 16,
                maxLife: 16,
                color: 'rgba(255, 255, 255, 0.4)',
                size: 2.5,
                gravity: 0.05
            });
        }
    }

    spawnDebris(x, y, count = 2) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 2.5,
                vy: -Math.random() * 2.5 - 1,
                life: 18,
                maxLife: 18,
                color: '#3d250d',
                size: 2.2,
                gravity: 0.4
            });
        }
    }

    spawnImpact(x, y) {
        this.shake(7, 3.5);
        for (let i = 0; i < 12; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 25,
                y: y - 2,
                vx: (Math.random() - 0.5) * 4.5,
                vy: -Math.random() * 3.5,
                life: 18,
                maxLife: 18,
                color: '#472805',
                size: 2.6,
                gravity: 0.4
            });
        }
    }

    spawnDeathParticles(x, y, vx, vy) {
        const color = this.theme.playerColor;

        // Head
        this.particles.push({
            type: 'head',
            x: x,
            y: y - 8,
            vx: vx * 0.3 + (Math.random() - 0.5) * 3.5,
            vy: -4.0 - Math.random() * 2,
            life: 50,
            maxLife: 50,
            color: color,
            rotation: 0,
            rotSpeed: (Math.random() - 0.5) * 0.25,
            gravity: 0.4
        });

        // Limbs
        for (let i = 0; i < 4; i++) {
            this.particles.push({
                type: 'limb',
                x: x,
                y: y + (i - 2) * 4,
                vx: vx * 0.3 + (Math.random() - 0.5) * 4.5,
                vy: -3.0 - Math.random() * 2.5,
                life: 45,
                maxLife: 45,
                len: 7 + Math.random() * 3,
                color: color,
                rotation: Math.random() * Math.PI,
                rotSpeed: (Math.random() - 0.5) * 0.3,
                gravity: 0.4
            });
        }

        // Ink dots
        for (let i = 0; i < 12; i++) {
            this.particles.push({
                type: 'dot',
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 5.5,
                vy: -Math.random() * 5 - 1,
                life: 35,
                maxLife: 35,
                size: 2,
                color: '#801809',
                gravity: 0.42
            });
        }
    }

    // --- DRAWING: 100% SEAMLESS TWO-TONE DEVIL'S TRIAL VISUALS WITH DYNAMIC CAMERA ---
    draw() {
        const ctx = this.ctx;
        const screenW = this.canvas.width;
        const screenH = this.canvas.height;
        const levelW = this.currentLevel ? this.currentLevel.bounds.width : screenW;
        const levelH = this.currentLevel ? this.currentLevel.bounds.height : screenH;

        ctx.save();

        const ox = this.shakeTimer > 0 ? (Math.random() - 0.5) * this.shakeIntensity : 0;
        const oy = this.shakeTimer > 0 ? (Math.random() - 0.5) * this.shakeIntensity : 0;
        ctx.translate(-Math.round(this.camera.x) + ox, -Math.round(this.camera.y) + oy);

        // 1. Outer solid terrain covering full level bounds!
        ctx.fillStyle = this.theme.bgColor;
        ctx.fillRect(0, 0, levelW, levelH);

        // 2. Carved tunnel corridors (lighter sand pathColor, zero block borders!)
        ctx.fillStyle = this.theme.pathColor;
        for (const corridor of this.currentLevel.pathwayCorridors) {
            ctx.fillRect(corridor.x, corridor.y, corridor.w, corridor.h);
        }

        // 3. SEAMLESS VANISHING GROUND:
        for (const trap of this.trapManager.traps) {
            if (trap instanceof VanishingFloorTrap) {
                if (trap.state === 'dropping') {
                    ctx.fillStyle = this.theme.pathColor;
                    ctx.fillRect(trap.x, trap.initialY, trap.w, trap.y - trap.initialY);

                    ctx.fillStyle = this.theme.bgColor;
                    ctx.fillRect(trap.x, trap.y, trap.w, trap.h);
                } else if (trap.state === 'gone') {
                    ctx.fillStyle = this.theme.pathColor;
                    ctx.fillRect(trap.x, trap.initialY, trap.w, levelH - trap.initialY);
                }
            }
        }

        // 4. Draw Traps (Rolling boulders, emerging spikes, natural crushers, stationary spikes, razors, moving platforms)
        this.trapManager.draw(ctx, this.theme);

        // 5. Draw Adaptive Shifting Door
        if (this.door) {
            this.door.draw(ctx, this.theme);
        }

        // 6. Draw Particles
        this.drawParticles(ctx);

        // 7. Draw Player (Articulated silhouette with animated running legs, jumping arms & crawling on all fours)
        // Hidden when physically shut inside door
        if (this.player.alive && (!this.door || this.door.state !== 'shut')) {
            this.renderer.draw(
                ctx,
                this.player.x,
                this.player.y,
                this.player.vx,
                this.player.vy,
                this.player.onGround,
                this.player.facing,
                this.theme.playerColor,
                this.player.isCrawling
            );
        }

        ctx.restore(); // Restore camera transform to draw HUD / overlays in screen space!

        // 8. Level Complete Banner (Centered in screen space!)
        if (this.gameState === 'level_complete') {
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
            ctx.fillRect(0, 0, screenW, screenH);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 24px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.fillText("STAGE CLEARED!", screenW / 2, screenH / 2 - 8);
            ctx.font = '14px "Courier New", monospace';
            ctx.fillStyle = '#ffca28';
            ctx.fillText("AI Director synthesizing next challenge...", screenW / 2, screenH / 2 + 22);
            ctx.restore();
        }
    }

    drawParticles(ctx) {
        for (const p of this.particles) {
            ctx.save();
            const alpha = Math.max(0, p.life / p.maxLife);
            ctx.globalAlpha = alpha;

            if (p.type === 'head') {
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'limb') {
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.strokeStyle = p.color;
                ctx.lineWidth = 2.2;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(-p.len / 2, 0);
                ctx.lineTo(p.len / 2, 0);
                ctx.stroke();
            } else {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size || 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }
}

window.Game = Game;

window.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});
