import * as geolib from 'geolib'
import { GeolibInputCoordinates } from 'geolib/es/types'

export type CompassDirection = "S" | "W" | "NNE" | "NE" | "ENE" | "E" | "ESE" | "SE" | "SSE" | "SSW" | "SW" | "WSW" | "WNW" | "NW" | "NNW" | "N";

interface DistanceDirection {
    distanceMeters: number
    compassDirection: CompassDirection
}

export const getDistanceAndDirection = (aLat: number, aLon: number, bLat: number, bLon: number): DistanceDirection => {

    const a: GeolibInputCoordinates = { latitude: aLat, longitude: aLon }
    const b: GeolibInputCoordinates = { latitude: bLat, longitude: bLon }

    return {
        distanceMeters: geolib.getPreciseDistance(a, b),
        compassDirection: geolib.getCompassDirection(a, b)
    }

}
