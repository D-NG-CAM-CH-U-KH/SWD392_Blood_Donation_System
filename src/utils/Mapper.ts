export function pickFields<S, K extends keyof S>(
    source: S,
    keys: readonly K[]
): Pick<S, K> {
    const result: Partial<Pick<S, K>> = {};

    keys.forEach((key) => {
        result[key] = source[key];
    });

    return result as Pick<S, K>;
}

export type Mapper<Source, Target> = (source: Source) => Target

//demo chua su dung