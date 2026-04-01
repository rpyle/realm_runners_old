import React, { useState, useMemo } from "react";
import {
  CHARS, WORLDS, WORLD_NODES, WORLD_PATHS,
  SKIN_TONES, HAIR_STYLES, HAIR_COLORS, EYE_STYLES,
  OUTFIT_COLORS, ACCESSORIES, SPECIAL_OPTIONS, SPECIAL_LABEL,
} from "../data.js";
import { hexToRgb } from "../helpers.js";
import { CharacterSVG } from "./CharacterSVG.jsx";

/* ─── Starfield ─── */
export function Stars({ count = 55 }) {
  const stars = useMemo(() => Array.from({ length:count }, (_,i) => ({
    id:   i,
    size: 1.5 + Math.random() * 2.5,
    top:  Math.random() * 100,
    left: Math.random() * 100,
    dur:  (1.8 + Math.random() * 2.5).toFixed(2),
    del:  (Math.random() * 2.5).toFixed(2),
  })), [count]);

  return <>
    {stars.map(s => (
      <div key={s.id} className="rr-star" style={{
        width:  s.size, height: s.size,
        top:    `${s.top}%`, left: `${s.left}%`,
        "--d":  `${s.dur}s`, "--del": `${s.del}s`,
      }}/>
    ))}
  </>;
}

/* ─── Title Screen ─── */
export function TitleScreen({ onStart, hasSave, onContinue }) {
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", padding:24, position:"relative" }}>
      <Stars/>
      <div className="rr-float" style={{ textAlign:"center", maxWidth:500, zIndex:1 }}>
        <div style={{ fontSize:64, marginBottom:6 }}>🌟</div>
        <h1 style={{ fontFamily:"'Fredoka One',cursive", fontSize:"clamp(44px,10vw,82px)", color:"white",
          textShadow:"0 0 48px rgba(255,200,80,0.85),0 4px 14px rgba(0,0,0,0.6)",
          letterSpacing:2, marginBottom:6, lineHeight:1 }}>
          Realm Runners
        </h1>
        <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"clamp(13px,2.5vw,17px)",
          marginBottom:40, fontFamily:"'Nunito',sans-serif" }}>
          Build your character · Explore magical worlds
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="rr-btn rr-btn-primary rr-fade-up" style={{ animationDelay:"0.1s" }}
            onClick={onStart}>✨ New Game</button>
          {hasSave && (
            <button className="rr-btn rr-btn-ghost rr-fade-up" style={{ animationDelay:"0.2s" }}
              onClick={onContinue}>▶ Continue</button>
          )}
        </div>
        <p style={{ color:"rgba(255,255,255,0.22)", fontSize:11, marginTop:36,
          fontFamily:"'Nunito',sans-serif" }}>
          v0.5 beta · Progress saves automatically
        </p>
      </div>
    </div>
  );
}

