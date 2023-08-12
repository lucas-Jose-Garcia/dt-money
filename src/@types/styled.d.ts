import 'styled-components'
import { defaultTheme } from '../styles/themes/defeut'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}