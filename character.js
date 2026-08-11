const characterState = {
    skinTone: 50,
    skinColor: '#f5d0c5',
    hairStyle: 'short',
    hairColor: '#2d3748',
    eyeStyle: 'round',
    eyeColor: '#667eea',
    outfitStyle: 'casual',
    outfitColor: '#667eea',
    accessories: [],
    backgroundType: 'gradient',
    bgColor1: '#e0e7ff',
    bgColor2: '#f0f9ff'
};

const svgNS = "http://www.w3.org/2000/svg";

function getSkinColor() {
    const tones = ['#fff5eb', '#ffe8d9', '#f5d0c5', '#e8b5a0', '#d4a085', '#c08868', '#a87050', '#8d5838', '#6b4028', '#4a2c18'];
    const index = Math.floor((characterState.skinTone / 100) * (tones.length - 1));
    return characterState.skinColor || tones[index];
}

function createSVGElement(tag, attrs = {}) {
    const el = document.createElementNS(svgNS, tag);
    for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
    return el;
}

function clearSVG() {
    const svg = document.getElementById('characterSVG');
    while (svg.firstChild) svg.removeChild(svg.firstChild);
}

function shadeColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function drawBackground() {
    const defs = createSVGElement('defs');
    if (characterState.backgroundType === 'gradient' || characterState.backgroundType === 'scene') {
        const gradient = createSVGElement('linearGradient', { id: 'bgGradient', x1: '0%', y1: '0%', x2: '0%', y2: '100%' });
        gradient.appendChild(createSVGElement('stop', { offset: '0%', 'stop-color': characterState.bgColor1 }));
        gradient.appendChild(createSVGElement('stop', { offset: '100%', 'stop-color': characterState.bgColor2 }));
        defs.appendChild(gradient);
    }
    document.getElementById('characterSVG').appendChild(defs);
    document.getElementById('characterSVG').appendChild(createSVGElement('rect', { x: '0', y: '0', width: '400', height: '500', fill: characterState.backgroundType === 'solid' ? characterState.bgColor1 : 'url(#bgGradient)' }));
    if (characterState.backgroundType === 'scene') {
        document.getElementById('characterSVG').appendChild(createSVGElement('rect', { x: '30', y: '40', width: '90', height: '120', fill: '#87ceeb', stroke: '#ffffff', 'stroke-width': '4' }));
        document.getElementById('characterSVG').appendChild(createSVGElement('line', { x1: '75', y1: '40', x2: '75', y2: '160', stroke: '#ffffff', 'stroke-width': '3' }));
        document.getElementById('characterSVG').appendChild(createSVGElement('line', { x1: '30', y1: '100', x2: '120', y2: '100', stroke: '#ffffff', 'stroke-width': '3' }));
        document.getElementById('characterSVG').appendChild(createSVGElement('rect', { x: '0', y: '380', width: '400', height: '120', fill: '#d4a574' }));
    }
}

