// Standard Spectrum colors
const darkColors = ['#000', '#0000d7', '#d70000', '#d700d7', '#00d700', '#00d7d7', '#d7d700', '#d7d7d7'];
const lightColors = ['#000', '#0000ff', '#ff0000', '#ff00ff', '#00ff00', '#00ffff', '#ffff00', '#ffff'];

// Size of the border for the screenshots
const borderSize = 16;

// Plot a grid of pixels
function plot8x8Grid(id, data, scale, inverse) {
    const cx = getCanvas2D(id);
    scale = scale || 50;
    cx.canvas.width = cx.canvas.height = scale * 8;
    cx.fillStyle = '#fefefe';
    cx.fillRect(0, 0, cx.canvas.width, cx.canvas.height);
    cx.fillStyle = 'black';
    cx.stroke = 'black';
    cx.strokeWidth = 2;
    if (typeof(data) == 'string') {
        const chrIdx = (data.charCodeAt(0) - 32) * 8;
        data = spectrumFont.slice(chrIdx, chrIdx + 8);
    }
    for (let y = 0; y < 8; y++) {
        if (inverse) data[y] = 255 ^ data[y];
        for (let x = 0; x < 8; x++) {
            const flag = data[y] & (128 >> x);
            if (flag !== 0) {
                cx.fillRect(x * scale, y * scale, scale, scale);
            } else {
                cx.strokeRect(x * scale, y * scale, scale, scale);
            }
        }
    }
}

function cursorAnimation128K(cx, state) {
    cursor(cx, borderSize, borderSize, state.frame % 30 > 15);
}

// Render a Spectrum screen given the canvas id and the function to render
function spectrum(id, scale, f, animationFunction) {
    const cx = getCanvas2D(id);
    cx.canvas.width = (256 + borderSize * 2) * scale;
    cx.canvas.height = (192 + borderSize * 2) * scale;
    cx.scale(scale, scale);
    f(cx);

    if (animationFunction) {
        const fps = 50;
        let timer = null;
        cx.canvas.onmouseenter = function () {
            if (timer) return;
            let state = { frame: 0, start: new Date() };
            timer = setInterval(function () {
                state.elapsedSeconds = (new Date() - state.start) / 1000;
                animationFunction(cx, state);
                state.frame = (state.frame + 1) % fps;
            }, 1000 / fps);
        }
        cx.canvas.onmouseleave = function () {
            if (!timer) return;
            clearInterval(timer);
            timer = null;
            f(cx);
        }
    }
}

function getCanvas2D(id) {
    const c = document.getElementById(id);
    if (c != null)
        return c.getContext('2d', { alpha: false });

    console.log(`Could not find canvas[id='${id}']`);
}

// Draw the 128K cursor
function cursor(cx, x, y, inverted) {
    fill(cx, x, y, 8, 8, inverted ? lightColors[7] : lightColors[1]);
}

// Fill an area of the screen
function fill(cx, x, y, w, h, color) {
    if (color !== undefined) cx.fillStyle = color;
    cx.fillRect(x, y, w, h);
}

// Draw the 128K bar with rainbow stripe
function barWithStripe(cx, x, y, w, title) {
    cx.fillStyle = darkColors[0];
    cx.fillRect(x, y, w, 8);
    stripe(cx, x + w - (8 * 5), y);
    if (title) text(cx, x, y, title, lightColors[7]);
}

const p2r = [128, 64, 32, 16, 8, 4, 2, 1];

