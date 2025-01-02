const scripts = [
    {
        name: "READ ME",
        description: "The softwares displayed here may trigger anti-viruses with false positives, to stop this i would recommend setting up a folder exclusion in your anti-virus. If you dont know how google it and you can find tutorials. If the button your looking at is a software the copy script button copies the google drive url.",
    },
    {
        name: "Roblox",
        description: "Below are scripts and software for Roblox. Roblox has a good anit-cheat so be careful when using the executors.",
    },
    {
        name: "Sirus",
        description: "Sirus is a universal script that has many features like flying, no clip, esp and more. Sirus also comes with a chat exporter which sends all chats to a discord webhook. Comes with a scripthub connected to scriptblox to easily execute any scripts needed",
        code: "loadstring(game:HttpGet('https://sirius.menu/sirius'))()",
        downloadUrl: "https://drive.google.com/file/d/17K0UPZb4xQ-DrUAR3ExGYzjvJI5DxSGu/view?usp=drive_link"
    },
    {
        name: "Infinite Yield",
        description: "Infinite Yield is a universal script that has many features like flying, no clip and more. Infinite Yield is a lot more compact compared to sirius and has a lot more features compared to sirius but not all are useful.",
        code: "loadstring(game:HttpGet('https://raw.githubusercontent.com/xHeXifx/infiniteyield/refs/heads/main/Infinite%20Yield.lua'))()",
        downloadUrl: "https://drive.google.com/file/d/1Hk5AxuG2qcH3aaCKUlrgBP3aPKayCs5e/view?usp=drive_link"
    },
    {
        name: "Xeno Executor",
        description: "Xeno executor is one of the few free executors that work with the web verison of roblox. It doesnt have as many features as typical paid executor but it does what it needs to do. I would HIGHLY suggest using a alt account when using web executors as byfron is good at what it does.",
        code: "https://drive.google.com/file/d/1IFHTLRPBivNBGThSHAtWCizmzljxQomz/view?usp=drive_link",
        downloadUrl: "https://drive.google.com/file/d/1IFHTLRPBivNBGThSHAtWCizmzljxQomz/view?usp=drive_link"
    },
    {
        name: "Vega X",
        description: "Vega X is a executor i used to use a lot before byfron, they now really only offer a emulator apk but it still works great. The link is for there website as they update the apk.",
        code: "https://vegax.gg",
        downloadUrl: "https://vegax.gg"
    },
    {
        name: "Misc",
        description: "Below are scripts and software for other games",
    },
    {
        name: "Xenos Injector",
        description: "Xenos is a injector for games, its pretty easy to detect so use it on games that dont have anti-cheat. No games with Battle-eye will work as they detect when new .dlls are injected.",
        code: "https://drive.google.com/file/d/1RjPS_cD9lpr5X2e3LBknAkUBSIiEhq_j/view?usp=drive_link",
        downloadUrl: "https://drive.google.com/file/d/1RjPS_cD9lpr5X2e3LBknAkUBSIiEhq_j/view?usp=drive_link"
    },
    {
        name: "ARMGDDON",
        description: "ARMGDDON is a massive library of pirated games, downloading and installing them is really simple same goes for setup. Copying the 'script' will copy the link for their telegram group",
        code: "https://t.me/ARMGDDNGames",
        downloadUrl: "https://drive.google.com/file/d/1vKjkFJvkx9xdFjSBVWCAVluvR-xNvm1e/view?usp=drive_link"
    },
    {
        name: "Anti Recoil",
        description: "Anti Recoil is a script that allows you to use anti-recoil on any game. It is a universal script so it works on any game. Works by dragging your mouse down to go agaisnt the recoil",
        code: "https://drive.google.com/file/d/1B0SIE5-1UwSVAwTlRZeJix7pXkDEbJbW/view?usp=drive_link",
        downloadUrl: "https://drive.google.com/file/d/1B0SIE5-1UwSVAwTlRZeJix7pXkDEbJbW/view?usp=drive_link"
    }
];

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
        
        if (script.name === "READ ME") {
            scriptContent.innerHTML = `
                <p>${script.description}</p>
                <div class="button-container">
                    <button class="socials-btn" data-url="https://ebio.gg/@hexif">
                        <i class="fas fa-users"></i> My Socials
                    </button>
                </div>
            `;
        } else if (script.name === "Roblox" || script.name === "Misc") {
            scriptContent.innerHTML = `
                <p>${script.description}</p>
            `;
            scriptItem.classList.add('category-title');
            scriptHeader.classList.add('category-header');
        } else {
            scriptContent.innerHTML = `
                <p>${script.description}</p>
                <div class="button-container">
                    <button class="copy-btn" data-code="${script.code}">
                        <i class="fas fa-copy"></i> Copy Script
                    </button>
                    <button class="download-btn" data-url="${script.downloadUrl}">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
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

function setupSocialsButton() {
    const socialsBtn = document.querySelector('.socials-btn');
    if (socialsBtn) {
        socialsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.open(socialsBtn.dataset.url, '_blank');
            
            const originalContent = socialsBtn.innerHTML;
            socialsBtn.innerHTML = '<i class="fas fa-check"></i> Opened!';
            socialsBtn.classList.add('copied');
            
            setTimeout(() => {
                socialsBtn.innerHTML = originalContent;
                socialsBtn.classList.remove('copied');
            }, 2000);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createScriptElements();
    setupExpandButtons();
    setupCopyButtons();
    setupDownloadButtons();
    setupSocialsButton();
});
