import { useState } from 'preact/hooks'

import _countries from './assets/countries.json'

import './app.css'
import { Autocomplete, Box, Button, Grid, Link, List, ListItem, ListItemIcon, TextField } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoodBadIcon from '@mui/icons-material/MoodBad';

import Confetti from 'react-confetti-boom'
import { getDirectionArrow } from './components/directions'
import { getMapLink } from './utils/map';
import { CompassDirection, getDistanceAndDirection } from './components/geoutils';
import { ShareButton } from './components/share';


export interface Country {
    Country: string, // long form name
    "Alpha-2 code": string // ISO 2 char code
    "Alpha-3 code": string // ISO 2 char code
    "Numeric code": number // numeric 3 char code
    "Latitude (average)": number,
    "Longitude (average)": number
}

export interface Guesses {
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

    const [correct, setCorrect] = useState<boolean>(false)

    const [gaveUp, setGaveUp] = useState<boolean>(false)

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

    const CorrectEntryContent = () => {
        return <>
            {gaveUp ? <MoodBadIcon sx={{ color: 'orange' }} /> : <CheckCircleIcon sx={{ color: 'green' }} />}
            <Link target="_blank" rel="noopener" href={getMapLink(todaysCountry)}>{todaysCountry.Country} {gaveUp && '(Gave Up)'}</Link>
        </>
    }

    const IncorrectEntryContent = (props: { guess: Guesses }) => {
        return <>
            <CancelIcon sx={{ color: 'red' }} />
            {gaveUp || correct ? <Link target="_blank" rel="noopener" href={getMapLink(props.guess.country)}>{props.guess.country.Country}</Link> : props.guess.country.Country}
            {` `}({props.guess.distance}km away){` `}
            {` `}{getDirectionArrow(props.guess.direction)}
        </>
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
                                <Button sx={{ width: '100px' }} variant='contained' disabled={!currentSelected || gaveUp || correct} onClick={countrySelected}>Check</Button>
                                {guesses.length >= 5 && <Button sx={{ marginTop: '4px', width: '100px', backgroundColor: 'orange' }} variant='contained' disabled={gaveUp || correct} onClick={() => setGaveUp(true)}>Give Up</Button>}
                            </Grid>
                            <Grid item xs={12} >
                                <List>
                                    {gaveUp && <ListItem sx={{ paddingLeft: '4px' }}>
                                        <ListItemIcon><CorrectEntryContent /> </ListItemIcon>
                                    </ListItem>}
                                    {guesses?.map(guess => {
                                        return <ListItem sx={{ paddingLeft: '4px' }}>
                                            <ListItemIcon>
                                                {guess.correct && <CorrectEntryContent />}
                                                {!guess.correct && <IncorrectEntryContent guess={guess} />}
                                            </ListItemIcon>
                                        </ListItem>
                                    })}
                                    {(guesses.filter(guess => guess.correct === true).length > 0 || gaveUp) && <><ShareButton guesses={guesses} gaveup={gaveUp} /></>}
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
