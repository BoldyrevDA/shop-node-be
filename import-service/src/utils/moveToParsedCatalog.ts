import config from "config";

export async function moveToParsedCatalog(s3, key) {
    const {
        BUCKET,
        UPLOADED_CATALOG,
        PARSED_CATALOG
    } = config;

    await s3.copyObject({
        Bucket: BUCKET,
        CopySource: `${BUCKET}/${key}`,
        Key: key.replace(UPLOADED_CATALOG, PARSED_CATALOG),
    }).promise()

    return s3.deleteObject({
        Bucket: BUCKET,
        Key: key
    }).promise()
}