function drawBody() {
    const group = createSVGElement('g', { id: 'bodyGroup' });
    const outfitColor = characterState.outfitColor;
    const skinColor = getSkinColor();
    
    // Neck
    group.appendChild(createSVGElement('rect', { x: '185', y: '145', width: '30', height: '35', fill: skinColor, stroke: '#2d3748', 'stroke-width': '2' }));
    
    // Torso with shoulders
    group.appendChild(createSVGElement('path', { d: "M 155 175 Q 140 185 135 200 L 135 280 Q 135 295 150 300 L 250 300 Q 265 295 265 280 L 265 200 Q 260 185 245 175 Z", fill: outfitColor, stroke: '#2d3748', 'stroke-width': '2.5' }));
    
    const outfitDetails = createSVGElement('g', { id: 'outfitDetails' });
    if (characterState.outfitStyle === 'school') {
        outfitDetails.appendChild(createSVGElement('path', { d: "M 185 175 L 185 210 L 170 220 L 170 180 Z", fill: '#ffffff', stroke: '#2d3748', 'stroke-width': '1.5' }));
        outfitDetails.appendChild(createSVGElement('path', { d: "M 215 175 L 215 210 L 230 220 L 230 180 Z", fill: '#ffffff', stroke: '#2d3748', 'stroke-width': '1.5' }));
        outfitDetails.appendChild(createSVGElement('path', { d: "M 197 185 L 203 185 L 200 230 Z", fill: '#dc2626', stroke: '#2d3748', 'stroke-width': '1' }));
    } else if (characterState.outfitStyle === 'formal') {
        outfitDetails.appendChild(createSVGElement('path', { d: "M 175 180 Q 200 180 200 220 L 200 280 L 175 280 Z", fill: shadeColor(outfitColor, -20), stroke: '#2d3748', 'stroke-width': '1.5' }));
        outfitDetails.appendChild(createSVGElement('path', { d: "M 225 180 Q 200 180 200 220 L 200 280 L 225 280 Z", fill: shadeColor(outfitColor, -20), stroke: '#2d3748', 'stroke-width': '1.5' }));
        for (let i = 0; i < 3; i++) outfitDetails.appendChild(createSVGElement('circle', { cx: '200', cy: 210 + i * 25, r: '4', fill: '#fbbf24', stroke: '#2d3748', 'stroke-width': '1' }));
    } else if (characterState.outfitStyle === 'sporty') {
        outfitDetails.appendChild(createSVGElement('path', { d: "M 175 175 Q 200 200 225 175", fill: 'none', stroke: shadeColor(outfitColor, -30), 'stroke-width': '3' }));
        outfitDetails.appendChild(createSVGElement('rect', { x: '145', y: '240', width: '110', height: '15', fill: shadeColor(outfitColor, 20), opacity: '0.7' }));
    } else if (characterState.outfitStyle === 'fantasy') {
        outfitDetails.appendChild(createSVGElement('path', { d: "M 170 175 Q 165 190 170 200 L 180 195 L 180 210 L 220 210 L 220 195 L 230 200 Q 235 190 230 175 Q 200 185 170 175", fill: shadeColor(outfitColor, -20), stroke: '#fbbf24', 'stroke-width': '2' }));
        outfitDetails.appendChild(createSVGElement('circle', { cx: '200', cy: '195', r: '5', fill: '#ef4444', stroke: '#fbbf24', 'stroke-width': '1.5' }));
    } else {
        outfitDetails.appendChild(createSVGElement('ellipse', { cx: '200', cy: '180', rx: '25', ry: '10', fill: shadeColor(outfitColor, -15), stroke: '#2d3748', 'stroke-width': '1.5' }));
    }
    group.appendChild(outfitDetails);
    
    // Arms
    const arms = createSVGElement('g', { id: 'arms' });
    arms.appendChild(createSVGElement('path', { d: "M 140 185 Q 120 220 115 260 Q 113 275 120 280 L 135 280 Q 145 275 145 260 Q 145 230 150 200", fill: outfitColor, stroke: '#2d3748', 'stroke-width': '2.5' }));
    arms.appendChild(createSVGElement('path', { d: "M 260 185 Q 280 220 285 260 Q 287 275 280 280 L 265 280 Q 255 275 255 260 Q 255 230 250 200", fill: outfitColor, stroke: '#2d3748', 'stroke-width': '2.5' }));
    group.appendChild(arms);
    document.getElementById('characterSVG').appendChild(group);
}

function drawHead() {
    const group = createSVGElement('g', { id: 'headGroup' });
    const skinColor = getSkinColor();
    
    // Anime-style head with defined jawline and chin
    group.appendChild(createSVGElement('path', { 
        d: "M 165 100 C 165 85 175 75 200 75 C 225 75 235 85 235 100 C 235 115 235 135 230 150 C 225 165 215 180 200 190 C 185 180 175 165 170 150 C 165 135 165 115 165 100 Z", 
        fill: skinColor, stroke: '#2d3748', 'stroke-width': '2.5' 
    }));
    
    // Blush
    group.appendChild(createSVGElement('ellipse', { cx: '178', cy: '145', rx: '10', ry: '6', fill: '#ffb6c1', opacity: '0.4' }));
    group.appendChild(createSVGElement('ellipse', { cx: '222', cy: '145', rx: '10', ry: '6', fill: '#ffb6c1', opacity: '0.4' }));
    
    document.getElementById('characterSVG').appendChild(group);
}

