import { SQS } from 'aws-sdk';

export class SQSProvider<T> {
    constructor(private readonly sqs: SQS, private readonly queueUrl: string, public batchSize: number = 10) {}

    async sendMessages(messages: any, idSelector?: (message: any) => string) {
        const batches = this.splitToBatches(messages, this.batchSize);

        const batchesResult = await Promise.all(
            batches.map((batch) =>
                this.sqs
                    .sendMessageBatch({
                        QueueUrl: this.queueUrl,
                        Entries: batch.map((message, i) => ({
                            Id: idSelector ? idSelector(message) : String(i),
                            MessageBody: JSON.stringify(message),
                        })),
                    })
                    .promise()
            )
        );

        const failedMessages = batchesResult
            .flatMap((batchResult) => batchResult.Failed)
            .map(({ Id }) => Id);

        if (failedMessages.length) {
            throw new Error(`Failed to send messages to SQS: ${failedMessages}`);
        }

        return batchesResult;
    }

    private splitToBatches(messages: any[], batchSize: number) {
        const batches = [];
        const batchesCount = Math.ceil(messages.length / batchSize);

        for (let i = 0; i < batchesCount; i++) {
            const startIndex = i * batchSize;
            batches.push(messages.slice(startIndex, startIndex + batchSize));
        }

        return batches;
    }
}
