/* Shared navigation and the reference solution explorer. No dependencies. */
(() => {
'use strict';
document.documentElement.classList.add('js');
const products={microsoft:{category:'CONECTE PESSOAS E IDEIAS',kicker:'Microsoft 365 + Copilot',title:'Mais espaço<br>para fazer<br>acontecer.',description:'Uma equipe conectada. Aplicativos integrados. E novas possibilidades com inteligência artificial.',url:'microsoft-365.html',bottom:'Licenciamento · Implantação · Adoção',index:'01 / 03',symbol:'✦',tiles:['W','T','X','O'],caption:'Ideias que se conectam.'},adobe:{category:'DÊ FORMA À SUA PRÓXIMA IDEIA',kicker:'Adobe para empresas',title:'Ideias que<br>ganham<br>vida.',description:'Creative Cloud para criar. Acrobat para os documentos. Licenças para o ritmo da sua equipe.',url:'adobe-creative-cloud.html',bottom:'Creative Cloud · Acrobat · Gestão de licenças',index:'02 / 03',symbol:'✧',tiles:['Ps','Pr','Ai','Ac'],caption:'Criatividade em movimento.'},azure:{category:'EXPLORE UM NOVO HORIZONTE',kicker:'IA no Azure · Microsoft Foundry',title:'Sua ideia.<br>Um novo<br>horizonte.',description:'Explore modelos e aplicações de IA com orientação na contratação, configuração e governança.',url:'inteligencia-artificial.html',bottom:'Modelos · Aplicações · Governança',index:'03 / 03',symbol:'✳',tiles:['AI','◇','↗','∞'],caption:'O próximo começa agora.'}};
const tabs=[...document.querySelectorAll('[data-product]')];let selected='microsoft';
function selectProduct(key){selected=key;const p=products[key];tabs.forEach(tab=>{const active=tab.dataset.product===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});document.querySelector('#product-panel').setAttribute('aria-labelledby','tab-'+key);for(const name of ['category','kicker','description','bottom','index'])document.querySelector('#panel-'+name).textContent=p[name];document.querySelector('#panel-title').innerHTML=p.title;document.querySelector('#panel-link').href=p.url;document.querySelector('.product-art').dataset.theme=key;document.querySelector('#art-symbol').textContent=p.symbol;document.querySelector('#art-caption').textContent=p.caption;['one','two','three','four'].forEach((id,i)=>document.querySelector('#tile-'+id).textContent=p.tiles[i]);document.dispatchEvent(new CustomEvent('brasilsul:productchange'));}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectProduct(tab.dataset.product));tab.addEventListener('keydown',event=>{let next;if(['ArrowRight','ArrowDown'].includes(event.key))next=(i+1)%tabs.length;if(['ArrowLeft','ArrowUp'].includes(event.key))next=(i+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectProduct(tabs[next].dataset.product);tabs[next].focus()}})});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu(returnFocus = false) {
  const wasOpen = nav.classList.contains('open');
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  if (wasOpen && returnFocus) menuToggle.focus();
}
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
window.matchMedia('(max-width: 1050px)').addEventListener('change', () => closeMenu());

})();
