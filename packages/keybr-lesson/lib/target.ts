import { speedToTime } from "@keybr/result";
import { type Settings } from "@keybr/settings";
import { lessonProps } from "./settings.ts";

export class Target {
  readonly timeToType: number;

  constructor(settings: Settings) {
    this.timeToType = speedToTime(settings.get(lessonProps.targetSpeed));
  }

  confidence(timeToType: number): number;
  confidence(timeToType: null): null;
  confidence(timeToType: number | null): number | null;
  confidence(timeToType: number | null): number | null {
    if (timeToType == null) {
      return null;
    }
    if (!Number.isFinite(timeToType) || timeToType === 0) {
      throw new Error();
    }
    return this.timeToType / timeToType;
  }
}
