(function(){
  'use strict';
  var navToggle=document.querySelector('.nav-toggle');
  var navMenu=document.querySelector('.nav-menu');
  if(navToggle&&navMenu){
    navToggle.addEventListener('click',function(){
      var isOpen=navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded',String(isOpen));
    });
    document.addEventListener('click',function(e){
      if(!navToggle.contains(e.target)&&!navMenu.contains(e.target)){
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded','false');
      }
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&navMenu.classList.contains('is-open')){
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded','false');
        navToggle.focus();
      }
    });
  }
  var prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  function honorReducedMotion(){
    if(prefersReducedMotion.matches){
      document.documentElement.style.setProperty('--easing-spring','ease-out');
      document.documentElement.style.setProperty('--duration-fast','0ms');
      document.documentElement.style.setProperty('--duration-medium','0ms');
    }
  }
  honorReducedMotion();
  prefersReducedMotion.addEventListener('change',honorReducedMotion);
  if(!prefersReducedMotion.matches){
    var revealEls=document.querySelectorAll('.feature-card,.feature-detail,.client-card,.download-card,.ecosystem-item,.faq-item,.about-column');
    if('IntersectionObserver' in window&&revealEls.length){
      var revealObserver=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.style.opacity='1';
            entry.target.style.transform='translateY(0)';
            revealObserver.unobserve(entry.target);
          }
        });
      },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
      revealEls.forEach(function(el){
        el.style.opacity='0';
        el.style.transform='translateY(20px)';
        el.style.transition='opacity 0.5s ease-out,transform 0.5s ease-out';
        revealObserver.observe(el);
      });
    }
  }
  var bubblesContainer=document.querySelector('.bubbles-container');
  if(bubblesContainer&&!prefersReducedMotion.matches){
    var colors=['#F9A8D4','#C4B5FD','#A7F3D0','#FBCBA9','#93C5FD'];
    for(var i=0;i<12;i++){
      var b=document.createElement('div');
      b.className='bubble';
      var size=Math.random()*40+10;
      b.style.width=size+'px';
      b.style.height=size+'px';
      b.style.left=Math.random()*100+'%';
      b.style.animationDuration=(Math.random()*10+8)+'s';
      b.style.animationDelay=(Math.random()*5)+'s';
      b.style.background='radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8), '+colors[Math.floor(Math.random()*colors.length)]+' 60%, transparent)';
      bubblesContainer.appendChild(b);
    }
  }
})();