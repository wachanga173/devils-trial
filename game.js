// game.js - 200 Handcrafted Authentic Devil's Trials with Alive Maps & Grand Ending
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.physics = new Physics();
        this.renderer = new CharacterRenderer();
        this.trapManager = new TrapManager();

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
        this.reversedControls = false;
        this.reversedTimer = 0;
        window.gameInstance = this;

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
            const iconSvg = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('save') : '';
            this.showToast(`${iconSvg} Progress Restored: Level ${lvlNum} (${this.deathCount} Deaths)`);
        }

        requestAnimationFrame((t) => this.loop(t));
    }

    bindUI() {
        this.deathDisplay = document.getElementById('deathCount');
        this.levelDisplay = document.getElementById('levelNumber');
        this.levelTitleDisplay = document.getElementById('levelTitle');
        this.pauseOverlay = document.getElementById('pauseOverlay');
        this.themeSelector = document.getElementById('themeSelector');
        this.resumeBtn = document.getElementById('resumeBtn');
        this.restartBtn = document.getElementById('restartBtn');

        // Ending modal buttons
        this.endingOverlay = document.getElementById('endingOverlay');
        const endingReplayAnimationBtn = document.getElementById('endingReplayAnimationBtn');
        const endingRestartBtn = document.getElementById('endingRestartBtn');
        const endingReplayLevel200Btn = document.getElementById('endingReplayLevel200Btn');

        if (endingReplayAnimationBtn) {
            endingReplayAnimationBtn.addEventListener('click', () => {
                if (this.endingOverlay) this.endingOverlay.style.display = 'none';
                this.endingTimer = 0;
            });
        }
        if (endingRestartBtn) {
            endingRestartBtn.addEventListener('click', () => {
                if (this.endingOverlay) this.endingOverlay.style.display = 'none';
                this.loadLevel(0);
            });
        }
        if (endingReplayLevel200Btn) {
            endingReplayLevel200Btn.addEventListener('click', () => {
                if (this.endingOverlay) this.endingOverlay.style.display = 'none';
                this.loadLevel(LEVELS.length - 1);
            });
        }

        const levelBadgeHud = document.querySelector('.level-badge-hud');
        if (levelBadgeHud) {
            levelBadgeHud.style.cursor = 'pointer';
            levelBadgeHud.title = 'Click to open Pause & Level Select Menu';
            levelBadgeHud.addEventListener('click', () => {
                this.togglePause();
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

        // =========================================================
        // ERGONOMIC MOBILE TOUCH GAMEPAD SYSTEM (DUAL-THUMB CLUSTERS)
        // =========================================================
        const btnLeft = document.getElementById('btnLeft');
        const btnDown = document.getElementById('btnDown');
        const btnRight = document.getElementById('btnRight');
        const btnJump = document.getElementById('btnJump');
        const btnActionCrawl = document.getElementById('btnActionCrawl');
        const virtualDpad = document.getElementById('virtualDpad');

        let dpadDownActive = false;
        let actionCrawlActive = false;

        const updateCrawlState = () => {
            this.input.down = dpadDownActive || actionCrawlActive;
        };

        const triggerHaptic = () => {
            try {
                if (navigator.vibrate) navigator.vibrate(10);
            } catch (e) {}
        };

        const setupButton = (el, onDown, onUp) => {
            if (!el) return;
            const handleStart = (e) => {
                if (e.cancelable) e.preventDefault();
                if (window.soundFX && window.soundFX.init) window.soundFX.init();
                el.classList.add('active');
                triggerHaptic();
                onDown();
            };
            const handleEnd = (e) => {
                if (e.cancelable) e.preventDefault();
                el.classList.remove('active');
                onUp();
            };

            el.addEventListener('touchstart', handleStart, { passive: false });
            el.addEventListener('touchend', handleEnd, { passive: false });
            el.addEventListener('touchcancel', handleEnd, { passive: false });
            el.addEventListener('mousedown', (e) => {
                e.preventDefault();
                if (window.soundFX && window.soundFX.init) window.soundFX.init();
                el.classList.add('active');
                onDown();
            });
            el.addEventListener('mouseup', (e) => {
                e.preventDefault();
                el.classList.remove('active');
                onUp();
            });
            el.addEventListener('mouseleave', () => {
                el.classList.remove('active');
                onUp();
            });
        };

        // Right Action Cluster: Jump (Leap) & Crawl
        setupButton(btnJump, () => {
            this.input.jump = true;
            this.input.jumpPressed = true;
        }, () => {
            this.input.jump = false;
        });

        setupButton(btnActionCrawl, () => {
            actionCrawlActive = true;
            updateCrawlState();
        }, () => {
            actionCrawlActive = false;
            updateCrawlState();
        });

        // Left Directional D-Pad Cluster (Continuous Gliding & Multi-direction)
        if (virtualDpad && btnLeft && btnRight && btnDown) {
            let activeDpadTouchId = null;

            const processDpadCoords = (clientX, clientY) => {
                const rLeft = btnLeft.getBoundingClientRect();
                const rRight = btnRight.getBoundingClientRect();
                const rDown = btnDown.getBoundingClientRect();

                const padMargin = 12;

                const inLeft = clientX >= rLeft.left - padMargin && clientX <= rLeft.right + 4 &&
                               clientY >= rLeft.top - padMargin && clientY <= rLeft.bottom + 8;
                const inRight = clientX >= rRight.left - 4 && clientX <= rRight.right + padMargin &&
                                clientY >= rRight.top - padMargin && clientY <= rRight.bottom + 8;
                const inDown = clientX >= rDown.left - padMargin && clientX <= rDown.right + padMargin &&
                               clientY >= rDown.top - 6 && clientY <= rDown.bottom + padMargin;

                // Seamlessly support simultaneous Left+Down or Right+Down (Crawling while moving!)
                this.input.left = inLeft;
                this.input.right = inRight;
                dpadDownActive = inDown;
                updateCrawlState();

                if (inLeft) btnLeft.classList.add('active'); else btnLeft.classList.remove('active');
                if (inRight) btnRight.classList.add('active'); else btnRight.classList.remove('active');
                if (inDown) btnDown.classList.add('active'); else btnDown.classList.remove('active');
            };

            const handleDpadStart = (e) => {
                if (e.cancelable) e.preventDefault();
                if (window.soundFX && window.soundFX.init) window.soundFX.init();
                triggerHaptic();
                const touch = e.changedTouches[0];
                activeDpadTouchId = touch.identifier;
                processDpadCoords(touch.clientX, touch.clientY);
            };

            const handleDpadMove = (e) => {
                if (e.cancelable) e.preventDefault();
                for (let i = 0; i < e.touches.length; i++) {
                    const t = e.touches[i];
                    if (t.identifier === activeDpadTouchId || activeDpadTouchId === null) {
                        processDpadCoords(t.clientX, t.clientY);
                        break;
                    }
                }
            };

            const handleDpadEnd = (e) => {
                if (e.cancelable) e.preventDefault();
                for (let i = 0; i < e.changedTouches.length; i++) {
                    if (e.changedTouches[i].identifier === activeDpadTouchId) {
                        activeDpadTouchId = null;
                        this.input.left = false;
                        this.input.right = false;
                        dpadDownActive = false;
                        updateCrawlState();
                        btnLeft.classList.remove('active');
                        btnRight.classList.remove('active');
                        btnDown.classList.remove('active');
                        break;
                    }
                }
            };

            virtualDpad.addEventListener('touchstart', handleDpadStart, { passive: false });
            virtualDpad.addEventListener('touchmove', handleDpadMove, { passive: false });
            virtualDpad.addEventListener('touchend', handleDpadEnd, { passive: false });
            virtualDpad.addEventListener('touchcancel', handleDpadEnd, { passive: false });

            // Direct button fallbacks for desktop mouse clicks
            setupButton(btnLeft, () => { this.input.left = true; }, () => { this.input.left = false; });
            setupButton(btnRight, () => { this.input.right = true; }, () => { this.input.right = false; });
            setupButton(btnDown, () => {
                dpadDownActive = true;
                updateCrawlState();
            }, () => {
                dpadDownActive = false;
                updateCrawlState();
            });
        }

        // Global safety cleanup: guarantees zero stuck inputs when all fingers lift
        window.addEventListener('touchend', (e) => {
            if (e.touches.length === 0) {
                this.input.left = false;
                this.input.right = false;
                this.input.jump = false;
                dpadDownActive = false;
                actionCrawlActive = false;
                updateCrawlState();
                [btnLeft, btnRight, btnDown, btnJump, btnActionCrawl].forEach(btn => {
                    if (btn) btn.classList.remove('active');
                });
            }
        });
        window.addEventListener('touchcancel', (e) => {
            if (e.touches.length === 0) {
                this.input.left = false;
                this.input.right = false;
                this.input.jump = false;
                dpadDownActive = false;
                actionCrawlActive = false;
                updateCrawlState();
                [btnLeft, btnRight, btnDown, btnJump, btnActionCrawl].forEach(btn => {
                    if (btn) btn.classList.remove('active');
                });
            }
        });

        const escBtn = document.getElementById('escBtn');
        if (escBtn) {
            escBtn.addEventListener('click', () => this.togglePause());
        }

        const quickRestartHudBtn = document.getElementById('quickRestartHudBtn');
        if (quickRestartHudBtn) {
            const triggerQuickRestart = (e) => {
                if (e) e.preventDefault();
                if (window.soundFX && window.soundFX.init) window.soundFX.init();
                if (this.isPaused) {
                    this.togglePause();
                }
                this.respawnPlayer(true);
                const rotateIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('rotate') : '↻';
                this.showToast(`${rotateIco} Level Restarted!`);
            };
            quickRestartHudBtn.addEventListener('click', triggerQuickRestart);
            quickRestartHudBtn.addEventListener('touchstart', triggerQuickRestart, { passive: false });
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

        // Legal & FAQ Modal Wireups
        const headerLegalBtn = document.getElementById('headerLegalBtn');
        const pauseLegalBtn = document.getElementById('pauseLegalBtn');
        const closeLegalBtn = document.getElementById('closeLegalBtn');
        const topBackLegalBtn = document.getElementById('topBackLegalBtn');
        const backFromLegalBtn = document.getElementById('backFromLegalBtn');
        const directResumeFromLegalBtn = document.getElementById('directResumeFromLegalBtn');
        const footerTermsBtn = document.getElementById('footerTermsBtn');
        const footerPrivacyBtn = document.getElementById('footerPrivacyBtn');
        const footerFaqBtn = document.getElementById('footerFaqBtn');

        if (headerLegalBtn) {
            headerLegalBtn.addEventListener('click', () => {
                if (this.gameState === 'playing') this.togglePause();
                this.toggleLegalModal(true, 'terms', false);
            });
        }
        if (pauseLegalBtn) {
            pauseLegalBtn.addEventListener('click', () => {
                this.toggleLegalModal(true, 'terms', true);
            });
        }
        if (closeLegalBtn) {
            closeLegalBtn.addEventListener('click', () => this.toggleLegalModal(false));
        }
        if (topBackLegalBtn) {
            topBackLegalBtn.addEventListener('click', () => this.toggleLegalModal(false));
        }
        if (backFromLegalBtn) {
            backFromLegalBtn.addEventListener('click', () => this.toggleLegalModal(false));
        }
        if (directResumeFromLegalBtn) {
            directResumeFromLegalBtn.addEventListener('click', () => {
                this.toggleLegalModal(false);
                if (this.gameState === 'paused') {
                    this.togglePause();
                }
            });
        }
        if (footerTermsBtn) {
            footerTermsBtn.addEventListener('click', () => {
                if (this.gameState === 'playing') this.togglePause();
                this.toggleLegalModal(true, 'terms', false);
            });
        }
        if (footerPrivacyBtn) {
            footerPrivacyBtn.addEventListener('click', () => {
                if (this.gameState === 'playing') this.togglePause();
                this.toggleLegalModal(true, 'privacy', false);
            });
        }
        if (footerFaqBtn) {
            footerFaqBtn.addEventListener('click', () => {
                if (this.gameState === 'playing') this.togglePause();
                this.toggleLegalModal(true, 'faq', false);
            });
        }

        // Tab button switching
        const modalTabBtns = document.querySelectorAll('.legal-modal-tabs .modal-tab-btn');
        modalTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchLegalModalTab(btn.dataset.tab);
            });
        });

        // Accordion collapsing/expanding
        const modalAccBtns = document.querySelectorAll('.in-modal-acc-q');
        modalAccBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.closest('.in-modal-acc-item');
                if (parent) parent.classList.toggle('open');
            });
        });

        // Live In-Modal Search
        const inModalSearch = document.getElementById('inModalLegalSearch');
        if (inModalSearch) {
            inModalSearch.addEventListener('input', (e) => {
                this.filterLegalModalContent(e.target.value);
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

        const btnDismissRotate = document.getElementById('btnDismissRotate');
        const rotateOverlay = document.getElementById('rotateOverlay');
        if (btnDismissRotate && rotateOverlay) {
            btnDismissRotate.addEventListener('click', () => {
                rotateOverlay.classList.add('dismissed');
                const phoneIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('smartphone') : '';
                this.showToast(`${phoneIco} Portrait Mode Enabled`);
            });
        }

        const touchControlsSelector = document.getElementById('touchControlsSelector');
        if (touchControlsSelector) {
            touchControlsSelector.value = localStorage.getItem('devils_trial_touch_controls') || 'auto';
            touchControlsSelector.addEventListener('change', (e) => {
                const val = e.target.value;
                localStorage.setItem('devils_trial_touch_controls', val);
                if (window.dtDetectDevice) window.dtDetectDevice();
                const getIco = (k) => (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg(k) : '';
                const labels = {
                    auto: `${getIco('settings')} Controls: Auto-Detect (Small Phones Only)`,
                    off: `${getIco('monitor')} Controls: Off (Big Screens & Keyboard)`,
                    on: `${getIco('gamepad')} Controls: Forced Virtual Gamepad`
                };
                this.showToast(labels[val] || 'Controls setting updated');
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
        const downloadBatLauncherBtn = document.getElementById('downloadBatLauncherBtn');
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
        if (downloadBatLauncherBtn) {
            downloadBatLauncherBtn.addEventListener('click', () => this.downloadStorageBatchLauncher());
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

        // Mobile & Tablet Specific Storage Actions
        const shareSaveBtn = document.getElementById('shareSaveBtn');
        const downloadMobileSaveBtn = document.getElementById('downloadMobileSaveBtn');
        const copyMobileSaveBtn = document.getElementById('copyMobileSaveBtn');
        const viewRawDataMobileBtn = document.getElementById('viewRawDataMobileBtn');

        if (shareSaveBtn) {
            shareSaveBtn.addEventListener('click', () => this.shareSaveData());
        }
        if (downloadMobileSaveBtn) {
            downloadMobileSaveBtn.addEventListener('click', () => this.downloadSaveFile());
        }
        if (copyMobileSaveBtn) {
            copyMobileSaveBtn.addEventListener('click', () => this.copyMobileSaveData());
        }
        if (viewRawDataMobileBtn) {
            viewRawDataMobileBtn.addEventListener('click', () => this.openSaveDataViewer());
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
            const checkIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('check') : '✓';
            this.showToast(`${checkIco} Devil's Trial installed as app! Shared storage active.`);
        });
    }

    markAppInstalled() {
        const pwaBtn = document.getElementById('pwaInstallBtn');
        const pauseBtn = document.getElementById('pausePwaInstallBtn');
        const checkIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('check') : '✓';
        if (pwaBtn) {
            pwaBtn.classList.add('installed');
            pwaBtn.innerHTML = `<span class="pwa-icon">${checkIco}</span> <span class="pwa-text">APP MODE</span>`;
            pwaBtn.title = "Running in standalone app mode with shared storage";
        }
        if (pauseBtn) {
            pauseBtn.innerHTML = `${checkIco} INSTALLED (APP MODE)`;
            pauseBtn.disabled = true;
            pauseBtn.style.opacity = "0.7";
        }
    }

    triggerPwaInstall() {
        if (this.deferredPwaPrompt) {
            this.deferredPwaPrompt.prompt();
            this.deferredPwaPrompt.userChoice.then((choiceResult) => {
                if (choiceResult && choiceResult.outcome === 'accepted') {
                    const downloadIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('download') : '';
                    this.showToast(`${downloadIco} Installing Devil's Trial App...`);
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
                    <div class="pwa-step-text">Look at the right side of your browser address bar for the <strong>Install App icon (⊕ or App)</strong>.</div>
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
        toast.innerHTML = message;
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
                lastSaved: new Date().toISOString()
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
                const maxLvlIdx = (typeof LEVELS !== 'undefined' && LEVELS.length > 0) ? (LEVELS.length - 1) : 199;
                this.currentLevelIndex = Math.min(maxLvlIdx, data.currentLevelIndex);
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
        let winRunCmd = '';

        const isWin = /Windows/i.test(ua);
        const isMac = /Macintosh|Mac OS X/i.test(ua);
        const isAndroid = /Android/i.test(ua);
        const isIOS = /iPhone|iPad|iPod/i.test(ua) || (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const isLinux = /Linux/i.test(ua) && !isAndroid;
        const isTouchDevice = (typeof navigator !== 'undefined' && (navigator.maxTouchPoints > 0 || 'ontouchstart' in window));
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        const isTabletUA = /iPad|tablet|(android(?!.*mobile))/i.test(ua);
        const isMobileOrTablet = isIOS || isAndroid || isMobileUA || isTabletUA || (isTouchDevice && !isWin);

        if (isAndroid) {
            if (/SamsungBrowser/i.test(ua)) {
                detectedOS = 'Android Tablet / Phone (Samsung Internet)';
                storagePath = 'Samsung Internet Sandbox: /data/data/com.sec.android.app.sbrowser/Default/Local Storage';
            } else {
                detectedOS = 'Android Tablet / Phone (Google Chrome)';
                storagePath = 'Android Chrome Sandbox: /data/data/com.android.chrome/Default/Local Storage';
            }
        } else if (isIOS) {
            const isIPad = /iPad/i.test(ua) || (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
            detectedOS = isIPad ? 'Apple iPadOS (WebKit Sandbox)' : 'Apple iOS (WebKit Sandbox)';
            storagePath = 'iOS App Sandbox: Library/WebKit/WebsiteData/Default/LocalStorage';
        } else if (isWin) {
            const isBrave = (typeof navigator !== 'undefined' && (navigator.brave && typeof navigator.brave.isBrave === 'function')) || /Brave/i.test(ua);
            if (isBrave) {
                detectedOS = 'Windows (Brave Browser)';
                storagePath = '%LocalAppData%\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Local Storage\\leveldb';
            } else if (/OPR|Opera/i.test(ua)) {
                if (/Opera GX/i.test(ua)) {
                    detectedOS = 'Windows (Opera GX)';
                    storagePath = '%AppData%\\Opera Software\\Opera GX Stable\\Local Storage\\leveldb';
                } else {
                    detectedOS = 'Windows (Opera)';
                    storagePath = '%AppData%\\Opera Software\\Opera Stable\\Local Storage\\leveldb';
                }
            } else if (/Vivaldi/i.test(ua)) {
                detectedOS = 'Windows (Vivaldi)';
                storagePath = '%LocalAppData%\\Vivaldi\\User Data\\Default\\Local Storage\\leveldb';
            } else if (/Edg/i.test(ua)) {
                detectedOS = 'Windows (Microsoft Edge)';
                storagePath = '%LocalAppData%\\Microsoft\\Edge\\User Data\\Default\\Local Storage\\leveldb';
            } else if (/Firefox/i.test(ua)) {
                detectedOS = 'Windows (Mozilla Firefox)';
                storagePath = '%APPDATA%\\Mozilla\\Firefox\\Profiles';
            } else if (/Chrome/i.test(ua)) {
                detectedOS = 'Windows (Google Chrome)';
                storagePath = '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb';
            } else {
                detectedOS = 'Windows (Desktop)';
                storagePath = '%LocalAppData%';
            }
            winRunCmd = `explorer "${storagePath}"`;
        } else if (isMac) {
            if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
                detectedOS = 'macOS (Apple Safari)';
                storagePath = '~/Library/Containers/com.apple.Safari/Data/Library/LocalStorage';
            } else {
                detectedOS = 'macOS (Google Chrome)';
                storagePath = '~/Library/Application Support/Google/Chrome/Default/Local Storage/leveldb';
            }
            winRunCmd = `open "${storagePath}"`;
        } else if (isLinux) {
            detectedOS = 'Linux';
            storagePath = '~/.config/google-chrome/Default/Local Storage/leveldb';
            winRunCmd = `xdg-open "${storagePath}"`;
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

        let progressStr = `Level ${this.currentLevel ? this.currentLevel.id : ((this.currentLevelIndex || 0) + 1)} / ${LEVELS.length} | ${this.deathCount || 0} Deaths`;
        let lastSavedStr = 'Not saved yet';

        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (parsed.lastSaved) {
                    lastSavedStr = new Date(parsed.lastSaved).toLocaleString();
                }
                if (typeof parsed.currentLevelIndex === 'number' && typeof parsed.deathCount === 'number') {
                    progressStr = `Level ${parsed.currentLevelIndex + 1} / ${LEVELS.length} | ${parsed.deathCount} Deaths`;
                }
            } catch (e) {}
        }

        return {
            detectedOS,
            storagePath,
            isMobileOrTablet,
            isWin: isWin && !isMobileOrTablet,
            winRunCmd: winRunCmd || `explorer "${storagePath}"`,
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

        const desktopActions = document.getElementById('desktopLocationActions');
        const mobileActions = document.getElementById('mobileStorageActions');
        const desktopNote = document.getElementById('desktopStorageNote');
        const mobileNote = document.getElementById('mobileStorageNote');

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

        // Adapt UI based on whether device is mobile/tablet or desktop
        if (details.isMobileOrTablet) {
            if (desktopActions) desktopActions.style.display = 'none';
            if (mobileActions) mobileActions.style.display = 'flex';
            if (desktopNote) desktopNote.style.display = 'none';
            if (mobileNote) mobileNote.style.display = 'block';
        } else {
            if (desktopActions) desktopActions.style.display = 'flex';
            if (mobileActions) mobileActions.style.display = 'none';
            if (desktopNote) desktopNote.style.display = 'block';
            if (mobileNote) mobileNote.style.display = 'none';
        }

        // Query local server to resolve dynamic on-disk profile path if available on desktop
        if (!details.isMobileOrTablet && typeof fetch !== 'undefined') {
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
        // On mobile or tablets, there is no Windows File Explorer or Win+R: use mobile-friendly share/export
        if (details.isMobileOrTablet) {
            this.shareSaveData();
            return;
        }

        const targetPath = this.resolvedStoragePath || details.storagePath;
        const cmd = `explorer "${targetPath}"`;

        // 1. Copy valid quoted command to clipboard immediately
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(cmd).catch(() => {});
        }

        // 2. Call local server endpoint if running locally
        fetch(`/api/open-storage-dir?path=${encodeURIComponent(targetPath)}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.success) {
                    const opened = data.openedPath || targetPath;
                    const rocketIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('rocket') : '';
                    const folderIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('folder') : '';
                    this.showLocationFeedback(`${rocketIco} Opened in Windows File Explorer: ${opened}`, 'success');
                    this.showToast(`${folderIco} Opened folder in Windows File Explorer!`);
                } else {
                    this.showHostedLocationFeedback(cmd, targetPath);
                }
            })
            .catch(() => {
                this.showHostedLocationFeedback(cmd, targetPath);
            });
    }

    showHostedLocationFeedback(cmd, targetPath) {
        const clipIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('clipboard') : '';
        this.showLocationFeedback(`${clipIco} Copied Win+R command: ${cmd}<br>Press Win + R, paste (Ctrl+V) &amp; hit Enter! Or click "1-Click Launcher (.bat)".`, 'info');
        this.showToast(`${clipIco} Win+R command copied to clipboard!`);
    }

    copyStorageLocation() {
        const details = this.getDeviceStorageDetails();
        // On mobile or tablets, copy the save data payload directly
        if (details.isMobileOrTablet) {
            this.copyMobileSaveData();
            return;
        }

        const targetPath = this.resolvedStoragePath || details.storagePath;
        const cmd = `explorer "${targetPath}"`;
        const clipIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('clipboard') : '';
        const checkIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('check') : '✓';
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(cmd)
                .then(() => {
                    this.showToast(`${clipIco} Win+R command copied!`);
                    this.showLocationFeedback(`${checkIco} Copied: ${cmd}<br>Press Win + R, paste (Ctrl+V) &amp; hit Enter!`, 'info');
                })
                .catch(() => {
                    this.showToast('Failed to copy to clipboard.');
                });
        }
    }

    shareSaveData() {
        const LEGACY_KEY = ['level', 'devil', 'save', 'v1'].join('_');
        let raw = null;
        try {
            if (typeof localStorage !== 'undefined') {
                raw = localStorage.getItem('devils_trial_save_v1') || localStorage.getItem(LEGACY_KEY);
            }
        } catch (e) {}

        const content = raw || JSON.stringify({
            game: "Devil's Trial",
            status: "No saved progress yet. Complete levels to accumulate save data!",
            date: new Date().toISOString()
        }, null, 2);

        if (typeof navigator !== 'undefined' && navigator.share && typeof navigator.share === 'function') {
            const shareIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('share') : '';
            const checkIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('check') : '✓';
            navigator.share({
                title: "Devil's Trial Save Data",
                text: content
            }).then(() => {
                this.showToast(`${shareIco} Save data shared!`);
                this.showLocationFeedback(`${checkIco} Save data shared to your chosen application.`, 'success');
            }).catch((err) => {
                if (err && err.name !== 'AbortError') {
                    this.copyMobileSaveData();
                }
            });
        } else {
            this.copyMobileSaveData();
        }
    }

    copyMobileSaveData() {
        const LEGACY_KEY = ['level', 'devil', 'save', 'v1'].join('_');
        let raw = null;
        try {
            if (typeof localStorage !== 'undefined') {
                raw = localStorage.getItem('devils_trial_save_v1') || localStorage.getItem(LEGACY_KEY);
            }
        } catch (e) {}

        const content = raw || JSON.stringify({
            game: "Devil's Trial",
            status: "No saved progress yet. Complete levels to accumulate save data!",
            date: new Date().toISOString()
        }, null, 2);

        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            const clipIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('clipboard') : '';
            const checkIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('check') : '✓';
            navigator.clipboard.writeText(content)
                .then(() => {
                    this.showToast(`${clipIco} Save data copied to clipboard!`);
                    this.showLocationFeedback(`${checkIco} Save JSON payload copied! Paste into Notes, Files, or message it to backup.`, 'success');
                })
                .catch(() => {
                    this.openSaveDataViewer();
                });
        } else {
            this.openSaveDataViewer();
        }
    }

    downloadStorageBatchLauncher() {
        const details = this.getDeviceStorageDetails();
        const targetPath = this.resolvedStoragePath || details.storagePath;
        const batContent = `@echo off\r\ntitle Devil's Trial - Storage Folder\r\necho Opening Devil's Trial save location in Windows File Explorer...\r\nstart "" explorer "${targetPath}"\r\nexit\r\n`;
        const blob = new Blob([batContent], { type: 'application/x-bat' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Open_Devils_Trial_Save_Location.bat';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        const saveIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('save') : '';
        this.showToast(`${saveIco} Downloaded Open_Devils_Trial_Save_Location.bat!`);
        this.showLocationFeedback(`${saveIco} Launcher downloaded! Double-click Open_Devils_Trial_Save_Location.bat in Downloads to open File Explorer.`, 'success');
    }

    showLocationFeedback(msg, type = 'success') {
        const banner = document.getElementById('locationActionFeedback');
        if (!banner) return;
        banner.className = `location-feedback-banner ${type}`;
        banner.innerHTML = msg;
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
            const clipIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('clipboard') : '';
            navigator.clipboard.writeText(pre.innerText)
                .then(() => this.showToast(`${clipIco} Save JSON copied to clipboard!`))
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
            const saveIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('save') : '';
            this.showToast(`${saveIco} Save file downloaded to your PC!`);
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
            "[CRITICAL WARNING] PERMANENT DATA DESTRUCTION\n\n" +
            "Are you absolutely sure you want to delete all saved history from local storage?\n\n" +
            "• Progress will be reset to Level 1\n" +
            "• Total death count will reset to 0\n" +
            "• All 200 trial records and statistics will be permanently wiped\n\n" +
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

        if (this.deathDisplay) this.deathDisplay.innerText = '0';
        if (this.themeSelector) this.themeSelector.value = this.currentThemeKey;
        this.loadLevel(0);

        this.refreshStorageModalUI();
        const trashIco = (typeof DT_ICONS !== 'undefined') ? DT_ICONS.svg('trash') : '';
        this.showToast(`${trashIco} All local storage data has been permanently destroyed.`);
    }

    toggleLegalModal(open, targetTab = 'terms', fromPauseMenu = null) {
        const modal = document.getElementById('legalOverlay');
        if (!modal) return;
        if (open) {
            if (fromPauseMenu !== null) {
                this.legalOpenedFromPause = fromPauseMenu;
            } else {
                this.legalOpenedFromPause = (this.gameState === 'paused' && this.pauseOverlay && this.pauseOverlay.classList.contains('active'));
            }
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            this.switchLegalModalTab(targetTab);
            const searchInput = document.getElementById('inModalLegalSearch');
            if (searchInput) {
                searchInput.value = '';
                this.filterLegalModalContent('');
            }

            // Dynamically update return labels based on context
            const topBackText = document.getElementById('topBackLegalText');
            const bottomBackText = document.getElementById('backFromLegalText');
            const topBackBtn = document.getElementById('topBackLegalBtn');
            const label = this.legalOpenedFromPause ? 'BACK TO PAUSE' : 'RESUME GAME';
            if (topBackText) topBackText.innerText = label;
            if (bottomBackText) bottomBackText.innerText = label;
            if (topBackBtn) topBackBtn.title = this.legalOpenedFromPause ? 'Return to Pause Menu' : 'Resume Playing Game';
        } else {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            if (!this.legalOpenedFromPause) {
                // If opened directly from gameplay, resume playing immediately!
                if (this.gameState === 'paused') {
                    this.togglePause();
                }
            } else {
                // If opened from pause menu, keep pause menu visible and ready
                if (this.pauseOverlay && !this.pauseOverlay.classList.contains('active')) {
                    this.pauseOverlay.classList.add('active');
                }
            }
        }
    }

    switchLegalModalTab(tabName) {
        if (tabName === 'ai') tabName = 'fairplay';
        const tabBtns = document.querySelectorAll('.legal-modal-tabs .modal-tab-btn');
        const panels = document.querySelectorAll('.legal-modal-scroll .tab-panel');
        tabBtns.forEach(btn => {
            if (btn.dataset.tab === tabName || (tabName === 'fairplay' && btn.dataset.tab === 'ai')) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        panels.forEach(panel => {
            const panelId = 'tabContent' + tabName.charAt(0).toUpperCase() + tabName.slice(1);
            if (panel.id === panelId || (tabName === 'fairplay' && panel.id === 'tabContentAi')) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
        const scrollContainer = document.getElementById('legalModalScroll');
        if (scrollContainer) scrollContainer.scrollTop = 0;
    }

    filterLegalModalContent(query) {
        const cleanQuery = (query || '').toLowerCase().trim();
        const items = document.querySelectorAll('.in-modal-acc-item');
        items.forEach(item => {
            const q = item.querySelector('.in-modal-acc-q')?.innerText.toLowerCase() || '';
            const a = item.querySelector('.in-modal-acc-a')?.innerText.toLowerCase() || '';
            if (!cleanQuery || q.includes(cleanQuery) || a.includes(cleanQuery)) {
                item.style.display = '';
                if (cleanQuery) item.classList.add('open');
            } else {
                item.style.display = 'none';
            }
        });
    }

    loadLevel(index) {
        if (index >= LEVELS.length) {
            this.startEndingCelebration();
            return;
        }

        this.currentLevelIndex = index;
        this.currentLevel = LEVELS[this.currentLevelIndex];

        if (this.currentLevel.theme && THEMES[this.currentLevel.theme]) {
            this.currentThemeKey = this.currentLevel.theme;
            this.theme = THEMES[this.currentThemeKey];
            if (this.themeSelector) this.themeSelector.value = this.currentThemeKey;
        }

        if (this.levelDisplay) this.levelDisplay.innerText = `LEVEL ${this.currentLevel.id} / ${LEVELS.length}`;
        if (this.levelTitleDisplay) this.levelTitleDisplay.innerText = this.currentLevel.title;
        const chapterTitle = document.getElementById('chapterTitle');
        if (chapterTitle && this.currentLevel.chapter) {
            chapterTitle.innerText = this.currentLevel.chapter;
        }

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
        this.player.onGround = true;
        this.player.isCrawling = false;
        this.player.isJumping = false;
        this.player.width = 12;
        this.player.height = 24;
        this.player.coyoteTimer = 0;
        this.player.jumpBufferTimer = 0;
        this.reversedControls = false;
        this.reversedTimer = 0;
        this.gameState = 'playing';

        // 1. Setup handcrafted traps
        this.trapManager.setupLevel(this.currentLevel);

        // 2. Initialize the Evasive Shifting Door
        this.door = new AdaptiveDoor(this.currentLevel.door, this.currentLevel);

        // 3. Recalculate solids: dynamically slice floor around active vanishing floors
        this.currentSolids = getActiveLevelSolids(this.currentLevel, this.trapManager.traps);

        // 4. Snap camera immediately to player spawn location
        const maxCamX = Math.max(0, this.currentLevel.bounds.width - 840);
        const maxCamY = Math.max(0, this.currentLevel.bounds.height - 480);
        this.camera.x = Math.max(0, Math.min(maxCamX, spawn.x - 420));
        this.camera.y = Math.max(0, Math.min(maxCamY, spawn.y - 240));
        this.camera.targetX = this.camera.x;
        this.camera.targetY = this.camera.y;
    }

    playerDie(reason, trapType = null) {
        if (!this.player.alive) return;
        this.player.alive = false;
        this.gameState = 'dying';
        this.respawnTimer = 36;

        this.deathCount++;
        if (this.deathDisplay) this.deathDisplay.innerText = this.deathCount;

        this.shake(12, 6);
        if (window.soundFX) window.soundFX.playDeath();

        this.spawnDeathParticles(this.player.x, this.player.y - 12, this.player.vx, this.player.vy);
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
            const touchControlsSelector = document.getElementById('touchControlsSelector');
            if (touchControlsSelector) {
                touchControlsSelector.value = localStorage.getItem('devils_trial_touch_controls') || 'auto';
            }
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
                    this.input.jump = true;
                }
            } else if (e.code === 'Escape') {
                const legalOverlay = document.getElementById('legalOverlay');
                const storageOverlay = document.getElementById('storageOverlay');
                const saveDataViewerModal = document.getElementById('saveDataViewerModal');
                const pwaGuideModal = document.getElementById('pwaGuideModal');

                if (legalOverlay && legalOverlay.classList.contains('active')) {
                    this.toggleLegalModal(false);
                } else if (saveDataViewerModal && saveDataViewerModal.classList.contains('active')) {
                    saveDataViewerModal.classList.remove('active');
                } else if (storageOverlay && storageOverlay.classList.contains('active')) {
                    this.toggleStorageModal(false);
                } else if (pwaGuideModal && pwaGuideModal.classList.contains('active')) {
                    this.togglePwaGuideModal(false);
                } else {
                    this.togglePause();
                }
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
            // Traps update
            this.trapManager.update(this.player, this, (trap) => {
                this.shake(5, 2.5);
            });

            // Handle reversed controls zone
            let effectiveInput = this.input;
            if (this.reversedTimer > 0) {
                this.reversedTimer--;
                if (this.reversedTimer <= 0) {
                    this.reversedControls = false;
                }
            }
            if (this.reversedControls) {
                effectiveInput = {
                    left: this.input.right,
                    right: this.input.left,
                    down: this.input.down,
                    jump: this.input.jump,
                    jumpPressed: this.input.jumpPressed
                };
            }

            // Physics with dynamic solids
            this.physics.update(
                this.player,
                effectiveInput,
                this.currentSolids,
                this.trapManager.traps,
                this.currentLevel.bounds
            );

            // Update Adaptive Door
            if (this.door) {
                this.door.update(this.player, null, this);
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
            this.door.update(this.player, null, this);
            const doorTargetX = this.door.x + this.door.w / 2;
            this.player.x += (doorTargetX - this.player.x) * 0.25;
            this.player.y = this.door.y + this.door.h;
            this.player.vx = 0;
            this.player.vy = 0;
            this.player.onGround = true;
        } else if (this.gameState === 'dying') {
            this.respawnTimer--;
            if (this.respawnTimer <= 0) {
                this.respawnPlayer(false);
            }
        } else if (this.gameState === 'level_complete') {
            this.winTimer--;
            if (this.winTimer <= 0) {
                if (this.currentLevelIndex >= LEVELS.length - 1) {
                    this.startEndingCelebration();
                } else {
                    this.loadLevel(this.currentLevelIndex + 1);
                }
            }
        } else if (this.gameState === 'game_completed') {
            this.updateEndingCelebration();
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

    startEndingCelebration() {
        this.gameState = 'game_completed';
        this.endingTimer = 0;
        this.particles = [];
        if (window.soundFX && window.soundFX.playWin) {
            window.soundFX.playWin();
        }
        // Snap camera to origin
        this.camera.x = 0;
        this.camera.y = 0;
        this.camera.targetX = 0;
        this.camera.targetY = 0;

        const deathEl = document.getElementById('endingDeathCount');
        const ratingEl = document.getElementById('endingMasteryRating');
        if (deathEl) deathEl.innerText = this.deathCount;
        if (ratingEl) {
            if (this.deathCount <= 100) ratingEl.innerText = 'DIVINE SPEEDRUNNER';
            else if (this.deathCount <= 300) ratingEl.innerText = 'DEVIL CONQUEROR';
            else if (this.deathCount <= 700) ratingEl.innerText = 'IRON WILL SURVIVOR';
            else ratingEl.innerText = 'INDOMITABLE MASTER';
        }
    }

    updateEndingCelebration() {
        this.endingTimer = (this.endingTimer || 0) + 1;

        // Continuous fireworks & confetti
        if (this.endingTimer % 4 === 0) {
            const burstX = 120 + Math.random() * 600;
            const burstY = 80 + Math.random() * 180;
            const colors = ['#ffd700', '#ff1744', '#00e5ff', '#69f0ae', '#e040fb', '#ffffff', '#ff9100'];
            const col = colors[Math.floor(Math.random() * colors.length)];
            for (let i = 0; i < 10; i++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = 2.0 + Math.random() * 4.5;
                this.particles.push({
                    x: burstX,
                    y: burstY,
                    vx: Math.cos(angle) * spd,
                    vy: Math.sin(angle) * spd,
                    gravity: 0.08,
                    life: 55 + Math.floor(Math.random() * 30),
                    color: col,
                    size: 2.5 + Math.random() * 2.5
                });
            }
        }

        // Show ending modal overlay after intro animation plays
        if (this.endingTimer === 90 && this.endingOverlay) {
            this.endingOverlay.style.display = 'flex';
        }
    }

    drawEndingAnimation(ctx) {
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.save();
        ctx.fillStyle = 'rgba(12, 10, 10, 0.88)';
        ctx.fillRect(0, 0, w, h);

        const timer = this.endingTimer || 0;
        const cx = w / 2;
        const cy = 180;

        // 1. Radiant backdrop glow
        const glow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 240);
        glow.addColorStop(0, 'rgba(255, 82, 82, 0.35)');
        glow.addColorStop(0.5, 'rgba(255, 215, 0, 0.15)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, 240, 0, Math.PI * 2);
        ctx.fill();

        // 2. Animated Defeated Devil Boss
        ctx.save();
        ctx.translate(cx, cy);

        // Devil Body & Head
        ctx.fillStyle = '#c62828';
        ctx.beginPath();
        // Horns
        ctx.moveTo(-35, -40);
        ctx.quadraticCurveTo(-60, -85, -25, -70);
        ctx.lineTo(-20, -45);
        ctx.lineTo(20, -45);
        ctx.lineTo(25, -70);
        ctx.quadraticCurveTo(60, -85, 35, -40);
        // Head
        ctx.arc(0, -10, 45, 0, Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#2b0a0a';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Shocked Trembling Eyes
        const eyeWiden = Math.min(1.8, 1 + timer * 0.01);
        const eyeShake = (Math.random() - 0.5) * 2;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(-18 + eyeShake, -20, 12 * eyeWiden, 15 * eyeWiden, 0, 0, Math.PI * 2);
        ctx.ellipse(18 + eyeShake, -20, 12 * eyeWiden, 15 * eyeWiden, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#2b0a0a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Tiny Horrified Pupils
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.arc(-18 + eyeShake, -20, 3, 0, Math.PI * 2);
        ctx.arc(18 + eyeShake, -20, 3, 0, Math.PI * 2);
        ctx.fill();

        // Wide Dropping Jaw / Mouth
        ctx.fillStyle = '#1a0505';
        ctx.beginPath();
        ctx.ellipse(0, 15 + Math.sin(timer * 0.1) * 3, 22, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffebee';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Animated Sweat Droplets spraying
        for (let s = 0; s < 4; s++) {
            const sweatPhase = (timer * 0.1 + s * 1.5) % 6;
            const sx = (s % 2 === 0 ? -1 : 1) * (45 + sweatPhase * 8);
            const sy = -30 - sweatPhase * 4;
            ctx.fillStyle = '#80d8ff';
            ctx.beginPath();
            ctx.arc(sx, sy, Math.max(1, 4 - sweatPhase * 0.5), 0, Math.PI * 2);
            ctx.fill();
        }

        // Waving White Surrender Flag
        const flagAngle = Math.sin(timer * 0.14) * 0.35 - 0.3;
        ctx.save();
        ctx.translate(50, 5);
        ctx.rotate(flagAngle);
        // Flagpole
        ctx.strokeStyle = '#d7ccc8';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(0, 20);
        ctx.lineTo(0, -65);
        ctx.stroke();
        // White Flag Cloth
        const wave = Math.sin(timer * 0.2) * 5;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(0, -65);
        ctx.quadraticCurveTo(25, -65 + wave, 50, -60);
        ctx.lineTo(50, -35);
        ctx.quadraticCurveTo(25, -40 - wave, 0, -40);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#cfd8dc';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#b0bec5';
        ctx.font = 'bold 8px monospace';
        ctx.fillText('YIELD', 8, -48);
        ctx.restore();

        ctx.restore(); // restore devil translate

        // 3. Speech Bubble
        ctx.fillStyle = 'rgba(25, 20, 20, 0.95)';
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        const bw = 380;
        const bh = 56;
        const bx = cx - bw / 2;
        const by = cy - 130;
        if (typeof ctx.roundRect === 'function') {
            ctx.beginPath();
            ctx.roundRect(bx, by, bw, bh, 8);
            ctx.fill();
            ctx.stroke();
        } else {
            ctx.fillRect(bx, by, bw, bh);
            ctx.strokeRect(bx, by, bw, bh);
        }
        ctx.fillStyle = '#ff8a80';
        ctx.font = 'bold 13px var(--font-ui, sans-serif)';
        ctx.textAlign = 'center';
        ctx.fillText('"IMPOSSIBLE... YOU ACTUALLY SURVIVED ALL 200 TRIALS?!"', cx, by + 24);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 12px var(--font-ui, sans-serif)';
        ctx.fillText('"I YIELD! You are the TRUE DEVIL OF PLATFORMERS!"', cx, by + 44);

        // 4. Player Character doing Victory Dance with Crown
        const hopY = Math.abs(Math.sin(timer * 0.12)) * 14;
        const px = cx;
        const py = 370 - hopY;
        this.renderer.draw(ctx, px, py, 0, -1, true, 1, '#ffffff', false);

        // Floating Golden Crown above Player
        ctx.save();
        ctx.translate(px, py - 36);
        ctx.fillStyle = '#ffd700';
        ctx.strokeStyle = '#ff8f00';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-12, 6);
        ctx.lineTo(-14, -8);
        ctx.lineTo(-6, -2);
        ctx.lineTo(0, -12);
        ctx.lineTo(6, -2);
        ctx.lineTo(14, -8);
        ctx.lineTo(12, 6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Crown jewels
        ctx.fillStyle = '#e91e63';
        ctx.beginPath();
        ctx.arc(-8, 2, 1.8, 0, Math.PI * 2);
        ctx.arc(0, 2, 1.8, 0, Math.PI * 2);
        ctx.arc(8, 2, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 5. Grand Trophy Title Text
        ctx.fillStyle = '#ffd700';
        ctx.font = '900 24px var(--font-ui, sans-serif)';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 12;
        ctx.fillText('ALL 200 TRIALS CONQUERED!', cx, 430);
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ded6cf';
        ctx.font = '12px var(--font-ui, sans-serif)';
        ctx.fillText(`TOTAL DEATHS: ${this.deathCount}  |  ESC TO CHOOSE ANY TRIAL`, cx, 452);

        ctx.restore();
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

        // 2b. Solid Interior Structures / Shelves / Islands / Steps (Zero Floating Pixels!)
        ctx.fillStyle = this.theme.bgColor;
        const currentSolids = this.currentSolids || this.currentLevel.solids || [];
        for (const solid of currentSolids) {
            if (solid.isOneWay || solid.passthrough || solid.isWallOnly) continue;
            // Draw interior solid rock slabs, shelves, pillars and islands
            ctx.fillRect(solid.x, solid.y, solid.w, solid.h);
        }

        // 3. SEAMLESS DYNAMIC GROUND IN ANY DIRECTION & VACATED GAP CARVING:
        for (const trap of this.trapManager.traps) {
            if (trap instanceof VanishingFloorTrap) {
                const initX = trap.initialX !== undefined ? trap.initialX : trap.x;
                const initY = trap.initialY !== undefined ? trap.initialY : trap.y;
                const solidH = trap.solidH || trap.h || 35;
                const isBottom = trap.isWorldBottom !== undefined ? trap.isWorldBottom : (initY + solidH >= levelH - 15);
                const maxCarveH = isBottom ? (levelH - initY) : solidH;

                ctx.fillStyle = this.theme.pathColor;

                if (trap.state === 'gone') {
                    ctx.fillRect(initX, initY, trap.w, maxCarveH);
                } else if (trap.state !== 'dormant') {
                    // Carve vacated gap left behind by moving ground
                    if (trap.y > initY) {
                        const holeH = Math.min(maxCarveH, trap.y - initY);
                        ctx.fillRect(initX, initY, trap.w, holeH);
                    } else if (trap.y < initY) {
                        const gapTop = Math.max(initY, trap.y + maxCarveH);
                        const holeH = Math.max(0, (initY + maxCarveH) - gapTop);
                        if (holeH > 0) ctx.fillRect(initX, gapTop, trap.w, holeH);
                    }
                    if (trap.x > initX) {
                        const holeW = Math.min(trap.w, trap.x - initX);
                        ctx.fillRect(initX, initY, holeW, maxCarveH);
                    } else if (trap.x < initX) {
                        const gapLeft = Math.max(initX, trap.x + trap.w);
                        const holeW = Math.max(0, (initX + trap.w) - gapLeft);
                        if (holeW > 0) ctx.fillRect(gapLeft, initY, holeW, maxCarveH);
                    }
                }
            } else if (typeof FallingPlatformTrap !== 'undefined' && trap instanceof FallingPlatformTrap) {
                const isBottom = trap.isWorldBottom !== undefined ? trap.isWorldBottom : (trap.initialY + (trap.solidH || trap.h || 40) >= levelH - 15);
                const maxCarveH = isBottom ? (levelH - trap.initialY) : (trap.solidH || trap.h || 40);
                if (trap.state === 'falling') {
                    const holeH = Math.min(maxCarveH, Math.max(0, trap.y - trap.initialY));
                    ctx.fillStyle = this.theme.pathColor;
                    ctx.fillRect(trap.x, trap.initialY, trap.w, holeH);
                } else if (trap.state === 'gone') {
                    ctx.fillStyle = this.theme.pathColor;
                    ctx.fillRect(trap.x, trap.initialY, trap.w, maxCarveH);
                }
            }
        }

        // 4. Draw Traps (Rolling boulders, emerging spikes, natural crushers, stationary spikes, razors, moving platforms)
        this.trapManager.draw(ctx, this.theme);

        // 5. Draw Door Arch Frame and Hollow Interior Aperture
        if (this.door) {
            this.door.drawBack(ctx, this.theme);
        }

        // 6. Draw Particles
        this.drawParticles(ctx);

        // 7. Draw Player (Articulated silhouette with animated running legs, jumping arms & crawling on all fours)
        // In door_entering state, player steps into the hollow doorway with perspective depth!
        if (this.player.alive && (!this.door || this.door.state !== 'shut')) {
            const isEntering = (this.gameState === 'door_entering');
            const playerScale = isEntering ? Math.max(0.7, 1 - (this.door ? this.door.shutProgress : 0) * 0.3) : 1.0;

            ctx.save();
            if (isEntering) {
                ctx.translate(this.player.x, this.player.y);
                ctx.scale(playerScale, playerScale);
                ctx.translate(-this.player.x, -this.player.y);
            }

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

            // Overhead reversed indicator above player's head in world space
            if (this.reversedControls && this.player.alive) {
                const headY = this.player.y - (this.player.height || 26);
                const bob = Math.sin(Date.now() * 0.008) * 3;
                const indY = headY - 14 + bob;

                ctx.save();
                ctx.translate(this.player.x, indY);

                // Small sleek pill badge behind indicator
                ctx.fillStyle = 'rgba(18, 5, 5, 0.88)';
                ctx.strokeStyle = '#ef5350';
                ctx.lineWidth = 1.2;
                const pillW = 42;
                const pillH = 16;
                if (typeof ctx.roundRect === 'function') {
                    ctx.beginPath();
                    ctx.roundRect(-pillW / 2, -pillH / 2, pillW, pillH, 8);
                    ctx.fill();
                    ctx.stroke();
                } else {
                    ctx.fillRect(-pillW / 2, -pillH / 2, pillW, pillH);
                    ctx.strokeRect(-pillW / 2, -pillH / 2, pillW, pillH);
                }

                // Dynamic opposing arrow icons inside badge
                ctx.fillStyle = '#ff8a80';
                ctx.font = 'bold 10px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('◄ ⇄ ►', 0, 0);

                ctx.restore();
            }

            ctx.restore();
        }

        // 7b. Draw Door Foreground (Heavy timber panel slamming shut in front of player!)
        if (this.door) {
            this.door.drawFront(ctx, this.theme);
        }

        ctx.restore(); // Restore camera transform to draw HUD / overlays in screen space!

        // 7b. Inverted Controls Indicator (in screen space)
        if (this.reversedControls) {
            ctx.save();
            const pulseAlpha = 0.85 + Math.sin(Date.now() * 0.01) * 0.15;
            const bannerText = '⇄ CONTROLS REVERSED! [HOLD ◀ TO RUN ▶] ⇄';
            ctx.font = 'bold 13px "Courier New", monospace';
            const bannerW = ctx.measureText(bannerText).width + 30;
            const bannerH = 28;
            const bx = screenW / 2 - bannerW / 2;
            const by = 12;

            ctx.fillStyle = 'rgba(18, 5, 5, 0.9)';
            ctx.strokeStyle = `rgba(239, 83, 80, ${pulseAlpha})`;
            ctx.lineWidth = 1.6;
            if (typeof ctx.roundRect === 'function') {
                ctx.beginPath();
                ctx.roundRect(bx, by, bannerW, bannerH, 6);
                ctx.fill();
                ctx.stroke();
            } else {
                ctx.fillRect(bx, by, bannerW, bannerH);
                ctx.strokeRect(bx, by, bannerW, bannerH);
            }

            ctx.fillStyle = '#ff8a80';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(bannerText, screenW / 2, by + bannerH / 2);
            ctx.restore();
        }

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
            ctx.fillText("Preparing next trial...", screenW / 2, screenH / 2 + 22);
            ctx.restore();
        }

        // 9. Grand Ending Victory Animation (Level 200 Conquest!)
        if (this.gameState === 'game_completed') {
            this.drawEndingAnimation(ctx);
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
