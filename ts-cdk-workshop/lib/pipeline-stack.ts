import * as cdk from 'aws-cdk-lib';
import {Construct} from "constructs";
import {CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";
import {WorkshopPipelineStage} from "./pipeline-stage";

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
        });

        const deploy = new WorkshopPipelineStage(this, 'Deploy');
        const deployStage = pipeline.addStage(deploy);

        /*
        deployStage.addPost(
            new CodeBuildStep('TestViewerEndpoint', {
                projectName: 'TestViewerEndpoint',
                envFromCfnOutputs: {
                    ENDPOINT_URL: deploy.hcViewerUrl
                },
                commands:[
                    'curl -Ssf $ENDPOINT_URL'
                ]
            }),
            new CodeBuildStep('TestAPIGatewayEndpoint', {
                projectName: 'TestAPIGatewayEndpoint',
                envFromCfnOutputs: {
                    ENDPOINT_URL: deploy.hcEndpoint
                },
                commands:[
                    'curl -Ssf $ENDPOINT_URL',
                    'curl -Ssf $ENDPOINT_URL/hello',
                    'curl -Ssf $ENDPOINT_URL/test',
                ]
            })
        );
        */
    }
}