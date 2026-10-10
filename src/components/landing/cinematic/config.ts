export interface CinematicStage {
  id: string;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  start: number;
  end: number;
  side: 'left' | 'right' | 'center';
  accent: string;
}

export const CINEMATIC_STAGES: CinematicStage[] = [
  {
    id: "connect",
    label: "CONNECT",
    eyebrow: "STAGE 01 / 06",
    headline: "SYSTEM\nONLINE",
    description: "Secure connection established to the trading environment.",
    start: 0.00,
    end: 0.15,
    side: "left",
    accent: "#00f0ff"
  },
  {
    id: "understand",
    label: "UNDERSTAND",
    eyebrow: "STAGE 02 / 06",
    headline: "NATURAL LANGUAGE\nDETECTED",
    description: "The system receives the trader's natural-language intent.",
    start: 0.15,
    end: 0.32,
    side: "right",
    accent: "#00f0ff"
  },
  {
    id: "interpret",
    label: "INTERPRET",
    eyebrow: "STAGE 03 / 06",
    headline: "INTENT\nSTRUCTURED",
    description: "AI transforms natural language into deterministic parameters.",
    start: 0.32,
    end: 0.50,
    side: "left",
    accent: "#00f0ff"
  },
  {
    id: "validate",
    label: "VALIDATE",
    eyebrow: "STAGE 04 / 06",
    headline: "REQUEST\nVALIDATED",
    description: "Deterministic validation against risk controls and account context.",
    start: 0.50,
    end: 0.68,
    side: "right",
    accent: "#00ff66"
  },
  {
    id: "authorize",
    label: "AUTHORIZE",
    eyebrow: "STAGE 05 / 06",
    headline: "EXECUTION\nLOCKED",
    description: "Consequential actions require explicit trader authorization.",
    start: 0.68,
    end: 0.86,
    side: "center",
    accent: "#ffb000"
  },
  {
    id: "execute",
    label: "EXECUTE",
    eyebrow: "STAGE 06 / 06",
    headline: "APPROVED.\nEXECUTING.",
    description: "Example execution sequence. Real terminal manages actual status.",
    start: 0.86,
    end: 1.00,
    side: "right",
    accent: "#00f0ff"
  }
];
