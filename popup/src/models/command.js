import type {Action} from "./action";

export type Command = {
    voiceCommand: string,
    action: Action
};