declare module "seeded-rand" {
    class Srand {
        constructor(seed: string | number);
        intInRange(min: number, max: number): number;
        // ... other methods
    }

    export = foo;
}