// Keyboard Sound Manager — generates sounds using Web Audio API (no external files needed)

type SoundPack = 'mechanical' | 'typewriter' | 'soft' | 'none';

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private currentPack: SoundPack = 'none';

  private getCtx() {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
    }
    return this.audioCtx;
  }

  setPack(pack: SoundPack) {
    this.currentPack = pack;
    localStorage.setItem('soundPack', pack);
  }

  getPack(): SoundPack {
    return (localStorage.getItem('soundPack') as SoundPack) || 'none';
  }

  playKeyPress() {
    const pack = this.getPack();
    if (pack === 'none') return;

    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (pack) {
        case 'mechanical':
          osc.type = 'square';
          osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          osc.start(now);
          osc.stop(now + 0.06);
          break;
        case 'typewriter':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(1200 + Math.random() * 300, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.04);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
          break;
        case 'soft':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600 + Math.random() * 100, now);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
          break;
      }
    } catch {
      // Audio context may not be available
    }
  }

  playError() {
    const pack = this.getPack();
    if (pack === 'none') return;
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();
export type { SoundPack };