/* ─── Character Select ─── */
export function CharSelectScreen({ onBack, onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ minHeight:"100vh", overflowY:"auto", padding:"32px 16px 48px",
      display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
      <Stars/>
      <div style={{ width:"100%", maxWidth:560, zIndex:1 }}>

        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
          <button className="rr-back-btn" onClick={onBack}>←</button>
          <h2 style={{ fontFamily:"'Fredoka One',cursive", color:"white",
            fontSize:"clamp(22px,5vw,36px)", margin:0 }}>Who are you?</h2>
        </div>
        <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, marginBottom:26,
          paddingLeft:50, fontFamily:"'Nunito',sans-serif" }}>
          Choose your character — this becomes your home world
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:14 }}>
          {CHARS.map((c, i) => (
            <div key={c.id}
              className={`rr-card rr-pop${selected===c.id ? " rr-selected" : ""}`}
              style={{ animationDelay:`${0.05+i*0.07}s` }}
              onClick={() => setSelected(c.id)}>
              <div style={{ fontSize:38, marginBottom:8 }}>{c.emoji}</div>
              <div style={{ color:"white", fontWeight:800, fontSize:15 }}>{c.name}</div>
              <div className="rr-badge">{c.wEmoji} {c.worldName}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:30, textAlign:"center", minHeight:52 }}>
          {selected && (() => {
            const c = CHARS.find(x => x.id === selected);
            return (
              <button className="rr-btn rr-btn-primary rr-pop" onClick={() => onSelect(selected)}>
                Customise my {c.name} {c.emoji} →
              </button>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

/* ─── Character Builder ─── */
export function BuilderScreen({ charType, initialOptions, onBack, onDone }) {
  const [opts, setOpts] = useState(initialOptions);
  const char = CHARS.find(c => c.id === charType);
  const cycle = (key, arr, dir = 1) =>
    setOpts(p => ({ ...p, [key]: ((p[key] + dir) + arr.length) % arr.length }));

  const features = [
    {
      key:"skinIdx",
      label: charType==="unicorn" ? "Coat Color" : charType==="robot" ? "Body Color" : "Skin Tone",
      arr: SKIN_TONES,
      preview: () => <span className="rr-swatch" style={{ background:SKIN_TONES[opts.skinIdx].color }}/>,
      value:   () => SKIN_TONES[opts.skinIdx].label,
    },
    ...(charType !== "robot" ? [
      {
        key:"hairStyleIdx",
        label: charType==="unicorn" ? "Mane Style" : "Hair Style",
        arr: HAIR_STYLES,
        preview: () => <span style={{ fontSize:18 }}>{["✂️","🌊","🌀","⬆️","🫧","📏"][opts.hairStyleIdx]}</span>,
        value:   () => HAIR_STYLES[opts.hairStyleIdx],
      },
      {
        key:"hairColorIdx",
        label: charType==="unicorn" ? "Mane Color" : "Hair Color",
        arr: HAIR_COLORS,
        preview: () => <span className="rr-swatch" style={{ background:HAIR_COLORS[opts.hairColorIdx].color }}/>,
        value:   () => HAIR_COLORS[opts.hairColorIdx].label,
      },
    ] : []),
    {
      key:"eyeIdx",
      label: charType==="robot" ? "Visor Style" : "Eye Style",
      arr: EYE_STYLES,
      preview: () => <span style={{ fontSize:18 }}>👁️</span>,
      value:   () => EYE_STYLES[opts.eyeIdx],
    },
    {
      key:"outfitIdx",
      label: charType==="unicorn" ? "Blanket Color" : charType==="robot" ? "Body Tone" : "Outfit Color",
      arr: OUTFIT_COLORS,
      preview: () => <span className="rr-swatch" style={{ background:OUTFIT_COLORS[opts.outfitIdx].color }}/>,
      value:   () => OUTFIT_COLORS[opts.outfitIdx].label,
    },
    {
      key:"specialIdx",
      label: SPECIAL_LABEL[charType],
      arr: SPECIAL_OPTIONS[charType],
      preview: () => <span style={{ fontSize:18 }}>
        {charType==="mermaid"?"🐠":charType==="faerie"?"🧚":charType==="unicorn"?"🦄":
         charType==="robot"?"💡":charType==="alien"?"👽":"🧒"}
      </span>,
      value: () => SPECIAL_OPTIONS[charType][opts.specialIdx],
    },
    {
      key:"accIdx",
      label:"Accessory",
      arr: ACCESSORIES,
      preview: () => <span style={{ fontSize:18 }}>{["🫧","👑","🌸","🪄","🕶️","🎩"][opts.accIdx]}</span>,
      value:   () => ACCESSORIES[opts.accIdx],
    },
  ];

  return (
    <div style={{ minHeight:"100vh", overflowY:"auto", padding:"28px 16px 48px",
      background:"linear-gradient(160deg,#1a1a6e,#6a0dad,#0a0a3e)",
      display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
      <Stars count={35}/>
      <div style={{ width:"100%", maxWidth:720, zIndex:1 }}>

        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
          <button className="rr-back-btn" onClick={onBack}>←</button>
          <h2 style={{ fontFamily:"'Fredoka One',cursive", color:"white",
            fontSize:"clamp(20px,4vw,32px)", margin:0 }}>
            Design Your {char.name} {char.emoji}
          </h2>
        </div>

        <div style={{ display:"flex", gap:24, flexWrap:"wrap", justifyContent:"center", alignItems:"flex-start" }}>
          {/* Preview */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, flexShrink:0 }}>
            <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:24, padding:"24px 28px",
              border:"2px solid rgba(255,255,255,0.18)", backdropFilter:"blur(10px)" }}>
              <CharacterSVG type={charType} options={opts} size={200}/>
            </div>
            <button className="rr-btn rr-btn-primary" onClick={() => onDone(opts)}>
              Enter the World {char.wEmoji}
            </button>
          </div>

          {/* Feature panel */}
          <div style={{ flex:1, minWidth:240, display:"flex", flexDirection:"column", gap:10 }}>
            <p style={{ color:"rgba(255,255,255,0.45)", fontSize:12, fontFamily:"'Nunito',sans-serif",
              marginBottom:4, textTransform:"uppercase", letterSpacing:1 }}>
              Customise your character
            </p>
            {features.map(f => (
              <div key={f.key} className="rr-feature-row">
                <button className="rr-cycle-btn" onClick={() => cycle(f.key, f.arr, -1)}>‹</button>
                <div style={{ width:28, textAlign:"center", flexShrink:0 }}>{f.preview()}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11, fontFamily:"'Nunito',sans-serif",
                    textTransform:"uppercase", letterSpacing:0.8, lineHeight:1 }}>{f.label}</div>
                  <div style={{ color:"white", fontWeight:700, fontSize:14, fontFamily:"'Nunito',sans-serif",
                    marginTop:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {f.value()}
                  </div>
                </div>
                <button className="rr-cycle-btn" onClick={() => cycle(f.key, f.arr, 1)}>›</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── World Map ─── */
export function WorldMapScreen({ charType, charOpts, progress, onSelectWorld, onEditChar }) {
  const charData  = CHARS.find(c => c.id === charType);
  const homeWorld = charData.world;
  const nodeById  = Object.fromEntries(WORLD_NODES.map(n => [n.id, n]));

  return (
    <div style={{ minHeight:"100vh", overflowY:"auto",
      background:"linear-gradient(160deg,#0d0221,#1a1a6e,#0a0a3e)",
      position:"relative", display:"flex", flexDirection:"column",
      alignItems:"center", padding:"24px 16px 48px" }}>
      <Stars count={70}/>

      <div style={{ width:"100%", maxWidth:520, zIndex:1, marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <h2 style={{ fontFamily:"'Fredoka One',cursive", color:"white",
            fontSize:"clamp(22px,5vw,34px)", margin:0 }}>🗺️ World Map</h2>
          <button onClick={onEditChar}
            style={{ display:"flex", alignItems:"center", gap:8,
              background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.2)",
              borderRadius:50, padding:"6px 14px 6px 6px", cursor:"pointer", transition:"background 0.18s" }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            onMouseOut={e  => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
            <div style={{ width:36, height:36, borderRadius:"50%", overflow:"hidden",
              background:"rgba(255,255,255,0.08)", display:"flex",
              alignItems:"center", justifyContent:"center" }}>
              <CharacterSVG type={charType} options={charOpts} size={52}/>
            </div>
            <span style={{ color:"rgba(255,255,255,0.8)", fontSize:12,
              fontFamily:"'Nunito',sans-serif", fontWeight:700 }}>Edit ✏️</span>
          </button>
        </div>
        <p style={{ color:"rgba(255,255,255,0.4)", fontSize:13,
          fontFamily:"'Nunito',sans-serif", marginTop:4 }}>
          Complete all 3 levels in your home world to unlock the rest!
        </p>
      </div>

      <div style={{ width:"100%", maxWidth:520, zIndex:1, position:"relative" }}>
        <svg viewBox="0 0 360 440" style={{ width:"100%", height:"auto", overflow:"visible" }}>
          {WORLD_PATHS.map(([a, b], i) => {
            const na = nodeById[a]; const nb = nodeById[b];
            const active = progress[a]?.unlocked && progress[b]?.unlocked;
            return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={active ? "rgba(255,220,80,0.45)" : "rgba(255,255,255,0.1)"}
              strokeWidth={active ? 3 : 2}
              strokeDasharray={active ? "8 5" : "6 6"}/>;
          })}

          {WORLD_NODES.map(node => {
            const w       = WORLDS[node.id];
            const prog    = progress[node.id] || { completed:[], unlocked:false, stars:{} };
            const unlocked= prog.unlocked;
            const isHome  = node.id === homeWorld;
            const done    = prog.completed.length;
            const allDone = done >= 3;

            return (
              <g key={node.id} className="rr-world-node"
                style={{ cursor: unlocked ? "pointer" : "default" }}
                onClick={() => unlocked && onSelectWorld(node.id)}>
                {isHome && <circle cx={node.x} cy={node.y} r="42" fill="none"
                  stroke="rgba(255,220,80,0.25)" strokeWidth="18"
                  style={{ animation:"rr-pulse 2.4s ease-in-out infinite" }}/>}
                <circle cx={node.x} cy={node.y} r="36"
                  fill={unlocked ? `rgba(${hexToRgb(w.bg[0])},0.85)` : "rgba(40,40,60,0.7)"}
                  stroke={unlocked ? (isHome ? "rgba(255,220,80,0.9)" : "rgba(255,255,255,0.35)") : "rgba(255,255,255,0.12)"}
                  strokeWidth={isHome ? 3 : 2}/>
                <circle cx={node.x} cy={node.y} r="28"
                  fill={unlocked ? `rgba(${hexToRgb(w.bg[1])},0.7)` : "rgba(20,20,40,0.6)"}/>
                <text x={node.x} y={node.y+1} textAnchor="middle" dominantBaseline="middle"
                  fontSize="22" style={{ filter:unlocked?"none":"grayscale(1) opacity(0.35)" }}>
                  {w.emoji}
                </text>
                {!unlocked && <text x={node.x+18} y={node.y-18} textAnchor="middle"
                  dominantBaseline="middle" fontSize="14">🔒</text>}
                {allDone && <text x={node.x+18} y={node.y-18} textAnchor="middle"
                  dominantBaseline="middle" fontSize="16"
                  style={{ animation:"rr-glow 2s ease-in-out infinite" }}>🏆</text>}
                <text x={node.x} y={node.y+48} textAnchor="middle" fontSize="10"
                  fontWeight="700" fontFamily="Nunito,sans-serif"
                  fill={unlocked ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"}>
                  {w.name}
                </text>
                {unlocked && (
                  <g transform={`translate(${node.x-12},${node.y+58})`}>
                    {[0,1,2].map(i => <circle key={i} cx={i*12} cy={0} r="4"
                      fill={i<done ? "#FFD700" : "rgba(255,255,255,0.2)"}
                      stroke={i<done ? "rgba(255,180,0,0.6)" : "rgba(255,255,255,0.1)"}
                      strokeWidth="1.5"/>)}
                  </g>
                )}
                {isHome && (
                  <g>
                    <rect x={node.x-18} y={node.y-52} width="36" height="14" rx="7"
                      fill="rgba(255,220,80,0.9)"/>
                    <text x={node.x} y={node.y-45} textAnchor="middle" dominantBaseline="middle"
                      fontSize="8" fontWeight="800" fontFamily="Nunito,sans-serif" fill="#1a1a2e">
                      HOME
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center",
        zIndex:1, marginTop:8 }}>
        {[["🟡","Completed"],["⚪","Not yet done"],["🔒","Locked"],["🏆","Cleared!"]].map(([icon,label]) => (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:5,
            color:"rgba(255,255,255,0.4)", fontSize:11, fontFamily:"'Nunito',sans-serif" }}>
            <span style={{ fontSize:13 }}>{icon}</span>{label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Level Select ─── */
export function LevelSelectScreen({ worldId, charType, charOpts, progress, onBack, onSelectLevel }) {
  const w        = WORLDS[worldId];
  const prog     = progress[worldId] || { completed:[], unlocked:false, stars:{} };
  const charData = CHARS.find(c => c.id === charType);
  const levelUnlocked = lvl => lvl===1 || prog.completed.includes(lvl-1);
  const bestStars     = lvl => (prog.stars||{})[lvl] || 0;

  const LEVEL_ICONS  = ["🧩","🧠","⭐"];
  const LEVEL_LABELS = ["Memory Challenge","Pattern Puzzle","Memory or Hard Pattern"];

  return (
    <div style={{ minHeight:"100vh", overflowY:"auto",
      background:`linear-gradient(155deg,${w.bg[0]},${w.bg[1]})`,
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"28px 16px 48px", position:"relative" }}>
      {w.stars && <Stars count={55}/>}
      {worldId==="meadow" && (
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
          opacity:0.18, fontSize:80, pointerEvents:"none", userSelect:"none", zIndex:0 }}>🌈</div>
      )}

      <div style={{ width:"100%", maxWidth:480, zIndex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
          <button className="rr-back-btn" onClick={onBack}>←</button>
          <div>
            <h2 style={{ fontFamily:"'Fredoka One',cursive", color:"white",
              fontSize:"clamp(20px,4vw,30px)", margin:0, lineHeight:1 }}>
              {w.emoji} {w.name}
            </h2>
            <p style={{ color:w.accent, fontSize:12, fontFamily:"'Nunito',sans-serif", marginTop:3 }}>
              {prog.completed.length}/3 levels complete
            </p>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(0,0,0,0.2)",
          borderRadius:16, padding:"12px 16px", marginBottom:28,
          border:"1.5px solid rgba(255,255,255,0.12)" }}>
          <div style={{ width:56, height:56, flexShrink:0, overflow:"hidden",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <CharacterSVG type={charType} options={charOpts} size={70}/>
          </div>
          <div>
            <div style={{ color:"white", fontWeight:800, fontSize:14,
              fontFamily:"'Nunito',sans-serif" }}>{charData.name} in {w.name}</div>
            <div style={{ color:w.accent, fontSize:12, fontFamily:"'Nunito',sans-serif", marginTop:2 }}>
              {prog.completed.length===0
                ? "No levels completed yet — good luck!"
                : prog.completed.length===3
                  ? "🏆 World complete! Incredible!"
                  : `${prog.completed.length} down, ${3-prog.completed.length} to go!`}
            </div>
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[1,2,3].map(lvl => {
            const unlocked = levelUnlocked(lvl);
            const done     = prog.completed.includes(lvl);
            const stars    = bestStars(lvl);
            return (
              <div key={lvl}
                className={`rr-level-card rr-pop${!unlocked?" locked":""}${done?" done":""}`}
                style={{ animationDelay:`${0.08+(lvl-1)*0.1}s` }}
                onClick={() => unlocked && onSelectLevel(lvl)}>
                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ width:52, height:52, borderRadius:"50%", flexShrink:0,
                    background: done?"rgba(255,220,80,0.25)":unlocked?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.2)",
                    border:`2px solid ${done?"rgba(255,220,80,0.7)":unlocked?w.accent:"rgba(255,255,255,0.1)"}`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
                    {done ? "✅" : !unlocked ? "🔒" : LEVEL_ICONS[lvl-1]}
                  </div>
                  <div style={{ flex:1, textAlign:"left" }}>
                    <div style={{ color:"white", fontWeight:800, fontSize:16,
                      fontFamily:"'Nunito',sans-serif", lineHeight:1 }}>Level {lvl}</div>
                    <div style={{ color:done?"rgba(255,220,80,0.8)":w.accent, fontSize:12,
                      fontFamily:"'Nunito',sans-serif", marginTop:3 }}>
                      {!unlocked ? "Complete the previous level first" : LEVEL_LABELS[lvl-1]}
                    </div>
                    {done && stars > 0 && (
                      <div style={{ marginTop:4, display:"flex", gap:2 }}>
                        {[1,2,3].map(i => <span key={i} style={{ fontSize:14, opacity:i<=stars?1:0.2 }}>⭐</span>)}
                      </div>
                    )}
                  </div>
                  {unlocked && !done && (
                    <div style={{ color:w.accent, fontSize:20, flexShrink:0, fontWeight:800 }}>→</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {prog.completed.length >= 3 && (
          <div className="rr-pop" style={{ marginTop:24, background:"rgba(255,220,80,0.15)",
            border:"2px solid rgba(255,220,80,0.5)", borderRadius:16, padding:"16px 20px",
            textAlign:"center" }}>
            <div style={{ fontSize:32, marginBottom:4 }}>🏆</div>
            <div style={{ color:"#FFD700", fontFamily:"'Fredoka One',cursive", fontSize:20 }}>World Complete!</div>
            <div style={{ color:"rgba(255,255,255,0.65)", fontSize:13,
              fontFamily:"'Nunito',sans-serif", marginTop:4 }}>
              Head back to the map to explore another world!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
