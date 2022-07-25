# Product-service

Service for working with products

## Available Scripts

### `npm run start`
Starts the project local in dev mode with swagger

### `npm run deploy`
Deploy configured in `serverless.yml` stack via CloudFormation.

### `npm run generate-swagger`
Generate the swagger file without deploying the application

### `npm run test`
Run all tests.

For watching files for changes and rerun tests related to changed files use `npm run test:watch`



## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-typescript to stage dev (us-east-1)

✔ Service deployed to stack aws-node-typescript-dev (112s)

functions:
  hello: aws-node-typescript-dev-hello (806 B)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function functionName
```

Which should result in response similar to the following:

```json
{
    "message": "Go Serverless v3! Your function executed successfully!",
    "input": {}
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function functionName
```
