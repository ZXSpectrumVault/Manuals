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

// Standard Spectrum colors
const darkColors = [ '#000', '#0000d7', '#d70000', '#d700d7', '#00d700', '#00d7d7', '#d7d700', '#d7d7d7' ];
const lightColors = [ '#000', '#0000ff', '#ff0000', '#ff00ff', '#00ff00', '#00ffff', '#ffff00', '#ffff' ];

// Size of the border for the screenshots
const borderSize = 16;

// Render a Spectrum screen given the canvas id and the function to render
function spectrum(id, scale, f) {
  const c = document.getElementById(id);
  if (c == null) {
    console.log(`Could not find canvas[id='${id}'] to render keyboard to.`);
    return;
  }
  const cx = c.getContext('2d', { alpha: false });
  c.width = (256 + borderSize * 2) * scale;
  c.height = (192 + borderSize * 2) * scale;
  cx.scale(scale, scale);
  f(cx);
}

// Draw the 128K cursor
function cursor(cx, x, y) {
  fill(cx, x, y, 8, 8, lightColors[1]);
}

// Fill an area of the screen
function fill(cx, x, y, w, h, color) {
  if (color !== undefined) cx.fillStyle = color;
  cx.fillRect(x, y, w, h);
}

// Draw the 128K bar with rainbow stripe
function barWithStripe(cx, x, y, w, title) {
  cx.clearRect(x, y, w, 8);
  stripe(cx, x + w - (8 * 5), y);
  if (title) text(cx, x, y, title, lightColors[7]);
}

const p2r = [ 128, 64, 32, 16, 8, 4, 2, 1 ];

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
  w-=2;
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
  barWithStripe(cx, borderSize, 172 + borderSize, 256, title);
}

// Draw the +3 initial power-on screen
function initialPlus3(cx) {
  clear(cx);
  menu(cx, borderSize + (8 * 8), borderSize + (7 * 8), 14 * 8, '128 +3', Array('Loader', '+3 BASIC', 'Calculator', '48 BASIC' ), 0);
  cx.fillStyle = darkColors[0];
  text(cx, borderSize, borderSize + 176, '©1982, 1986, 1987 Amstrad Plc.');
  text(cx, borderSize, borderSize + 184, 'Drives A: and M: available.');
}

// Draw a 48K cursor with mode indicator
function cursor48K(cx, x, y, mode) {
  fill(cx, x, y, 8, 8, darkColors[0]);
  text(cx, x, y, mode, darkColors[7]);
}

// Draw the 128K options menu
function optionsMenu(cx) {
  menu(cx, borderSize + (8 * 8), borderSize + (7 * 8), 14 * 8, 'Options', Array('+3 BASIC', 'Renumber', 'Screen', 'Print', 'Exit'), 0);
}

// Draw the initial 48K display on an Amstrad machine
function initial48K(cx) {
  clear(cx);
  text(cx, borderSize, borderSize + 192 - 8, '© 1982 Amstrad', darkColors[0]);
}

const charLines = [
  " !\"#$%&'()*+,-./0123456789:;<=>?",
  "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_",
  "£abcdefghijklmnopqrstuvwxyz{|}~©",
  "                ABCDEFGHIJKLMNOP",
  "QRS SPECTRUM PLAY RNDINKEY$PIFN",
  "POINT SCREEN$ ATTR AT TAB VAL$ C",
  "ODE VAL LEN SIN COS TAN ASN ACS",
  "ATN LN EXP INT SQR SGN ABS PEEK",
  "IN USR STR$ CHR$ NOT BIN OR AND",
  "<=>=<> LINE THEN TO STEP DEF FN",
  "CAT FORMAT MOVE ERASE OPEN # CLO",
  "SE # MERGE VERIFY BEEP CIRCLE IN",
  "K PAPER FLASH BRIGHT INVERSE OVE",
  "R OUT LPRINT LLIST STOP READ DAT",
  "A RESTORE NEW BORDER CONTINUE DI",
  "M REM FOR GO TO GO SUB INPUT LOA",
  "D LIST LET PAUSE NEXT POKE PRINT",
  " PLOT RUN SAVE RANDOMIZE IF CLS",
  "DRAW CLEAR RETURN COPY"
];

function keyboard(id, f) {
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

const keyboardCells = [
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5 ],
  [ 1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.75 ],
  [ 2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25 ],
  [ 1, 1, 1, 1, 1, 4.5, 1, 1, 1, 1 ]
];

