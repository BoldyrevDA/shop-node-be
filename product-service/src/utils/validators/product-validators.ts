import {ProductParams} from "types/api-types";

export function validateProductParams(productParams: ProductParams) {
    const { title, count } = productParams;

    const requiredFields = [
        count === undefined ? "count" : '',
        title === undefined ? "title" : '',
    ].filter(Boolean);

    if (requiredFields.length) {
        return `fields [${requiredFields.join(', ')}] is required`;
    }

    if (!Number.isInteger(+count) || count < 0) {
        return '"count" must be positive integer number';
    }

    return null;
}