function drawEyes() {
    const group = createSVGElement('g', { id: 'eyesGroup' });
    const eyeColor = characterState.eyeColor;
    const style = characterState.eyeStyle;
    
    let eyeWidth, eyeHeight, eyeY;
    switch(style) {
        case 'round': eyeWidth = 22; eyeHeight = 26; eyeY = 130; break;
        case 'almond': eyeWidth = 24; eyeHeight = 20; eyeY = 132; break;
        case 'narrow': eyeWidth = 26; eyeHeight = 16; eyeY = 134; break;
        case 'large': eyeWidth = 28; eyeHeight = 30; eyeY = 128; break;
        default: eyeWidth = 22; eyeHeight = 26; eyeY = 130;
    }
    
    const leftEyeX = 182, rightEyeX = 218;

    function createEye(cx, cy) {
        const eyeGroup = createSVGElement('g', {});
        
        // Eye white (almond shape)
        eyeGroup.appendChild(createSVGElement('path', { 
            d: `M ${cx - eyeWidth} ${cy} Q ${cx - eyeWidth/2} ${cy - eyeHeight} ${cx} ${cy - eyeHeight/2} Q ${cx + eyeWidth/2} ${cy - eyeHeight} ${cx + eyeWidth} ${cy} Q ${cx + eyeWidth/2} ${cy + eyeHeight} ${cx} ${cy + eyeHeight/2} Q ${cx - eyeWidth/2} ${cy + eyeHeight} ${cx - eyeWidth} ${cy} Z`, 
            fill: '#ffffff', stroke: '#2d3748', 'stroke-width': '2' 
        }));
        
        // Iris
        eyeGroup.appendChild(createSVGElement('ellipse', { cx: cx, cy: cy + 2, rx: eyeWidth * 0.5, ry: eyeHeight * 0.5, fill: eyeColor, stroke: '#2d3748', 'stroke-width': '1.5' }));
        
        // Pupil
        eyeGroup.appendChild(createSVGElement('ellipse', { cx: cx, cy: cy + 2, rx: eyeWidth * 0.25, ry: eyeHeight * 0.3, fill: '#1a1a2e' }));
        
        // Main highlight/glint
        eyeGroup.appendChild(createSVGElement('ellipse', { cx: cx - eyeWidth * 0.25, cy: cy - eyeHeight * 0.2, rx: eyeWidth * 0.15, ry: eyeHeight * 0.15, fill: '#ffffff', opacity: '0.9' }));
        
        // Secondary highlight
        eyeGroup.appendChild(createSVGElement('circle', { cx: cx + eyeWidth * 0.3, cy: cy + eyeHeight * 0.25, r: eyeWidth * 0.08, fill: '#ffffff', opacity: '0.7' }));
        
        return eyeGroup;
    }
    
    group.appendChild(createEye(leftEyeX, eyeY));
    group.appendChild(createEye(rightEyeX, eyeY));
    
    // Eyebrows
    const browY = eyeY - eyeHeight - 8;
    group.appendChild(createSVGElement('path', { d: `M ${leftEyeX - 15} ${browY} Q ${leftEyeX} ${browY - 5} ${leftEyeX + 12} ${browY}`, fill: 'none', stroke: characterState.hairColor, 'stroke-width': '3', 'stroke-linecap': 'round' }));
    group.appendChild(createSVGElement('path', { d: `M ${rightEyeX - 12} ${browY} Q ${rightEyeX} ${browY - 5} ${rightEyeX + 15} ${browY}`, fill: 'none', stroke: characterState.hairColor, 'stroke-width': '3', 'stroke-linecap': 'round' }));
    
    document.getElementById('characterSVG').appendChild(group);
}

function drawNoseAndMouth() {
    const group = createSVGElement('g', { id: 'noseMouthGroup' });
    const skinColor = getSkinColor();
    
    // Small subtle nose
    group.appendChild(createSVGElement('path', { d: "M 200 152 Q 198 158 196 160", fill: 'none', stroke: shadeColor(skinColor, -30), 'stroke-width': '1.5', 'stroke-linecap': 'round' }));
    
    // Small curved mouth
    group.appendChild(createSVGElement('path', { d: "M 192 172 Q 200 178 208 172", fill: 'none', stroke: '#c44569', 'stroke-width': '2', 'stroke-linecap': 'round' }));
    
    // Lip shading
    group.appendChild(createSVGElement('path', { d: "M 194 174 Q 200 177 206 174", fill: '#ffb6c1', opacity: '0.5' }));
    
    document.getElementById('characterSVG').appendChild(group);
}

