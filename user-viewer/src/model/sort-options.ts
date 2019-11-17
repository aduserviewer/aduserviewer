/**
 * Represents sorting behavior to be applied to a dataset. 'attribute'
 * 'specifies' the attribute to sort on, and 'direction' specifies
 * whether to sort ascending or descending on the dataset.
 */
export interface SortOptions {
    attribute: string;
    direction: "asc" | "desc";
}
