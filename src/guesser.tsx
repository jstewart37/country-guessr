import { useState } from 'preact/hooks'

import _countries from './assets/countries.json'

import './app.css'
import { Autocomplete, Box, Button, Grid, Link, List, ListItem, ListItemIcon, TextField } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import Confetti from 'react-confetti-boom'
import { getDirectionArrow } from './components/directions'
import { getMapLink } from './utils/map';
import { CompassDirection, getDistanceAndDirection } from './components/geoutils';


export interface Country {
    Country: string, // long form name
    "Alpha-2 code": string // ISO 2 char code
    "Alpha-3 code": string // ISO 2 char code
    "Numeric code": number // numeric 3 char code
    "Latitude (average)": number,
    "Longitude (average)": number
}

interface Guesses {
    correct: boolean
    distance: number
    direction: CompassDirection | undefined
    country: Country
}

interface Props {
    country: Country
}

const countries = _countries as Country[]

export function Guessor(props: Props) {

    const { country: todaysCountry } = props

    const [currentSelected, setCurrentSelected] = useState<Country | null>()
    const [guesses, setGuesses] = useState<Guesses[]>([])

    const [correct, setCorrect] = useState<boolean>()

    const countrySelected = () => {
        if (todaysCountry && currentSelected) {
            if (currentSelected?.['Alpha-2 code'] === todaysCountry?.['Alpha-2 code']) {
                const correctGuess: Guesses = {
                    correct: true,
                    distance: 0,
                    country: currentSelected,
                    direction: undefined
                }
                alert('Congrats. Clever')
                setGuesses([correctGuess, ...guesses])
                setCurrentSelected(null)
                setCorrect(true)
            }
            else {
                const distanceCompass = getDistanceAndDirection(
                    currentSelected?.['Latitude (average)'],
                    currentSelected?.['Longitude (average)'],
                    todaysCountry['Latitude (average)'],
                    todaysCountry['Longitude (average)']
                )

                const invalidGuess: Guesses = {
                    correct: false,
                    distance: Math.floor(distanceCompass.distanceMeters / 1000),
                    direction: distanceCompass.compassDirection,
                    country: currentSelected
                }
                setGuesses([invalidGuess, ...guesses])
                setCorrect(false)

            }
        }
    }

    return (
        <>
            {todaysCountry &&
                <Box alignItems="center" display="flex" justifyContent="center">
                    <Grid container maxWidth={'60%'}>

                        <Box component="img" className="country" src={`/${todaysCountry?.['Alpha-2 code'].toLowerCase()}.svg`} />


                        <Grid container paddingTop={'10px'} spacing={1}>
                            <Grid item xs={10} >
                                <Autocomplete value={currentSelected}
                                    defaultValue={null}
                                    onChange={(_event, value) => setCurrentSelected(value)} disablePortal disabled={false} options={countries}
                                    getOptionLabel={(option) => option.Country} renderInput={(params) => {
                                        // @ts-ignore
                                        return <TextField {...params} label="Country" />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant='contained' disabled={!currentSelected} onClick={countrySelected}>Check</Button>
                            </Grid>
                            <Grid item xs={12} >
                                <List>
                                    {guesses?.map(guess => {
                                        return <ListItem sx={{ paddingLeft: '4px' }}>
                                            <ListItemIcon>
                                                {guess.correct && <>
                                                    <CheckCircleIcon sx={{ color: 'green' }} />
                                                    <Link target="_blank" rel="noopener" href={getMapLink(guess.country)}>{guess.country.Country}</Link>
                                                </>}
                                                {!guess.correct && <><CancelIcon sx={{ color: 'red' }} />{guess.country.Country} ({guess.distance}km away){` `}{getDirectionArrow(guess.direction)}</>}
                                            </ListItemIcon>
                                        </ListItem>
                                    })}
                                </List>
                            </Grid>

                        </Grid>
                    </Grid>
                </Box>
            }
            {correct && <Confetti mode="fall" />}
        </>
    )
}
