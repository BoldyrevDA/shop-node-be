export function validateFileName(filename) {
    const filenameRegex = /^[a-z0-9_!.()*'-]+.csv$/i;

    if (filename === null || filename === undefined) {
        return '"name" query parameter is required'
    }

    if (!filenameRegex.test(filename)) {
        return 'Incorrect "name" query parameter';
    }

    return null;
}
