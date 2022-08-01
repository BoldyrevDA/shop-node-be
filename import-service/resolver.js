module.exports = (path, options) => {
    // Call the defaultResolver, so we leverage its cache, error handling, etc.
    let result;
    try {
        result = options.defaultResolver(path, options)
    } catch (e) {
        // for using @types packages
        result = options.defaultResolver('@types/' + path, options);
    }

    return result;
};
