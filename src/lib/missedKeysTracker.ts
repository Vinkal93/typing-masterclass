// Missed Keys Tracker - tracks frequently missed keys during typing practice

export interface MissedKeyData {
  key: string;
  count: number;
  lastMissed: number;
}

export interface MissedKeysProgress {
  missedKeys: Record<string, MissedKeyData>;
  totalMisses: number;
  lastUpdated: number;
}

const STORAGE_KEY = 'missed_keys_data';

export const getMissedKeysData = (): MissedKeysProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading missed keys data:', error);
  }
  
  return {
    missedKeys: {},
    totalMisses: 0,
    lastUpdated: Date.now(),
  };
};

export const trackMissedKey = (expectedKey: string, typedKey: string) => {
  if (expectedKey === typedKey) return;
  
  const data = getMissedKeysData();
  const key = expectedKey.toLowerCase();
  
  if (data.missedKeys[key]) {
    data.missedKeys[key].count += 1;
    data.missedKeys[key].lastMissed = Date.now();
  } else {
    data.missedKeys[key] = {
      key: key,
      count: 1,
      lastMissed: Date.now(),
    };
  }
  
  data.totalMisses += 1;
  data.lastUpdated = Date.now();
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
};

export const trackMissedKeys = (expectedText: string, typedText: string) => {
  const data = getMissedKeysData();
  
  for (let i = 0; i < typedText.length && i < expectedText.length; i++) {
    if (expectedText[i] !== typedText[i]) {
      const key = expectedText[i].toLowerCase();
      
      if (data.missedKeys[key]) {
        data.missedKeys[key].count += 1;
        data.missedKeys[key].lastMissed = Date.now();
      } else {
        data.missedKeys[key] = {
          key: key,
          count: 1,
          lastMissed: Date.now(),
        };
      }
      
      data.totalMisses += 1;
    }
  }
  
  data.lastUpdated = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
};

