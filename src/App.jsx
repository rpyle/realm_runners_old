import React, { useState, useEffect, useMemo } from "react";
import { CHARS, DEFAULT_OPTS, DEFAULT_PROGRESS } from "./data.js";
import { loadSave, writeSave } from "./helpers.js";
import { GLOBAL_STYLES } from "./styles.js";
import { TitleScreen, CharSelectScreen, BuilderScreen, WorldMapScreen, LevelSelectScreen } from "./components/NavScreens.jsx";
import { MemoryGame, PuzzleGame, HardPuzzleGame } from "./components/GameScreens.jsx";

export default function App() {
  const saved = useMemo(() => loadSave(), []);

  const [screen,     setScreen]    = useState("title");
  const [charType,   setCharType]  = useState(() => saved?.charType || null);
  const [charOpts,   setCharOpts]  = useState(() => saved?.charOpts || DEFAULT_OPTS);
  const [progress,   setProgress]  = useState(() => {
    const base = JSON.parse(JSON.stringify(DEFAULT_PROGRESS));
    if (saved?.charType) {
      const hw = CHARS.find(c => c.id === saved.charType)?.world;
      if (hw) base[hw].unlocked = true;
    }
    if (saved?.progress) {
      Object.keys(saved.progress).forEach(k => {
        if (base[k]) base[k] = { ...base[k], ...saved.progress[k] };
      });
    }
    return base;
  });
  const [activeWorld, setActiveWorld] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);

  /* Inject global styles once */
  useEffect(() => {
    if (document.getElementById("rr-global-styles")) return;
    const tag = document.createElement("style");
    tag.id = "rr-global-styles";
    tag.textContent = GLOBAL_STYLES;
    document.head.appendChild(tag);
  }, []);

  /* Persist to localStorage */
  useEffect(() => {
    writeSave({ charType, charOpts, progress });
  }, [charType, charOpts, progress]);

  /* Level 1 = memory, Level 2 = puzzle, Level 3 = random (50/50 memory or hard puzzle) */
  const challengeType = lvl => {
    if (lvl === 1) return "memory";
    if (lvl === 2) return "puzzle";
    return Math.random() < 0.5 ? "memory" : "hardpuzzle";
  };

  /* Called when player picks a character type */
  const handleTypeSelect = id => {
    setCharType(id);
    const hw = CHARS.find(c => c.id === id).world;
    setProgress(p => ({ ...p, [hw]: { ...p[hw], unlocked:true } }));
    setScreen("builder");
  };

  /* Called when player taps a level card */
  const handleLevelSelect = lvl => {
    setActiveLevel(lvl);
    setScreen(challengeType(lvl));
  };

  /* Called when a challenge finishes — saves stars, unlocks next level/worlds */
  const handleChallengeWin = (stars, nextLevel) => {
    const hw = CHARS.find(c => c.id === charType).world;
    setProgress(prev => {
      const wp        = prev[activeWorld];
      const completed = wp.completed.includes(activeLevel)
        ? wp.completed
        : [...wp.completed, activeLevel];
      const bestStars = {
        ...(wp.stars || {}),
        [activeLevel]: Math.max((wp.stars || {})[activeLevel] || 0, stars),
      };
      let next = { ...prev, [activeWorld]: { ...wp, completed, stars:bestStars } };
      if (activeWorld === hw && completed.length >= 3) {
        Object.keys(next).forEach(k => { next[k] = { ...next[k], unlocked:true }; });
      }
      return next;
    });

    if (nextLevel && nextLevel <= 3) {
      setActiveLevel(nextLevel);
      setScreen(challengeType(nextLevel));
    } else {
      setScreen("levelselect");
    }
  };

  return (
    <div style={{ background:"#0a0a2e", minHeight:"100vh" }}>
      {screen==="title" && (
        <TitleScreen
          onStart={()   => setScreen("charSelect")}
          hasSave={!!saved?.charType}
          onContinue={() => setScreen("worldmap")}/>
      )}
      {screen==="charSelect" && (
        <CharSelectScreen
          onBack={()     => setScreen("title")}
          onSelect={handleTypeSelect}/>
      )}
      {screen==="builder" && (
        <BuilderScreen
          charType={charType}
          initialOptions={charOpts}
          onBack={() => setScreen("charSelect")}
          onDone={opts => { setCharOpts(opts); setScreen("worldmap"); }}/>
      )}
      {screen==="worldmap" && (
        <WorldMapScreen
          charType={charType}
          charOpts={charOpts}
          progress={progress}
          onSelectWorld={id => { setActiveWorld(id); setScreen("levelselect"); }}
          onEditChar={() => setScreen("builder")}/>
      )}
      {screen==="levelselect" && (
        <LevelSelectScreen
          worldId={activeWorld}
          charType={charType}
          charOpts={charOpts}
          progress={progress}
          onBack={() => setScreen("worldmap")}
          onSelectLevel={handleLevelSelect}/>
      )}
      {screen==="memory" && (
        <MemoryGame
          worldId={activeWorld}
          level={activeLevel}
          charType={charType}
          charOpts={charOpts}
          onWin={handleChallengeWin}
          onBack={() => setScreen("levelselect")}/>
      )}
      {screen==="puzzle" && (
        <PuzzleGame
          worldId={activeWorld}
          level={activeLevel}
          charType={charType}
          charOpts={charOpts}
          onWin={handleChallengeWin}
          onBack={() => setScreen("levelselect")}/>
      )}
      {screen==="hardpuzzle" && (
        <HardPuzzleGame
          worldId={activeWorld}
          charType={charType}
          charOpts={charOpts}
          onWin={handleChallengeWin}
          onBack={() => setScreen("levelselect")}/>
      )}
    </div>
  );
}