// Spectrum ROM font
const spectrumFont = [
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Space
    0x00, 0x10, 0x10, 0x10, 0x10, 0x00, 0x10, 0x00,
    0x00, 0x24, 0x24, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x24, 0x7e, 0x24, 0x24, 0x7e, 0x24, 0x00,
    0x00, 0x08, 0x3e, 0x28, 0x3e, 0x0a, 0x3e, 0x08,
    0x00, 0x62, 0x64, 0x08, 0x10, 0x26, 0x46, 0x00,
    0x00, 0x10, 0x28, 0x10, 0x2a, 0x44, 0x3a, 0x00,
    0x00, 0x08, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x04, 0x08, 0x08, 0x08, 0x08, 0x04, 0x00,
    0x00, 0x20, 0x10, 0x10, 0x10, 0x10, 0x20, 0x00,
    0x00, 0x00, 0x14, 0x08, 0x3e, 0x08, 0x14, 0x00,
    0x00, 0x00, 0x08, 0x08, 0x3e, 0x08, 0x08, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x08, 0x10,
    0x00, 0x00, 0x00, 0x00, 0x3e, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x18, 0x00,
    0x00, 0x00, 0x02, 0x04, 0x08, 0x10, 0x20, 0x00,
    0x00, 0x3c, 0x46, 0x4a, 0x52, 0x62, 0x3c, 0x00,
    0x00, 0x18, 0x28, 0x08, 0x08, 0x08, 0x3e, 0x00,
    0x00, 0x3c, 0x42, 0x02, 0x3c, 0x40, 0x7e, 0x00,
    0x00, 0x3c, 0x42, 0x0c, 0x02, 0x42, 0x3c, 0x00,
    0x00, 0x08, 0x18, 0x28, 0x48, 0x7e, 0x08, 0x00,
    0x00, 0x7e, 0x40, 0x7c, 0x02, 0x42, 0x3c, 0x00,
    0x00, 0x3c, 0x40, 0x7c, 0x42, 0x42, 0x3c, 0x00,
    0x00, 0x7e, 0x02, 0x04, 0x08, 0x10, 0x10, 0x00,
    0x00, 0x3c, 0x42, 0x3c, 0x42, 0x42, 0x3c, 0x00,
    0x00, 0x3c, 0x42, 0x42, 0x3e, 0x02, 0x3c, 0x00,
    0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x10, 0x00,
    0x00, 0x00, 0x10, 0x00, 0x00, 0x10, 0x10, 0x20,
    0x00, 0x00, 0x04, 0x08, 0x10, 0x08, 0x04, 0x00,
    0x00, 0x00, 0x00, 0x3e, 0x00, 0x3e, 0x00, 0x00,
    0x00, 0x00, 0x10, 0x08, 0x04, 0x08, 0x10, 0x00,
    0x00, 0x3c, 0x42, 0x04, 0x08, 0x00, 0x08, 0x00,
    0x00, 0x3c, 0x4a, 0x56, 0x5e, 0x40, 0x3c, 0x00,
    0x00, 0x3c, 0x42, 0x42, 0x7e, 0x42, 0x42, 0x00,
    0x00, 0x7c, 0x42, 0x7c, 0x42, 0x42, 0x7c, 0x00,
    0x00, 0x3c, 0x42, 0x40, 0x40, 0x42, 0x3c, 0x00,
    0x00, 0x78, 0x44, 0x42, 0x42, 0x44, 0x78, 0x00,
    0x00, 0x7e, 0x40, 0x7c, 0x40, 0x40, 0x7e, 0x00,
    0x00, 0x7e, 0x40, 0x7c, 0x40, 0x40, 0x40, 0x00,
    0x00, 0x3c, 0x42, 0x40, 0x4e, 0x42, 0x3c, 0x00,
    0x00, 0x42, 0x42, 0x7e, 0x42, 0x42, 0x42, 0x00,
    0x00, 0x3e, 0x08, 0x08, 0x08, 0x08, 0x3e, 0x00,
    0x00, 0x02, 0x02, 0x02, 0x42, 0x42, 0x3c, 0x00,
    0x00, 0x44, 0x48, 0x70, 0x48, 0x44, 0x42, 0x00,
    0x00, 0x40, 0x40, 0x40, 0x40, 0x40, 0x7e, 0x00,
    0x00, 0x42, 0x66, 0x5a, 0x42, 0x42, 0x42, 0x00,
    0x00, 0x42, 0x62, 0x52, 0x4a, 0x46, 0x42, 0x00,
    0x00, 0x3c, 0x42, 0x42, 0x42, 0x42, 0x3c, 0x00,
    0x00, 0x7c, 0x42, 0x42, 0x7c, 0x40, 0x40, 0x00,
    0x00, 0x3c, 0x42, 0x42, 0x52, 0x4a, 0x3c, 0x00,
    0x00, 0x7c, 0x42, 0x42, 0x7c, 0x44, 0x42, 0x00,
    0x00, 0x3c, 0x40, 0x3c, 0x02, 0x42, 0x3c, 0x00,
    0x00, 0xfe, 0x10, 0x10, 0x10, 0x10, 0x10, 0x00,
    0x00, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3c, 0x00,
    0x00, 0x42, 0x42, 0x42, 0x42, 0x24, 0x18, 0x00,
    0x00, 0x42, 0x42, 0x42, 0x42, 0x5a, 0x24, 0x00,
    0x00, 0x42, 0x24, 0x18, 0x18, 0x24, 0x42, 0x00,
    0x00, 0x82, 0x44, 0x28, 0x10, 0x10, 0x10, 0x00,
    0x00, 0x7e, 0x04, 0x08, 0x10, 0x20, 0x7e, 0x00,
    0x00, 0x0e, 0x08, 0x08, 0x08, 0x08, 0x0e, 0x00,
    0x00, 0x00, 0x40, 0x20, 0x10, 0x08, 0x04, 0x00,
    0x00, 0x70, 0x10, 0x10, 0x10, 0x10, 0x70, 0x00,
    0x00, 0x10, 0x38, 0x54, 0x10, 0x10, 0x10, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff,
    0x00, 0x1c, 0x22, 0x78, 0x20, 0x20, 0x7e, 0x00,
    0x00, 0x00, 0x38, 0x04, 0x3c, 0x44, 0x3c, 0x00,
    0x00, 0x20, 0x20, 0x3c, 0x22, 0x22, 0x3c, 0x00,
    0x00, 0x00, 0x1c, 0x20, 0x20, 0x20, 0x1c, 0x00,
    0x00, 0x04, 0x04, 0x3c, 0x44, 0x44, 0x3c, 0x00,
    0x00, 0x00, 0x38, 0x44, 0x78, 0x40, 0x3c, 0x00,
    0x00, 0x0c, 0x10, 0x18, 0x10, 0x10, 0x10, 0x00,
    0x00, 0x00, 0x3c, 0x44, 0x44, 0x3c, 0x04, 0x38,
    0x00, 0x40, 0x40, 0x78, 0x44, 0x44, 0x44, 0x00,
    0x00, 0x10, 0x00, 0x30, 0x10, 0x10, 0x38, 0x00,
    0x00, 0x04, 0x00, 0x04, 0x04, 0x04, 0x24, 0x18,
    0x00, 0x20, 0x28, 0x30, 0x30, 0x28, 0x24, 0x00,
    0x00, 0x10, 0x10, 0x10, 0x10, 0x10, 0x0c, 0x00,
    0x00, 0x00, 0x68, 0x54, 0x54, 0x54, 0x54, 0x00,
    0x00, 0x00, 0x78, 0x44, 0x44, 0x44, 0x44, 0x00,
    0x00, 0x00, 0x38, 0x44, 0x44, 0x44, 0x38, 0x00,
    0x00, 0x00, 0x78, 0x44, 0x44, 0x78, 0x40, 0x40,
    0x00, 0x00, 0x3c, 0x44, 0x44, 0x3c, 0x04, 0x06,
    0x00, 0x00, 0x1c, 0x20, 0x20, 0x20, 0x20, 0x00,
    0x00, 0x00, 0x38, 0x40, 0x38, 0x04, 0x78, 0x00,
    0x00, 0x10, 0x38, 0x10, 0x10, 0x10, 0x0c, 0x00,
    0x00, 0x00, 0x44, 0x44, 0x44, 0x44, 0x38, 0x00,
    0x00, 0x00, 0x44, 0x44, 0x28, 0x28, 0x10, 0x00,
    0x00, 0x00, 0x44, 0x54, 0x54, 0x54, 0x28, 0x00,
    0x00, 0x00, 0x44, 0x28, 0x10, 0x28, 0x44, 0x00,
    0x00, 0x00, 0x44, 0x44, 0x44, 0x3c, 0x04, 0x38,
    0x00, 0x00, 0x7c, 0x08, 0x10, 0x20, 0x7c, 0x00,
    0x00, 0x0e, 0x08, 0x30, 0x08, 0x08, 0x0e, 0x00,
    0x00, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x00,
    0x00, 0x70, 0x10, 0x0c, 0x10, 0x10, 0x70, 0x00,
    0x00, 0x14, 0x28, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x3c, 0x42, 0x99, 0xa1, 0xa1, 0x99, 0x42, 0x3c, // Copyright
];