function drawHair() {
    const group = createSVGElement('g', { id: 'hairGroup' });
    const hairColor = characterState.hairColor;
    const style = characterState.hairStyle;
    
    const backHair = createSVGElement('path', { fill: shadeColor(hairColor, -15), stroke: '#2d3748', 'stroke-width': '2.5' });
    const frontHair = createSVGElement('path', { fill: hairColor, stroke: '#2d3748', 'stroke-width': '2.5' });
    const strands = createSVGElement('g', { id: 'hairStrands' });

    switch(style) {
        case 'short':
            backHair.setAttribute('d', "M 160 110 L 150 140 L 155 170 L 170 180 L 230 180 L 245 170 L 250 140 L 240 110 Q 200 95 160 110");
            frontHair.setAttribute('d', "M 200 75 C 185 75 175 90 170 105 C 165 120 160 130 165 140 C 170 135 180 130 190 132 C 195 125 200 120 200 120 C 200 120 205 125 210 132 C 220 130 230 135 235 140 C 240 130 235 120 230 105 C 225 90 215 75 200 75");
            strands.appendChild(createSVGElement('path', { d: "M 175 100 Q 170 120 168 140", fill: 'none', stroke: shadeColor(hairColor, -20), 'stroke-width': '1.5' }));
            strands.appendChild(createSVGElement('path', { d: "M 225 100 Q 230 120 232 140", fill: 'none', stroke: shadeColor(hairColor, -20), 'stroke-width': '1.5' }));
            break;
        case 'medium':
            backHair.setAttribute('d', "M 155 110 L 140 150 L 140 200 L 155 220 L 245 220 L 260 200 L 260 150 L 245 110 Q 200 95 155 110");
            frontHair.setAttribute('d', "M 200 75 C 180 75 168 95 162 115 C 156 135 152 150 160 160 C 168 155 178 148 188 152 C 194 140 200 132 200 132 C 200 132 206 140 212 152 C 222 148 232 155 240 160 C 248 150 244 135 238 115 C 232 95 220 75 200 75");
            strands.appendChild(createSVGElement('path', { d: "M 170 105 Q 162 135 158 170", fill: 'none', stroke: shadeColor(hairColor, -20), 'stroke-width': '1.5' }));
            strands.appendChild(createSVGElement('path', { d: "M 230 105 Q 238 135 242 170", fill: 'none', stroke: shadeColor(hairColor, -20), 'stroke-width': '1.5' }));
            break;
        case 'long':
            backHair.setAttribute('d', "M 150 110 L 130 160 L 125 250 L 140 300 L 260 300 L 275 250 L 270 160 L 250 110 Q 200 95 150 110");
            frontHair.setAttribute('d', "M 200 75 C 175 75 162 100 155 125 C 148 150 142 175 152 185 C 162 180 175 170 188 175 C 195 160 200 150 200 150 C 200 150 205 160 212 175 C 225 170 238 180 248 185 C 258 175 252 150 245 125 C 238 100 225 75 200 75");
            strands.appendChild(createSVGElement('path', { d: "M 160 110 Q 150 160 142 220", fill: 'none', stroke: shadeColor(hairColor, -20), 'stroke-width': '1.5' }));
            strands.appendChild(createSVGElement('path', { d: "M 240 110 Q 250 160 258 220", fill: 'none', stroke: shadeColor(hairColor, -20), 'stroke-width': '1.5' }));
            break;
        case 'ponytail':
            backHair.setAttribute('d', "M 155 110 L 145 145 L 150 175 L 250 175 L 255 145 L 245 110 Q 200 95 155 110");
            frontHair.setAttribute('d', "M 200 75 C 182 75 170 92 165 108 C 160 124 158 138 165 148 C 172 143 182 138 192 142 C 196 132 200 125 200 125 C 200 125 204 132 208 142 C 218 138 228 143 235 148 C 242 138 240 124 235 108 C 230 92 218 75 200 75");
            const ponytail = createSVGElement('path', { d: "M 185 100 Q 175 80 180 55 Q 185 30 200 25 Q 215 30 220 55 Q 225 80 215 100 Q 200 105 185 100", fill: hairColor, stroke: '#2d3748', 'stroke-width': '2.5' });
            group.appendChild(ponytail);
            group.appendChild(createSVGElement('ellipse', { cx: '200', cy: '55', rx: '18', ry: '8', fill: '#ff6b9d', stroke: '#2d3748', 'stroke-width': '2' }));
            strands.appendChild(createSVGElement('path', { d: "M 195 45 Q 200 35 205 45", fill: 'none', stroke: shadeColor(hairColor, -20), 'stroke-width': '1.5' }));
            break;
        case 'twintails':
            backHair.setAttribute('d', "M 155 110 L 145 145 L 150 175 L 250 175 L 255 145 L 245 110 Q 200 95 155 110");
            frontHair.setAttribute('d', "M 200 75 C 182 75 170 92 165 108 C 160 124 158 138 165 148 C 172 143 182 138 192 142 C 196 132 200 125 200 125 C 200 125 204 132 208 142 C 218 138 228 143 235 148 C 242 138 240 124 235 108 C 230 92 218 75 200 75");
            const leftTail = createSVGElement('path', { d: "M 155 135 Q 130 150 120 180 Q 110 220 105 270 Q 103 290 115 295 Q 130 295 140 270 Q 150 230 155 180", fill: hairColor, stroke: '#2d3748', 'stroke-width': '2.5' });
            const rightTail = createSVGElement('path', { d: "M 245 135 Q 270 150 280 180 Q 290 220 295 270 Q 297 290 285 295 Q 270 295 260 270 Q 250 230 245 180", fill: hairColor, stroke: '#2d3748', 'stroke-width': '2.5' });
            group.appendChild(leftTail);
            group.appendChild(rightTail);
            group.appendChild(createSVGElement('ellipse', { cx: '145', cy: '145', rx: '10', ry: '8', fill: '#ff6b9d', stroke: '#2d3748', 'stroke-width': '2' }));
            group.appendChild(createSVGElement('ellipse', { cx: '255', cy: '145', rx: '10', ry: '8', fill: '#ff6b9d', stroke: '#2d3748', 'stroke-width': '2' }));
            break;
        case 'spiky':
            backHair.setAttribute('d', "M 155 115 L 145 140 L 150 170 L 250 170 L 255 140 L 245 115 Q 200 100 155 115");
            frontHair.setAttribute('d', "M 200 65 L 185 95 L 170 90 L 180 110 L 165 105 L 160 130 L 175 135 L 185 125 L 195 135 L 200 125 L 205 135 L 215 125 L 225 135 L 240 130 L 235 105 L 220 110 L 230 90 L 215 95 Z");
            const spikes = createSVGElement('g', {});
            spikes.appendChild(createSVGElement('path', { d: "M 180 85 L 175 60 L 185 75 Z", fill: hairColor, stroke: '#2d3748', 'stroke-width': '2' }));
            spikes.appendChild(createSVGElement('path', { d: "M 195 75 L 195 45 L 205 75 Z", fill: hairColor, stroke: '#2d3748', 'stroke-width': '2' }));
            spikes.appendChild(createSVGElement('path', { d: "M 215 80 L 225 55 L 220 75 Z", fill: hairColor, stroke: '#2d3748', 'stroke-width': '2' }));
            group.appendChild(spikes);
            break;
    }
    
    group.appendChild(backHair);
    group.appendChild(strands);
    group.appendChild(frontHair);
    document.getElementById('characterSVG').appendChild(group);
}

