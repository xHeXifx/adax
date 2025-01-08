const scripts = [
    {
        name: "READ ME",
        description: "These scripts are designed to help troubleshoot common Windows issues. Some scripts require administrative privileges so if they dont work try running them as admin. Some scripts may need to be saved with a .bat extension to work properly. Some of these are SUPER basic stuff but to people who dont know a lot about computers they can be useful.",
    },
    {
        name: "Windows Tools",
        description: "Below are various Windows troubleshooting and maintenance scripts",
    },
    {
        name: "Network Reset",
        description: "Resets all network adapters and flushes DNS cache. Useful for fixing internet connectivity issues.",
        code: `@echo off
ipconfig /release
ipconfig /renew
ipconfig /flushdns
netsh winsock reset
netsh int ip reset
echo Network settings have been reset. Please restart your computer.
pause`,
        downloadUrl: "#"
    },
    {
        name: "System File Checker",
        description: "Scans and repairs Windows system files. This can fix corrupted system files and various Windows issues.",
        code: `@echo off
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth
echo System file check complete. Check the logs for details.
pause`,
        downloadUrl: "#"
    },
    {
        name: "Temp File Cleanup",
        description: "Cleans temporary files to free up disk space and potentially improve system performance.",
        code: `@echo off
del /s /f /q %temp%\\*.*
del /s /f /q C:\\Windows\\Temp\\*.*
echo Temporary files have been cleaned.
pause`,
        downloadUrl: "#"
    },
    {
        name: "Windows Update Reset",
        description: "Resets Windows Update components. Useful when Windows Updates are not working properly.",
        code: `@echo off
net stop wuauserv
net stop cryptSvc
net stop bits
net stop msiserver
del /f /q "%ALLUSERSPROFILE%\\Application Data\\Microsoft\\Network\\Downloader\\qmgr*.dat"
rmdir /s /q %systemroot%\\SoftwareDistribution
rmdir /s /q %systemroot%\\system32\\catroot2
net start wuauserv
net start cryptSvc
net start bits
net start msiserver
echo Windows Update components have been reset.
pause`,
        downloadUrl: "#"
    },
    {
        name: "VirusTotal Client",
        description: "A client for VirusTotal that allows you to scan files and urls for malware. This is avalible in both a command line and gui version. The GUI version is a lot simplier as all you need to do is right click a file and choose the virustotal option, the windows version of the VirusTotal cmd clien can be installed via winget by running 'winget install VirusTotal.vt-cli' or by downloading the portable version below.",
        code: `N/A`,
        downloadUrl: "#",
        hasMultipleVersions: true,
        cmdVersion: "https://drive.google.com/file/d/1ZcXVBbmEief8Y-itTOKwtoJDj0Hf3NxX/view?usp=drive_link",
        guiVersion: "https://drive.google.com/file/d/1fcL2eA62O5zLfPP3qxCOdzN3X9r79e1T/view?usp=drive_link"
    }
];

// Function to get Google Drive direct download link
function getGoogleDriveDirectLink(url) {
    if (url.includes('export=download')) {
        return url;
    }
    const fileId = url.match(/[-\w]{25,}/);
    if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId[0]}`;
    }
    return url;
}

function createScriptElements() {
    const container = document.querySelector('.scripts-container');
    
    scripts.forEach(script => {
        const scriptItem = document.createElement('div');
        scriptItem.className = 'script-item';
        
        const scriptHeader = document.createElement('div');
        scriptHeader.className = 'script-header';
        scriptHeader.innerHTML = `
            <h3>${script.name}</h3>
            <span class="expand-icon">▼</span>
        `;
        
        const scriptContent = document.createElement('div');
        scriptContent.className = 'script-content';
        
        if (script.name === "READ ME" || script.name === "Windows Tools") {
            scriptContent.innerHTML = `
                <p>${script.description}</p>
            `;
            if (script.name === "Windows Tools") {
                scriptItem.classList.add('category-title');
                scriptHeader.classList.add('category-header');
            }
        } else {
            let buttonsHtml = '';
            if (script.hasMultipleVersions) {
                buttonsHtml = `
                    <div class="button-container">
                        <button class="copy-btn" data-code="${script.code}">
                            <i class="fas fa-copy"></i> Copy Script
                        </button>
                        <button class="download-btn cmd-version" data-url="${script.cmdVersion}">
                            <i class="fas fa-download"></i> Command Version
                        </button>
                        <button class="download-btn gui-version" data-url="${script.guiVersion}">
                            <i class="fas fa-desktop"></i> GUI Client
                        </button>
                    </div>
                `;
            } else {
                buttonsHtml = `
                    <div class="button-container">
                        <button class="copy-btn" data-code="${script.code}">
                            <i class="fas fa-copy"></i> Copy Script
                        </button>
                    </div>
                `;
            }

            scriptContent.innerHTML = `
                <p>${script.description}</p>
                ${buttonsHtml}
            `;
        }
        
        scriptItem.appendChild(scriptHeader);
        scriptItem.appendChild(scriptContent);
        container.appendChild(scriptItem);
    });
}

function setupExpandButtons() {
    document.querySelectorAll('.script-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const scriptItem = header.parentElement;
            const expandIcon = header.querySelector('.expand-icon');
            
            content.classList.toggle('visible');
            scriptItem.classList.toggle('expanded');
            expandIcon.style.transform = content.classList.contains('visible') 
                ? 'rotate(180deg)' 
                : 'rotate(0deg)';
        });
    });
}

function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.stopPropagation();
            const code = button.dataset.code;
            
            try {
                await navigator.clipboard.writeText(code);
                const originalContent = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text:', err);
            }
        });
    });
}

function setupDownloadButtons() {
    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = getGoogleDriveDirectLink(button.dataset.url);
            const originalContent = button.innerHTML;
            
            window.open(url, '_blank');
            
            button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.classList.remove('copied');
            }, 2000);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createScriptElements();
    setupExpandButtons();
    setupCopyButtons();
    setupDownloadButtons();
}); 