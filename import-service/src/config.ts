export default {
    JEST: process.env.NODE_ENV === 'test',
    BUCKET: process.env.BUCKET,
    REGION: process.env.REGION,
    UPLOADED_CATALOG: process.env.UPLOADED_CATALOG,
    PARSED_CATALOG: process.env.PARSED_CATALOG,
    SQS_URL: process.env.SQS_URL,
}
