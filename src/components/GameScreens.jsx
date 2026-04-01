import React, { useState, useEffect, useCallback, useMemo } from "react";
import { WORLDS, WORLD_EMOJIS, PUZZLES, HARD_PUZZLES, MEM_PAIRS } from "../data.js";
import { shuffle, memStars, puzzleStars } from "../helpers.js";
import { CharacterSVG } from "./CharacterSVG.jsx";
import { Stars } from "./NavScreens.jsx";

/* ─── Confetti ─── */
const CONF_COLORS = ["#FFD700","#FF69B4","#00E5FF","#69F0AE","#FF6E40","#E040FB","#FFEB3B"];

export function Confetti() {
  const pieces = useMemo(() => Array.from({ length:36 }, (_,i) => ({
    id: i,
    left:   5 + Math.random() * 90,
    color:  CONF_COLORS[i % CONF_COLORS.length],
    dur:    (1.2 + Math.random() * 0.8).toFixed(2),
    del:    (Math.random() * 0.6).toFixed(2),
    rotate: Math.random() * 360,
    size:   8 + Math.random() * 8,
    shape:  Math.random() > 0.5 ? "circle" : "square",
  })), []);

  return (
    <div style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%",
      pointerEvents:"none", overflow:"hidden", zIndex:10 }}>
      {pieces.map(p => (
        <div key={p.id} className="rr-confetti-piece" style={{
          left:`${p.left}%`, top:-12,
          background: p.color,
          width: p.size, height: p.size,
          borderRadius: p.shape==="circle" ? "50%" : "3px",
          "--dur": `${p.dur}s`, "--del": `${p.del}s`,
          transform: `rotate(${p.rotate}deg)`,
        }}/>
      ))}
    </div>
  );
}

/* ─── Win Screen ─── */
export function WinScreen({ worldId, level, stars, charType, charOpts, onNext, onMap }) {
  const w = WORLDS[worldId];
  const isLast = level === 3;
  const [showUnlock, setShowUnlock] = useState(false);

  useEffect(() => {
    if (!isLast) setTimeout(() => setShowUnlock(true), 900);
  }, [isLast]);

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", padding:24, position:"relative",
      background:`linear-gradient(155deg,${w.bg[0]},${w.bg[1]})` }}>
      {w.stars && <Stars count={40}/>}
      <Confetti/>
      <div className="rr-float" style={{ zIndex:1, display:"flex", flexDirection:"column",
        alignItems:"center", gap:16, textAlign:"center", maxWidth:420 }}>

        <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:"50%",
          width:110, height:110, display:"flex", alignItems:"center", justifyContent:"center",
          border:"3px solid rgba(255,255,255,0.25)", overflow:"hidden" }}>
          <CharacterSVG type={charType} options={charOpts} size={100}/>
        </div>

        <h2 style={{ fontFamily:"'Fredoka One',cursive", color:"white",
          fontSize:"clamp(28px,6vw,46px)", lineHeight:1, marginTop:4 }}>
          Level {level} Complete!
        </h2>
        <p style={{ color:w.accent, fontSize:15, fontFamily:"'Nunito',sans-serif" }}>
          {w.emoji} {w.name}
        </p>

        <div style={{ display:"flex", gap:10, alignItems:"center", margin:"4px 0" }}>
          {[1,2,3].map(i => (
            <div key={i} className="rr-star-anim"
              style={{ "--del":`${0.2+i*0.15}s`, fontSize:46,
                filter: i<=stars ? "drop-shadow(0 0 12px rgba(255,200,0,0.9))" : "none",
                opacity: i<=stars ? 1 : 0.22 }}>
              ⭐
            </div>
          ))}
        </div>
        <p style={{ color:"rgba(255,255,255,0.55)", fontSize:13,
          fontFamily:"'Nunito',sans-serif", marginTop:-6 }}>
          {stars===3 ? "Perfect! ✨" : stars===2 ? "Great work! 🎉" : "Keep practising! 💪"}
        </p>

        {!isLast && showUnlock && (
          <div style={{ background:"rgba(255,255,255,0.12)", border:"2px solid rgba(255,255,255,0.25)",
            borderRadius:16, padding:"14px 22px",
            animation:"rr-unlockSlide 0.5s cubic-bezier(.22,1,.36,1) forwards" }}>
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:11, fontFamily:"'Nunito',sans-serif",
              textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Unlocked</p>
            <p style={{ color:"white", fontWeight:800, fontFamily:"'Nunito',sans-serif", fontSize:15 }}>
              🔓 Level {level+1} in {w.name}!
            </p>
          </div>
        )}
        {isLast && (
          <div style={{ background:"rgba(255,220,80,0.15)", border:"2px solid rgba(255,220,80,0.5)",
            borderRadius:16, padding:"14px 22px" }}>
            <p style={{ color:"#FFD700", fontFamily:"'Fredoka One',cursive", fontSize:18 }}>🏆 World Complete!</p>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:12, fontFamily:"'Nunito',sans-serif", marginTop:4 }}>
              All other worlds are now unlocked!
            </p>
          </div>
        )}

        <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", marginTop:4 }}>
          {!isLast && (
            <button className="rr-btn rr-btn-primary" onClick={onNext}>Next Level →</button>
          )}
          <button className="rr-btn rr-btn-ghost" onClick={onMap}>🗺️ World Map</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Memory Game ─── */
