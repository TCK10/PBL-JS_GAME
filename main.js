const config = {
    lineCount: 40,        
    blockCount: 20,       
    glitchInterval: 1500, 
    hoverIntensity: 8,   
    textGlitches: 6,      
    colors: [             
        'rgba(255, 0, 128, 0.7)',   
        'rgba(0, 255, 255, 0.7)',   
        'rgba(255, 255, 0, 0.6)',   
        'rgba(0, 255, 0, 0.5)',     
        'rgba(255, 0, 255, 0.7)',   
        'rgba(0, 128, 255, 0.7)'    
    ],
    glitchText: [      
        'ERROR', 
        '404', 
        'GLITCH', 
        'SYSTEM', 
        'SKIBIDI', 
        'SIGMA', 
        'YEAHH GAMBLING AMIRITE?!',
        'What?', 
        'VINE BOOM', 
        'NULL', 
        'Do people actually read these?', 
        'BALATRO?!', 
        'NAWW JIT TRIPPIN',
        'HII MADAMMMMM',
        'HII SIRRRR',
        'do you like the website? :)',
        'You Are An Idiot!',
        'kill me'
    ],
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

const container = document.getElementById('glitchContainer');
const glitchEffect = document.getElementById('glitchEffect');
const logoContainer = document.getElementById('logoContainer');

let lastTouchX = 0;
let lastTouchY = 0;
let isActive = false;
let throttleTimer = null;

function randomColor() {
    return config.colors[Math.floor(Math.random() * config.colors.length)];
}

function randomGlitchText() {
    return config.glitchText[Math.floor(Math.random() * config.glitchText.length)];
}

function initGlitch() {
    const glitchLayer = document.createElement('div');
    glitchLayer.className = 'glitch-layer';
    glitchEffect.appendChild(glitchLayer);

    const lineCount = config.isMobile ? Math.floor(config.lineCount * 0.7) : config.lineCount;
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'glitch-line';
      
        if (Math.random() > 0.7) {
            line.classList.add('colored');
        }
        line.style.top = `${Math.random() * 100}%`;
        line.style.opacity = Math.random() * 0.7 + 0.3; 
        glitchEffect.appendChild(line);
    }
    
    
    const blockCount = config.isMobile ? Math.floor(config.blockCount * 0.7) : config.blockCount;
    for (let i = 0; i < blockCount; i++) {
        createGlitchBlock();
    }
    
 
    const textCount = config.isMobile ? Math.floor(config.textGlitches * 0.5) : config.textGlitches;
    for (let i = 0; i < textCount; i++) {
        createTextGlitch();
    }
    
   
    setInterval(randomGlitch, config.isMobile ? config.glitchInterval * 1.2 : config.glitchInterval);
    
   
    const navIcons = document.querySelectorAll('.nav-icon');
    navIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            createGlitchAroundElement(icon, 3);
        });
    });
}


function createGlitchBlock() {
    const block = document.createElement('div');
    block.className = 'glitch-block';
    

    block.style.top = `${Math.random() * 100}%`;
    block.style.left = `${Math.random() * 100}%`;

    const width = 10 + Math.random() * 40;
    const height = 2 + Math.random() * 20;
    block.style.width = `${width}px`;
    block.style.height = `${height}px`;
    

    block.style.opacity = Math.random() * 0.5 + 0.3;
    
 
    block.style.backgroundColor = randomColor();
    block.style.color = randomColor();
    
    glitchEffect.appendChild(block);
    return block;
}


function createTextGlitch() {
    const textBlock = document.createElement('div');
    textBlock.className = 'glitch-text-block';
    

    textBlock.style.top = `${Math.random() * 100}%`;
    textBlock.style.left = `${Math.random() * 100}%`;
    

    textBlock.textContent = randomGlitchText();
    

    textBlock.style.color = randomColor();
    
    glitchEffect.appendChild(textBlock);
    return textBlock;
}


function createGlitchAroundElement(element, count) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < count; i++) {
        const block = createGlitchBlock();
        
       
        const radius = Math.max(rect.width, rect.height) * 1.5;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        
        block.style.top = `${centerY + Math.sin(angle) * distance}px`;
        block.style.left = `${centerX + Math.cos(angle) * distance}px`;
        
     
        setTimeout(() => {
            block.style.opacity = '0';
            setTimeout(() => {
                if (block.parentNode) {
                    block.remove();
                }
            }, 300);
        }, 200 + Math.random() * 300);
    }
}


function updateLogoWarp(x, y) {
    const logo = document.querySelector('.logo');
    const logoRect = logo.getBoundingClientRect();
    
    const logoX = logoRect.left + logoRect.width / 2;
    const logoY = logoRect.top + logoRect.height / 2;
    

    const dx = x - logoX;
    const dy = y - logoY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    

    const warpRange = 200;
    
    if (distance < warpRange) {
      
        const warpFactor = 1 - (distance / warpRange);
        const maxWarp = 15; 
        
     
        const moveX = dx * warpFactor * (maxWarp / warpRange);
        const moveY = dy * warpFactor * (maxWarp / warpRange);
        
       
        logoContainer.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        
        
        if (Math.random() > 0.9) {
            createGlitchAroundElement(logo, 1);
        }
    } else {
       
        logoContainer.style.transform = 'translate(-50%, -50%)';
    }
}


