// ?pid=888&gid=bookofdead&lang=en_GB&currency=CNY&practice=0&user=1513-984I62U184G763O&channel=mobile&brand=carnival&ctx=ipcelectron&embedmode=iframe&origin=https%3A%2F%2Flauncher.lydrst.com

export interface ILauncherPayload {
  pid: number;
  gameid: string;
  lang: string;
  currency: string;
  practice: number;
  user: string;
  channel: string;
  brand: string;
  ctx: string;
  embedmode: string;
  origin: string;
  debug?: number;
  device: 'desktop' | 'mobile';
  bundle?: Record<string, string>;
  sessionId?: string;
}