export function MemoryGame({ worldId, level, charType, charOpts, onWin, onBack }) {
  const w      = WORLDS[worldId];
  const pairs  = MEM_PAIRS[level - 1];
  const emojis = WORLD_EMOJIS[worldId].slice(0, pairs);

  const initialCards = useCallback(() =>
    shuffle([...emojis, ...emojis]).map((e, i) => ({ id:i, e, flipped:false, matched:false }))
  , [worldId, level]);

  const [cards,  setCards]       = useState(initialCards);
  const [sel,    setSel]         = useState([]);
  const [locked, setLocked]      = useState(false);
  const [moves,  setMoves]       = useState(0);
  const [wrong,  setWrong]       = useState([]);
  const [won,    setWon]         = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);

  const flip = i => {
    if (locked || cards[i].flipped || cards[i].matched || sel.length === 2) return;
    const next = [...sel, i];
    setCards(p => p.map((c, j) => j===i ? {...c, flipped:true} : c));
    if (next.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const [a, b] = next;
      const match = cards[a].e === cards[b].e;
      setTimeout(() => {
        if (match) {
          setCards(p => {
            const u = p.map((c, j) => (j===a||j===b) ? {...c, matched:true} : c);
            if (u.every(c => c.matched)) {
              setEarnedStars(memStars(moves + 1, pairs));
              setTimeout(() => setWon(true), 300);
            }
            return u;
          });
        } else {
          setWrong([a, b]);
          setCards(p => p.map((c, j) => (j===a||j===b) ? {...c, flipped:false} : c));
          setTimeout(() => setWrong([]), 400);
        }
        setSel([]); setLocked(false);
      }, match ? 350 : 700);
      setSel(next);
    } else { setSel(next); }
  };

  if (won) return <WinScreen worldId={worldId} level={level} stars={earnedStars}
    charType={charType} charOpts={charOpts}
    onNext={() => onWin(earnedStars, level + 1)} onMap={() => onWin(earnedStars, null)}/>;

  const cols     = 4;
  const cardSize = pairs<=4 ? 72 : pairs<=6 ? 64 : 58;

  return (
    <div style={{ minHeight:"100vh", overflowY:"auto", padding:"24px 16px 48px",
      background:`linear-gradient(155deg,${w.bg[0]},${w.bg[1]})`,
      display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
      {w.stars && <Stars count={30}/>}
      <div style={{ width:"100%", maxWidth:480, zIndex:1 }}>

        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
          <button className="rr-back-btn" onClick={onBack}>←</button>
          <div style={{ flex:1 }}>
            <h2 style={{ fontFamily:"'Fredoka One',cursive", color:"white",
              fontSize:"clamp(18px,4vw,26px)", margin:0, lineHeight:1 }}>
              {w.emoji} Level {level} — Memory
            </h2>
            <p style={{ color:w.accent, fontSize:12, fontFamily:"'Nunito',sans-serif", marginTop:3 }}>
              Find all {pairs} matching pairs
            </p>
          </div>
          <div style={{ background:"rgba(0,0,0,0.25)", borderRadius:12, padding:"6px 14px",
            textAlign:"center", border:"1.5px solid rgba(255,255,255,0.15)" }}>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:9, fontFamily:"'Nunito',sans-serif",
              textTransform:"uppercase", letterSpacing:1 }}>Moves</div>
            <div style={{ color:"white", fontWeight:800, fontSize:20, fontFamily:"'Nunito',sans-serif",
              lineHeight:1 }}>{moves}</div>
          </div>
        </div>

        <div style={{ height:6, background:"rgba(255,255,255,0.12)", borderRadius:99, marginBottom:22 }}>
          <div style={{ height:"100%", borderRadius:99,
            background:`linear-gradient(90deg,${w.accent},rgba(255,255,255,0.8))`,
            width:`${(cards.filter(c=>c.matched).length / cards.length) * 100}%`,
            transition:"width 0.4s ease" }}/>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:10, justifyItems:"center" }}>
          {cards.map((c, i) => (
            <div key={c.id}
              className={`rr-mem-card${c.matched?" matched":""}${c.flipped?" flipped":""}${wrong.includes(i)?" wrong":""}`}
              onClick={() => flip(i)}
              style={{
                width:cardSize, height:cardSize, fontSize:cardSize*0.46,
                background: c.matched ? "rgba(100,220,100,0.15)" : c.flipped ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.1)",
                border:`2px solid ${c.matched?"rgba(100,220,100,0.6)":c.flipped?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.18)"}`,
                transform: c.flipped||c.matched ? "scale(1)" : "scale(0.95)",
                boxShadow: c.flipped ? "0 6px 18px rgba(0,0,0,0.3)" : "none",
              }}>
              {(c.flipped || c.matched) ? c.e : ""}
            </div>
          ))}
        </div>

        <p style={{ color:"rgba(255,255,255,0.3)", fontSize:11, textAlign:"center",
          fontFamily:"'Nunito',sans-serif", marginTop:20 }}>
          Tap cards to flip · Match all pairs to win
        </p>
      </div>
    </div>
  );
}

