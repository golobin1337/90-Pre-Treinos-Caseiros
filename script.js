(function(){
  var el=document.getElementById('promoDate');
  if(!el) return;
  var d=new Date();
  function p(n){return (n<10?'0':'')+n;}
  el.textContent=p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+d.getFullYear();
})();

document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var id=a.getAttribute('href');
    if(id&&id.length>1){var t=document.querySelector(id);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}}
  });
});

// ---- Receita carousel + lightbox ----
var scroller=document.getElementById('scroller');
var shots=[].slice.call(document.querySelectorAll('.shot'));
var lb=document.getElementById('lightbox'), lbImg=document.getElementById('lbImg'),
    lbStage=document.getElementById('lbStage'), lbCap=document.getElementById('lbCaption'),
    lbZoom=document.getElementById('lbZoom');
var current=0;

function carMove(dir){
  if(!scroller) return;
  var card=scroller.querySelector('.shot');
  var step=card?(card.offsetWidth+16):300;
  scroller.scrollBy({left:dir*step,behavior:'smooth'});
}

shots.forEach(function(s,i){
  s.addEventListener('click',function(){ lbOpen(i); });
});

function lbOpen(i){
  current=i;
  var s=shots[i], img=s.querySelector('img');
  lbImg.src=img.src; lbImg.alt=img.alt;
  lbCap.textContent=s.getAttribute('data-name')||img.alt||'';
  lbStage.classList.remove('zoomed'); lbStage.scrollTop=0; lbStage.scrollLeft=0;
  lbZoom.textContent='🔍 Ampliar';
  lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function lbClose(){
  lb.classList.remove('open'); lb.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
function lbMove(dir){
  current=(current+dir+shots.length)%shots.length;
  lbOpen(current);
}
function lbToggleZoom(){
  var z=lbStage.classList.toggle('zoomed');
  lbZoom.textContent=z?'🔍 Reduzir':'🔍 Ampliar';
  if(!z){lbStage.scrollTop=0;lbStage.scrollLeft=0;}
}
lbStage.addEventListener('click',function(e){ if(e.target===lbImg) lbToggleZoom(); });
lb.addEventListener('click',function(e){ if(e.target===lb) lbClose(); });
document.addEventListener('keydown',function(e){
  if(!lb.classList.contains('open')) return;
  if(e.key==='Escape') lbClose();
  else if(e.key==='ArrowRight') lbMove(1);
  else if(e.key==='ArrowLeft') lbMove(-1);
});