// Render text using the Spectrum ROM font
function text(cx, x, y, text, pen) {
    if (pen !== undefined) cx.fillStyle = pen;
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (charCode == 169) charCode = 127; // ©
        let charIdx = (charCode - 32) * 8;
        let ox = x + (i * 8);
        for (let dy = y; dy < y + 8; dy++) {
            const glyph = spectrumFont[charIdx++];
            for (let dx = 0; dx < 8; dx++)
                if (glyph & p2r[dx]) cx.fillRect(ox + dx, dy, 1, 1);
        }
    }
}

// Render text using the Spectrum ROM font
function graphics(cx, x, y, seq, pen) {
    // Spectrum block drawing characters & UDGs
    const spectrumBlockGraphics = [
        // Built-in
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x0f, 0x0f, 0x0f, 0x0f, 0x00, 0x00, 0x00, 0x00,
        0xf0, 0xf0, 0xf0, 0xf0, 0x00, 0x00, 0x00, 0x00,
        0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x0f, 0x0f, 0x0f, 0x0f,
        0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f,
        0xf0, 0xf0, 0xf0, 0xf0, 0x0f, 0x0f, 0x0f, 0x0f,
        0xff, 0xff, 0xff, 0xff, 0x0f, 0x0f, 0x0f, 0x0f,
        0x00, 0x00, 0x00, 0x00, 0xf0, 0xf0, 0xf0, 0xf0,
        0x0f, 0x0f, 0x0f, 0x0f, 0xf0, 0xf0, 0xf0, 0xf0,
        0xf0, 0xf0, 0xf0, 0xf0, 0xf0, 0xf0, 0xf0, 0xf0,
        0xff, 0xff, 0xff, 0xff, 0xf0, 0xf0, 0xf0, 0xf0,
        0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff,
        0x0f, 0x0f, 0x0f, 0x0f, 0xff, 0xff, 0xff, 0xff,
        0xf0, 0xf0, 0xf0, 0xf0, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        // Fake UDGs
        0x01, 0x39, 0x45, 0x7d, 0x45, 0x45, 0x01, 0xff,
        0x01, 0x79, 0x45, 0x79, 0x45, 0x79, 0x01, 0xff,
        0x01, 0x39, 0x45, 0x41, 0x45, 0x39, 0x01, 0xff,
        0x01, 0x79, 0x45, 0x45, 0x45, 0x79, 0x01, 0xff,
        0x01, 0x7d, 0x41, 0x79, 0x41, 0x7d, 0x01, 0xff,
        0x01, 0x7d, 0x41, 0x79, 0x41, 0x41, 0x01, 0xff,
        0x01, 0x3d, 0x41, 0x4d, 0x45, 0x3d, 0x01, 0xff,
        0x01, 0x45, 0x45, 0x7d, 0x45, 0x45, 0x01, 0xff,
        0x01, 0x7d, 0x11, 0x11, 0x11, 0x7d, 0x01, 0xff,
        0x01, 0x05, 0x05, 0x05, 0x45, 0x39, 0x01, 0xff,
        0x01, 0x45, 0x49, 0x71, 0x49, 0x45, 0x01, 0xff,
        0x01, 0x41, 0x41, 0x41, 0x41, 0x7d, 0x01, 0xff,
        0x01, 0x45, 0x6d, 0x55, 0x45, 0x45, 0x01, 0xff,
        0x01, 0x45, 0x65, 0x55, 0x4d, 0x45, 0x01, 0xff,
        0x01, 0x39, 0x45, 0x45, 0x45, 0x39, 0x01, 0xff,
        0x01, 0x79, 0x45, 0x79, 0x41, 0x41, 0x01, 0xff,
        0x01, 0x39, 0x45, 0x55, 0x49, 0x35, 0x01, 0xff,
        0x01, 0x79, 0x45, 0x79, 0x45, 0x45, 0x01, 0xff,
        0x01, 0x3d, 0x41, 0x39, 0x05, 0x79, 0x01, 0xff,
        0x01, 0x7d, 0x11, 0x11, 0x11, 0x11, 0x01, 0xff,
        0x01, 0x45, 0x45, 0x45, 0x45, 0x39, 0x01, 0xff,
    ];
    if (pen !== undefined) cx.fillStyle = pen;
    for (let i = 0; i < seq.length; i++) {
        let charCode = seq.charCodeAt(i);
        if (charCode >= 48 && charCode <= 63) charCode -= 48; // Numbers (predefined)
        if (charCode >= 65 && charCode <= 85) charCode -= 75; // Letters (UDGs)
        let charIdx = charCode * 8;
        let ox = x + (i * 8);
        for (let dy = y; dy < y + 8; dy++) {
            const glyph = spectrumBlockGraphics[charIdx++];
            for (let dx = 0; dx < 8; dx++)
                if (glyph & p2r[dx]) cx.fillRect(ox + dx, dy, 1, 1);
        }
    }
}