/* ─── Shared puzzle sequence renderer ─── */
function PuzzleSequence({ puzzle, result }) {
  return (
    <div style={{ background:"rgba(0,0,0,0.2)", borderRadius:20, padding:"24px 12px",
      marginBottom:28, border:"1.5px solid rgba(255,255,255,0.1)" }}>
      <p style={{ color:"rgba(255,255,255,0.4)", fontSize:11, textAlign:"center",
        fontFamily:"'Nunito',sans-serif", textTransform:"uppercase", letterSpacing:1, marginBottom:16 }}>
        Complete the pattern
      </p>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, flexWrap:"wrap" }}>
        {puzzle.seq.map((item, i) => (
          <div key={i} style={{
            width:  item==="?" ? 54 : 50,
            height: item==="?" ? 54 : 50,
            borderRadius: 13,
            fontSize: item==="?" ? 21 : 26,
            display:"flex", alignItems:"center", justifyContent:"center",
            background: item==="?"
              ? "rgba(255,255,255,0.14)"
              : (result==="ok" && i===puzzle.seq.length-1)
                ? "rgba(100,220,100,0.2)"
                : "rgba(255,255,255,0.1)",
            border: `2px ${item==="?"?"dashed":"solid"} ${item==="?"?"rgba(255,255,255,0.45)":"rgba(255,255,255,0.18)"}`,
            color:"white", fontWeight:800, transition:"all 0.3s",
          }}>
            {item==="?" ? (result==="ok" ? puzzle.ans : "?") : item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Shared puzzle options renderer ─── */
function PuzzleOptions({ opts, chosen, result, onPick }) {
  return (
    <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
      {opts.map(opt => {
        const isChosen  = chosen === opt;
        const isCorrect = isChosen && result==="ok";
        const isWrong   = isChosen && result==="no";
        return (
          <button key={opt}
            className={`rr-opt-btn${isCorrect?" correct":""}${isWrong?" wrong":""}`}
            onClick={() => onPick(opt)}
            disabled={result==="ok"}
            style={{
              background: isCorrect ? "rgba(100,220,100,0.3)" : isWrong ? "rgba(220,80,80,0.3)" : "rgba(255,255,255,0.92)",
              border: `2.5px solid ${isCorrect?"#4CAF50":isWrong?"#E53935":"transparent"}`,
            }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Puzzle Game ─── */
export function PuzzleGame({ worldId, level, charType, charOpts, onWin, onBack }) {
  const w      = WORLDS[worldId];
  const puzzle = PUZZLES[worldId][level - 1];

  const [chosen,  setChosen]   = useState(null);
  const [result,  setResult]   = useState(null);
  const [mistakes,setMistakes] = useState(0);
  const [won,     setWon]      = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [opts] = useState(() => shuffle(puzzle.opts));

  const pick = opt => {
    if (result==="ok") return;
    setChosen(opt);
    if (opt === puzzle.ans) {
      setResult("ok");
      setEarnedStars(puzzleStars(mistakes));
      setTimeout(() => setWon(true), 900);
    } else {
      setResult("no");
      setMistakes(m => m + 1);
      setTimeout(() => { setChosen(null); setResult(null); }, 800);
    }
  };

  if (won) return <WinScreen worldId={worldId} level={level} stars={earnedStars}
    charType={charType} charOpts={charOpts}
    onNext={() => onWin(earnedStars, level + 1)} onMap={() => onWin(earnedStars, null)}/>;

  return (
    <div style={{ minHeight:"100vh", overflowY:"auto", padding:"24px 16px 48px",
      background:`linear-gradient(155deg,${w.bg[0]},${w.bg[1]})`,
      display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
      {w.stars && <Stars count={30}/>}
      <div style={{ width:"100%", maxWidth:480, zIndex:1 }}>

        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
          <button className="rr-back-btn" onClick={onBack}>←</button>
          <div style={{ flex:1 }}>
            <h2 style={{ fontFamily:"'Fredoka One',cursive", color:"white",
              fontSize:"clamp(18px,4vw,26px)", margin:0, lineHeight:1 }}>
              {w.emoji} Level {level} — Pattern
            </h2>
            <p style={{ color:w.accent, fontSize:12, fontFamily:"'Nunito',sans-serif", marginTop:3 }}>
              What comes next in the sequence?
            </p>
          </div>
          <div style={{ background:"rgba(0,0,0,0.25)", borderRadius:12, padding:"6px 14px",
            textAlign:"center", border:"1.5px solid rgba(255,255,255,0.15)" }}>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:9, fontFamily:"'Nunito',sans-serif",
              textTransform:"uppercase", letterSpacing:1 }}>Tries</div>
            <div style={{ color:"white", fontWeight:800, fontSize:20, fontFamily:"'Nunito',sans-serif",
              lineHeight:1 }}>{mistakes}</div>
          </div>
        </div>

        <PuzzleSequence puzzle={puzzle} result={result}/>
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:12, textAlign:"center",
          fontFamily:"'Nunito',sans-serif", marginBottom:16 }}>Pick the missing piece:</p>
        <PuzzleOptions opts={opts} chosen={chosen} result={result} onPick={pick}/>

        <div style={{ marginTop:24, minHeight:32, textAlign:"center" }}>
          {result==="ok" && <p style={{ color:"#69F0AE", fontWeight:800, fontSize:16, fontFamily:"'Nunito',sans-serif" }}>✨ Correct! Well done!</p>}
          {result==="no" && <p style={{ color:"#FF6E6E", fontWeight:700, fontSize:14, fontFamily:"'Nunito',sans-serif" }}>Not quite — try again!</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Hard Puzzle Game (Level 3 variant — two puzzles back to back) ─── */
export function HardPuzzleGame({ worldId, charType, charOpts, onWin, onBack }) {
  const w          = WORLDS[worldId];
  const allPuzzles = HARD_PUZZLES[worldId];

  const [step,    setStep]    = useState(0);
  const [chosen,  setChosen]  = useState(null);
  const [result,  setResult]  = useState(null);
  const [mistakes,setMistakes]= useState(0);
  const [won,     setWon]     = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [opts] = useState(() => [
    shuffle(allPuzzles[0].opts),
    shuffle(allPuzzles[1].opts),
  ]);

  const puzzle = allPuzzles[step];

  const pick = opt => {
    if (result==="ok") return;
    setChosen(opt);
    if (opt === puzzle.ans) {
      setResult("ok");
      setTimeout(() => {
        if (step === 0) {
          setStep(1); setChosen(null); setResult(null);
        } else {
          setEarnedStars(puzzleStars(mistakes));
          setWon(true);
        }
      }, 800);
    } else {
      setResult("no");
      setMistakes(m => m + 1);
      setTimeout(() => { setChosen(null); setResult(null); }, 800);
    }
  };

  if (won) return <WinScreen worldId={worldId} level={3} stars={earnedStars}
    charType={charType} charOpts={charOpts}
    onNext={() => onWin(earnedStars, null)} onMap={() => onWin(earnedStars, null)}/>;

  return (
    <div style={{ minHeight:"100vh", overflowY:"auto", padding:"24px 16px 48px",
      background:`linear-gradient(155deg,${w.bg[0]},${w.bg[1]})`,
      display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
      {w.stars && <Stars count={30}/>}
      <div style={{ width:"100%", maxWidth:480, zIndex:1 }}>

        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
          <button className="rr-back-btn" onClick={onBack}>←</button>
          <div style={{ flex:1 }}>
            <h2 style={{ fontFamily:"'Fredoka One',cursive", color:"white",
              fontSize:"clamp(18px,4vw,26px)", margin:0, lineHeight:1 }}>
              {w.emoji} Level 3 — Hard Pattern
            </h2>
            <p style={{ color:w.accent, fontSize:12, fontFamily:"'Nunito',sans-serif", marginTop:3 }}>
              Puzzle {step+1} of 2 · What comes next?
            </p>
          </div>
          <div style={{ background:"rgba(0,0,0,0.25)", borderRadius:12, padding:"6px 14px",
            textAlign:"center", border:"1.5px solid rgba(255,255,255,0.15)" }}>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:9, fontFamily:"'Nunito',sans-serif",
              textTransform:"uppercase", letterSpacing:1 }}>Tries</div>
            <div style={{ color:"white", fontWeight:800, fontSize:20, fontFamily:"'Nunito',sans-serif",
              lineHeight:1 }}>{mistakes}</div>
          </div>
        </div>

        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {[0,1].map(i => (
            <div key={i} style={{ flex:1, height:5, borderRadius:99,
              background: i<step ? "rgba(255,220,80,0.8)" : i===step ? w.accent : "rgba(255,255,255,0.15)",
              transition:"background 0.4s ease" }}/>
          ))}
        </div>

        <PuzzleSequence puzzle={puzzle} result={result}/>
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:12, textAlign:"center",
          fontFamily:"'Nunito',sans-serif", marginBottom:14 }}>Pick the missing piece:</p>
        <PuzzleOptions opts={opts[step]} chosen={chosen} result={result} onPick={pick}/>

        <div style={{ marginTop:22, minHeight:32, textAlign:"center" }}>
          {result==="ok" && step===0 && <p style={{ color:"#69F0AE", fontWeight:800, fontSize:15, fontFamily:"'Nunito',sans-serif" }}>✨ Correct! One more to go!</p>}
          {result==="ok" && step===1 && <p style={{ color:"#69F0AE", fontWeight:800, fontSize:15, fontFamily:"'Nunito',sans-serif" }}>🎉 Amazing! All done!</p>}
          {result==="no" && <p style={{ color:"#FF6E6E", fontWeight:700, fontSize:14, fontFamily:"'Nunito',sans-serif" }}>Not quite — try again!</p>}
        </div>
      </div>
    </div>
  );
}
