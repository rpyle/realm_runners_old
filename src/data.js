export const CHARS = [
  { id:"mermaid", name:"Mermaid", emoji:"🧜‍♀️", world:"ocean",       wEmoji:"🌊", worldName:"Ocean Depths"       },
  { id:"faerie",  name:"Faerie",  emoji:"🧚‍♀️", world:"forest",      wEmoji:"🌲", worldName:"Enchanted Forest"    },
  { id:"unicorn", name:"Unicorn", emoji:"🦄",   world:"meadow",      wEmoji:"🌸", worldName:"Magical Meadow"      },
  { id:"robot",   name:"Robot",   emoji:"🤖",   world:"city",        wEmoji:"🏙️", worldName:"Futuristic City"     },
  { id:"human",   name:"Human",   emoji:"🧒",   world:"countryside", wEmoji:"🌄", worldName:"Rolling Countryside"  },
  { id:"alien",   name:"Alien",   emoji:"👽",   world:"space",       wEmoji:"🌌", worldName:"Outer Space"         },
];

export const WORLDS = {
  ocean:       { name:"Ocean Depths",        emoji:"🌊", bg:["#0077b6","#023e8a"], accent:"#48cae4", stars:false },
  forest:      { name:"Enchanted Forest",    emoji:"🌲", bg:["#1b4332","#2d6a4f"], accent:"#74c69d", stars:false },
  meadow:      { name:"Magical Meadow",      emoji:"🌸", bg:["#4a9e6b","#1f5c3a"], accent:"#f9c74f", stars:false },
  city:        { name:"Futuristic City",     emoji:"🏙️", bg:["#3a0ca3","#4361ee"], accent:"#a2d2ff", stars:false },
  countryside: { name:"Rolling Countryside", emoji:"🌄", bg:["#386641","#a7c957"], accent:"#f9c74f", stars:false },
  space:       { name:"Outer Space",         emoji:"🌌", bg:["#0d0221","#5f0f40"], accent:"#e040fb", stars:true  },
};

export const WORLD_NODES = [
  { id:"ocean",       x:72,  y:88  },
  { id:"forest",      x:252, y:68  },
  { id:"meadow",      x:168, y:178 },
  { id:"city",        x:68,  y:278 },
  { id:"countryside", x:278, y:258 },
  { id:"space",       x:180, y:368 },
];

export const WORLD_PATHS = [
  ["ocean","meadow"],["forest","meadow"],
  ["meadow","city"],["meadow","countryside"],
  ["city","space"],["countryside","space"],
];

export const WORLD_EMOJIS = {
  ocean:       ["🐠","🐙","🦈","🐚","🦀","🐬","🌊","🦑"],
  forest:      ["🦋","🍄","🌺","🦊","🌿","🦌","🌲","🦉"],
  meadow:      ["🌸","🌈","🌻","🐝","🍀","🌷","🌼","🦄"],
  city:        ["🤖","💡","🔬","⚡","🔭","💎","🚀","🛸"],
  countryside: ["🐄","🌾","🐓","🐑","🌻","🐎","🏡","🌳"],
  space:       ["🌟","🪐","👾","☄️","🌙","🛸","⭐","🌌"],
};

export const PUZZLES = {
  ocean: [
    { seq:["🐠","🐙","🐠","🐙","🐠","?"], ans:"🐙", opts:["🐙","🦈","🐚","🌊"] },
    { seq:["🐠","🦀","🐬","🐠","🦀","?"], ans:"🐬", opts:["🐬","🐙","🌊","🦑"] },
    { seq:["🦑","🦑","🐚","🐚","🦑","?"], ans:"🦑", opts:["🦑","🐚","🐠","🦈"] },
  ],
  forest: [
    { seq:["🌺","🍄","🌺","🍄","🌺","?"], ans:"🍄", opts:["🍄","🦊","🌿","🦌"] },
    { seq:["🦋","🌲","🦉","🦋","🌲","?"], ans:"🦉", opts:["🦉","🌺","🍄","🦊"] },
    { seq:["🌿","🌿","🦌","🌿","🌿","?"], ans:"🦌", opts:["🦌","🌺","🦋","🌲"] },
  ],
  meadow: [
    { seq:["🌸","🌈","🌸","🌈","🌸","?"], ans:"🌈", opts:["🌈","🌻","🐝","🍀"] },
    { seq:["🌷","🐝","🌼","🌷","🐝","?"], ans:"🌼", opts:["🌼","🌸","🌈","🦄"] },
    { seq:["🦄","🦄","🌈","🦄","🦄","?"], ans:"🌈", opts:["🌈","🌸","🐝","🌻"] },
  ],
  city: [
    { seq:["💡","🔬","💡","🔬","💡","?"], ans:"🔬", opts:["🔬","⚡","🛸","💎"] },
    { seq:["🤖","⚡","🚀","🤖","⚡","?"], ans:"🚀", opts:["🚀","💡","🔭","🛸"] },
    { seq:["🛸","🛸","💎","🛸","🛸","?"], ans:"💎", opts:["💎","🤖","⚡","🔬"] },
  ],
  countryside: [
    { seq:["🐄","🌾","🐄","🌾","🐄","?"], ans:"🌾", opts:["🌾","🐓","🐑","🌻"] },
    { seq:["🐎","🐓","🏡","🐎","🐓","?"], ans:"🏡", opts:["🏡","🌾","🐄","🌳"] },
    { seq:["🌳","🌳","🐑","🌳","🌳","?"], ans:"🐑", opts:["🐑","🐄","🐓","🌾"] },
  ],
  space: [
    { seq:["🌟","🪐","🌟","🪐","🌟","?"], ans:"🪐", opts:["🪐","👾","☄️","🌙"] },
    { seq:["☄️","🌙","⭐","☄️","🌙","?"],  ans:"⭐",  opts:["⭐","🌟","🛸","👾"]  },
    { seq:["👾","👾","🌌","👾","👾","?"], ans:"🌌", opts:["🌌","🌟","🪐","☄️"] },
  ],
};

