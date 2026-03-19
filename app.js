// Color Picker Application
class ColorPicker {
    constructor() {
        this.canvas = document.getElementById('colorCanvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.previewSwatch = document.getElementById('previewSwatch');
        this.notification = document.getElementById('notification');
        
        this.colorValues = {
            hex: document.querySelector('#hexValue .value'),
            rgb: document.querySelector('#rgbValue .value'),
            hsl: document.querySelector('#hslValue .value')
        };
        
        this.currentColor = { r: 255, g: 255, b: 255 };
        
        this.init();
    }
    
    init() {
        this.drawGradient();
        this.setupEventListeners();
        this.updateColorDisplay(this.currentColor);
    }
    
    drawGradient() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Create horizontal hue gradient
        for (let x = 0; x < width; x++) {
            const hue = (x / width) * 360;
            
            // Create vertical saturation/lightness gradient
            const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, `hsl(${hue}, 100%, 100%)`);
            gradient.addColorStop(0.5, `hsl(${hue}, 100%, 50%)`);
            gradient.addColorStop(1, `hsl(${hue}, 100%, 0%)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, 0, 1, height);
        }
    }
    
    setupEventListeners() {
        // Canvas click
        this.canvas.addEventListener('click', (e) => {
            this.handleCanvasClick(e);
        });
        
        // Color value clicks for copying
        document.querySelectorAll('.color-value').forEach(element => {
            element.addEventListener('click', () => {
                const format = element.getAttribute('data-format');
                this.copyToClipboard(format);
            });
        });
    }
    
    handleCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
        
        const imageData = this.ctx.getImageData(x, y, 1, 1);
        const pixel = imageData.data;
        
        this.currentColor = {
            r: pixel[0],
            g: pixel[1],
            b: pixel[2]
        };
        
        this.updateColorDisplay(this.currentColor);
    }
    
    updateColorDisplay(color) {
        const { r, g, b } = color;
        
        // Update preview swatch
        this.previewSwatch.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        // Update HEX
        const hex = this.rgbToHex(r, g, b);
        this.colorValues.hex.textContent = hex;
        
        // Update RGB
        this.colorValues.rgb.textContent = `rgb(${r}, ${g}, ${b})`;
        
        // Update HSL
        const hsl = this.rgbToHsl(r, g, b);
        this.colorValues.hsl.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
    
    rgbToHex(r, g, b) {
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    
    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }
    
    async copyToClipboard(format) {
        let textToCopy;
        
        switch (format) {
            case 'hex':
                textToCopy = this.colorValues.hex.textContent;
                break;
            case 'rgb':
                textToCopy = this.colorValues.rgb.textContent;
                break;
            case 'hsl':
                textToCopy = this.colorValues.hsl.textContent;
                break;
        }
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            this.showNotification();
        } catch (err) {
            // Fallback for older browsers
            this.fallbackCopy(textToCopy);
        }
    }
    
    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification();
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        
        document.body.removeChild(textArea);
    }
    
    showNotification() {
        this.notification.classList.add('show');
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 2000);
    }
}

// Initialize the color picker when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ColorPicker();
});
