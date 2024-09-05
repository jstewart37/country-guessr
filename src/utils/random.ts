import Srand from 'seeded-rand'

const today = new Date()
const currentMonthSeed = today.getMonth() + today.getFullYear()
const srand = new Srand(currentMonthSeed);

export const generateUniqueRandomNumbersForDays = (min: number, max: number) => {

    // genrate 32 days of random numbers
    const days = 32;
    const numbers: number[] = [];
    const randomNumbers: number[] = [];

    for (let i = min; i <= max; i++) {
        numbers.push(i);
    }

    while (randomNumbers.length <= days) {
        const randomIndex = Math.floor(srand.random() * numbers.length);
        const randomNumber = numbers[randomIndex];
        randomNumbers.push(randomNumber);
        numbers.splice(randomIndex, 1); // remove number from the list of avaliable numbers
    }

    return randomNumbers;
}

export const getTodaysCountryIdx = (min: number, max: number) => {
    // 0 index is for first of month, but for some reason it is always the same seeded random, so get date which starts at 1
    const dateInMonthIdx = today.getDate()
    console.log(generateUniqueRandomNumbersForDays(min, max))
    return generateUniqueRandomNumbersForDays(min, max)[dateInMonthIdx];

}