const keyboardLabels = [
  [ 'TRUE\nVIDEO', 'INV\nVIDEO', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'BREAK' ],
  [ 'DELETE', 'GRAPH', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P' ],
  [ 'EXTEND MODE', 'EDIT', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER'],
  [ 'CAPS SHIFT', 'CAPS\nLOCK', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', 'CAPS SHIFT'],
  [ 'SYMB\nSHIFT', ';', '"', '⇦', '⇨', 'SPACE', '⇧', '⇩', ',', 'SYMB\nSHIFT']
];

const keyboardLabelsKlower = [
  [ 'TRUE\nVIDEO', 'INV\nVIDEO', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'SPACE' ],
  [ 'DELETE', '', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P' ],
  [ 'EXTEND MODE', 'EDIT', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER'],
  [ '', '', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', ''],
  [ '', ';', '"', '⇦', '⇨', 'SPACE', '⇧', '⇩', ',', '']
];

const keyboardLabelsK = [
  [ ],
  [ '', '', 'PLOT', 'DRAW', 'REM', 'RUN', 'RANDOMIZE', 'RETURN', 'IF', 'INPUT', 'POKE', 'PRINT' ],
  [ '', '', 'NEW', 'SAVE', 'DIM', 'FOR', 'GOTO', 'GOSUB', 'LOAD', 'LIST', 'LET', ''],
  [ '', '', 'COPY', 'CLEAR', 'CONTINUE', 'CLS', 'BORDER', 'NEXT', 'PAUSE', '', ''],
  []
];

const lowerKeyFont = '11px Arial';
const midKeyBigFont = '24px Roboto Mono';

function boxChar(cx, index, x, y, pad, size) {
  const half = size / 2;
  cx.strokeRect(x + pad, y + pad, size, size);
  switch (index) {
    case 1: cx.fillRect(x + pad + half, y + pad, half, half); break;
    case 2: cx.fillRect(x + pad, y + pad, half, half); break;
    case 3: cx.fillRect(x + pad, y + pad, size, half); break;
    case 4: cx.fillRect(x + pad + half, y + pad + half, half, half); break;
    case 5: cx.fillRect(x + pad + half, y + pad, half, size); break;
    case 6:
        cx.fillRect(x + pad + half, y + pad + half, half, half);
        cx.fillRect(x + pad, y + pad, half, half);
        break;
    case 7:
        cx.fillRect(x + pad, y + pad, size, half);
        cx.fillRect(x + pad + half, y + pad + half, half, half);
        break;
  }
}

function boxCharInverse(cx, index, x, y, pad, size) {
  const half = size / 2;
  cx.strokeRect(x + pad, y + pad, size, size);
  switch (index) {
    case 1:
      cx.fillRect(x + pad, y + pad, half, half);
      cx.fillRect(x + pad, y + pad + half, size, half);
      break;
    case 2:
      cx.fillRect(x + pad + half, y + pad, half, half);
      cx.fillRect(x + pad, y + pad + half, size, half);
      break;
    case 3:
      cx.fillRect(x + pad, y + pad + half, size, half);
      break;
    case 4:
      cx.fillRect(x + pad, y + pad, size, half);
      cx.fillRect(x + pad, y + pad + half, half, half);
      break;
    case 5:
      cx.fillRect(x + pad, y + pad, half, size);
      break;
    case 6:
      cx.fillRect(x + pad, y + pad + half, half, half);
      cx.fillRect(x + pad + half, y + pad, half, half);
      break;
    case 7:
      cx.fillRect(x + pad, y + pad + half, half, half);
      break;
    case 8:
      cx.fillRect(x + pad, y + pad, size, size);
      break;
  }
}

function drawDefaultKeyboard(cx) {
  const fontSize = 11;
  cx.font = lowerKeyFont;
  cx.textAlign = 'center';
  drawKeyboard(cx, function(c, r, x, y, w, h) {
    cx.textAlign = 'right';
    drawLabel(cx, keyboardLabels[r][c], x + w, y + h + fontSize, w, h, fontSize);
  });
}

function drawLabel(cx, label, x, y, w, h, fontSize) {
  if (label == undefined || label == '') return;
  let lines = label.split('\n');
  let count = lines.length;
  let sy = y - (fontSize * count);
  for (let i = 0; i < count; i++) {
    cx.fillText(lines[i], x, sy, w);
    sy += fontSize;
  }
}

function drawKeyboard(cx, cellFunc) {
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
        drawEnter(cx, x, y, u, gap);
      else
        cx.strokeRect(x, y, w - gap, u - gap);
      if (cellFunc != undefined)
        cellFunc(c, r, x + gap, y + gap, w - gap * 3, u - gap * 3);
      x += w;
    }
  }
}

function drawEnter(cx, x, y, u, gap) {
  // Enter is not a rectangle
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