// Draw the rainbow stripe
function stripe(cx, x, y) {
    const rainbow = ['red', 'yellow', 'lime', 'cyan'];
    for (let col = 0; col < rainbow.length; col++)
        for (let row = 0; row < 8; row++)
            fill(cx, x + (col * 8) - row, y + row, 8, 1, rainbow[col]);
}

// Draw a 128K menu
function menu(cx, x, y, w, title, options, index) {
    barWithStripe(cx, x, y, w, title);
    fill(cx, x, y + 8, w, (options.length + 1) * 8, darkColors[0]);
    w -= 2;
    x++;
    fill(cx, x, y + 8, w, (options.length + 1) * 8 - 1, lightColors[7]);
    fill(cx, x, y + 8 + (index * 8), w, 8, lightColors[5]);
    cx.fillStyle = darkColors[0];
    for (let i = 0; i < options.length; i++)
        text(cx, x + 8, y + 8 + (i * 8), options[i]);
}

// Clear an area of the screen - faster than FILL
function clear(cx, color) {
    cx.fillStyle = color || darkColors[7];
    cx.fillRect(0, 0, cx.canvas.width, cx.canvas.height);
}

// Draw the 128K bottom-bar with rainbow stripe
function bottomBarWithStripe(cx, title) {
    barWithStripe(cx, borderSize, borderSize + 168, 256, title);
}

