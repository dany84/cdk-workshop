import * as cdk from 'aws-cdk-lib';
import {HitCounter} from "../lib/hitcounter";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {Capture, Template} from "aws-cdk-lib/assertions";

test('DynamoDB table created', () => {
    const stack = new cdk.Stack();

    // when
    new HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFuncion', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hello.handler',
            code: lambda.Code.fromAsset('lambda')
        })
    });

    // then
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::DynamoDB::Table', 1);
});

test('Lambda has env variables', () => {
    const stack = new cdk.Stack();

    // when
    new HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hello.handler',
            code: lambda.Code.fromAsset('lambda')
        })
    });

    // then
    const template = Template.fromStack(stack);
    const envCapture = new Capture();
    template.hasResourceProperties('AWS::Lambda::Function', {
        Environment: envCapture,
    });

    expect(envCapture.asObject()).toEqual({
        Variables: {
            DOWNSTREAM_FUNCTION_NAME: {
                Ref: 'TestFunction22AD90FC'
            },
            HITS_TABLE_NAME: {
                Ref: 'MyTestConstructHits24A357F0'
            }
        }
    })
});

test('DynamoDb Table with encryptation', () => {
    const stack = new cdk.Stack();

    // when
    new HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hello.handler',
            code: lambda.Code.fromAsset('lambda')
        })
    });

    // then
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::DynamoDB::Table', {
        SSESpecification: {SSEEnabled: true}
    });
});