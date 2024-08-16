import _countries from './assets/countries.json'

import './app.css'
import { getDailyRandomNumber, seedRand } from './utils/random'

import { Country, Guessor } from './guesser'
import { CONTACT, debug, debugCountry } from './constants'
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import { useMemo } from 'preact/hooks'

function rand(items: any[]) {
  return items[items.length * Math.random() | 0];
}

export function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const countries = _countries as Country[]

  const todaysCountry = (() => {
    if (debug) {
      return debugCountry != 'random' ? countries.find(country => country['Alpha-2 code'] === debugCountry) : rand(countries)
    } else {
      return countries.sort()[seedRand(getDailyRandomNumber(), [0, countries.length])]
    }
  })()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <h1>Country Guessr</h1>
        {todaysCountry && <Guessor country={todaysCountry} />}
        <footer className="footer">{CONTACT}</footer>
      </>
    </ThemeProvider>


  )
}
