import { Button } from "@mui/material"
import { Guesses } from "../guesser"
import { getDateString } from "../utils/date"
import { getDirectionArrowString } from "./directions"

interface ShareButtonProps { guesses: Guesses[], gaveup: boolean }
export const ShareButton = (props: ShareButtonProps) => {
  const { guesses, gaveup } = props

  const date = new Date()
  const dateString = getDateString(date)

  const getCopyText = (): string => {
    let prefix = gaveup ? 'Gaveup after' : 'Success in'

    const lineOne = `[${dateString}] - ${prefix} ${guesses.length} turn${guesses.length > 1 ? 's' : ''}.`

    const guessLines = guesses.reverse().map((guess, idx) => {
      return `${guess.correct ? "🟩" : "🟧"}${idx + 1}: ${guess.correct ? `Success 🎉` : `${guess.distance}km away ${getDirectionArrowString(guess.direction)}`}`
    })

    const urlLine = `\n${window.location.origin}`

    return [lineOne, ...guessLines, urlLine].join("\n")
  }

  const copy = () => {
    navigator.clipboard.writeText(getCopyText())
  }

  return <Button onClick={copy}>Share Results (copy to clipboard)</Button>
}