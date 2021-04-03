// Relation structure for mock data interface.
export interface IRelationItem {
    from: string | string[];
    to: string | string[];
}

// Relation between entities type.
type TRelation<T> = {
    [key in keyof Partial<T>]: IRelationItem[];
};

// Mock data interface.
export interface IMock<T> {
    order: number;
    repository: any;
    syncData: T[];
    relations?: TRelation<T>;
}
