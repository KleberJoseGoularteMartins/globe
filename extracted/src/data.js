// Minimal data module: loads local BR states GeoJSON and exports data helpers
export async function loadBRStates(){
  try{
    const res = await fetch('/extracted/br_states.geojson');
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }catch(e){
    console.error('loadBRStates error', e);
    return null;
  }
}

// Rivers / paths (extracted from the compiled bundle)
export const rivers = [
  {name:"Rio Negro",labelLat:-1,labelLng:-63,coords:[[2,-67],[1,-65],[0,-63],[-1,-62],[-2,-61],[-3,-60]]},
  {name:"Solimões",labelLat:-3,labelLng:-67,coords:[[-4,-73],[-3.5,-70],[-3,-67],[-3,-64],[-3,-61],[-3,-60]]},
  {name:"Rio Uruguai",labelLat:-30,labelLng:-57.5,coords:[[-27.7,-51.2],[-27.8,-52.5],[-28,-54],[-28.5,-55.5],[-29.5,-56.2],[-30.5,-57.5],[-31.4,-57.9],[-32.5,-58.2],[-33.5,-58.5]]},
  {name:"Amazonas",labelLat:-3,labelLng:-60,coords:[[-4,-77],[-4,-74],[-3,-71],[-3,-68],[-3,-65],[-3,-62],[-2,-58],[-1,-53],[0,-50]]},
  {name:"Paraná",labelLat:-23,labelLng:-53,coords:[[-20,-51],[-22,-52],[-24,-53],[-25.5,-54],[-27,-55],[-30,-57.5],[-32,-59],[-34,-58]]},
  {name:"Orinoco",labelLat:7,labelLng:-66,coords:[[2,-64],[4,-66],[7,-67],[7.5,-66],[7,-64],[8,-63],[10,-63],[10.7,-62]]},
  {name:"São Francisco",labelLat:-12,labelLng:-43,coords:[[-20,-46],[-17,-44],[-13,-42],[-11,-40],[-10,-37],[-10,-36.5]]},
  {name:"Tocantins",labelLat:-8,labelLng:-48,coords:[[-14,-47],[-10,-48],[-7,-48],[-4,-49],[-2,-49]]},
  {name:"Mississippi",labelLat:38,labelLng:-90,coords:[[47.2,-95.2],[45.5,-93],[43,-91],[40,-90],[37,-89],[33,-91],[30,-89.5],[29,-89.2]]},
  {name:"Mackenzie",labelLat:63,labelLng:-122,coords:[[61,-116],[63,-118],[65,-123],[67,-128],[68,-132],[69,-135]]},
  {name:"Yukon",labelLat:63,labelLng:-146,coords:[[60.4,-134.5],[62,-136],[63,-139],[65,-143],[64,-149],[63,-156],[62,-163],[63,-164]]},
  {name:"Colorado",labelLat:36,labelLng:-111,coords:[[40.5,-106],[38,-108],[36,-111],[34,-112],[33,-114],[31.9,-114.9]]},
  {name:"Rio Grande",labelLat:29,labelLng:-104,coords:[[37.7,-107.6],[35,-107],[32.5,-106],[29.8,-104],[27,-100],[26,-99],[25.9,-97.2]]},
  {name:"Volga",labelLat:53,labelLng:46,coords:[[57.2,33],[55,36],[53,44],[51,45],[49,46],[47,47],[46.5,51]]},
  {name:"Danúbio",labelLat:46,labelLng:19,coords:[[48,8.2],[47.5,13],[47.8,16],[47.5,17],[47,19],[46.5,20],[45.5,22],[45,25],[45.5,28],[45.2,30]]},
  {name:"Reno",labelLat:50,labelLng:7.5,coords:[[46.8,9.2],[47.5,8.5],[48.5,8],[50,7.5],[51.2,6.5],[51.8,4]]},
  {name:"Loire",labelLat:47,labelLng:-.5,coords:[[44.7,4],[46,3],[46.5,1.5],[47.3,.5],[47.5,-.5],[47.3,-2.2]]},
  {name:"Elba",labelLat:52,labelLng:12,coords:[[50.8,15.5],[51,14],[52,12],[53,10.5],[53.9,9]]},
  {name:"Tamisa",labelLat:51.5,labelLng:-.8,coords:[[51.7,-2],[51.7,-1.4],[51.65,-1],[51.6,-.5],[51.5,0],[51.5,.5],[51.5,.9]]},
  {name:"Sena",labelLat:48.9,labelLng:2,coords:[[47.8,4.9],[48.2,3.4],[48.5,2.8],[48.85,2.35],[49,1.5],[49.4,.6],[49.5,.1]]},
  {name:"Nilo",labelLat:15,labelLng:32,coords:[[-1,33],[2,31.5],[5,31],[10,30.5],[15,32.5],[18,31.5],[20,30.5],[22,32],[25,32.5],[28,31],[30,31.5],[31.5,30]]},
  {name:"Congo",labelLat:-4,labelLng:20,coords:[[-10,31],[-9,29],[-7,26],[-4,22],[-2,18],[0,17],[-1,16],[-4,15],[-5.8,12.2]]},
  {name:"Niger",labelLat:13,labelLng:0,coords:[[9,-13],[11,-9],[13,-4],[15,-1],[14,2],[11,3],[9,4],[5,6]]},
  {name:"Zambeze",labelLat:-16,labelLng:30,coords:[[-11.4,24.5],[-13,24],[-15,23],[-17.9,25.8],[-17.5,28],[-16,33],[-17,35],[-18.5,36.4]]},
  {name:"Orange",labelLat:-29,labelLng:22,coords:[[-29.5,29],[-29,27],[-29,25],[-29.5,23],[-28.8,20],[-28.6,16.5]]},
  {name:"Tigre",labelLat:35,labelLng:43,coords:[[38.5,40.5],[37,41],[36.5,42],[35,43],[34,44],[33,44.5],[32,46],[31,47],[30,48]]},
  {name:"Eufrates",labelLat:34,labelLng:40,coords:[[39.5,40.5],[38,38.5],[37,38],[36,38],[35.5,40],[34,41],[33,43],[32,44],[31,46],[30,47.5]]},
  {name:"Jordão",labelLat:32.5,labelLng:35.8,coords:[[33.4,35.7],[33,35.7],[32.8,35.6],[32.5,35.5],[32,35.5],[31.7,35.6]]},
  {name:"Yangtzé",labelLat:30,labelLng:108,coords:[[33,91],[31,96],[29,101],[29,105],[30,109],[29,112],[30,116],[31,120],[31.5,121.5]]},
  {name:"Rio Amarelo",labelLat:36,labelLng:107,coords:[[34.8,96],[35,100],[35.5,104],[37,107],[38,110],[36,113],[35,116],[37.5,119]]},
  {name:"Ob",labelLat:59,labelLng:72,coords:[[52.4,84.9],[55,79],[58,73],[61,71],[63,68],[65.5,68],[66.5,69]]},
  {name:"Yenisei",labelLat:62,labelLng:89,coords:[[52.3,94],[55,92],[58,90],[62,89],[65,87],[68,86],[72,80]]},
  {name:"Lena",labelLat:64,labelLng:119,coords:[[53.8,108.2],[57,112],[60,116],[64,121],[67,124],[70,126],[72.5,126.8]]},
  {name:"Ganges",labelLat:25,labelLng:82,coords:[[30.9,79],[28.5,79],[27,80],[26,82],[25,84],[24,87],[23,89.5],[22.5,90.5]]},
  {name:"Mekong",labelLat:20,labelLng:101,coords:[[32.5,94],[29,99],[25,100],[22,101],[20,102],[17.5,102],[15,105],[13,105],[10,106]]},
  {name:"Indo",labelLat:29,labelLng:70,coords:[[32.5,80.5],[33.5,76],[35,73],[34,71],[32,70],[29,69],[27,68],[25,67.5],[24,67.5]]},
  {name:"Amur",labelLat:50,labelLng:132,coords:[[53.3,121.5],[52,125],[50,130],[49,134],[49,138],[50,140],[52.5,141]]},
  {name:"Irrawaddy",labelLat:21,labelLng:96,coords:[[26,97.4],[24,96.5],[22,96],[20,95.5],[18,95.5],[17,95],[15.9,95]]},
  {name:"Murray-Darling",labelLat:-33,labelLng:144,coords:[[-28.5,148.5],[-30,146],[-32,144],[-33.5,142],[-34,141],[-35,141],[-35.5,140],[-35.6,138.9]]}
];

