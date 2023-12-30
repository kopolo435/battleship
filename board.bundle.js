"use strict";(self.webpackChunkbattleship=self.webpackChunkbattleship||[]).push([[198],{650:(e,t,s)=>{s.a(e,(async(e,t)=>{try{var n=s(106),o=s(291),a=s(346),i=s(54);let r=new Map,l=null;function c(e){const t=new Map;e.forEach(((e,s)=>{t.set(s,e)})),r=t}function u(e){const t=document.getElementById("gameStatus");l&&clearInterval(l),t.textContent="";let s=0;l=setInterval((()=>{s<=e.length?(t.textContent=e.substring(0,s),s+=1):(clearInterval(l),l=null)}),50)}function d(e){const t=document.getElementById("enemyBoard").querySelectorAll(".cell");Array.from(t).forEach((t=>{t.addEventListener("click",(()=>{const s=t.dataset.id;"hit"===r.get(s)||"miss"===r.get(s)?u(i.kk):e(s)}))}))}async function h(e){return await d(e)}async function m(e,t){let s,n=e,o=t;for(;!o.getGameboard().allShipsSunk();){let e;if(s?u(i.DQ):!1===s&&u(i.Fg),n.getIsComputer()||o.getIsComputer()||(a.mt(n.name),a.ai()),a.ZD(n.getGameboard().getCells(),!0),a.ZD(o.getGameboard().getCells(),!1),c(o.getGameboard().getCells()),a.eI(r),n.getIsComputer()?(n.getIsComputer()&&o.getIsComputer()&&await new Promise((e=>setTimeout(e,1500))),e=n.getComputerPlay(o.getGameboard().getCells())):e=await new Promise(h),s=o.getGameboard().receiveAttack(e),u(s?i.ps:i.zx),a.ZD(o.getGameboard().getCells(),!1),c(o.getGameboard().getCells()),a.eI(r),o.getGameboard().allShipsSunk())return n.getName();n.getIsComputer()?n.getIsComputer()&&o.getIsComputer()&&await new Promise((e=>setTimeout(e,2e3))):await new Promise((e=>setTimeout(e,2e3)));const t=n;n=o,o=t}return null}function p(e,t){let s,n;return[e.name,t.name][Math.floor(2*Math.random())]===e.name?(s=e,n=t):(s=t,n=e),{initialPlayer:s,secondPlayer:n}}function g(e){return JSON.parse(sessionStorage.getItem(`${e}Gameboard`),o.y)}function f(e,t){if(e.getIsComputer()||t.getIsComputer()){const e=new Event("click");$.dispatchEvent(e)}}function C(){window.location.href="index.html"}function y(e,t,s){e===t.name?(u(`${t.name} ${i.mm} ${s}`),t.getIsComputer()?(a.Gn(s.getGameboard().getCells(),!0),a.Gn(t.getGameboard().getCells(),!1)):(a.Gn(t.getGameboard().getCells(),!0),a.Gn(s.getGameboard().getCells(),!1))):(u(`${s.name} ${i.mm} ${t}`),s.getIsComputer()?(a.Gn(t.getGameboard().getCells(),!0),a.Gn(s.getGameboard().getCells(),!1)):(a.Gn(s.getGameboard().getCells(),!0),a.Gn(t.getGameboard().getCells(),!1)))}const b=JSON.parse(sessionStorage.getItem("player1")),v=JSON.parse(sessionStorage.getItem("player2")),E=g("player1"),I=g("player2"),w=new n.Z(b.name,b.isComputer),G=new n.Z(v.name,v.isComputer);w.gameboard=E,G.gameboard=I;const $=document.getElementById("ready"),k=document.getElementById("newGame");k.addEventListener("click",C),$.addEventListener("click",a.YX);const{initialPlayer:P,secondPlayer:S}=p(w,G);f(P,S);const B=await m(P,S);y(B,w,G),k.disabled=!1,console.log(B),t()}catch(L){t(L)}}),1)},895:(e,t,s)=>{s.d(t,{Z:()=>n});const n=function(e){const t=e.replace(/[^0-9||,]*/g,"").split(",");return[Number(t[0]),Number(t[1])]}},559:(e,t,s)=>{s.d(t,{Z:()=>o});var n=s(765);class o{constructor(){this.cells=this.#e(),this.ships=[]}#e(){const e=new Map;for(let t=0;t<10;t+=1)for(let s=0;s<10;s+=1)e.set(`[${t},${s}]`,"empty");return e}#t(e){return"empty"===this.cells.get(e)}checkIfPositionsAvailable(e){return e.getPositions().every(this.#t.bind(this))}addShip(e,t,s){if("empty"===this.cells.get(e)){const o=new n.Z(e,t,s);if(this.checkIfPositionsAvailable(o))return this.ships.push(o),o.getPositions().forEach((e=>{this.cells.set(e,"ship")})),!0}return!1}getCells(){return this.cells}receiveAttack(e){let t=!1;return this.ships.forEach((s=>{s.hit(e)&&(t=!0)})),t?(this.cells.set(e,"hit"),!0):(this.cells.set(e,"miss"),!1)}allShipsSunk(){return this.ships.every((e=>e.isSunk()))}setShips(e){const t=[];e.forEach((e=>{t.push(e),e.getPositions().forEach((e=>{this.cells.set(e,"ship")}))})),this.ships=t}}},291:(e,t,s)=>{s.d(t,{P:()=>i,y:()=>r});var n=s(765),o=s(559);function a(e){const t=[];return e.forEach(((e,s)=>{t.push({cell:s,value:e})})),t}function i(e,t){return t instanceof n.Z?{datatype:"Ship",hits:t.hits,positions:a(t.positions)}:t instanceof Map?a(t):t}function r(e,t){if("object"==typeof t&&null!==t){if("Ship"===t.datatype)return function(e){const{hits:t}=e,{positions:s}=e,o=new Map;s.forEach((e=>{o.set(e.cell,e.value)}));const a=new n.Z("[0,0]",0,"vertical");return a.positions=o,a.hits=t,a}(t);if(t.ships)return function(e){const{cells:t}=e,{ships:s}=e,n=new Map;t.forEach((e=>{n.set(e.cell,e.value)}));const a=new o.Z;return a.cells=n,a.ships=s,a}(t)}return t}},106:(e,t,s)=>{s.d(t,{Z:()=>a});var n=s(559),o=s(895);class a{constructor(e,t){this.name=e,this.isComputer=t,this.gameboard=new n.Z}getName(){return this.name}getIsComputer(){return this.isComputer}getGameboard(){return this.gameboard}#s(e){const t=[],s=[];return e.forEach(((e,n)=>{"miss"!==e&&("hit"===e?s.push(n):t.push(n))})),{possibleCells:t,hitCells:s}}#n(e,t){const s=[];return e.forEach((e=>{const[n,a]=(0,o.Z)(e);[[n-1,a],[n+1,a],[n,a-1],[n,a+1]].forEach((e=>{e[0]>-1&&e[0]<10&&e[1]>-1&&e[1]<10&&("empty"!==t.get(`[${e[0]},${e[1]}]`)&&"ship"!==t.get(`[${e[0]},${e[1]}]`)||s.push(`[${e[0]},${e[1]}]`))}))})),s}#o(e){return e[Math.floor(Math.random()*(e.length-1))]}getComputerPlay(e){const t=this.#s(e);if(t.hitCells.length>0){const s=this.#n(t.hitCells,e);return 0!=s.length?this.#o(s):this.#o(t.possibleCells)}return this.#o(t.possibleCells)}}},346:(e,t,s)=>{function n(){document.getElementById("curtain").classList.remove("closed")}function o(){document.getElementById("curtain").classList.add("closed")}function a(e,t){const s=document.createElement("div");switch(s.classList.add("cell"),s.setAttribute("data-id",e),t){case"empty":s.classList.add("empty");break;case"ship":s.classList.add("ship");break;case"hit":s.classList.add("hit");break;case"miss":s.classList.add("miss")}return s}function i(e){document.getElementById("enemyBoard").querySelectorAll(".cell").forEach((t=>{t.addEventListener("mouseover",(()=>{!function(e,t){"hit"!==t.get(e.dataset.id)&&"miss"!==t.get(e.dataset.id)?e.classList.add("hover","valid"):(e.classList.remove("valid"),e.classList.add("hover","invalid"))}(t,e)})),t.addEventListener("mouseout",(()=>{t.classList.remove("hover","invalid","valid")}))}))}function r(e,t){if(t){const t=document.getElementById("currentBoard");t.replaceChildren();for(let s=9;s>=0;s-=1)for(let n=0;n<10;n+=1){const o=`[${n},${s}]`;t.appendChild(a(o,e.get(o)))}}else{const t=document.getElementById("enemyBoard");t.replaceChildren();for(let s=9;s>=0;s-=1)for(let n=0;n<10;n+=1){const o=`[${n},${s}]`,i=e.get(o);"ship"===i?t.appendChild(a(o,"empty")):t.appendChild(a(o,i))}}}function l(e,t){if(t){const t=document.getElementById("currentBoard");t.replaceChildren();for(let s=9;s>=0;s-=1)for(let n=0;n<10;n+=1){const o=`[${n},${s}]`;t.appendChild(a(o,e.get(o)))}}else{const t=document.getElementById("enemyBoard");t.replaceChildren();for(let s=9;s>=0;s-=1)for(let n=0;n<10;n+=1){const o=`[${n},${s}]`;t.appendChild(a(o,e.get(o)))}}}function c(e){document.getElementById("playerName").textContent=e}s.d(t,{Gn:()=>l,YX:()=>o,ZD:()=>r,ai:()=>n,eI:()=>i,mt:()=>c})},765:(e,t,s)=>{s.d(t,{Z:()=>o});var n=s(895);class o{constructor(e,t,s){this.positions=this.#a(e,t,s),this.hits=0}#a(e,t,s){const[o,a]=(0,n.Z)(e),i=new Map;if("vertical"===s)for(let e=0;e<t;e+=1)i.set(`[${o},${a+e}]`,!1);else if("horizontal"===s)for(let e=0;e<t;e+=1)i.set(`[${o+e},${a}]`,!1);return i}getPositions(){const e=[];return this.positions.forEach(((t,s)=>{e.push(s)})),e}getLength(){return this.getPositions().length}hit(e){if(void 0!==this.positions.get(e)&&!0!==this.positions.get(e)){const[t,s]=(0,n.Z)(e);return this.positions.set(`[${t},${s}]`,!0),this.hits+=1,!0}return!1}isSunk(){return this.hits>=this.getLength()}}},54:e=>{e.exports=JSON.parse('{"ps":"El ataque fue exitoso capitan","zx":"El ataque fue fallido capitan","DQ":"Capitan! El enemigo realizo un ataque exitoso en uno de nuestros barcos. Esperando sus nuevas instrucciones capitan","Fg":"Capitan el enemigo realizo un ataque, pero no le dio a ninguna de nuestros barcos. Esperando sus instrucciones capitan","mm":"logro destruir todos los barcos de","kk":"Capitan, ya ha realizado un ataque en esa posición, escoja otra celda para atacar"}')}},e=>{e(e.s=650)}]);
//# sourceMappingURL=board.bundle.js.map