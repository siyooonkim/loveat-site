/*
 * 러브앳 홈(v4) 동작 — 원본: home-renewal-2026-11-23/home-v4.html (아티팩트 v21) 의 스크립트를 옮겼다.
 * 사이트 이식 때 바꾼 것
 *  1) 영상 시작: autoplay + 바로 play(). 재생 중 버퍼가 모자라면 4초 분량을 모아 이어 재생. 재생이 막히면 MATCHED 정지 화면 + ▶.
 *  2) 맨 아래 '스토어 버튼' 블록(출시 전에는 '곧 출시돼요' 안내). 주소·출시 여부는 src/lib/site.ts 한 곳에서 정한다.
 */
(function(){
  var doc=document.documentElement; doc.classList.add('js');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO='IntersectionObserver' in window;

  /* film: pause/play, scene-synced signal card, journey, overhead labels */
  var v=document.getElementById('film'), ctl=document.getElementById('filmCtl');
  var REPLAY='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5V0L4 3.5 8 7V4.2a4.3 4.3 0 1 1-4.3 4.3H2a6 6 0 1 0 6-6z"/></svg>';
  var PLAY='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 2.5v11l9-5.5z"/></svg>';
  var filmDone=false, blocked=false, HOLD=null;
  function syncCtl(){ if(filmDone){ ctl.innerHTML=REPLAY; ctl.setAttribute('aria-label','영상 다시 보기'); ctl.hidden=false; }
    else if(blocked&&v.paused){ ctl.innerHTML=PLAY; ctl.setAttribute('aria-label','영상 재생'); ctl.hidden=false; }
    else ctl.hidden=true; }
  /* autoplay: muted + inline, retried on visibility and on the first interaction; reduced motion only calms the overlays */
  v.muted=true; v.defaultMuted=true; v.setAttribute('muted',''); v.playsInline=true;
  function play(){ v.muted=true; var pr=v.play(); if(pr&&pr.then) pr.then(function(){ blocked=false; syncCtl(); },function(){ blocked=true; showStill(); syncCtl(); }); }
  /* 재생이 막혔을 때(iOS 저전력 모드 등): 포스터를 MATCHED 장면 정지 화면으로 바꾸고, 카드도 그 장면 시각(STILL_T)에 맞춰 그린다.
     영상 데이터를 못 받아도(iOS 는 play 전엔 거의 안 받는다) 정지 화면과 카드가 맞도록 영상 시간을 쓰지 않고 STILL_T 로 그린다. ▶ 를 누르면 처음부터 재생. */
  var STILL_T=19.3, stillT=null;
  function showStill(){ if(!v.paused||filmDone||v.currentTime>=0.1) return; stillT=STILL_T;
    v.poster=v.poster.replace(/-poster\.webp$/,'-still.webp'); }
  v.addEventListener('playing',function(){ stillT=null; if(blocked){ blocked=false; syncCtl(); } });
  function retry(){ if(rebuf) return; if(v.paused&&!filmDone){ if(blocked&&v.currentTime>0) v.currentTime=0; stillT=null; play(); } }
  ['pointerdown','touchstart','keydown','wheel'].forEach(function(ev){ window.addEventListener(ev,retry,{once:true,passive:true}); });
  document.addEventListener('visibilitychange',function(){ if(!document.hidden) retry(); });
  ctl.addEventListener('click',function(){ if(filmDone){ filmDone=false; v.currentTime=0; } blocked=false; stillT=null; rebuf=false; play(); syncCtl(); });
  /* the film plays once and rests on the last frame of the two of them laughing (before the fade to black) */
  function holdAt(){ return HOLD!=null?HOLD:Math.max(0,(v.duration||21.04)-0.05); }
  function finish(){ filmDone=true; v.pause(); try{ v.currentTime=holdAt(); }catch(e){} syncCtl(); }
  v.addEventListener('ended',finish);
  v.addEventListener('play',syncCtl); v.addEventListener('pause',syncCtl);
  /* 자동재생: 영상 태그의 muted·playsinline·autoplay 에 더해 바로 play() 를 부른다.
     (iOS Safari 는 play() 전에는 영상을 거의 받지 않으므로, 다 받을 때까지 기다리면 영영 시작하지 않는다)
     재생 중 데이터가 모자라 멈추면(waiting) 잠깐 멈춘 채 4초 분량을 모은 뒤 이어서 재생한다 — 짧게 여러 번 끊기는 대신 한 번만 기다린다.
     카드·MATCHED 는 매 프레임 영상 시간을 따라가므로 기다리는 동안에도 어긋나지 않는다. */
  var rebuf=false, rebufT=0;
  function ahead(){ try{ var b=v.buffered,t=v.currentTime; for(var i=0;i<b.length;i++){ if(b.start(i)<=t+0.1&&b.end(i)>=t) return b.end(i)-t; } }catch(e){} return 0; }
  v.addEventListener('waiting',function(){ if(filmDone||blocked||rebuf||v.currentTime<0.05) return; rebuf=true; rebufT=Date.now(); v.pause(); });
  setInterval(function(){ if(!rebuf) return; var left=Math.max(0,(v.duration||0)-v.currentTime-0.1);
    if(ahead()>=Math.min(4,left)||Date.now()-rebufT>8000){ rebuf=false; play(); } },250);
  play();
  setTimeout(function(){ if(v.paused&&!filmDone&&!rebuf){ blocked=true; showStill(); syncCtl(); } },2500);

  /* overhead labels + face-keeping crop, driven by the editors' cue file */
  var heads=document.getElementById('heads'), CUE=null;
  try{ CUE=JSON.parse(document.getElementById('cueData').textContent); }catch(e){}
  /* head tracks re-measured on the 28.6s film where the cue file drifted */
  if(CUE){ CUE.shots.forEach(function(sh){
    function tr(a){ return a.map(function(q){ return {t:q[0],x:q[1],y:q[2]}; }); }
    if(sh.id==='man-pov-1'&&sh.head){
      sh.head['16x9']=tr([[2.667,.49,.35],[3.5,.49,.35],[4,.51,.36],[4.5,.51,.34],[5,.51,.36],[5.5,.51,.34],[6,.58,.38],[6.5,.56,.32],[7,.475,.30],[7.667,.46,.30]]);
      sh.head['9x16']=tr([[2.667,.61,.26],[3.5,.61,.26],[4,.61,.27],[4.5,.64,.25],[5,.69,.27],[5.5,.67,.25],[6,.56,.28],[6.5,.44,.25],[7,.34,.24],[7.667,.32,.24]]); }
    if(sh.id==='man-pov-3'&&sh.head&&sh.head['16x9']){ sh.head['16x9'].forEach(function(q){ q.x+=0.08*Math.min(1,Math.max(0,13-q.t)); }); }
    if(sh.id==='man-pov-3'&&sh.head&&sh.head['9x16']){ sh.head['9x16'].forEach(function(q){ q.x+=0.1; }); }
  }); }
  if(CUE){ CUE.shots.forEach(function(sh){ if(sh.copy&&sh.copy.videoFadeOut) HOLD=sh.copy.videoFadeOut[0]-0.05; }); }
  function ratio(){ return /9x16/.test(v.currentSrc||v.getAttribute('src')||'')?'9x16':'16x9'; }
  function lerpTrack(tr,t){ if(!tr||!tr.length) return null; if(t<=tr[0].t) return tr[0];
    for(var i=1;i<tr.length;i++){ if(t<=tr[i].t){ var a=tr[i-1],b=tr[i],k=(t-a.t)/((b.t-a.t)||1); return {x:a.x+(b.x-a.x)*k,y:a.y+(b.y-a.y)*k,inFrame:a.inFrame!==false&&b.inFrame!==false}; } } return tr[tr.length-1]; }
  function ramp(t,a,b){ return b<=a?(t>=a?1:0):Math.min(1,Math.max(0,(t-a)/(b-a))); }
  function span(x){ return Array.isArray(x)?x:[x,x+0.3]; }
  function ease3(k){ return 1-Math.pow(1-k,3); }
  var TAGS=[];
  /* example card copy per shot (marked on the page as example values) */
  var CARD={
    'man-pov-1':{rows:[['연락','자주 원하는 편 · 다름']]},
    'man-pov-2':{rows:[['거리','차로 20분']], rows2:[['횟수','한 달에 두 번 · 다름']]},
    'man-pov-3':{rows:[['갈등','시간 두고 푸는 편']]},
    'woman-hero':{rows:[['횟수','주 2회 이상 만남'],['연락','하루 한두 번'],['거리','차로 30분 이내']]}
  };
  function tagsOf(sh){ var out=[];
    if(Array.isArray(sh.tags)) sh.tags.forEach(function(g,i){ out.push({g:g,head:g.head||(g.headKey&&sh[g.headKey])||(i===0?sh.head:sh['head'+(i+1)])||sh.head}); });
    else if(sh.tag){ out.push({g:sh.tag,head:sh.tag.head||sh.head}); for(var i=2;sh['tag'+i];i++) out.push({g:sh['tag'+i],head:sh['tag'+i].head||sh['head'+i]||sh.head}); }
    return out; }
  function esc(x){ return String(x).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];}); }
  if(CUE){ CUE.shots.forEach(function(sh){ var cd=CARD[sh.id]||{rows:[]}; tagsOf(sh).forEach(function(tg,i){
    var big=!!sh.matched&&i===0, rows=(i>0&&cd.rows2)?cd.rows2:cd.rows;
    var d=document.createElement('div'); d.className='head'+(big?' big':'');
    var html='<div class="tc '+(big?'big':'mini')+'">'+
      (big?'<div class="tc-h">MATCHED</div>':'<div class="tc-pct"><span class="fr"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3.2"/><circle cx="16" cy="8" r="3.2"/><path d="M2.5 19c.4-3.4 2.7-5.5 5.5-5.5s5.1 2.1 5.5 5.5zM12.6 14.3c1-.5 2.1-.8 3.4-.8 2.8 0 5.1 2.1 5.5 5.5h-7.2c-.2-1.8-.8-3.4-1.7-4.7z"/></svg><i>FRIEND</i><b class="fv"></b></span><span class="lv"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.6 1.1 4.3 2.4.7-1.3 2.2-2.4 4.3-2.4 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21z"/></svg><i>LOVE</i><b class="lvv"></b></span></div>')+

      '<ul class="tc-rows">'+rows.map(function(r){ return '<li><span class="k">'+esc(r[0])+'</span><span class="v">'+esc(r[1])+'</span>'+(big?'<span class="ok">일치 ✓</span>':'')+'</li>'; }).join('')+'</ul>'+
      (big?'<div class="tc-like"><span class="pl"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.6 1.1 4.3 2.4.7-1.3 2.2-2.4 4.3-2.4 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21z"/></svg><i>LOVE</i><b></b></span></div>':'')+'</div><span class="head-stem"></span>';
    d.innerHTML=html; heads.appendChild(d);
    var ln=document.createElement('div'); ln.className='lnk'; heads.appendChild(ln);
    TAGS.push({ln:ln,sh:sh,g:tg.g,track:tg.head,big:big,el:d,card:d.firstChild,fv:d.querySelector('.fv'),lvv:d.querySelector('.lvv'),lis:[].slice.call(d.querySelectorAll('.tc-rows li')),like:d.querySelector('.tc-like'),likeB:d.querySelector('.tc-like b'),seed:Math.random()*100}); }); }); }
  function rollDigits(n,t,seed){ var r=Math.floor((Math.sin((t*37+seed)*12.9898)*43758.5453)%1*Math.pow(10,n)); r=Math.abs(r); return String(r).padStart(n,'0'); }
  function miniVals(g,t,seed){
    if(g.rollStart!=null){ if(t<g.rollStart) return ['??','??']; if(t<g.rollStop) return [rollDigits(2,Math.floor(t*12),seed),rollDigits(2,Math.floor(t*12)+3,seed)]; return [String(g.friend),String(g.love)]; }
    if(g.countUp){ var c=ease3(ramp(t,g.countUp[0],g.countUp[1])); return [String(Math.round(g.friend*c)),String(Math.round(g.love*c))]; }
    return [String(g.friend),String(g.love)]; }
  function coverMap(){ var W=v.clientWidth,H=v.clientHeight,vw=v.videoWidth||(ratio()==='9x16'?720:1280),vh=v.videoHeight||(ratio()==='9x16'?1280:720);
    var sc=(ratio()==='9x16'?Math.max:Math.min)(W/vw,H/vh); /* 세로 폰은 틀을 꽉 채운다(cover, home.css 와 같게) */
    return {W:W,H:H,dx:(W-vw*sc)/2,dy:(H-vh*sc)/2,w:vw*sc,h:vh*sc}; }
  function shotAt(t){ if(!CUE) return null; for(var i=0;i<CUE.shots.length;i++){ var sh=CUE.shots[i]; if(t>=sh.start&&t<sh.end) return sh; } return null; }
  var navEl=document.getElementById('nav'), copyEl=document.querySelector('.hero-copy');
  var ENDING_OUT=[17.9,18.5]; if(CUE){ CUE.shots.forEach(function(sh){ if(sh.id==='ending') ENDING_OUT=[sh.start+0.85,sh.start+1.45]; }); }   /* the MATCHED card rides through the dissolve, then leaves before the ending copy */
  /* black interlude with the closing line, timed by the editors' cues (blackStart/blackEnd/captionIn/captionOut) */
  var BL=null, CAPT=null;
  function findKey(o,k){ if(!o||typeof o!=='object') return null; if(o[k]!=null&&typeof o[k]!=='object') return +o[k];
    for(var x in o){ if(o[x]&&typeof o[x]==='object'){ var r=findKey(o[x],k); if(r!=null) return r; } } return null; }
  if(CUE){ var bs=findKey(CUE,'blackStart'), be=findKey(CUE,'blackEnd'), ci=findKey(CUE,'captionIn'), co=findKey(CUE,'captionOut');
    if(bs!=null) BL=[bs,be!=null?be:bs+3]; if(ci!=null&&co!=null) CAPT=[ci,ci+1.0,co-0.8,co];
    var cp=CUE.caption; if(cp&&cp.captionIn&&cp.captionOut){ CAPT=[cp.captionIn[0],cp.captionIn[1],cp.captionOut[0],cp.captionOut[1]]; } }
  var capEl=document.getElementById('filmCap');
  function tagFade(t){ return BL?1-ramp(t,BL[0],BL[0]+0.5):1; }
  function frame(t){
    capEl.style.opacity=CAPT?(ramp(t,CAPT[0],CAPT[1])*(1-ramp(t,CAPT[2],CAPT[3]))).toFixed(3):'0';
    if(!CUE) return; var r=ratio(), sh=shotAt(t), phone=r==='9x16';
    var m=coverMap(), topSafe=8;
    var placed=[];
    TAGS.forEach(function(o){ var sh2=o.sh,g=o.g; var fi=span(g.fadeIn);
      var a, cw=o.el.offsetWidth, ch=o.el.offsetHeight, tx, ty;
      a=ramp(t,fi[0],fi[1])*(1-ramp(t,g.fadeOut[0],g.fadeOut[1]))*tagFade(t); if(t<sh2.start||t>=sh2.end) a=0;
      o.el.style.opacity=a.toFixed(3); if(a<=0){ o.ln.style.opacity='0'; return; }
      var p=lerpTrack((o.track||sh2.head)[r],Math.min(t,sh2.end-0.01)); if(!p||p.inFrame===false){ o.el.style.opacity='0'; o.ln.style.opacity='0'; return; }
      var x=m.dx+p.x*m.w, y=m.dy+p.y*m.h;
      if(o.big){
        var k2=ease3(ramp(t,g.rollStart,g.rollStop)); o.likeB.textContent=t<g.rollStart?'??.?%':(12+(g.love-12)*k2).toFixed(1)+'%';
      }
      /* 세로 폰(9:16): 얼굴 좌표에 선을 잇지 않는다(세로 크롭에서는 좌표가 얼굴과 정확히 맞지 않아 선이 엉뚱한 곳을 가리켰다).
         카드만 영상 아래쪽 가운데에 작게 띄우고, 여러 장이면 위로 쌓는다. (사이트 이식 때 추가) */
      if(phone){
        if(!o.big){ var mv0=miniVals(g,t,o.seed); o.fv.textContent=mv0[0]+'%'; o.lvv.textContent=mv0[1]+'%'; }
        o.ln.style.opacity='0'; o.el.classList.add('side','ph');
        tx=Math.max(8,(m.W-cw)/2); ty=m.H-ch-12;
        placed.forEach(function(q){ if(ty<q.y+q.h+6&&ty+ch+6>q.y) ty=q.y-ch-8; });
        placed.push({x:tx,y:ty,w:cw,h:ch});
        o.el.style.transform='translate3d('+tx.toFixed(1)+'px,'+ty.toFixed(1)+'px,0)';
        return;
      }
      o.el.classList.remove('ph');
      {
        if(!o.big){ var mv=miniVals(g,t,o.seed); o.fv.textContent=mv[0]+'%'; o.lvv.textContent=mv[1]+'%'; }
        var side=sh2.id!=='man-pov-2';
        o.el.classList.toggle('side',side);
        if(!side){
          o.ln.style.opacity='0';
          tx=x-cw/2; ty=y-ch-4;
          ty=Math.max(ty,topSafe); tx=Math.min(m.W-cw-12,Math.max(12,tx));
        } else {
          /* card beside the face on the emptier side, tied to the cheek by a hairline */
          var climax=!!o.big, fh=phone?(climax?0.15:0.13):(climax?0.2:0.13), fyk=phone?(climax?0.13:0.07):(climax?0.27:0.14);
          var half=fh*m.h, fy=y+fyk*m.h, gap=phone?22:Math.max(60,m.w*0.13), sx, sy, ex, ey;
          /* pick the side once per shot: right of the face unless it cannot fit there for the whole shot */
          if(o.right==null&&!phone&&(sh2.id==='woman-hero'||sh2.id==='man-pov-1')) o.right=false;
          if(o.right==null){ var trk=(o.track||sh2.head)[r]||[], mxX=0, mnX=1; trk.forEach(function(q){ if(q.inFrame===false) return; mxX=Math.max(mxX,q.x); mnX=Math.min(mnX,q.x); });
            var rOk=m.dx+mxX*m.w+half+gap+cw<=m.W-8, lOk=m.dx+mnX*m.w-half-gap-cw>=8;
            o.right=rOk?true:(lOk?false:null); if(o.right==null) o.right=phone?'none':((m.W-(m.dx+mxX*m.w))>=(m.dx+mnX*m.w)); }
          var right=o.right===true;
          tx=right?x+half+gap:x-half-gap-cw; ty=fy-ch/2;
          var fits=o.right!=='none';
          if(fits) tx=Math.min(m.W-cw-8,Math.max(8,tx));
          if(fits){
            ty=Math.min(m.H-ch-8,Math.max(8,ty));
            sx=right?x+half*0.92:x-half*0.92; sy=fy; ex=right?tx:tx+cw; ey=ty+ch/2;
          } else {
            tx=Math.min(m.W-cw-8,Math.max(8,x-cw/2));
            /* no room beside the face: rest the card at the bottom of the frame, below the face */
            ty=m.H-ch-12; var lft=(sh2.id==='woman-hero'||sh2.id==='man-pov-1'); sx=lft?Math.max(20,x-half*1.05):Math.min(m.W-20,x+half*1.05); sy=Math.min(ty-16,fy+half*0.4); ex=sx; ey=ty;
            ex=Math.min(tx+cw-14,Math.max(tx+14,ex));
          }
          var len=Math.hypot(ex-sx,ey-sy), ang=Math.atan2(ey-sy,ex-sx)*180/Math.PI;
          var draw=reduce?1:ease3(ramp(t,fi[0],fi[0]+0.3)), cardIn=reduce?1:ramp(t,fi[0]+0.3,fi[1]+0.3);
          o.ln.style.opacity=(a>0?Math.min(1,a*3):0).toFixed(3);
          o.ln.style.width=Math.max(0,len*draw-2).toFixed(1)+'px';
          o.ln.style.transform='translate3d('+sx.toFixed(1)+'px,'+sy.toFixed(1)+'px,0) rotate('+ang.toFixed(2)+'deg)';
          o.el.style.opacity=(a*cardIn).toFixed(3);
        }
        placed.forEach(function(q){ if(tx<q.x+q.w+6&&tx+cw+6>q.x&&ty<q.y+q.h+6&&ty+ch+6>q.y){ ty=q.y+q.h+8; } });
        placed.push({x:tx,y:ty,w:cw,h:ch});
        o.el.style.transform='translate3d('+tx.toFixed(1)+'px,'+ty.toFixed(1)+'px,0)';
      }
    });
  }

  var heroEl=document.getElementById('hero'), heroOn=true;
  function tick(){
    requestAnimationFrame(tick);
    try{ if(heroOn){ var t=stillT!=null?stillT:(v.currentTime||0), d=v.duration||21;
      if(!filmDone&&!v.paused&&t>=holdAt()) finish();
      frame(t); }
    }catch(e){ if(window.console) console.warn('film overlay',e); }
  }
  requestAnimationFrame(tick);
  if(hasIO){ new IntersectionObserver(function(es){ heroOn=es[0].isIntersecting; },{threshold:0}).observe(heroEl); }

  /* nav turns solid once the film is behind us */
  var nav=document.getElementById('nav');
  function navState(){ nav.classList.toggle('solid', window.scrollY > heroEl.offsetHeight-80); }
  window.addEventListener('scroll',navState,{passive:true}); navState();

  /* reveal: only things below the fold start hidden */
  var rvs=[].slice.call(document.querySelectorAll('.rv'));
  if(hasIO&&!reduce){
    var vh=window.innerHeight;
    rvs.forEach(function(el){ if(el.getBoundingClientRect().top>vh*0.9) el.classList.add('pre'); });
    var io=new IntersectionObserver(function(es){es.forEach(function(e){ if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target);} });},{rootMargin:'0px 0px -8% 0px'});
    rvs.forEach(function(el){ if(el.classList.contains('pre')) io.observe(el); });
  }

  /* count up */
  function countUp(el){
    var to=+el.getAttribute('data-count'), t0=null, d=1400;
    function f(t){ if(!t0)t0=t; var p=Math.min(1,(t-t0)/d); var e=1-Math.pow(1-p,3); el.textContent=Math.round(to*e); if(p<1)requestAnimationFrame(f); }
    el.textContent='0'; requestAnimationFrame(f);
  }
  var bars=[].slice.call(document.querySelectorAll('.bar i'));
  if(hasIO&&!reduce){
    var vh2=window.innerHeight;
    bars.forEach(function(b){ if(b.getBoundingClientRect().top>vh2) b.classList.add('pre'); });
    var cio=new IntersectionObserver(function(es){es.forEach(function(e){ if(!e.isIntersecting)return; var el=e.target;
      if(el.hasAttribute('data-count')) countUp(el); else el.classList.remove('pre'); cio.unobserve(el); });},{threshold:.6});
    document.querySelectorAll('[data-count]').forEach(function(el){ if(el.getBoundingClientRect().top>vh2) cio.observe(el); });
    bars.forEach(function(b){ if(b.classList.contains('pre')) cio.observe(b); });
  }

  /* segmented choices */
  document.querySelectorAll('.segc[role="radiogroup"]').forEach(function(g){ g.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return;
    [].forEach.call(g.querySelectorAll('button'),function(x){ var on=x===b; x.classList.toggle('on',on); x.setAttribute('aria-checked',String(on)); }); }); });

  /* Lovi diagram: draw the connectors from the real element positions */
  function lvLayout(){
    var sv=document.getElementById('lvLines'); if(!sv||getComputedStyle(sv).display==='none') return;
    var st=sv.parentNode.getBoundingClientRect(); sv.setAttribute('viewBox','0 0 '+st.width.toFixed(0)+' '+st.height.toFixed(0));
    function R(el){ var r=el.getBoundingClientRect(); return {l:r.left-st.left,r:r.right-st.left,t:r.top-st.top,b:r.bottom-st.top,cx:(r.left+r.right)/2-st.left,cy:(r.top+r.bottom)/2-st.top}; }
    var bs=[].slice.call(document.querySelectorAll('.lv-bubble')).map(R), o=R(document.querySelector('.lv-orb')), c=R(document.querySelector('.lv-card')), f=R(document.querySelector('.lv-fb'));
    function set(id,d){ var e=document.getElementById(id); if(e) e.setAttribute('d',d); }
    ['lvP1','lvP2','lvP3'].forEach(function(id,k){ var b=bs[k]; if(!b) return; var ex=o.l+6, ey=o.cy+(k-1)*14, mx=(b.r+ex)/2;
      set(id,'M'+(b.r+6)+' '+b.cy+' C '+mx+' '+b.cy+', '+mx+' '+ey+', '+ex+' '+ey); });
    var mx2=(o.r+c.l)/2; set('lvP4','M'+(o.r-6)+' '+o.cy+' C '+mx2+' '+o.cy+', '+mx2+' '+c.cy+', '+(c.l-4)+' '+c.cy);
    set('lvL1','M'+c.cx+' '+(c.b+8)+' C '+c.cx+' '+(f.cy+10)+', '+(f.r+80)+' '+f.cy+', '+(f.r+10)+' '+f.cy);
    var b3=bs[bs.length-1]; set('lvL2','M'+(f.l-10)+' '+f.cy+' C '+(b3.cx-20)+' '+f.cy+', '+b3.cx+' '+(f.cy-10)+', '+b3.cx+' '+(b3.b+12));
  }
  lvLayout(); window.addEventListener('resize',lvLayout); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(lvLayout);
  if(reduce){ document.querySelectorAll('.lv-lines').forEach(function(sv){ try{ sv.pauseAnimations(); }catch(e){} }); }


  /* 스토어 버튼 — 출시 전(data-soon)에는 이동하지 않고 '곧 출시돼요'를 보여 준다.
     위쪽(히어로) 버튼은 href="#download" 로 다운로드 섹션까지 내려가고, 다운로드 섹션 안의 버튼은 그 자리에서 안내만 한다. */
  var toast=document.getElementById('toast'), toastTimer;
  function showToast(msg){ if(!toast) return; toast.textContent=msg; toast.classList.add('show'); clearTimeout(toastTimer);
    toastTimer=setTimeout(function(){ toast.classList.remove('show'); },2200); }
  document.querySelectorAll('.store[data-soon]').forEach(function(a){ a.addEventListener('click',function(e){
    if(a.closest('#download')) e.preventDefault();
    showToast(a.getAttribute('data-soon')||'곧 출시돼요'); }); });

})();
