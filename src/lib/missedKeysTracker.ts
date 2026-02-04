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
  // Words containing common problem keys
  const wordBank: Record<string, string[]> = {
    'a': ['apple', 'amazing', 'abstract', 'action', 'water', 'data', 'radar', 'camera'],
    'b': ['better', 'bubble', 'browse', 'bundle', 'symbol', 'rubber', 'lobby', 'hobby'],
    'c': ['catch', 'circle', 'connect', 'concept', 'account', 'success', 'occur', 'access'],
    'd': ['daily', 'decide', 'divide', 'depend', 'hidden', 'added', 'sudden', 'indeed'],
    'e': ['every', 'energy', 'element', 'execute', 'delete', 'receive', 'believe', 'achieve'],
    'f': ['filter', 'follow', 'finish', 'flutter', 'effort', 'effect', 'afford', 'coffee'],
    'g': ['global', 'gather', 'getting', 'garage', 'toggle', 'bigger', 'logger', 'trigger'],
    'h': ['handle', 'hidden', 'height', 'healthy', 'method', 'higher', 'weather', 'whether'],
    'i': ['inside', 'input', 'invite', 'initial', 'visible', 'decision', 'mission', 'vision'],
    'j': ['jungle', 'jacket', 'junior', 'adjust', 'inject', 'object', 'project', 'subject'],
    'k': ['kernel', 'kiosk', 'keypad', 'keyboard', 'market', 'socket', 'pocket', 'ticket'],
    'l': ['letter', 'little', 'label', 'level', 'follow', 'yellow', 'hello', 'allow'],
    'm': ['method', 'moment', 'memory', 'module', 'commit', 'summit', 'common', 'mammal'],
    'n': ['number', 'nation', 'normal', 'notice', 'inner', 'winner', 'dinner', 'banner'],
    'o': ['option', 'object', 'observe', 'occur', 'follow', 'hollow', 'borrow', 'orrow'],
    'p': ['proper', 'puppet', 'pepper', 'popular', 'apply', 'happy', 'supply', 'copper'],
    'q': ['query', 'quick', 'quote', 'square', 'unique', 'require', 'request', 'quality'],
    'r': ['render', 'remote', 'router', 'rather', 'error', 'mirror', 'terror', 'horror'],
    's': ['system', 'session', 'select', 'stress', 'success', 'assess', 'message', 'lesson'],
    't': ['toggle', 'target', 'testing', 'better', 'letter', 'matter', 'butter', 'twitter'],
    'u': ['unique', 'update', 'useful', 'unused', 'output', 'input', 'submit', 'pursuit'],
    'v': ['visible', 'virtual', 'value', 'volume', 'never', 'clever', 'driver', 'deliver'],
    'w': ['window', 'wrapper', 'widget', 'winner', 'follow', 'yellow', 'narrow', 'shadow'],
    'x': ['execute', 'export', 'expand', 'express', 'index', 'relax', 'complex', 'prefix'],
    'y': ['yellow', 'yearly', 'system', 'symbol', 'deploy', 'employ', 'destroy', 'survey'],
    'z': ['zigzag', 'wizard', 'puzzle', 'frozen', 'amazing', 'organize', 'realize', 'analyze'],
    ' ': ['the', 'and', 'for', 'with', 'from', 'that', 'this', 'have'],
  };
  
  const words: string[] = [];
  let currentLength = 0;
  
  while (currentLength < length) {
    // Pick a random key from the missed keys
    const targetKey = keys[Math.floor(Math.random() * keys.length)];
    const keyWords = wordBank[targetKey] || wordBank['a'];
    const word = keyWords[Math.floor(Math.random() * keyWords.length)];
    
    words.push(word);
    currentLength += word.length + 1; // +1 for space
  }
  
  return words.join(' ');
};

const generateDefaultDrillText = (length: number): string => {
  const defaultWords = [
    'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
    'practice', 'typing', 'speed', 'accuracy', 'keyboard', 'fingers',
    'home', 'row', 'keys', 'position', 'correct', 'technique',
    'improve', 'skills', 'daily', 'exercise', 'focus', 'concentration'
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
