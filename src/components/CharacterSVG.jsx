import React from "react";
import {
  SKIN_TONES, HAIR_STYLES, HAIR_COLORS, EYE_STYLES,
  OUTFIT_COLORS, ACCESSORIES,
} from "../data.js";
import { shadeColor } from "../helpers.js";

/* ─── Unicorn (horse-shaped) ─── */
export function UnicornSVG({ options, size = 220 }) {
  const coat    = SKIN_TONES[options.skinIdx].color;
  const hairCol = HAIR_COLORS[options.hairColorIdx].color;
  const hairCol2= shadeColor(hairCol, 28);
  const hs      = HAIR_STYLES[options.hairStyleIdx];
  const blankC  = OUTFIT_COLORS[options.outfitIdx].color;
  const acc     = ACCESSORIES[options.accIdx];
  const si      = options.specialIdx;
  const eyeStyle= EYE_STYLES[options.eyeIdx];
  const HORN_COLS = ["#FFD700","#E8E8E8","#FF80AB","url(#unicorn-rbow)"];
  const hornFill  = HORN_COLS[si];
  const darkCoat  = shadeColor(coat, -28);
  const muzzle    = shadeColor(coat, -14);
  const p = { fill:"none", strokeLinecap:"round" };

  const Mane = () => {
    switch (hs) {
      case "Short":  return <><ellipse cx="84" cy="76" rx="11" ry="9" fill={hairCol}/><ellipse cx="100" cy="68" rx="9" ry="11" fill={hairCol}/><ellipse cx="116" cy="76" rx="11" ry="9" fill={hairCol}/></>;
      case "Bun":    return <><circle cx="100" cy="57" r="17" fill={hairCol}/><circle cx="100" cy="57" r="10" fill={hairCol2}/><circle cx="100" cy="74" r="8" fill={hairCol}/></>;
      case "Braids": return <><path d="M128,72 Q122,104 126,134 Q128,154 122,166" {...p} stroke={hairCol} strokeWidth="9" strokeDasharray="14 7"/><path d="M131,72 Q126,104 130,134 Q132,154 126,166" {...p} stroke={hairCol2} strokeWidth="5" strokeDasharray="14 7"/></>;
      case "Curly":  return <>{[68,88,108,128].map((y,i) => <circle key={i} cx={132+(i%2)*8} cy={y} r={13-i} fill={i%2===0?hairCol:hairCol2}/>)}</>;
      case "Long":   return <><path d="M128,68 Q150,96 146,130 Q142,158 136,172" {...p} stroke={hairCol} strokeWidth="16"/><path d="M124,72 Q152,100 148,136 Q144,162 138,175" {...p} stroke={hairCol2} strokeWidth="10" opacity="0.7"/><path d="M120,76 Q148,108 144,142 Q140,166 134,178" {...p} stroke={hairCol} strokeWidth="6" opacity="0.5"/></>;
      default:       return <><path d="M128,68 Q148,88 142,114 Q136,140 130,158" {...p} stroke={hairCol} strokeWidth="14"/><path d="M124,72 Q150,92 144,120 Q138,144 132,162" {...p} stroke={hairCol2} strokeWidth="8" opacity="0.65"/></>;
    }
  };

  const Tail = () => {
    switch (hs) {
      case "Short":  return <ellipse cx="148" cy="200" rx="14" ry="20" fill={hairCol} transform="rotate(20 148 200)"/>;
      case "Braids": return <><path d="M146,188 Q158,210 152,238 Q148,252 142,244" {...p} stroke={hairCol} strokeWidth="10" strokeDasharray="14 7"/><path d="M148,188 Q160,212 154,240 Q150,254 144,246" {...p} stroke={hairCol2} strokeWidth="6" strokeDasharray="14 7"/></>;
      case "Curly":  return <><circle cx="150" cy="194" r="12" fill={hairCol}/><circle cx="158" cy="210" r="10" fill={hairCol2}/><circle cx="152" cy="226" r="11" fill={hairCol}/><circle cx="144" cy="240" r="9" fill={hairCol2}/></>;
      default:       return <><path d="M146,188 Q172,206 166,236 Q160,254 150,248 Q142,242 148,228 Q154,212 146,192 Z" fill={hairCol} opacity="0.9"/><path d="M148,192 Q170,212 162,244" {...p} stroke={hairCol2} strokeWidth="6" opacity="0.7"/></>;
    }
  };

  const Eyes = () => {
    const irisC = "#3E1F6E";
    const ey = eyeStyle;
    if (ey === "Sleepy") return <><path d="M65,82 Q74,75 83,82" fill="none" stroke={irisC} strokeWidth="3" strokeLinecap="round"/><path d="M117,82 Q126,75 135,82" fill="none" stroke={irisC} strokeWidth="3" strokeLinecap="round"/></>;
    const rx = ey==="Almond"?11:9;
    const ry = ey==="Wide"?11:ey==="Almond"?7:9;
    const iris = ey==="Sparkly"?"#00ACC1":irisC;
    return <><ellipse cx="74" cy="82" rx={rx} ry={ry} fill="white"/><ellipse cx="126" cy="82" rx={rx} ry={ry} fill="white"/><circle cx="74" cy="82" r={ry-2} fill={iris}/><circle cx="126" cy="82" r={ry-2} fill={iris}/><circle cx="76" cy="80" r="2.2" fill="white"/><circle cx="128" cy="80" r="2.2" fill="white"/>{ey==="Sparkly"&&<><line x1="74" y1="68" x2="74" y2="72" stroke="#FFD700" strokeWidth="1.5"/><line x1="126" y1="68" x2="126" y2="72" stroke="#FFD700" strokeWidth="1.5"/></>}<path d="M64,78 Q69,73 75,76" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/><path d="M125,76 Q131,73 136,78" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/></>;
  };

  const Accessory = () => {
    switch (acc) {
      case "Crown":   return <g transform="translate(100,42)"><polygon points="-20,-14 -20,0 20,0 20,-14 10,-6 0,-20 -10,-6" fill="#FFD700"/><circle cx="-10" cy="-5" r="3.5" fill="#E91E63"/><circle cx="0" cy="-13" r="3.5" fill="#E91E63"/><circle cx="10" cy="-5" r="3.5" fill="#E91E63"/></g>;
      case "Flower":  return <g transform="translate(134,62)">{[-90,-18,54,126,198].map((a,i)=><ellipse key={i} cx={8*Math.cos(a*Math.PI/180)} cy={8*Math.sin(a*Math.PI/180)} rx="7" ry="5" fill="#FF69B4" transform={`rotate(${a})`}/>)}<circle cx="0" cy="0" r="5" fill="#FFD700"/></g>;
      case "Wand":    return <><line x1="148" y1="148" x2="120" y2="108" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/><circle cx="117" cy="105" r="10" fill="#FF69B4"/><circle cx="117" cy="105" r="5" fill="white" opacity="0.6"/></>;
      case "Glasses": return <><circle cx="74" cy="82" r="13" fill="none" stroke="#555" strokeWidth="2.5"/><circle cx="126" cy="82" r="13" fill="none" stroke="#555" strokeWidth="2.5"/><line x1="87" y1="82" x2="113" y2="82" stroke="#555" strokeWidth="2.5"/><line x1="61" y1="79" x2="55" y2="76" stroke="#555" strokeWidth="2.5"/><line x1="139" y1="79" x2="145" y2="76" stroke="#555" strokeWidth="2.5"/></>;
      case "Hat":     return <g transform="translate(100,35)"><ellipse cx="0" cy="5" rx="30" ry="8" fill="#37474F"/><rect x="-17" y="-28" width="34" height="33" rx="5" fill="#37474F"/><rect x="-17" y="-1" width="34" height="5" fill="#546E7A"/></g>;
      default:        return null;
    }
  };

  return (
    <svg viewBox="0 0 200 270" style={{ width:size, height:size*270/200, overflow:"visible" }}>
      <defs>
        <linearGradient id="unicorn-rbow" x1="0%" y1="0%" x2="100%" y2="100%">
          {["#FF0000","#FF7F00","#FFFF00","#00CC00","#0055FF","#8B00FF"].map((c,i)=>
            <stop key={i} offset={`${i*20}%`} stopColor={c}/>)}
        </linearGradient>
      </defs>
      <Tail/>
      <rect x="68" y="218" width="17" height="46" rx="7" fill={darkCoat}/><rect x="115" y="218" width="17" height="46" rx="7" fill={darkCoat}/>
      <rect x="64" y="256" width="23" height="10" rx="4" fill="#2e2e2e"/><rect x="111" y="256" width="23" height="10" rx="4" fill="#2e2e2e"/>
      <ellipse cx="100" cy="196" rx="54" ry="54" fill={coat}/>
      <ellipse cx="100" cy="182" rx="40" ry="22" fill={blankC} opacity="0.6"/>
      <ellipse cx="100" cy="182" rx="40" ry="22" fill="none" stroke={shadeColor(blankC,-20)} strokeWidth="2" opacity="0.4"/>
      {[-28,-14,0,14,28].map((x,i) => <circle key={i} cx={100+x} cy="202" r="3" fill={blankC} opacity="0.55"/>)}
      <rect x="79" y="234" width="18" height="40" rx="7" fill={coat}/><rect x="103" y="234" width="18" height="40" rx="7" fill={coat}/>
      <rect x="76" y="267" width="24" height="10" rx="4" fill="#2e2e2e"/><rect x="100" y="267" width="24" height="10" rx="4" fill="#2e2e2e"/>
      <path d="M76,118 Q64,142 68,178 Q84,186 100,185 Q116,186 132,178 Q136,142 124,118 Z" fill={coat}/>
      <Mane/>
      <ellipse cx="100" cy="78" rx="38" ry="34" fill={coat}/>
      <rect x="82" y="90" width="36" height="28" rx="8" fill={coat}/>
      <ellipse cx="100" cy="116" rx="26" ry="20" fill={muzzle}/>
      <ellipse cx="100" cy="113" rx="18" ry="10" fill={shadeColor(muzzle,14)} opacity="0.45"/>
      <polygon points="68,52 62,26 84,50" fill={coat}/><polygon points="70,50 65,30 81,49" fill="#FFCDD2" opacity="0.7"/>
      <polygon points="132,52 138,26 116,50" fill={coat}/><polygon points="130,50 135,30 119,49" fill="#FFCDD2" opacity="0.7"/>
      <polygon points="100,18 93,56 107,56" fill={hornFill}/>
      <line x1="99" y1="22" x2="95" y2="50" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="100" cy="56" rx="8" ry="4"
        fill={shadeColor(typeof hornFill==="string"&&hornFill.startsWith("#")?hornFill:"#FFD700",-20)}
        opacity="0.6"/>
      <Eyes/>
      <ellipse cx="92"  cy="118" rx="5.5" ry="4" fill="rgba(0,0,0,0.16)" transform="rotate(-12 92 118)"/>
      <ellipse cx="108" cy="118" rx="5.5" ry="4" fill="rgba(0,0,0,0.16)" transform="rotate(12 108 118)"/>
      <path d="M89,126 Q100,134 111,126" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2.5" strokeLinecap="round"/>
      <Accessory/>
    </svg>
  );
}

