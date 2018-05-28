/* @flow */

import type {Command} from './command';

export type Navigation = {
    selectedPage?: ?string,
    selectedLang?: ?string,
    selectedCommand?: ?Command
}