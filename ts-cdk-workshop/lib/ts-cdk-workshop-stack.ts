import {CfnOutput, Stack, StackProps} from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import {Construct} from 'constructs';
import {HitCounter} from "./hitcounter";
import {TableViewer} from "cdk-dynamo-table-viewer";

export class TsCdkWorkshopStack extends Stack {
    public readonly hcViewerUrl: CfnOutput;
    public readonly hcEndpoint: CfnOutput;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const hello = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler'
        });

        const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
            downstream: hello
        });

        const gateway = new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: helloWithCounter.handler
        });

        const tv = new TableViewer(this, 'ViewHitCounter', {
            title: 'Hello Hits',
            table: helloWithCounter.table
        });

        this.hcEndpoint = new CfnOutput(this, 'GatewayUrl', {
            value: gateway.url
        })

        this.hcEndpoint = new CfnOutput(this, 'TableViewerUrl', {
            value: tv.endpoint
        });
    }
}
