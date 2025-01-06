const scripts = [
    {
        name: "READ ME",
        description: "Below are Discord bots that I've created. Each bot has its own unique features and purpose. Click the invite link to add them to your server. Make sure you have the necessary permissions in the server to add bots. The bots you can invite are hosted on my local hardware so if they stop working chances are somethings wrong with my hardware. If you want more bots message me on discord and I can make it.",
    },
    {
        name: "Discord Bots",
        description: "Below are my Discord bots available for public use",
    },
    {
        name: "ARMGDDON Search",
        description: "This bot links with the ARMGDDON software and allows you to search for PC and PCVR games.",
        howToUse: "Mention the bot followed by search and your search term. Example: @ARMGDDONSearch search Cuphead",
        features: [
            "Feature 1: Quickly search for games avalible on ARMGDDON without having to load the software.",
            "Feature 2: Easy to use and easy to tell when no results are found",
            "Feature 3: Something else amazing idk"
        ],
        inviteUrl: "https://discord.com/oauth2/authorize?client_id=1297217920153288764"
    }
];

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
        
        if (script.name === "READ ME" || script.name === "Discord Bots") {
            scriptContent.innerHTML = `
                <p>${script.description}</p>
            `;
            if (script.name === "Discord Bots") {
                scriptItem.classList.add('category-title');
                scriptHeader.classList.add('category-header');
            }
        } else {
            let howToUseHtml = script.howToUse ? `
                <h4>How to Use:</h4>
                <p class="how-to-use">${script.howToUse}</p>
            ` : '';
            
            let featuresHtml = '';
            if (script.features && script.features.length > 0) {
                featuresHtml = `
                    <h4>Features:</h4>
                    <ul>
                        ${script.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                `;
            }
            
            scriptContent.innerHTML = `
                <p>${script.description}</p>
                ${howToUseHtml}
                ${featuresHtml}
                <div class="button-container">
                    <a href="${script.inviteUrl}" target="_blank" class="bot-invite-btn">
                        <i class="fab fa-discord"></i> Add to Server
                    </a>
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

document.addEventListener('DOMContentLoaded', () => {
    createScriptElements();
    setupExpandButtons();
}); 