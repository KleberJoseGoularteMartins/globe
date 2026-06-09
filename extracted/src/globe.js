import * as THREE from 'three';
import Globe from 'three-globe';
import { getPathsData } from './data.js';

function stripAlpha(color){
  if(!color || typeof color !== 'string') return color;
  const m = color.trim().toLowerCase().match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)$/);
  if(m){
    return `rgb(${+m[1]},${+m[2]},${+m[3]})`;
  }
  return color;
}

function getOpacity(color){
  if(!color || typeof color !== 'string') return 1;
  const m = color.trim().toLowerCase().match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)$/);
  return m? Math.min(1, +m[4]) : 1;
}

export function createGlobe(container){
  if(!container) container = document.body;
  const wrapper = document.createElement('div');
  wrapper.style.width = '100%';
  wrapper.style.height = '100%';
  wrapper.style.position = 'relative';
  container.appendChild(wrapper);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  renderer.domElement.style.display = 'block';
  wrapper.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, wrapper.clientWidth / wrapper.clientHeight, 0.1, 1000);
  camera.position.z = 300;

  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 0.6);
  dir.position.set(5, 3, 5);
  scene.add(dir);

  const globe = new Globe();
  globe.width = wrapper.clientWidth;
  globe.height = wrapper.clientHeight;

  // sensible defaults — images hosted on CDN; user can change later
  globe.globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
  globe.bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png');

  // normalize colors coming from data (strip alpha) and expose opacity via material
  globe.polygonsTransitionDuration(300);
  globe.polygonCapColor((f) => stripAlpha(f.properties && (f.properties.fill || f.properties.fillColor) || '#8cc8ff'));
  globe.polygonSideColor((f) => stripAlpha(f.properties && (f.properties.side || f.properties.sideColor) || '#000000'));
  globe.polygonAltitude(0.01);

  // attach to scene
  scene.add(globe);

  // apply paths from extracted data if available
  try{
    const paths = getPathsData();
    if(paths && paths.length) {
      globe.pathsData(paths.map(p => ({ ...p })));

      // paths: map coords and normalize rgba color arrays to rgb strings
      globe.pathPoints(p => p.coords);
      globe.pathPointLat(pt => pt[0]);
      globe.pathPointLng(pt => pt[1]);
      globe.pathColor(p => {
        // prefer pre-parsed colorsObj (from data.js), fall back to colors array or single color
        if(p.colorsObj && Array.isArray(p.colorsObj)){
          return p.colorsObj.map(o => o.color);
        }
        const c = p.colors || p.color || p.dotColor || ["rgba(40,140,255,0)","rgba(80,190,255,0.9)","rgba(40,140,255,0)"];
        return Array.isArray(c) ? c.map(stripAlpha) : stripAlpha(c);
      });
      globe.pathStroke(p => p.kind === 'voyage' ? 1.5 : 1.8);
      globe.pathDashLength(p => p.kind === 'voyage' ? 0.5 : 1);
      globe.pathDashGap(p => p.kind === 'voyage' ? 0.25 : 0);
      globe.pathDashAnimateTime(p => p.kind === 'voyage' ? 35000 : 0);
    }
  }catch(e){
    console.warn('createGlobe: could not set pathsData', e);
  }

  // simple orbit/animation loop (no external controls required)
  let running = true;
  function onResize(){
    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  function animate(){
    if(!running) return;
    requestAnimationFrame(animate);
    globe.rotation.y += 0.0015;
    renderer.render(scene, camera);
  }
  animate();

  return {
    wrapper, renderer, scene, camera, globe,
    stop(){ running = false; window.removeEventListener('resize', onResize); if(renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); }
  };
}

export function applyPolygonsToGlobe(instance, geojson){
  if(!instance || !instance.globe) return;
  if(!geojson || !geojson.features) return;
  try{
    instance.globe.polygonsData(geojson.features.map(f => ({ ...f })));
    // set per-polygon opacity if properties provide rgba strings
    instance.globe.polygonCapColor((f) => stripAlpha(f.properties && (f.properties.fill || f.properties.fillColor) || '#8cc8ff'));
    instance.globe.polygonSideColor((f) => stripAlpha(f.properties && (f.properties.side || f.properties.sideColor) || '#000000'));
  }catch(e){
    console.error('applyPolygonsToGlobe error', e);
  }
}