// Draw the +3 initial power-on screen
function initialPlus3(cx) {
    clear(cx);
    plus3Menu(cx, 0);
    cx.fillStyle = darkColors[0];
    text(cx, borderSize, borderSize + 176, '©1982, 1986, 1987 Amstrad Plc.');
    text(cx, borderSize, borderSize + 184, 'Drives A: and M: available.');
}

// Draw a 48K cursor with mode indicator
function cursor48K(cx, x, y, mode, inverse) {
    const background = inverse ? darkColors[0] : darkColors[7];
    const foreground = inverse ? darkColors[7] : darkColors[0];
    fill(cx, x, y, 8, 8, background);
    text(cx, x, y, mode, foreground);
}

function plus3Menu(cx, index) {
    menu(cx, borderSize + (8 * 8), borderSize + (7 * 8), 14 * 8, '128 +3', Array('Loader', '+3 BASIC', 'Calculator', '48 BASIC'), index);
}

// Draw the 128K options menu
function optionsMenu(cx, index) {
    menu(cx, borderSize + (8 * 8), borderSize + (7 * 8), 14 * 8, 'Options', Array('+3 BASIC', 'Renumber', 'Screen', 'Print', 'Exit'), index || 0);
}

// Draw the initial 48K display on an Amstrad machine
function initial48K(cx) {
    clear(cx);
    text(cx, borderSize, borderSize + 192 - 8, '© 1982 Amstrad', darkColors[0]);
}