function drawAccessories() {
    const group = createSVGElement('g', { id: 'accessoriesGroup' });
    const acc = characterState.accessories;
    
    if (acc.includes('glasses')) {
        const glasses = createSVGElement('g', { id: 'glasses' });
        glasses.appendChild(createSVGElement('ellipse', { cx: '182', cy: '132', rx: '16', ry: '14', fill: 'rgba(200, 230, 255, 0.3)', stroke: '#2d3748', 'stroke-width': '2.5' }));
        glasses.appendChild(createSVGElement('ellipse', { cx: '218', cy: '132', rx: '16', ry: '14', fill: 'rgba(200, 230, 255, 0.3)', stroke: '#2d3748', 'stroke-width': '2.5' }));
        glasses.appendChild(createSVGElement('path', { d: "M 196 132 Q 200 128 204 132", fill: 'none', stroke: '#2d3748', 'stroke-width': '2.5' }));
        glasses.appendChild(createSVGElement('line', { x1: '166', y1: '132', x2: '155', y2: '135', stroke: '#2d3748', 'stroke-width': '2.5' }));
        glasses.appendChild(createSVGElement('line', { x1: '234', y1: '132', x2: '245', y2: '135', stroke: '#2d3748', 'stroke-width': '2.5' }));
        group.appendChild(glasses);
    }
    
    if (acc.includes('earrings')) {
        const earrings = createSVGElement('g', { id: 'earrings' });
        earrings.appendChild(createSVGElement('circle', { cx: '165', cy: '155', r: '5', fill: '#fbbf24', stroke: '#2d3748', 'stroke-width': '1.5' }));
        earrings.appendChild(createSVGElement('circle', { cx: '165', cy: '155', r: '2', fill: '#ffffff', opacity: '0.8' }));
        earrings.appendChild(createSVGElement('circle', { cx: '235', cy: '155', r: '5', fill: '#fbbf24', stroke: '#2d3748', 'stroke-width': '1.5' }));
        earrings.appendChild(createSVGElement('circle', { cx: '235', cy: '155', r: '2', fill: '#ffffff', opacity: '0.8' }));
        group.appendChild(earrings);
    }
    
    if (acc.includes('hat')) {
        const hat = createSVGElement('g', { id: 'hat' });
        hat.appendChild(createSVGElement('ellipse', { cx: '200', cy: '85', rx: '55', ry: '12', fill: shadeColor(characterState.outfitColor, -20), stroke: '#2d3748', 'stroke-width': '2.5' }));
        hat.appendChild(createSVGElement('path', { d: "M 155 85 L 160 45 Q 200 30 240 45 L 245 85", fill: characterState.outfitColor, stroke: '#2d3748', 'stroke-width': '2.5' }));
        hat.appendChild(createSVGElement('rect', { x: '158', y: '70', width: '84', height: '10', fill: '#2d3748' }));
        group.appendChild(hat);
    }
    
    if (acc.includes('necklace')) {
        const necklace = createSVGElement('g', { id: 'necklace' });
        necklace.appendChild(createSVGElement('path', { d: "M 175 185 Q 200 210 225 185", fill: 'none', stroke: '#fbbf24', 'stroke-width': '2' }));
        necklace.appendChild(createSVGElement('circle', { cx: '200', cy: '205', r: '6', fill: '#ef4444', stroke: '#fbbf24', 'stroke-width': '1.5' }));
        necklace.appendChild(createSVGElement('circle', { cx: '200', cy: '203', r: '2', fill: '#ffffff', opacity: '0.7' }));
        group.appendChild(necklace);
    }
    
    if (acc.includes('bow')) {
        const bow = createSVGElement('g', { id: 'bow' });
        bow.appendChild(createSVGElement('path', { d: "M 185 175 Q 175 165 175 175 Q 175 185 185 180 Z", fill: '#ff6b9d', stroke: '#2d3748', 'stroke-width': '1.5' }));
        bow.appendChild(createSVGElement('path', { d: "M 215 175 Q 225 165 225 175 Q 225 185 215 180 Z", fill: '#ff6b9d', stroke: '#2d3748', 'stroke-width': '1.5' }));
        bow.appendChild(createSVGElement('circle', { cx: '200', cy: '177', r: '5', fill: '#ff8fb3', stroke: '#2d3748', 'stroke-width': '1.5' }));
        bow.appendChild(createSVGElement('path', { d: "M 185 180 L 180 200 L 190 195 Z", fill: '#ff6b9d', stroke: '#2d3748', 'stroke-width': '1.5' }));
        bow.appendChild(createSVGElement('path', { d: "M 215 180 L 220 200 L 210 195 Z", fill: '#ff6b9d', stroke: '#2d3748', 'stroke-width': '1.5' }));
        group.appendChild(bow);
    }
    
    if (acc.length > 0) document.getElementById('characterSVG').appendChild(group);
}