export const voyages = [
  {kind:"voyage",layerKey:"voyageColombo",explorer:"Cristóvão Colombo",year:"1492–93",dotColor:"#fbbf24",labelLat:22,labelLng:-52,colors:["rgba(251,191,36,0)","rgba(251,191,36,0.85)","rgba(251,191,36,0)"],coords:[[37.2,-6.9],[28.1,-15.4],[26,-25],[25,-38],[24.5,-50],[24,-62],[24,-74.5],[22.5,-80],[19,-69.5],[27,-65],[33,-50],[36,-35],[37.7,-25.7],[37.2,-9]]},
  {kind:"voyage",layerKey:"voyageCabral",explorer:"Pedro Álvares Cabral",year:"1500–01",dotColor:"#4ade80",labelLat:-10,labelLng:-24,colors:["rgba(74,222,128,0)","rgba(74,222,128,0.85)","rgba(74,222,128,0)"],coords:[[38.7,-9.1],[28.1,-15.4],[15,-23.5],[5,-30],[-5,-33.5],[-16.4,-39.1],[-22,-30],[-30,-15],[-37,-2],[-39,10],[-39,17],[-36.5,21],[-34.8,23],[-26,34],[-18,37],[-10,40.5],[-3,40.5],[3,41],[11.2,75.8]]},
  {kind:"voyage",layerKey:"voyageMagalhaes",explorer:"Fernão de Magalhães",year:"1519–22",dotColor:"#c084fc",labelLat:-20,labelLng:-120,colors:["rgba(192,132,252,0)","rgba(192,132,252,0.85)","rgba(192,132,252,0)"],coords:[[36.7,-6.4],[28.1,-15.4],[14,-25],[5,-35],[-8,-37],[-22.9,-43.2],[-33,-51],[-44,-63],[-52.5,-68.5],[-53.5,-71],[-53,-74],[-51,-78],[-40,-88],[-25,-105],[-10,-130],[0,-148],[8,-158],[9.5,-175],[12.5,175],[13.4,144.7],[11.5,125]]},
  {kind:"voyage",layerKey:"voyageMagalhaes",explorer:"Fernão de Magalhães",year:"1519–22",dotColor:"#c084fc",labelLat:-28,labelLng:78,colors:["rgba(192,132,252,0)","rgba(192,132,252,0.85)","rgba(192,132,252,0)"],coords:[[11.5,125],[-.5,127.5],[-9.5,124],[-18,116],[-28,96],[-36,58],[-39,18],[-36.5,21],[-34.8,23],[-20,10],[-5,8],[15,-17.5],[36.7,-6.4]]},
  {kind:"voyage",layerKey:"voyageVasco",explorer:"Vasco da Gama",year:"1497–98",dotColor:"#fb923c",labelLat:-28,labelLng:-6,colors:["rgba(251,146,60,0)","rgba(251,146,60,0.85)","rgba(251,146,60,0)"],coords:[[38.7,-9.1],[28.1,-15.4],[15,-23.5],[5,-25],[-3,-23],[-15,-15],[-28,-4],[-37,7],[-40,15],[-39,19],[-36.5,21],[-34.8,23],[-26,34],[-18,36.5],[-10,40],[-3.2,40.1],[3,41],[11.2,75.8]]},
  {kind:"voyage",layerKey:"voyageDias",explorer:"Bartolomeu Dias",year:"1487–88",dotColor:"#f472b6",labelLat:-18,labelLng:8,colors:["rgba(244,114,182,0)","rgba(244,114,182,0.85)","rgba(244,114,182,0)"],coords:[[38.7,-9.1],[25,-17],[15,-20],[5,-12],[0,-2],[-5,5],[-10,9],[-15,10.5],[-20,10],[-25,12],[-28,13],[-32,15],[-35,15.5],[-39,15.5],[-40.5,18.5],[-38.5,22],[-35.5,22.5],[-34.2,22.1],[-35.5,22.5],[-38.5,22],[-40.5,18.5],[-39,15.5],[-35,15.5],[-32,15],[-28,13],[-25,12],[-20,10],[-15,10.5],[-10,9],[-5,5],[0,-2],[5,-12],[15,-20],[38.7,-9.1]]}
];

export function getPathsData(){
  return [...rivers, ...voyages];
}

// Augment voyages with parsed color objects so runtime code can use structured color+opacity
function parseRgbaString(str){
  if(!str || typeof str !== 'string') return { color: str, opacity: 1 };
  const m = str.trim().toLowerCase().match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9.]+)\s*\)$/);
  if(m){
    const r = +m[1], g = +m[2], b = +m[3], a = Math.min(1, +m[4]);
    return { color: `rgb(${r},${g},${b})`, opacity: a };
  }
  // already rgb or hex
  return { color: str, opacity: 1 };
}

// Add normalized color objects on module load for voyages
for(const v of voyages){
  if(Array.isArray(v.colors)){
    v.colorsObj = v.colors.map(parseRgbaString);
  }
}

export function getPathsDataWithColorObjs(){
  // returns copies to avoid mutating original arrays at runtime
  return [...rivers.map(r=>({...r})), ...voyages.map(v=>({...v, colorsObj: v.colorsObj ? v.colorsObj.slice() : undefined}))];
}

