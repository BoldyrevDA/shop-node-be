import AWS from 'aws-sdk-mock';
import { db } from 'db'
import {catalogBatchProcess} from "handlers/catalogBatchProcess";
import {ValidationError} from "utils/validators/validation-error";

jest.mock('db', () => ({
    db: {
        getClient: () => ({
            end: jest.fn(),
            query: jest.fn(() => ({ rows: {} })),
        })
    }
}));

const returnedMessage = 'message';
const product = { title: 'title', price: 1, count: 1 };
const invalidProduct = { name: 'name', price: 1 };

AWS.mock('SNS', 'publish', returnedMessage);

describe('catalogBatchProcess', () => {
    it('should receive validation error', async () => {
        const MOCK_EVENT: any = {
            Records: [
                { body: JSON.stringify(product) },
                { body: JSON.stringify(invalidProduct) }
            ],
        }

        let error;
        try {
           await catalogBatchProcess(MOCK_EVENT);
        } catch (e) {
           error = e;
        }

        expect(error).toBeInstanceOf(ValidationError);
    })

    it('should receive syntax error', async () => {
        const MOCK_EVENT: any = {
            Records: [
                { body: 'Hi! I am not json' }
            ],
        }

        let error;
        try {
            await catalogBatchProcess(MOCK_EVENT);
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(SyntaxError);
    })

    it('should publish products', async () => {
        const MOCK_EVENT: any = {
            Records: [
                { body: JSON.stringify(product) }
            ],
        }

        const result = await catalogBatchProcess(MOCK_EVENT);

        expect(result).toBe(returnedMessage);
    })
})