function updateCharacter() {
    clearSVG();
    drawBackground();
    drawBody();
    drawHead();
    drawEyes();
    drawNoseAndMouth();
    drawHair();
    drawAccessories();
}

function setHairStyle(style) {
    characterState.hairStyle = style;
    document.querySelectorAll('#hairStyles .option-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.style === style));
    updateCharacter();
}

function setEyeStyle(style) {
    characterState.eyeStyle = style;
    document.querySelectorAll('#eyeStyles .option-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.style === style));
    updateCharacter();
}

function setOutfitStyle(style) {
    characterState.outfitStyle = style;
    document.querySelectorAll('#outfitStyles .option-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.style === style));
    updateCharacter();
}

function toggleAccessory(accessory) {
    const index = characterState.accessories.indexOf(accessory);
    if (index > -1) characterState.accessories.splice(index, 1);
    else characterState.accessories.push(accessory);
    document.querySelectorAll('#accessories .option-btn').forEach(btn => btn.classList.toggle('active', characterState.accessories.includes(btn.dataset.accessory)));
    updateCharacter();
}

function randomizeCharacter() {
    const hairStyles = ['short', 'medium', 'long', 'ponytail', 'twintails', 'spiky'];
    const eyeStyles = ['round', 'almond', 'narrow', 'large'];
    const outfitStyles = ['casual', 'school', 'formal', 'sporty', 'fantasy'];
    const hairColors = ['#2d3748', '#f5d0c5', '#c44569', '#667eea', '#34d399', '#fbbf24', '#a78bfa'];
    const eyeColors = ['#667eea', '#34d399', '#f5d0c5', '#2d3748', '#c44569', '#fbbf24'];
    
    characterState.hairStyle = hairStyles[Math.floor(Math.random() * hairStyles.length)];
    characterState.eyeStyle = eyeStyles[Math.floor(Math.random() * eyeStyles.length)];
    characterState.outfitStyle = outfitStyles[Math.floor(Math.random() * outfitStyles.length)];
    characterState.hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    characterState.eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];
    characterState.outfitColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    characterState.skinTone = Math.floor(Math.random() * 100);
    
    const allAccessories = ['glasses', 'earrings', 'hat', 'necklace', 'bow'];
    characterState.accessories = allAccessories.filter(() => Math.random() > 0.6);
    
    document.getElementById('skinTone').value = characterState.skinTone;
    document.getElementById('hairColor').value = characterState.hairColor;
    document.getElementById('eyeColor').value = characterState.eyeColor;
    document.getElementById('outfitColor').value = characterState.outfitColor;
    
    document.querySelectorAll('#hairStyles .option-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.style === characterState.hairStyle));
    document.querySelectorAll('#eyeStyles .option-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.style === characterState.eyeStyle));
    document.querySelectorAll('#outfitStyles .option-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.style === characterState.outfitStyle));
    document.querySelectorAll('#accessories .option-btn').forEach(btn => btn.classList.toggle('active', characterState.accessories.includes(btn.dataset.accessory)));
    
    updateCharacter();
    showNotification('New random character generated!', 'info');
}

function saveCharacterPNG() {
    const svg = document.getElementById('characterSVG');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = 400;
    canvas.height = 500;
    
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'anime-character.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        showNotification('Character saved as PNG!', 'success');
    };
    
    img.src = url;
}

function saveConfig() {
    localStorage.setItem('animeCharacterConfig', JSON.stringify(characterState));
    showNotification('Configuration saved!', 'success');
}

function loadConfig() {
    const saved = localStorage.getItem('animeCharacterConfig');
    if (saved) {
        const config = JSON.parse(saved);
        Object.assign(characterState, config);
        
        document.getElementById('skinTone').value = characterState.skinTone;
        document.getElementById('skinColor').value = characterState.skinColor;
        document.getElementById('hairColor').value = characterState.hairColor;
        document.getElementById('eyeColor').value = characterState.eyeColor;
        document.getElementById('outfitColor').value = characterState.outfitColor;
        document.getElementById('backgroundType').value = characterState.backgroundType;
        document.getElementById('bgColor1').value = characterState.bgColor1;
        document.getElementById('bgColor2').value = characterState.bgColor2;
        
        document.querySelectorAll('#hairStyles .option-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.style === characterState.hairStyle));
        document.querySelectorAll('#eyeStyles .option-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.style === characterState.eyeStyle));
        document.querySelectorAll('#outfitStyles .option-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.style === characterState.outfitStyle));
        document.querySelectorAll('#accessories .option-btn').forEach(btn => btn.classList.toggle('active', characterState.accessories.includes(btn.dataset.accessory)));
        
        updateCharacter();
        showNotification('Configuration loaded!', 'success');
    } else {
        showNotification('No saved configuration found', 'info');
    }
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification ' + type + ' show';
    setTimeout(() => notification.classList.remove('show'), 2500);
}

window.onload = function() { updateCharacter(); };
