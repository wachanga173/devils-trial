/**
 * Devil's Trial - Local Development Server with Native File Explorer Launch Support
 * Zero-dependency Node.js HTTP server.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const os = require('os');
const { exec } = require('child_process');

const PORT = parseInt(process.env.PORT || '3333', 10);
const BASE_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.webm': 'video/webm'
};

function resolveFirefoxProfileDir() {
    if (process.platform !== 'win32') return null;
    const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
    const profilesDir = path.join(appData, 'Mozilla', 'Firefox', 'Profiles');
    if (!fs.existsSync(profilesDir)) return null;

    try {
        const dirs = fs.readdirSync(profilesDir).filter(f => {
            try {
                return fs.statSync(path.join(profilesDir, f)).isDirectory();
            } catch (e) {
                return false;
            }
        });
        if (dirs.length === 0) return null;
        // Prioritize default-release profile
        const active = dirs.find(d => d.includes('default-release')) || dirs.find(d => d.includes('default')) || dirs[0];
        const storageDefault = path.join(profilesDir, active, 'storage', 'default');
        if (fs.existsSync(storageDefault)) return storageDefault;
        return path.join(profilesDir, active);
    } catch (e) {
        return null;
    }
}

function expandStoragePath(rawPath) {
    if (!rawPath || typeof rawPath !== 'string') return null;

    let clean = rawPath.trim();
    if (clean.startsWith('"') && clean.endsWith('"')) {
        clean = clean.slice(1, -1);
    }

    if (process.platform === 'win32') {
        const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
        const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
        clean = clean.replace(/%LocalAppData%/gi, localAppData);
        clean = clean.replace(/%AppData%/gi, appData);
        clean = clean.replace(/%UserProfile%/gi, os.homedir());

        // Resolve placeholder Firefox profile if present
        if (clean.includes('<Profile>')) {
            const resolvedFf = resolveFirefoxProfileDir();
            if (resolvedFf) {
                clean = resolvedFf;
            } else {
                clean = clean.replace('<Profile>', '');
            }
        }
    } else {
        if (clean.startsWith('~/')) {
            clean = path.join(os.homedir(), clean.slice(2));
        }
    }

    return path.normalize(clean);
}

function openInFileExplorer(targetPath, callback) {
    if (!targetPath) return callback(new Error('Invalid path'));

    let candidate = targetPath;
    // Walk up until an existing directory is found
    while (candidate && candidate !== path.dirname(candidate)) {
        if (fs.existsSync(candidate)) break;
        candidate = path.dirname(candidate);
    }

    if (!candidate || !fs.existsSync(candidate)) {
        return callback(new Error('Target directory does not exist on disk'));
    }

    const platform = process.platform;
    console.log(`[Explorer API] Launching folder window (${platform}): ${candidate}`);

    if (platform === 'win32') {
        // PowerShell Start-Process properly hands off the folder window to Windows Explorer desktop shell
        const psCmd = `powershell.exe -NoProfile -NonInteractive -Command "Start-Process explorer.exe -ArgumentList '\\"${candidate}\\"'"`;
        exec(psCmd, (err, stdout, stderr) => {
            if (err) {
                console.warn('[Explorer API] Start-Process failed, attempting explorer.exe fallback:', err);
                exec(`explorer.exe "${candidate}"`);
            }
            callback(null, candidate);
        });
    } else if (platform === 'darwin') {
        exec(`open "${candidate}"`, (err) => {
            callback(err, candidate);
        });
    } else {
        exec(`xdg-open "${candidate}"`, (err) => {
            callback(err, candidate);
        });
    }
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // API: Detect actual on-disk storage directory
    if (pathname === '/api/detect-storage-path') {
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.setHeader('Access-Control-Allow-Origin', '*');

        const ua = parsedUrl.query.ua || '';
        let detectedOS = 'Windows (Desktop)';
        let resolvedPath = path.join(os.homedir(), 'AppData', 'Local');

        if (process.platform === 'win32') {
            const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
            const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');

            if (/Firefox/i.test(ua)) {
                detectedOS = 'Windows (Mozilla Firefox)';
                const ff = resolveFirefoxProfileDir();
                resolvedPath = ff || path.join(appData, 'Mozilla', 'Firefox', 'Profiles');
            } else if (/OPR|Opera/i.test(ua)) {
                if (/Opera GX/i.test(ua)) {
                    detectedOS = 'Windows (Opera GX)';
                    resolvedPath = path.join(appData, 'Opera Software', 'Opera GX Stable', 'Local Storage', 'leveldb');
                } else {
                    detectedOS = 'Windows (Opera)';
                    resolvedPath = path.join(appData, 'Opera Software', 'Opera Stable', 'Local Storage', 'leveldb');
                }
            } else if (/Vivaldi/i.test(ua)) {
                detectedOS = 'Windows (Vivaldi)';
                resolvedPath = path.join(localAppData, 'Vivaldi', 'User Data', 'Default', 'Local Storage', 'leveldb');
            } else if (/Edg/i.test(ua)) {
                detectedOS = 'Windows (Microsoft Edge)';
                resolvedPath = path.join(localAppData, 'Microsoft', 'Edge', 'User Data', 'Default', 'Local Storage', 'leveldb');
            } else if (/Brave/i.test(ua)) {
                detectedOS = 'Windows (Brave Browser)';
                resolvedPath = path.join(localAppData, 'BraveSoftware', 'Brave-Browser', 'User Data', 'Default', 'Local Storage', 'leveldb');
            } else {
                detectedOS = 'Windows (Google Chrome)';
                resolvedPath = path.join(localAppData, 'Google', 'Chrome', 'User Data', 'Default', 'Local Storage', 'leveldb');
            }
        } else if (process.platform === 'darwin') {
            if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
                detectedOS = 'macOS (Apple Safari)';
                resolvedPath = path.join(os.homedir(), 'Library', 'Containers', 'com.apple.Safari', 'Data', 'Library', 'LocalStorage');
            } else {
                detectedOS = 'macOS (Google Chrome)';
                resolvedPath = path.join(os.homedir(), 'Library', 'Application Support', 'Google', 'Chrome', 'Default', 'Local Storage', 'leveldb');
            }
        } else if (process.platform === 'linux') {
            if (/Firefox/i.test(ua)) {
                detectedOS = 'Linux (Mozilla Firefox)';
                resolvedPath = path.join(os.homedir(), '.mozilla', 'firefox');
            } else {
                detectedOS = 'Linux (Google Chrome)';
                resolvedPath = path.join(os.homedir(), '.config', 'google-chrome', 'Default', 'Local Storage', 'leveldb');
            }
        }

        // Add trailing backslash for visual directory clarity
        if (!resolvedPath.endsWith(path.sep)) {
            resolvedPath += path.sep;
        }

        return res.end(JSON.stringify({
            success: true,
            detectedOS,
            resolvedPath,
            exists: fs.existsSync(resolvedPath)
        }));
    }

    // API: Open Storage Directory in OS File Explorer
    if (pathname === '/api/open-storage-dir') {
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.setHeader('Access-Control-Allow-Origin', '*');

        const rawPath = parsedUrl.query.path;
        if (!rawPath) {
            res.writeHead(400);
            return res.end(JSON.stringify({ success: false, error: 'Missing path parameter' }));
        }

        const expanded = expandStoragePath(rawPath);
        if (!expanded) {
            res.writeHead(400);
            return res.end(JSON.stringify({ success: false, error: 'Could not expand path' }));
        }

        // Basic security validation: path must be a browser profile / local storage path
        const lower = expanded.toLowerCase();
        const isValidStorage = lower.includes('local storage') ||
                               lower.includes('leveldb') ||
                               lower.includes('brave') ||
                               lower.includes('chrome') ||
                               lower.includes('edge') ||
                               lower.includes('firefox') ||
                               lower.includes('mozilla') ||
                               lower.includes('appdata') ||
                               lower.includes('library');

        if (!isValidStorage) {
            res.writeHead(403);
            return res.end(JSON.stringify({ success: false, error: 'Path not permitted' }));
        }

        openInFileExplorer(expanded, (err, opened) => {
            if (err) {
                res.writeHead(500);
                return res.end(JSON.stringify({ success: false, error: err.message, path: expanded }));
            }
            res.writeHead(200);
            return res.end(JSON.stringify({ success: true, openedPath: opened }));
        });
        return;
    }

    // Health check
    if (pathname === '/api/health') {
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.writeHead(200);
        return res.end(JSON.stringify({ status: 'ok', game: "DEVIL'S TRIAL" }));
    }

    // API: Check Python AI Agent status
    if (pathname === '/api/ai-status') {
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        const pythonScript = path.join(BASE_DIR, 'ai_agent.py');
        exec(`python "${pythonScript}" --classify "{}"`, (err, stdout) => {
            if (err) {
                res.writeHead(200);
                return res.end(JSON.stringify({ available: false, error: err.message }));
            }
            res.writeHead(200);
            return res.end(JSON.stringify({ available: true, engine: 'Python 3 Adaptive RL Agent', status: 'ready' }));
        });
        return;
    }

    // API: Predict player profile and select adaptive traps using Python ML model
    if (pathname === '/api/ai-predict' && req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.setHeader('Access-Control-Allow-Origin', '*');

        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const pythonScript = path.join(BASE_DIR, 'ai_agent.py');
            const child = exec(`python "${pythonScript}"`, { maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
                if (err) {
                    res.writeHead(500);
                    return res.end(JSON.stringify({ success: false, error: err.message }));
                }
                try {
                    const parsed = JSON.parse(stdout);
                    res.writeHead(200);
                    return res.end(JSON.stringify({ success: true, ...parsed }));
                } catch (pe) {
                    res.writeHead(500);
                    return res.end(JSON.stringify({ success: false, error: 'Invalid Python JSON output', raw: stdout }));
                }
            });

            const payload = { action: 'predict' };
            try {
                const parsedBody = JSON.parse(body);
                Object.assign(payload, parsedBody);
            } catch (e) {}

            child.stdin.write(JSON.stringify(payload));
            child.stdin.end();
        });
        return;
    }

    // API: Learn from player death or stage clear using Python RL model
    if (pathname === '/api/ai-learn' && req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.setHeader('Access-Control-Allow-Origin', '*');

        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            let parsedReq = {};
            try { parsedReq = JSON.parse(body); } catch (e) {}

            const action = parsedReq.type === 'clear' ? 'learn-clear' : 'learn-death';
            const pythonScript = path.join(BASE_DIR, 'ai_agent.py');
            const child = exec(`python "${pythonScript}"`, { maxBuffer: 1024 * 1024 }, (err, stdout) => {
                if (err) {
                    res.writeHead(500);
                    return res.end(JSON.stringify({ success: false, error: err.message }));
                }
                try {
                    const parsed = JSON.parse(stdout);
                    res.writeHead(200);
                    return res.end(JSON.stringify({ success: true, ...parsed }));
                } catch (pe) {
                    res.writeHead(200);
                    return res.end(JSON.stringify({ success: true }));
                }
            });

            child.stdin.write(JSON.stringify({ action: action, event: parsedReq.event || parsedReq }));
            child.stdin.end();
        });
        return;
    }

    // Static File Serving
    if (pathname === '/') {
        pathname = '/index.html';
    }

    const safePath = path.normalize(path.join(BASE_DIR, pathname));
    if (!safePath.startsWith(BASE_DIR)) {
        res.writeHead(403);
        return res.end('Access Denied');
    }

    fs.stat(safePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
            return res.end('404 Not Found: ' + pathname);
        }

        const ext = path.extname(safePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': stats.size,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Access-Control-Allow-Origin': '*'
        });

        const readStream = fs.createReadStream(safePath);
        readStream.pipe(res);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`[Devil's Trial Server] Running at http://localhost:${PORT}/`);
    console.log(`[Storage API] /api/open-storage-dir enabled for one-click File Explorer navigation`);
});
