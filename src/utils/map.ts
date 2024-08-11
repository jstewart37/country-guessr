import { OPENSTREETMAP_BASEURL } from "../constants";
import { Country } from "../guesser";

export const getMapLink = (country: Country) => {
    return `${OPENSTREETMAP_BASEURL}${country["Latitude (average)"]}/${country["Longitude (average)"]}`
}