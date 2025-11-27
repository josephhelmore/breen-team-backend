export type ScoresType = {
    score: number;
    user_id: number;
    username: string;
    game_id: number;
}[];
export type usersType = {
    username: string;
}[];
export type gamesType = {
    name: string;
}[];
export declare const seed: ({ usersData, scoresData, gamesData }: {
    scoresData: ScoresType;
    usersData: usersType;
    gamesData: gamesType;
}) => Promise<void>;
//# sourceMappingURL=seed.d.ts.map