import {loadBRStates} from './data.js';
import {createGlobe, applyPolygonsToGlobe} from './globe.js';
import {initUI} from './ui.js';

(async function boot(){
  console.log('extracted/src/init.js: modular bootstrap');
  const geo = await loadBRStates();
  if(geo) console.log('BR states loaded:', geo.features?.length);
  initUI();
  const globe = createGlobe(document.body);
  applyPolygonsToGlobe(globe, geo);
})();
