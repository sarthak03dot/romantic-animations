const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:5173/');
  
  const dim = await page.evaluate(() => {
    const el = document.getElementById('animation-container');
    const canvas = el.querySelector('canvas');
    return {
      containerW: el.offsetWidth,
      containerH: el.offsetHeight,
      canvasW: canvas ? canvas.width : null,
      canvasH: canvas ? canvas.height : null,
      canvasZ: canvas ? canvas.style.zIndex : null,
      bodyZ: document.body.style.zIndex,
    };
  });
  console.log('DIMENSIONS:', dim);

  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
