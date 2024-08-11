import Srand from 'seeded-rand'

export const getDailyRandomNumber = () => {
    const now = new Date();
    const tz_epoch_ms = now.valueOf() - now.getTimezoneOffset() * 60 * 1000;
    const epoch_days = tz_epoch_ms / (24 * 60 * 60 * 1000);
    return epoch_days
}

export const seedRand = (seed: string | number, range: number[]): number => {
    const LOWER_RANGE = range[0];
    const UPPER_RANGE = range[1];

    const srand = new Srand(seed);
    return srand.intInRange(LOWER_RANGE, UPPER_RANGE);
}