export declare const createUser: (username: string) => Promise<{
    user_id: number;
    username: string;
    created_on: Date;
}[]>;
export declare const createScore: (score: number, user_id: number, username: string, game_id: number) => Promise<{
    game_id: number;
    score_id: number;
    score: number;
    user_id: number;
    username: string;
    created_on: Date;
}[]>;
//# sourceMappingURL=create-model.d.ts.map