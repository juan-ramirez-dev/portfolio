import type { ComponentType } from 'react'
import type { Locale } from '@/content/i18n'
import type { WidgetId } from '@/content/learning'
import { AbstractionStack } from './AbstractionStack'
import { AsciiWorkshop } from './AsciiWorkshop'
import { BitLab } from './BitLab'
import { BlackBox } from './BlackBox'
import { LoopDemo } from './LoopDemo'
import { PhonebookRace } from './PhonebookRace'
import { PromptToggle } from './PromptToggle'
import { PseudocodeStepper } from './PseudocodeStepper'
import { RgbMixer } from './RgbMixer'

/** the interactive a part names in its content */
export const widgets: Record<WidgetId, ComponentType<{ lang: Locale }>> = {
  prompt: PromptToggle,
  blackbox: BlackBox,
  bits: BitLab,
  ascii: AsciiWorkshop,
  rgb: RgbMixer,
  phonebook: PhonebookRace,
  pseudocode: PseudocodeStepper,
  abstraction: AbstractionStack,
  loops: LoopDemo,
}
