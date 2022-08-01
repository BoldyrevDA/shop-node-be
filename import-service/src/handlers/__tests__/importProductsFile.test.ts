import AWS from 'aws-sdk-mock';
import { HttpCode } from "utils/http";
import { importProductsFile } from "handlers/importProductsFile";

const mockedPresignedUrl = 'test-url'
AWS.mock('S3', 'getSignedUrl', mockedPresignedUrl);

describe('importProductsFile', () => {
    it('should return empty parameter error', async () => {
        const MOCK_EVENT: any = {
            queryStringParameters: {}
        }

        const response = await importProductsFile(MOCK_EVENT);
        const responseBody = JSON.parse(response.body);

        expect(response?.statusCode).toEqual(HttpCode.BAD_REQUEST);
        expect(responseBody?.message).toBeDefined();
    })

    it('should return incorrect parameter error', async () => {
        const MOCK_EVENT: any = {
            queryStringParameters: {
                name: 'stri~>?ng??//'
            }
        }

        const response = await importProductsFile(MOCK_EVENT);
        const responseBody = JSON.parse(response.body);

        expect(response?.statusCode).toEqual(HttpCode.BAD_REQUEST);
        expect(responseBody?.message).toBeDefined();
    })

    it('should return success response', async () => {
        const MOCK_EVENT: any = {
            queryStringParameters: {
                name: 'file.csv'
            }
        }

        const response = await importProductsFile(MOCK_EVENT);
        expect(response?.statusCode).toEqual(HttpCode.OK);
    })
})
