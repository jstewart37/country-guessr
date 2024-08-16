import { East, North, NorthEast, NorthWest, South, SouthEast, SouthWest, West } from "@mui/icons-material"
import { CompassDirection } from "./geoutils"

export const getDirectionArrow = (direction?: CompassDirection) => {
    if (direction === "NNW" || direction === 'N' || direction === 'NNE') {
        return <North />
    } else if (direction === 'ENE' || direction === 'NE') {
        return <NorthEast />
    }
    else if (direction === 'E' || direction === 'ESE') {
        return <East />
    }
    else if (direction === 'SE') {
        return <SouthEast />
    }
    else if (direction === 'SSE' || direction === 'S' || direction === 'SSW') {
        return <South />
    }
    else if (direction === 'SW' || direction === 'WSW') {
        return <SouthWest />
    }
    else if (direction === 'W' || direction === 'WNW') {
        return <West />
    }
    else if (direction === 'NW') {
        return <NorthWest />
    }
}

export const getDirectionArrowString = (direction?: CompassDirection): string => {
    if (direction === "NNW" || direction === 'N' || direction === 'NNE') {
        return "↑"
    } else if (direction === 'ENE' || direction === 'NE') {
        return "↗"
    }
    else if (direction === 'E' || direction === 'ESE') {
        return "→"
    }
    else if (direction === 'SE') {
        return "↘"
    }
    else if (direction === 'SSE' || direction === 'S' || direction === 'SSW') {
        return "↓"
    }
    else if (direction === 'SW' || direction === 'WSW') {
        return "↙"
    }
    else if (direction === 'W' || direction === 'WNW') {
        return "←"
    }
    else if (direction === 'NW') {
        return "↖"
    }
    return ""
}