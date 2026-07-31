const puppeteer = require('puppeteer');
const fs = require('fs');

async function measureFPS(page, description) {
  console.log(`\n--- Measuring: ${description} ---`);
  
  // Reset scroll
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500)); // wait for layout to settle

  const metricsBefore = await page.metrics();
  
  // Scroll continuously for 3 seconds
  await page.evaluate(async () => {
    return new Promise((resolve) => {
      let distance = 0;
      const scrollStep = 20;
      const scrollInterval = setInterval(() => {
        window.scrollBy(0, scrollStep);
        distance += scrollStep;
        if (distance > 3000) {
          clearInterval(scrollInterval);
          resolve();
        }
      }, 16); // roughly 60fps scrolling simulation
    });
  });

  const metricsAfter = await page.metrics();

  const taskDuration = metricsAfter.TaskDuration - metricsBefore.TaskDuration;
  const layoutDuration = metricsAfter.LayoutDuration - metricsBefore.LayoutDuration;
  const recalcStyleDuration = metricsAfter.RecalcStyleDuration - metricsBefore.RecalcStyleDuration;
  const scriptDuration = metricsAfter.ScriptDuration - metricsBefore.ScriptDuration;

  console.log(`Task Duration (Main Thread): ${(taskDuration * 1000).toFixed(2)} ms`);
  console.log(`Script Duration: ${(scriptDuration * 1000).toFixed(2)} ms`);
  console.log(`Layout Duration: ${(layoutDuration * 1000).toFixed(2)} ms`);
  console.log(`Recalc Style Duration: ${(recalcStyleDuration * 1000).toFixed(2)} ms`);
  
  return {
    description,
    taskDuration,
    scriptDuration,
    layoutDuration
  };
}

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to simulate a modern desktop
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Navigating to local server...');
  try {
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  } catch(e) {
    console.error("Vite server (preview) not running. Trying dev server...");
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  }

  await new Promise(r => setTimeout(r, 2000)); // wait for images to load

  // CASO A: Actual (Everything enabled)
  await measureFPS(page, "Caso A: Aplicacion actual (Blur + DropShadow + Hero)");

  // Remove Drop Shadow
  await page.evaluate(() => {
    document.querySelectorAll('img.drop-shadow-lg').forEach(el => {
      el.classList.remove('drop-shadow-lg');
      el.classList.remove('group-hover:drop-shadow-2xl');
      el.classList.remove('filter');
    });
  });
  await measureFPS(page, "Caso B: Sin drop-shadow en tarjetas");

  // Remove Hero Anim & Blend Mode
  await page.evaluate(() => {
    document.querySelectorAll('.mix-blend-multiply').forEach(el => {
      el.classList.remove('mix-blend-multiply');
      el.classList.remove('animate-pulse');
      el.classList.remove('blur-[120px]');
    });
  });
  await measureFPS(page, "Caso C: Sin animaciones/blend en HeroEditorial");

  console.log('\nGenerating Chrome Trace for manual inspection...');
  // Reload page to get full trace of everything enabled
  await page.reload({ waitUntil: 'networkidle0' });
  await page.tracing.start({ path: 'trace.json', screenshots: true });
  
  await page.evaluate(() => window.scrollTo(0, 1000));
  await new Promise(r => setTimeout(r, 500));
  
  // Click a piece card to trigger modal
  await page.evaluate(() => {
    const card = document.querySelector('.group.cursor-pointer');
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 1000)); // Wait for modal animation
  
  await page.tracing.stop();
  console.log('Trace saved to trace.json');

  await browser.close();
})();