function randomGlitch() {
  
    const lines = document.querySelectorAll('.glitch-line');
    lines.forEach(line => {
        if (Math.random() > 0.6) { 
            line.style.top = `${Math.random() * 100}%`;
            line.style.opacity = Math.random() * 0.7 + 0.3;
            
           
            if (Math.random() > 0.7) {
                line.style.height = `${Math.random() * 5 + 1}px`;
            } else {
                line.style.height = '2px';
            }
            
         
            if (Math.random() > 0.7) {
                line.classList.add('colored');
            } else {
                line.classList.remove('colored');
            }
        }
    });
    
   
    const blocks = document.querySelectorAll('.glitch-block');
    blocks.forEach(block => {
        if (Math.random() > 0.7) {
            block.style.backgroundColor = randomColor();
            
           
            if (Math.random() > 0.5) {
                block.style.top = `${Math.random() * 100}%`;
                block.style.left = `${Math.random() * 100}%`;
            }
            
         
            if (Math.random() > 0.8) {
                block.remove();
                createGlitchBlock();
            }
        }
    });
    

    const textBlocks = document.querySelectorAll('.glitch-text-block');
    textBlocks.forEach(block => {
        if (Math.random() > 0.7) {
      
            if (Math.random() > 0.5) {
                block.textContent = randomGlitchText();
            }
            
          
            if (Math.random() > 0.6) {
                block.style.top = `${Math.random() * 100}%`;
                block.style.left = `${Math.random() * 100}%`;
            }
            
         
            if (Math.random() > 0.5) {
                block.style.color = randomColor();
            }
        }
    });
    

    if (Math.random() > 0.6) {
        createGlitchBlock();
    }
    
 
    if (Math.random() > 0.8) {
        createTextGlitch();
    }
    
  
    if (Math.random() > 0.95) {
        createMajorGlitch();
    }
}


function createMajorGlitch() {
   
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = randomColor();
    overlay.style.opacity = '0.2';
    overlay.style.mixBlendMode = 'exclusion';
    overlay.style.zIndex = '5';
    
    glitchEffect.appendChild(overlay);
    

    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 300);
    }, 100);
}


function handleInteraction(x, y) {
   
    if (throttleTimer) return;
    
    throttleTimer = setTimeout(() => {
        throttleTimer = null;
    }, config.isMobile ? 100 : 50);
    
    updateLogoWarp(x, y);
    
    const intensity = config.isMobile ? Math.floor(config.hoverIntensity * 0.6) : config.hoverIntensity;
    for (let i = 0; i < intensity; i++) {
        const block = createGlitchBlock();
        
        const offset = 150;
        block.style.top = `${y - offset/2 + Math.random() * offset}px`;
        block.style.left = `${x - offset/2 + Math.random() * offset}px`;
        
        setTimeout(() => {
            block.style.opacity = '0';
            setTimeout(() => {
                if (block.parentNode) {
                    block.remove();
                }
            }, 300);
        }, 100 + Math.random() * 300);
    }
    
    if (Math.random() > 0.7) {
        const textBlock = createTextGlitch();
        textBlock.style.top = `${y}px`;
        textBlock.style.left = `${x}px`;
        
        setTimeout(() => {
            textBlock.style.opacity = '0';
            setTimeout(() => {
                if (textBlock.parentNode) {
                    textBlock.remove();
                }
            }, 300);
        }, 500 + Math.random() * 500);
    }
    
    const lines = document.querySelectorAll('.glitch-line');
    const lineCount = Math.min(8, lines.length);
    for (let i = 0; i < lineCount; i++) {
        if (lines[i] && Math.random() > 0.3) {
            lines[i].style.top = `${y + Math.random() * 80 - 40}px`;
            lines[i].style.opacity = Math.random() * 0.8 + 0.2;
            lines[i].classList.add('colored');
        }
    }
    

    if (Math.random() > 0.9) {
        createMajorGlitch();
    }
}

container.addEventListener('mousemove', (e) => {
    handleInteraction(e.clientX, e.clientY);
});

container.addEventListener('touchstart', (e) => {
    isActive = true;
    if (e.touches && e.touches[0]) {
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
        handleInteraction(lastTouchX, lastTouchY);
    }
});

container.addEventListener('touchmove', (e) => {
    if (isActive && e.touches && e.touches[0]) {
        e.preventDefault(); 
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
        handleInteraction(lastTouchX, lastTouchY);
    }
});

container.addEventListener('touchend', () => {
    isActive = false;
});

initGlitch();

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');
});

// Add scroll behavior for navbar
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.scroll-nav');
    const yeppContainer = document.querySelector('.yepp-container');
    
    window.addEventListener('scroll', () => {
        const yeppBottom = yeppContainer.offsetTop + yeppContainer.offsetHeight;
        if (window.scrollY > yeppBottom - 100) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
    });
});

document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('mouseenter', () => {
        const chatbox = box.querySelector('.chatbox');
        chatbox.style.display = 'block';
    });

    box.addEventListener('mouseleave', () => {
        const chatbox = box.querySelector('.chatbox');
        chatbox.style.display = 'none';
    });
});