/* ─── All other characters ─── */
export function CharacterSVG({ type, options, size = 220 }) {
  if (type === "unicorn") return <UnicornSVG options={options} size={size}/>;

  const skin    = SKIN_TONES[options.skinIdx].color;
  const hairCol = HAIR_COLORS[options.hairColorIdx].color;
  const hs      = HAIR_STYLES[options.hairStyleIdx];
  const outfitC = OUTFIT_COLORS[options.outfitIdx].color;
  const outfitD = shadeColor(outfitC, -30);
  const acc     = ACCESSORIES[options.accIdx];
  const si      = options.specialIdx;

  const TAIL_COLS = ["#1565C0","#2E7D32","#6A1B9A","url(#rbow)"];
  const WING_COLS = ["#FF9800","#9C27B0","#43A047","#B3E5FC"];
  const LED_COLS  = ["#2196F3","#F44336","#4CAF50","#9C27B0"];
  const ANT_COLS  = ["#76FF03","#FFD600","#FF6D00","#00E5FF"];
  const robotSkin = "#90A4AE";
  const alienSkin = "#A5D6A7";
  const headSkin  = type==="robot"?robotSkin:type==="alien"?alienSkin:skin;

  const HairBack = () => {
    if (hs==="Wavy"||hs==="Long") return <><ellipse cx="64" cy="95" rx="12" ry="32" fill={hairCol}/><ellipse cx="136" cy="95" rx="12" ry="32" fill={hairCol}/></>;
    if (hs==="Braids") return <><rect x="59" y="76" width="14" height="62" rx="7" fill={hairCol}/><rect x="127" y="76" width="14" height="62" rx="7" fill={hairCol}/></>;
    return null;
  };

  const HairFront = () => {
    if (type==="robot") return null;
    switch (hs) {
      case "Short":  return <ellipse cx="100" cy="54" rx="42" ry="21" fill={hairCol}/>;
      case "Wavy":   return <><ellipse cx="100" cy="52" rx="44" ry="23" fill={hairCol}/><path d="M58,68 Q52,82 60,95" fill="none" stroke={hairCol} strokeWidth="10" strokeLinecap="round"/><path d="M142,68 Q148,82 140,95" fill="none" stroke={hairCol} strokeWidth="10" strokeLinecap="round"/></>;
      case "Long":   return <ellipse cx="100" cy="52" rx="43" ry="22" fill={hairCol}/>;
      case "Curly":  return <><ellipse cx="100" cy="52" rx="44" ry="23" fill={hairCol}/><circle cx="64" cy="74" r="14" fill={hairCol}/><circle cx="73" cy="94" r="12" fill={hairCol}/><circle cx="136" cy="74" r="14" fill={hairCol}/><circle cx="127" cy="94" r="12" fill={hairCol}/></>;
      case "Bun":    return <><ellipse cx="100" cy="56" rx="42" ry="19" fill={hairCol}/><circle cx="100" cy="35" r="16" fill={hairCol}/></>;
      case "Braids": return <ellipse cx="100" cy="52" rx="43" ry="23" fill={hairCol}/>;
      default:       return null;
    }
  };

  const Eyes = () => {
    const ey = EYE_STYLES[options.eyeIdx];
    const irisC = type==="alien"?"#1B5E20":"#1a1a2e";
    if (ey==="Sleepy") return <><path d="M74,76 Q83,70 92,76" fill="none" stroke={irisC} strokeWidth="2.5" strokeLinecap="round"/><path d="M108,76 Q117,70 126,76" fill="none" stroke={irisC} strokeWidth="2.5" strokeLinecap="round"/></>;
    const rx = ey==="Almond"?9:8;
    const ry = ey==="Wide"?9:ey==="Almond"?6:8;
    const iris = ey==="Sparkly"?"#00ACC1":irisC;
    return <><ellipse cx="83" cy="78" rx={rx} ry={ry} fill="white"/><ellipse cx="117" cy="78" rx={rx} ry={ry} fill="white"/><circle cx="83" cy="78" r={ry-2} fill={iris}/><circle cx="117" cy="78" r={ry-2} fill={iris}/><circle cx="85" cy="76" r="1.8" fill="white"/><circle cx="119" cy="76" r="1.8" fill="white"/>{ey==="Sparkly"&&<><line x1="83" y1="65" x2="83" y2="69" stroke="#FFD700" strokeWidth="1.5"/><line x1="117" y1="65" x2="117" y2="69" stroke="#FFD700" strokeWidth="1.5"/></>}</>;
  };

  const Accessory = () => {
    switch (acc) {
      case "Crown":   return <g transform="translate(100,40)"><polygon points="-20,-14 -20,0 20,0 20,-14 10,-6 0,-20 -10,-6" fill="#FFD700"/><circle cx="-10" cy="-5" r="3.5" fill="#E91E63"/><circle cx="0" cy="-13" r="3.5" fill="#E91E63"/><circle cx="10" cy="-5" r="3.5" fill="#E91E63"/></g>;
      case "Flower":  return <g transform="translate(132,56)">{[-90,-18,54,126,198].map((a,i)=><ellipse key={i} cx={8*Math.cos(a*Math.PI/180)} cy={8*Math.sin(a*Math.PI/180)} rx="7" ry="5" fill="#FF69B4" transform={`rotate(${a})`}/>)}<circle cx="0" cy="0" r="5" fill="#FFD700"/></g>;
      case "Wand":    return <><line x1="140" y1="140" x2="112" y2="98" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/><circle cx="109" cy="95" r="10" fill="#FF69B4"/><circle cx="109" cy="95" r="5" fill="white" opacity="0.6"/></>;
      case "Glasses": return <><circle cx="83" cy="78" r="11" fill="none" stroke="#555" strokeWidth="2.5"/><circle cx="117" cy="78" r="11" fill="none" stroke="#555" strokeWidth="2.5"/><line x1="94" y1="78" x2="106" y2="78" stroke="#555" strokeWidth="2.5"/><line x1="72" y1="75" x2="67" y2="72" stroke="#555" strokeWidth="2.5"/><line x1="128" y1="75" x2="133" y2="72" stroke="#555" strokeWidth="2.5"/></>;
      case "Hat":     return <g transform="translate(100,33)"><ellipse cx="0" cy="5" rx="28" ry="7" fill="#37474F"/><rect x="-16" y="-28" width="32" height="33" rx="5" fill="#37474F"/><rect x="-16" y="-1" width="32" height="5" fill="#546E7A"/></g>;
      default:        return null;
    }
  };

  return (
    <svg viewBox="0 0 200 270" style={{ width:size, height:size*270/200, overflow:"visible" }}>
      <defs>
        <linearGradient id="rbow" x1="0%" y1="0%" x2="100%" y2="100%">
          {["#FF0000","#FF7F00","#FFFF00","#00CC00","#0055FF","#8B00FF"].map((c,i)=>
            <stop key={i} offset={`${i*20}%`} stopColor={c}/>)}
        </linearGradient>
      </defs>

      {type==="mermaid"&&<><ellipse cx="100" cy="205" rx="26" ry="52" fill={TAIL_COLS[si]}/><ellipse cx="75" cy="245" rx="21" ry="13" fill={TAIL_COLS[si]} opacity="0.85" transform="rotate(-25 75 245)"/><ellipse cx="125" cy="245" rx="21" ry="13" fill={TAIL_COLS[si]} opacity="0.85" transform="rotate(25 125 245)"/><rect x="80" y="126" width="40" height="52" rx="10" fill={outfitC}/><rect x="80" y="158" width="40" height="22" fill={outfitD}/><ellipse cx="67" cy="150" rx="9" ry="24" fill={skin} transform="rotate(-14 67 150)"/><ellipse cx="133" cy="150" rx="9" ry="24" fill={skin} transform="rotate(14 133 150)"/></>}
      {type==="faerie"&&<><ellipse cx="52" cy="162" rx="36" ry="52" fill={WING_COLS[si]} opacity="0.55" transform="rotate(-25 52 162)"/><ellipse cx="148" cy="162" rx="36" ry="52" fill={WING_COLS[si]} opacity="0.55" transform="rotate(25 148 162)"/><ellipse cx="54" cy="128" rx="22" ry="32" fill={WING_COLS[si]} opacity="0.4" transform="rotate(-15 54 128)"/><ellipse cx="146" cy="128" rx="22" ry="32" fill={WING_COLS[si]} opacity="0.4" transform="rotate(15 146 128)"/><path d="M80,126 L60,232 L140,232 L120,126 Z" fill={outfitC}/><rect x="80" y="126" width="40" height="36" rx="8" fill={outfitC}/><rect x="80" y="150" width="40" height="12" fill={outfitD}/><ellipse cx="69" cy="148" rx="8" ry="21" fill={skin} transform="rotate(-16 69 148)"/><ellipse cx="131" cy="148" rx="8" ry="21" fill={skin} transform="rotate(16 131 148)"/><ellipse cx="88" cy="236" rx="10" ry="18" fill={skin}/><ellipse cx="112" cy="236" rx="10" ry="18" fill={skin}/></>}
      {type==="robot"&&<><rect x="56" y="126" width="18" height="50" rx="6" fill="#78909C"/><rect x="126" y="126" width="18" height="50" rx="6" fill="#78909C"/><rect x="74" y="126" width="52" height="68" rx="6" fill="#90A4AE"/><rect x="82" y="134" width="36" height="22" rx="4" fill="#37474F"/><rect x="88" y="140" width="10" height="10" rx="2" fill={LED_COLS[si]}/><rect x="102" y="140" width="10" height="10" rx="2" fill={LED_COLS[si]}/><rect x="80" y="192" width="16" height="42" rx="5" fill="#78909C"/><rect x="104" y="192" width="16" height="42" rx="5" fill="#78909C"/><rect x="76" y="228" width="22" height="10" rx="4" fill="#607D8B"/><rect x="100" y="228" width="22" height="10" rx="4" fill="#607D8B"/></>}
      {type==="human"&&<>{si===1&&<path d="M80,128 Q46,184 68,238 L100,206 L132,238 Q154,184 120,128 Z" fill="#E53935" opacity="0.75"/>}{si===2&&<rect x="70" y="132" width="24" height="40" rx="5" fill="#795548"/>}{si===3&&<><ellipse cx="52" cy="164" rx="28" ry="46" fill="#FFF9C4" opacity="0.65" transform="rotate(-22 52 164)"/><ellipse cx="148" cy="164" rx="28" ry="46" fill="#FFF9C4" opacity="0.65" transform="rotate(22 148 164)"/></>}<rect x="80" y="126" width="40" height="64" rx="10" fill={outfitC}/><rect x="80" y="178" width="40" height="14" fill={outfitD}/><ellipse cx="68" cy="150" rx="9" ry="24" fill={skin} transform="rotate(-11 68 150)"/><ellipse cx="132" cy="150" rx="9" ry="24" fill={skin} transform="rotate(11 132 150)"/><ellipse cx="88" cy="234" rx="11" ry="26" fill={skin}/><ellipse cx="112" cy="234" rx="11" ry="26" fill={skin}/><ellipse cx="88" cy="254" rx="13" ry="7" fill="#37474F"/><ellipse cx="112" cy="254" rx="13" ry="7" fill="#37474F"/></>}
      {type==="alien"&&<>{si===0&&<><line x1="85" y1="44" x2="72" y2="14" stroke={ANT_COLS[si]} strokeWidth="3"/><circle cx="72" cy="12" r="6" fill={ANT_COLS[si]}/><line x1="115" y1="44" x2="128" y2="14" stroke={ANT_COLS[si]} strokeWidth="3"/><circle cx="128" cy="12" r="6" fill={ANT_COLS[si]}/></>}{si===1&&<><line x1="92" y1="42" x2="88" y2="14" stroke={ANT_COLS[si]} strokeWidth="3"/><polygon points="88,10 82,20 94,20" fill={ANT_COLS[si]}/><line x1="108" y1="42" x2="112" y2="14" stroke={ANT_COLS[si]} strokeWidth="3"/><polygon points="112,10 106,20 118,20" fill={ANT_COLS[si]}/></>}{si===2&&<><path d="M88,44 Q68,24 76,10" fill="none" stroke={ANT_COLS[si]} strokeWidth="3" strokeLinecap="round"/><circle cx="76" cy="9" r="6" fill={ANT_COLS[si]}/><path d="M112,44 Q132,24 124,10" fill="none" stroke={ANT_COLS[si]} strokeWidth="3" strokeLinecap="round"/><circle cx="124" cy="9" r="6" fill={ANT_COLS[si]}/></>}{si===3&&<><line x1="90" y1="44" x2="82" y2="16" stroke={ANT_COLS[si]} strokeWidth="3"/><circle cx="82" cy="14" r="8" fill={ANT_COLS[si]} opacity="0.6"/><circle cx="82" cy="14" r="4" fill={ANT_COLS[si]}/><line x1="110" y1="44" x2="118" y2="16" stroke={ANT_COLS[si]} strokeWidth="3"/><circle cx="118" cy="14" r="8" fill={ANT_COLS[si]} opacity="0.6"/><circle cx="118" cy="14" r="4" fill={ANT_COLS[si]}/></>}<ellipse cx="62" cy="142" rx="9" ry="21" fill={alienSkin} transform="rotate(-22 62 142)"/><ellipse cx="138" cy="142" rx="9" ry="21" fill={alienSkin} transform="rotate(22 138 142)"/><ellipse cx="64" cy="170" rx="9" ry="21" fill={alienSkin} transform="rotate(10 64 170)"/><ellipse cx="136" cy="170" rx="9" ry="21" fill={alienSkin} transform="rotate(-10 136 170)"/><rect x="80" y="126" width="40" height="64" rx="12" fill={outfitC}/><ellipse cx="88" cy="234" rx="11" ry="24" fill={alienSkin}/><ellipse cx="112" cy="234" rx="11" ry="24" fill={alienSkin}/></>}

      <HairBack/>
      {type==="robot"
        ? <rect x="62" y="44" width="76" height="80" rx="10" fill={robotSkin}/>
        : <ellipse cx="100" cy="82" rx="44" ry="46" fill={headSkin}/>}
      <HairFront/>
      {type==="robot"
        ? <><rect x="68" y="60" width="24" height="18" rx="4" fill="#263238"/><rect x="108" y="60" width="24" height="18" rx="4" fill="#263238"/><rect x="72" y="65" width="16" height="8" rx="2" fill={LED_COLS[si]}/><rect x="112" y="65" width="16" height="8" rx="2" fill={LED_COLS[si]}/></>
        : <Eyes/>}
      {type==="robot"
        ? <rect x="80" y="96" width="40" height="12" rx="3" fill="#263238"/>
        : type==="alien"
          ? <><ellipse cx="100" cy="96" rx="4" ry="2.5" fill="rgba(0,80,0,0.25)"/><path d="M88,110 Q100,122 112,110" fill="none" stroke="rgba(0,80,0,0.4)" strokeWidth="2.5" strokeLinecap="round"/></>
          : <><ellipse cx="100" cy="96" rx="3.5" ry="2.5" fill="rgba(0,0,0,0.18)"/><path d="M88,108 Q100,120 112,108" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" strokeLinecap="round"/></>}
      <Accessory/>
    </svg>
  );
}
