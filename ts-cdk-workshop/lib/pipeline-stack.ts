import * as cdk from 'aws-cdk-lib';
import {Construct} from "constructs";
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";

export class WorkshopPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'WorkshopPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.connection('dany84/cdk-workshop', 'main', {
                    connectionArn: 'arn:aws:codestar-connections:sa-east-1:383827279863:connection/2fe91f14-1847-4ee5-a8fd-c0e859a7b05a'
                }),
                primaryOutputDirectory: 'ts-cdk-workshop/cdk.out',
                commands: [
                    'cd ts-cdk-workshop',
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ]
            })
        })
    }
}