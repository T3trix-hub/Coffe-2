const b=document.querySelector('.burger'),n=document.querySelector('nav');
if(b){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)})}
const f=document.getElementById('book');
if(f){f.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(f);
  const t=`Здравствуйте! Хочу записаться в Кофейня №2.\nУслуга: ${d.get('service')}\nУдобное время: ${d.get('when')||'—'}\nИмя: ${d.get('name')}`;
  window.open('https://wa.me/375445598821?text='+encodeURIComponent(t),'_blank');
})}

// плавное появление элементов при прокрутке
(()=>{
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const sel='main section:not(.hero) h2, main section:not(.hero) .lead, .tile, .card, .photo, .note, .map, .cards>div, .gallery figure, .stats>div';
  const els=[...document.querySelectorAll(sel)].filter(e=>!e.closest('.hero'));
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}});
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(e=>{
    e.classList.add('reveal');
    const sibs=[...e.parentElement.children].filter(c=>c.classList.contains('reveal')||els.includes(c));
    const i=sibs.indexOf(e);
    if(i>0)e.style.transitionDelay=Math.min(i,4)*.12+'s';
    io.observe(e);
  });
})();

// просмотр фото в галерее
(()=>{
  const figs=document.querySelectorAll('.gallery figure');
  if(!figs.length)return;
  const lb=document.createElement('div');lb.className='lb';lb.innerHTML='<img alt="">';document.body.appendChild(lb);
  const im=lb.querySelector('img');
  figs.forEach(f=>f.addEventListener('click',()=>{const s=f.querySelector('img');im.src=s.src;im.alt=s.alt;lb.classList.add('open')}));
  lb.addEventListener('click',()=>lb.classList.remove('open'));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')});
})();
