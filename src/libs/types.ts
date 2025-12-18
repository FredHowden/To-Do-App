export type TaskInfo = {
    id: number;
    category_id: number;
    task: string;
    completed: boolean;
    timeMade: Date;
};

export type CategoryInfo = {
    id: number;
    name: string;
    sortingOrder: "earliest_to_latest" | "latest_to_earliest";
};