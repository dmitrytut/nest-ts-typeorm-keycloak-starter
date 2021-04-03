/**
 * DB entity interface.
 */
export interface IEntity {
    /** Identifier. */
    id?: string;
    /** Title. */
    title?: string;
    /** Description. */
    description?: string;
    /** Order in enumerable entities. */
    order?: number;
    /** Creation time. */
    createdAt?: string;
    /** Updating time. */
    updatedAt?: string;
}