export const getTopMissedKeys = (limit: number = 10): MissedKeyData[] => {
  const data = getMissedKeysData();
  return Object.values(data.missedKeys)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const generateDrillText = (length: number = 100): string => {
  const topMissed = getTopMissedKeys(5);
  
  if (topMissed.length === 0) {
    // Return default practice text if no missed keys tracked
    return generateDefaultDrillText(length);
  }
  
  const missedKeys = topMissed.map(k => k.key);
  const drillWords = generateWordsWithKeys(missedKeys, length);
  
  return drillWords;
};

const generateWordsWithKeys = (keys: string[], length: number): string => {
  // Extensive word bank containing common problem keys
  const wordBank: Record<string, string[]> = {
    'a': ['apple', 'amazing', 'abstract', 'action', 'water', 'data', 'radar', 'camera', 'banana', 'avatar', 'attach', 'adapt', 'annual', 'arrive', 'afraid', 'already', 'against', 'article', 'arrangement', 'apparatus', 'capital', 'natural', 'material', 'available', 'balance', 'arrange', 'advance', 'manager', 'package', 'damage'],
    'b': ['better', 'bubble', 'browse', 'bundle', 'symbol', 'rubber', 'lobby', 'hobby', 'obtain', 'absorb', 'робот', 'global', 'number', 'member', 'timber', 'bomber', 'button', 'rabbit', 'combat', 'nobody', 'stable', 'enable', 'trouble', 'double', 'mobile', 'fabric', 'tribute', 'battery', 'blubber', 'bamboo'],
    'c': ['catch', 'circle', 'connect', 'concept', 'account', 'success', 'occur', 'access', 'accept', 'accuse', 'cancel', 'concern', 'concert', 'concise', 'conduct', 'council', 'crucial', 'correct', 'collect', 'classic', 'cascade', 'cyclone', 'ceramic', 'coconut', 'circuit', 'calcium', 'crucial', 'cactus', 'cascade', 'cocaine'],
    'd': ['daily', 'decide', 'divide', 'depend', 'hidden', 'added', 'sudden', 'indeed', 'demand', 'defend', 'diamond', 'disorder', 'dividend', 'dedicated', 'disorder', 'divided', 'decoded', 'decoded', 'decoded', 'disorder', 'disorder', 'disorder', 'standard', 'standard', 'standard', 'ladder', 'paddle', 'middle', 'muddle', 'fiddle'],
    'e': ['every', 'energy', 'element', 'execute', 'delete', 'receive', 'believe', 'achieve', 'extreme', 'explore', 'expense', 'express', 'essence', 'exercise', 'exchange', 'experience', 'excellent', 'electronic', 'elsewhere', 'enterprise', 'envelope', 'emergence', 'elsewhere', 'elsewhere', 'employee', 'employee', 'sleeve', 'freeze', 'breeze', 'squeeze'],
    'f': ['filter', 'follow', 'finish', 'flutter', 'effort', 'effect', 'afford', 'coffee', 'differ', 'suffer', 'buffer', 'offer', 'office', 'officer', 'official', 'offline', 'football', 'fifteen', 'fixture', 'firefox', 'fluffy', 'fulfill', 'fixture', 'fixture', 'fixture', 'waffle', 'baffle', 'raffle', 'shuffle', 'muffle'],
    'g': ['global', 'gather', 'getting', 'garage', 'toggle', 'bigger', 'logger', 'trigger', 'giggle', 'goggle', 'juggle', 'jungle', 'struggle', 'struggle', 'struggle', 'engage', 'garbage', 'gorgeous', 'guardian', 'gadget', 'gigantic', 'gorgeous', 'gorgeous', 'gorgeous', 'gorgeous', 'nugget', 'stagger', 'dagger', 'swagger', 'trigger'],
    'h': ['handle', 'hidden', 'height', 'healthy', 'method', 'higher', 'weather', 'whether', 'rhythm', 'southern', 'northern', 'without', 'beneath', 'hardware', 'household', 'hurricane', 'hypothesis', 'helicopter', 'hierarchy', 'highway', 'shoulder', 'brother', 'another', 'gather', 'feather', 'leather', 'mother', 'father', 'rather', 'lather'],
    'i': ['inside', 'input', 'invite', 'initial', 'visible', 'decision', 'mission', 'vision', 'division', 'position', 'condition', 'tradition', 'addition', 'edition', 'audition', 'ignition', 'intuition', 'initiative', 'individual', 'intimate', 'invisible', 'incident', 'incident', 'incident', 'incident', 'digit', 'visit', 'spirit', 'imit', 'limit'],
    'j': ['jungle', 'jacket', 'junior', 'adjust', 'inject', 'object', 'project', 'subject', 'reject', 'eject', 'major', 'enjoy', 'injury', 'majority', 'jigsaw', 'journal', 'journey', 'justice', 'jealous', 'jolly', 'joyful', 'judgment', 'juggler', 'junction', 'jumper', 'juniper', 'justify', 'jersey', 'jingle', 'jubilee'],
    'k': ['kernel', 'kiosk', 'keypad', 'keyboard', 'market', 'socket', 'pocket', 'ticket', 'jacket', 'packet', 'bracket', 'blanket', 'basket', 'cricket', 'kingdom', 'kitchen', 'kindness', 'knockout', 'knowledge', 'bookkeeper', 'backpack', 'kickback', 'trackback', 'workbook', 'notebook', 'textbook', 'checkbook', 'cookbook', 'bookmark', 'lookout'],
    'l': ['letter', 'little', 'label', 'level', 'follow', 'yellow', 'hello', 'allow', 'balloon', 'brilliant', 'collapse', 'collect', 'collar', 'college', 'parallel', 'satellite', 'satellite', 'satellite', 'satellite', 'literally', 'locally', 'legally', 'finally', 'totally', 'actually', 'naturally', 'usually', 'actually', 'carefully', 'skillfully'],
    'm': ['method', 'moment', 'memory', 'module', 'commit', 'summit', 'common', 'mammal', 'command', 'comment', 'commerce', 'community', 'communicate', 'minimum', 'maximum', 'swimming', 'programming', 'mammogram', 'mammoth', 'hammer', 'grammar', 'ammer', 'swimmer', 'shimmer', 'glimmer', 'summer', 'drummer', 'stammer', 'stammer', 'stammer'],
    'n': ['number', 'nation', 'normal', 'notice', 'inner', 'winner', 'dinner', 'banner', 'connect', 'innocent', 'announce', 'antenna', 'anniversary', 'announce', 'announce', 'announce', 'announce', 'announce', 'annual', 'pennant', 'channel', 'tunnel', 'funnel', 'manner', 'manner', 'manner', 'manner', 'manner', 'manner', 'manner'],
    'o': ['option', 'object', 'observe', 'occur', 'follow', 'hollow', 'borrow', 'sorrow', 'tomorrow', 'coconut', 'control', 'protocol', 'monopoly', 'biology', 'zoology', 'topology', 'outlook', 'outdoor', 'outcome', 'ongoing', 'onboard', 'orthodox', 'opposite', 'opposite', 'opposite', 'opposite', 'opposite', 'opposite', 'opposite', 'opposite'],
    'p': ['proper', 'puppet', 'pepper', 'popular', 'apply', 'happy', 'supply', 'copper', 'support', 'suppose', 'propose', 'purpose', 'approach', 'approve', 'apparent', 'appreciate', 'appropriate', 'opponent', 'opportunity', 'pineapple', 'typewriter', 'paperclip', 'passport', 'passport', 'passport', 'passport', 'passport', 'passport', 'passport', 'passport'],
    'q': ['query', 'quick', 'quote', 'square', 'unique', 'require', 'request', 'quality', 'quantity', 'quarter', 'question', 'equipment', 'frequent', 'sequence', 'technique', 'antique', 'bouquet', 'banquet', 'conquest', 'eloquent', 'adequate', 'aquarium', 'quiver', 'quilted', 'quietly', 'qualify', 'quarrel', 'quarter', 'squeeze', 'squash'],
    'r': ['render', 'remote', 'router', 'rather', 'error', 'mirror', 'terror', 'horror', 'correct', 'corridor', 'irregular', 'surrender', 'territory', 'reservoir', 'refrigerator', 'referral', 'recurring', 'recorder', 'reminder', 'reporter', 'narrator', 'director', 'creator', 'warrior', 'barrier', 'carrier', 'terrier', 'premier', 'courier', 'barrier'],
    's': ['system', 'session', 'select', 'stress', 'success', 'assess', 'message', 'lesson', 'mission', 'passion', 'ression', 'ression', 'possess', 'possible', 'pressure', 'professor', 'expression', 'impressive', 'aggressive', 'succession', 'discussion', 'submission', 'commission', 'permission', 'admission', 'ssassinate', 'accessible', 'assistance', 'successful', 'passionate'],
    't': ['toggle', 'target', 'testing', 'better', 'letter', 'matter', 'butter', 'twitter', 'flutter', 'scatter', 'shatter', 'pattern', 'battery', 'lottery', 'pottery', 'buttery', 'attorney', 'attention', 'attitude', 'attribute', 'attraction', 'attachment', 'attachment', 'attachment', 'attachment', 'attachment', 'attachment', 'attachment', 'attachment', 'attachment'],
    'u': ['unique', 'update', 'useful', 'unused', 'output', 'input', 'submit', 'pursuit', 'unusual', 'usually', 'universe', 'unanimous', 'ultimate', 'umbrella', 'uncertain', 'undercut', 'undertook', 'unfulfilled', 'ubiquitous', 'ukulele', 'ululate', 'ultimate', 'tumult', 'cumulus', 'stimulus', 'surplus', 'virtuous', 'surplus', 'surplus', 'surplus'],
    'v': ['visible', 'virtual', 'value', 'volume', 'never', 'clever', 'driver', 'deliver', 'evolve', 'involve', 'revolve', 'observe', 'deserve', 'reserve', 'conserve', 'preserve', 'overview', 'interview', 'whatever', 'however', 'forever', 'wherever', 'whenever', 'whoever', 'whatever', 'whatever', 'whatever', 'whatever', 'whatever', 'whatever'],
    'w': ['window', 'wrapper', 'widget', 'winner', 'follow', 'yellow', 'narrow', 'shadow', 'swallow', 'borrow', 'orrow', 'tomorrow', 'willow', 'widow', 'shower', 'tower', 'power', 'flower', 'lower', 'slower', 'browser', 'drawer', 'withdraw', 'somewhere', 'anywhere', 'nowhere', 'elsewhere', 'sandwich', 'workflow', 'wordwork'],
    'x': ['execute', 'export', 'expand', 'express', 'index', 'relax', 'complex', 'prefix', 'suffix', 'mixture', 'fixture', 'texture', 'context', 'syntax', 'maximum', 'maximum', 'minimum', 'extreme', 'excuse', 'examine', 'example', 'exactly', 'exclude', 'exhibit', 'external', 'extract', 'flexible', 'reflexive', 'perplexed', 'vexation'],
    'y': ['yellow', 'yearly', 'system', 'symbol', 'deploy', 'employ', 'destroy', 'survey', 'anyway', 'keyway', 'gateway', 'getaway', 'flyaway', 'runway', 'highway', 'subway', 'byway', 'midway', 'pathway', 'railway', 'synergy', 'mystery', 'history', 'factory', 'battery', 'gallery', 'dynasty', 'analyte', 'analyze', 'paralyze'],
    'z': ['zigzag', 'wizard', 'puzzle', 'frozen', 'amazing', 'organize', 'realize', 'analyze', 'recognize', 'authorize', 'emphasize', 'summarize', 'customize', 'visualize', 'capitalize', 'neutralize', 'maximize', 'minimize', 'optimize', 'horizon', 'magazine', 'pizzazz', 'blizzard', 'drizzle', 'frazzle', 'muzzle', 'puzzle', 'nozzle', 'sizzle', 'fizzle'],
    ' ': ['the', 'and', 'for', 'with', 'from', 'that', 'this', 'have', 'been', 'were', 'what', 'when', 'where', 'which', 'while', 'about', 'after', 'again', 'being', 'could'],
  };
  
  const words: string[] = [];
  let currentLength = 0;
  
  while (currentLength < length) {
    const targetKey = keys[Math.floor(Math.random() * keys.length)];
    const keyWords = wordBank[targetKey] || wordBank['a'];
    const word = keyWords[Math.floor(Math.random() * keyWords.length)];
    
    words.push(word);
    currentLength += word.length + 1;
  }
  
  return words.join(' ');
};

const generateDefaultDrillText = (length: number): string => {
  const defaultWords = [
    'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
    'practice', 'typing', 'speed', 'accuracy', 'keyboard', 'fingers',
    'home', 'row', 'keys', 'position', 'correct', 'technique',
    'improve', 'skills', 'daily', 'exercise', 'focus', 'concentration',
    'efficient', 'productive', 'learning', 'progress', 'challenge', 'master',
    'rhythm', 'smooth', 'steady', 'consistent', 'precision', 'develop',
    'muscle', 'memory', 'training', 'session', 'performance', 'goal',
    'achieve', 'success', 'dedicated', 'practice', 'perfect', 'results',
    'computer', 'software', 'application', 'document', 'writing', 'content',
    'professional', 'workplace', 'business', 'communication', 'technology', 'modern',
    'advantage', 'competitive', 'essential', 'valuable', 'important', 'necessary',
    'foundation', 'building', 'strength', 'confidence', 'capability', 'expert'
  ];
  
  const words: string[] = [];
  let currentLength = 0;
  
  while (currentLength < length) {
    const word = defaultWords[Math.floor(Math.random() * defaultWords.length)];
    words.push(word);
    currentLength += word.length + 1;
  }
  
  return words.join(' ');
};

export const clearMissedKeysData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getMissedKeysStats = () => {
  const data = getMissedKeysData();
  const topMissed = getTopMissedKeys(10);
  
  return {
    totalMisses: data.totalMisses,
    uniqueKeys: Object.keys(data.missedKeys).length,
    topMissed,
    lastUpdated: data.lastUpdated,
  };
};