export const HARD_PUZZLES = {
  ocean: [
    { seq:["🐠","🐙","🦈","🐠","🐙","🦈","🐠","?"], ans:"🐙", opts:["🐙","🦈","🐚","🦑"] },
    { seq:["🐚","🐬","🐚","🐚","🐬","🐚","🐚","?"], ans:"🐬", opts:["🐬","🐠","🦀","🌊"] },
  ],
  forest: [
    { seq:["🍄","🌺","🌺","🍄","🌺","🌺","🍄","?"], ans:"🌺", opts:["🌺","🦊","🌿","🦌"] },
    { seq:["🦋","🦉","🌿","🦋","🦉","🌿","🦋","?"], ans:"🦉", opts:["🦉","🍄","🌺","🌲"] },
  ],
  meadow: [
    { seq:["🌸","🌸","🌈","🌸","🌸","🌈","🌸","?"], ans:"🌸", opts:["🌸","🌈","🌻","🐝"] },
    { seq:["🐝","🌷","🌼","🌷","🐝","🌷","🌼","?"], ans:"🌷", opts:["🌷","🌸","🌈","🦄"] },
  ],
  city: [
    { seq:["💡","⚡","💡","💡","⚡","💡","💡","?"], ans:"⚡", opts:["⚡","🔬","🛸","💎"] },
    { seq:["🤖","🔭","💎","🤖","🔭","💎","🤖","?"], ans:"🔭", opts:["🔭","⚡","💡","🛸"] },
  ],
  countryside: [
    { seq:["🐄","🐄","🌾","🐄","🐄","🌾","🐄","?"], ans:"🐄", opts:["🐄","🌾","🐓","🐑"] },
    { seq:["🐎","🌳","🐓","🐎","🌳","🐓","🐎","?"], ans:"🌳", opts:["🌳","🌾","🐄","🏡"] },
  ],
  space: [
    { seq:["🌟","🪐","🌟","🌟","🪐","🌟","🌟","?"], ans:"🪐", opts:["🪐","👾","☄️","🌌"] },
    { seq:["👾","☄️","🌙","👾","☄️","🌙","👾","?"], ans:"☄️", opts:["☄️","🌟","🪐","⭐"] },
  ],
};

export const MEM_PAIRS = [4, 6, 8];

export const SKIN_TONES = [
  {label:"Porcelain",color:"#FDDBB4"},{label:"Peach",color:"#F0C27F"},
  {label:"Tan",color:"#C68642"},{label:"Brown",color:"#8D5524"},
  {label:"Deep",color:"#4A2912"},{label:"Mint",color:"#B2DFDB"},
  {label:"Lavender",color:"#D1C4E9"},
];

export const HAIR_STYLES = ["Short","Wavy","Curly","Bun","Braids","Long"];

export const HAIR_COLORS = [
  {label:"Ebony",color:"#2C1810"},{label:"Auburn",color:"#8B4513"},
  {label:"Blonde",color:"#DAA520"},{label:"Red",color:"#CC3300"},
  {label:"Violet",color:"#9B59B6"},{label:"Blue",color:"#2980B9"},
  {label:"White",color:"#FFFACD"},{label:"Pink",color:"#FF69B4"},
];

export const EYE_STYLES = ["Round","Almond","Wide","Sparkly","Sleepy"];

export const OUTFIT_COLORS = [
  {label:"Crimson",color:"#E74C3C"},{label:"Ocean",color:"#2980B9"},
  {label:"Forest",color:"#27AE60"},{label:"Gold",color:"#F1C40F"},
  {label:"Violet",color:"#8E44AD"},{label:"Coral",color:"#E67E22"},
  {label:"Rose",color:"#E91E63"},{label:"Slate",color:"#607D8B"},
];

export const ACCESSORIES = ["None","Crown","Flower","Wand","Glasses","Hat"];

export const SPECIAL_OPTIONS = {
  mermaid:["Sapphire Tail","Emerald Tail","Violet Tail","Rainbow Tail"],
  faerie: ["Amber Wings","Violet Wings","Jade Wings","Crystal Wings"],
  unicorn:["Gold Horn","Silver Horn","Rose Horn","Rainbow Horn"],
  robot:  ["Blue LEDs","Red LEDs","Green LEDs","Purple LEDs"],
  human:  ["Casual","Adventurer","Noble","Mystical"],
  alien:  ["Twin Antennae","Star Antennae","Curly Antennae","Glow Antennae"],
};

export const SPECIAL_LABEL = {
  mermaid:"Tail Style", faerie:"Wing Style", unicorn:"Horn Style",
  robot:"LED Color",    human:"Style",       alien:"Antennae",
};

export const SAVE_KEY = "realm_runners_v5";

export const DEFAULT_OPTS = {
  skinIdx:0, hairStyleIdx:0, hairColorIdx:0,
  eyeIdx:0,  outfitIdx:0,    specialIdx:0,   accIdx:0,
};

export const DEFAULT_PROGRESS = Object.fromEntries(
  ["ocean","forest","meadow","city","countryside","space"]
    .map(w => [w, { completed:[], unlocked:false, stars:{} }])
);
