export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Nunito',sans-serif;background:#0a0a2e;min-height:100vh}

  @keyframes rr-twinkle{0%,100%{opacity:.15}50%{opacity:.85}}
  @keyframes rr-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes rr-fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes rr-popIn{from{opacity:0;transform:scale(0.7)}to{opacity:1;transform:scale(1)}}
  @keyframes rr-pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,220,80,.55)}50%{box-shadow:0 0 0 14px rgba(255,220,80,0)}}
  @keyframes rr-glow{0%,100%{filter:drop-shadow(0 0 6px rgba(255,220,80,.6))}50%{filter:drop-shadow(0 0 18px rgba(255,220,80,1))}}
  @keyframes rr-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
  @keyframes rr-confetti{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(120px) rotate(720deg);opacity:0}}
  @keyframes rr-starPop{0%{transform:scale(0) rotate(-30deg);opacity:0}60%{transform:scale(1.3) rotate(5deg);opacity:1}100%{transform:scale(1) rotate(0deg);opacity:1}}
  @keyframes rr-unlockSlide{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

  .rr-star{position:absolute;border-radius:50%;background:white;animation:rr-twinkle var(--d) ease-in-out var(--del) infinite}
  .rr-float{animation:rr-float 3.8s ease-in-out infinite}
  .rr-fade-up{opacity:0;animation:rr-fadeUp .55s cubic-bezier(.22,1,.36,1) forwards}
  .rr-pop{opacity:0;animation:rr-popIn .4s cubic-bezier(.34,1.56,.64,1) forwards}
  .rr-shake{animation:rr-shake .38s ease}

  .rr-btn{font-family:'Nunito',sans-serif;font-weight:800;font-size:15px;padding:13px 32px;
    border-radius:50px;border:none;cursor:pointer;transition:transform .18s,box-shadow .18s;
    box-shadow:0 4px 18px rgba(0,0,0,.35)}
  .rr-btn:hover{transform:scale(1.06);box-shadow:0 7px 26px rgba(0,0,0,.45)}
  .rr-btn:active{transform:scale(0.97)}
  .rr-btn-primary{background:rgba(255,255,255,.96);color:#1a1a2e}
  .rr-btn-ghost{background:rgba(255,255,255,.12);color:white;
    border:2px solid rgba(255,255,255,.3)!important;backdrop-filter:blur(6px)}
  .rr-btn-ghost:hover{background:rgba(255,255,255,.2)}

  .rr-card{border-radius:20px;padding:20px 14px;text-align:center;cursor:pointer;
    background:rgba(255,255,255,.09);border:2.5px solid rgba(255,255,255,.15);
    transition:transform .2s,box-shadow .2s,border-color .2s,background .2s;backdrop-filter:blur(8px)}
  .rr-card:hover{transform:scale(1.06);box-shadow:0 10px 32px rgba(0,0,0,.45)}
  .rr-card.rr-selected{border-color:white!important;background:rgba(255,255,255,.26)!important;transform:scale(1.07)}

  .rr-back-btn{background:rgba(255,255,255,.14);border:none;border-radius:50%;
    width:38px;height:38px;color:white;font-size:17px;cursor:pointer;flex-shrink:0;transition:background .18s}
  .rr-back-btn:hover{background:rgba(255,255,255,.28)}

  .rr-badge{display:inline-block;font-size:11px;font-weight:700;padding:3px 10px;
    border-radius:20px;margin-top:5px;background:rgba(255,255,255,.13);color:rgba(255,255,255,.65)}

  .rr-feature-row{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.07);
    border:1.5px solid rgba(255,255,255,.12);border-radius:14px;padding:10px 14px;
    transition:border-color .18s,background .18s}
  .rr-feature-row:hover{background:rgba(255,255,255,.11);border-color:rgba(255,255,255,.25)}

  .rr-cycle-btn{background:rgba(255,255,255,.14);border:none;border-radius:50%;
    width:30px;height:30px;color:white;font-size:14px;cursor:pointer;flex-shrink:0;
    transition:background .15s,transform .12s;display:flex;align-items:center;justify-content:center}
  .rr-cycle-btn:hover{background:rgba(255,255,255,.28);transform:scale(1.1)}
  .rr-cycle-btn:active{transform:scale(0.9)}

  .rr-swatch{width:22px;height:22px;border-radius:50%;border:2px solid rgba(255,255,255,.5);flex-shrink:0;display:inline-block}

  .rr-world-node{cursor:pointer;transition:transform .22s}
  .rr-world-node:hover .rr-node-ring{transform:scale(1.12)}
  .rr-node-ring{transition:transform .22s}

  .rr-level-card{border-radius:18px;padding:22px 18px;cursor:pointer;
    background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.18);
    transition:transform .2s,box-shadow .2s,border-color .2s,background .2s;
    backdrop-filter:blur(10px);text-align:center}
  .rr-level-card:not(.locked):hover{transform:scale(1.05);box-shadow:0 12px 36px rgba(0,0,0,.4)}
  .rr-level-card.locked{opacity:.45;cursor:not-allowed}
  .rr-level-card.done{border-color:rgba(255,220,80,.7)!important;background:rgba(255,220,80,.1)!important}

  .rr-mem-card{border-radius:14px;cursor:pointer;display:flex;align-items:center;
    justify-content:center;transition:transform .18s,box-shadow .18s;user-select:none}
  .rr-mem-card:hover:not(.flipped):not(.matched){transform:scale(1.06)}
  .rr-mem-card.matched{border-color:rgba(100,220,100,.7)!important;background:rgba(100,220,100,.15)!important}
  .rr-mem-card.wrong{animation:rr-shake .38s ease}

  .rr-opt-btn{border:none;border-radius:18px;font-size:32px;cursor:pointer;
    transition:transform .16s,box-shadow .16s;display:flex;align-items:center;
    justify-content:center;width:70px;height:70px;box-shadow:0 4px 14px rgba(0,0,0,.25)}
  .rr-opt-btn:hover:not(:disabled){transform:scale(1.12);box-shadow:0 8px 22px rgba(0,0,0,.35)}
  .rr-opt-btn:active:not(:disabled){transform:scale(0.94)}
  .rr-opt-btn.correct{background:rgba(100,220,100,.25)!important;border:2.5px solid #4CAF50!important}
  .rr-opt-btn.wrong{background:rgba(220,80,80,.25)!important;border:2.5px solid #E53935!important;animation:rr-shake .38s ease}

  .rr-confetti-piece{position:absolute;width:10px;height:10px;border-radius:2px;
    animation:rr-confetti var(--dur) ease var(--del) forwards}

  .rr-star-anim{display:inline-block;animation:rr-starPop .55s cubic-bezier(.34,1.56,.64,1) var(--del) both}
`;
