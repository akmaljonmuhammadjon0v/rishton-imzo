import fs from 'fs';
import path from 'path';

const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

export interface Order {
  id: string;
  date: string;
  name: string;
  phone: string;
  address?: string;
  productDetails?: {
    type?: string;
    profile?: string;
    dimensions?: string;
    color?: string;
    estimatedPrice?: number;
  };
  status: 'Yangi' | 'Bog\'lanildi' | 'O\'lchandi' | 'Bajarildi' | 'Bekor qilindi';
  source: string;
}

export interface Settings {
  prices: {
    thermo78: number;
    engelberg76: number;
    trio60: number;
    slidingBalcony: number;
  };
  telegram: {
    enabled: boolean;
    botToken: string;
    chatId: string;
  };
}

const defaultSettings: Settings = {
  prices: {
    thermo78: 1450000,
    engelberg76: 1150000,
    trio60: 850000,
    slidingBalcony: 1300000,
  },
  telegram: {
    enabled: false,
    botToken: '',
    chatId: '',
  },
};

function writeJsonAtomically(filePath: string, value: unknown) {
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(value, null, 2), { encoding: 'utf-8', mode: 0o600 });
  fs.renameSync(tempPath, filePath);
}

function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(SETTINGS_FILE)) {
    writeJsonAtomically(SETTINGS_FILE, defaultSettings);
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    writeJsonAtomically(ORDERS_FILE, []);
  }
}

export function getOrders(): Order[] {
  ensureFiles();
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]): void {
  ensureFiles();
  writeJsonAtomically(ORDERS_FILE, orders);
}

export function getSettings(): Settings {
  ensureFiles();
  try {
    const parsed = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
    return {
      prices: { ...defaultSettings.prices, ...(parsed.prices || {}) },
      telegram: { ...defaultSettings.telegram, ...(parsed.telegram || {}) },
    };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: Settings): void {
  ensureFiles();
  writeJsonAtomically(SETTINGS_FILE, settings);
}