function keyboard(id, f) {
    f = f || drawDefaultKeyboard;
    const c = document.getElementById(id);
    if (c == null) {
        console.log(`Could not find canvas[id='${id}'] to render keyboard to.`);
        return;
    }
    const cx = c.getContext('2d', { alpha: false });
    if (cx == null) {
        console.log(`Failed to get 2d context for canvas[id='${id}'] to render keyboard to.`);
        return;
    }
    c.width = 673;
    c.height = 249;
    cx.fillStyle = '#fefefe';
    cx.fillRect(0, 0, c.width, c.height);
    cx.fillStyle = '#000';
    f(cx);
}

const keyboardLabels = [
    ['TRUE\nVIDEO', 'INV\nVIDEO', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'BREAK'],
    ['DELETE', 'GRAPH', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['EXTEND MODE', 'EDIT', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER'],
    ['CAPS SHIFT', 'CAPS\nLOCK', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', 'CAPS SHIFT'],
    ['SYMB\nSHIFT', ';', '"', '⇦', '⇨', 'SPACE', '⇧', '⇩', ',', 'SYMB\nSHIFT']
];

const keyboardLabelsKlower = [
    ['TRUE\nVIDEO', 'INV\nVIDEO', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'SPACE'],
    ['DELETE', '', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['EXTEND MODE', 'EDIT', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER'],
    ['', '', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', ''],
    ['', ';', '"', '⇦', '⇨', 'SPACE', '⇧', '⇩', ',', '']
];

const keyboardLabelsK = [
    [],
    ['', '', 'PLOT', 'DRAW', 'REM', 'RUN', 'RANDOMIZE', 'RETURN', 'IF', 'INPUT', 'POKE', 'PRINT'],
    ['', '', 'NEW', 'SAVE', 'DIM', 'FOR', 'GOTO', 'GOSUB', 'LOAD', 'LIST', 'LET', ''],
    ['', '', 'COPY', 'CLEAR', 'CONTINUE', 'CLS', 'BORDER', 'NEXT', 'PAUSE', '', ''],
    []
];

const lowerKeyFont = '11px Arial';
const midKeyBigFont = '24px Roboto Mono';

function drawBoxChar(cx, index, x, y, size, inverse) {
    cx.strokeRect(x, y, size, size);
    (inverse ? drawNormal : drawInverse)(cx, index, x, y, size);

    function drawNormal(cx, index, x, y, size) {
        const half = size / 2;
        switch (index) {
            case 1:
                cx.fillRect(x + half, y, half, half);
                break;
            case 2:
                cx.fillRect(x, y, half, half);
                break;
            case 3:
                cx.fillRect(x, y, size, half);
                break;
            case 4:
                cx.fillRect(x + half, y + half, half, half);
                break;
            case 5:
                cx.fillRect(x + half, y, half, size);
                break;
            case 6:
                cx.fillRect(x + half, y + half, half, half);
                cx.fillRect(x, y, half, half);
                break;
            case 7:
                cx.fillRect(x, y, size, half);
                cx.fillRect(x + half, y + half, half, half);
                break;
        }
    }

    function drawInverse(cx, index, x, y, size) {
        const half = size / 2;
        switch (index) {
            case 1:
                cx.fillRect(x, y, half, half);
                cx.fillRect(x, y + half, size, half);
                break;
            case 2:
                cx.fillRect(x + half, y, half, half);
                cx.fillRect(x, y + half, size, half);
                break;
            case 3:
                cx.fillRect(x, y + half, size, half);
                break;
            case 4:
                cx.fillRect(x, y, size, half);
                cx.fillRect(x, y + half, half, half);
                break;
            case 5:
                cx.fillRect(x, y, half, size);
                break;
            case 6:
                cx.fillRect(x, y + half, half, half);
                cx.fillRect(x + half, y, half, half);
                break;
            case 7:
                cx.fillRect(x + half, y + half, half, half);
                break;
            case 0:
            case 8:
                cx.fillRect(x, y, size, size);
                break;
        }
    }
}

function drawDefaultKeyboard(cx) {
    cx.fontSize = '10px';
    drawKeyboard(cx, function (c, r, x, y, w, h) {
        cx.fillStyle = 'black';
        cx.textAlign = 'right';
        drawLabel(cx, keyboardLabels[r][c], x + w - 4, y, w, h);
    });
}

function drawLabel(cx, label, x, y, w, h, fontSize) {
    if (label == undefined || label == '') return;

    fontSize = fontSize || 11;
    cx.fontSize = fontSize + 'px';

    let lines = label.split('\n');
    let count = lines.length;
    let sy = y + h - (fontSize * (count - 1)) - 3;

    for (let i = 0; i < count; i++) {
        cx.fillText(lines[i], x, sy, w);
        sy += fontSize;
    }
}

function drawKeyboard(cx, cellFunc) {
    const keyboardCells = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
        [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.75],
        [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
        [1, 1, 1, 1, 1, 4.5, 1, 1, 1, 1]
    ];
    let u = 50;
    let gap = 4;
    cx.strokeStyle = '#000';
    cx.lineWidth = 1;
    for (let r = 0; r < keyboardCells.length; r++) {
        let x = 1;
        let keyboardCellRow = keyboardCells[r];
        for (let c = 0; c < keyboardCellRow.length; c++) {
            let cell = keyboardCellRow[c];
            let w = cell * u;
            let y = 1 + r * u;
            if (c === 11 && r == 2)
                drawEnter(cx, u, gap);
            else
                cx.strokeRect(x, y, w - gap, u - gap);
            if (cellFunc != undefined)
                cellFunc(c, r, x, y, w - gap, u - gap);
            x += w;
        }
    }
    cx.font = lowerKeyFont;

    // Enter is not a rectangle
    function drawEnter(cx, u, gap) {
        let t = 1 + 1 * u;
        let l = 1 + 12.5 * u;
        cx.miterLimit = 0;
        cx.beginPath();
        cx.moveTo(l, t + u);
        cx.lineTo(l, t);
        cx.lineTo(l + u - gap, t);
        cx.lineTo(l + u - gap, t + u + u - gap);
        cx.lineTo(l - (u * 0.75), t + u + u - gap);
        cx.lineTo(l - (u * 0.75), t + u);
        cx.lineTo(l, t + u);
        cx.stroke();
    }
}

// Document scrolling/fragments

function asFragmentsGoBy() {
    for (let element of document.querySelectorAll('a[id]')) {
        const rect = element.getClientRects()[0];
        if (rect.top >= 0 && rect.left >= 0) {
            const newUrl = document.URL.split('#')[0] + '#' + element.id;
            history.replaceState({}, '', newUrl);
            return;
        }
    }
}

document.onscroll = asFragmentsGoBy;