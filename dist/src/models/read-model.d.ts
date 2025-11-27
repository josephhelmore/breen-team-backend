export declare const readUsers: () => Promise<{
    user_id: number;
    username: string;
    created_on: Date;
}[]>;
export declare const readUser: (user_id: number) => Promise<{
    user_id: number;
    username: string;
    created_on: Date;
}[]>;
export declare const readScores: (page: number) => Promise<{
    scores: {
        score_id: number;
        score: number;
        user_id: number;
        username: string;
        game_id: number;
        created_on: Date;
    }[] | undefined;
    page: number;
}>;
//# sourceMappingURL=read-model.d.ts.map