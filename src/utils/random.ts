import Srand from 'seeded-rand'

export const getDailyRandomNumber = () => {
    const now = new Date();
    return `${now.getDate()}${now.getMonth()}${now.getFullYear()}`
}

export const seedRand = (seed: string | number, range: number[]): number => {
    const LOWER_RANGE = range[0];
    const UPPER_RANGE = range[1];

    const srand = new Srand(seed);
    return srand.intInRange(LOWER_RANGE, UPPER_RANGE);
}