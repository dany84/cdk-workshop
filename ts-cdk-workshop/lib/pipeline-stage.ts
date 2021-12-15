import {CfnOutput, Stage, StageProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {TsCdkWorkshopStack} from "./ts-cdk-workshop-stack";

export class WorkshopPipelineStage extends Stage {
    public readonly hcViewerUrl: CfnOutput;
    public readonly hcEndpoint: CfnOutput;

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const service = new TsCdkWorkshopStack(this, 'WebService');

        this.hcEndpoint = service.hcEndpoint;
        this.hcViewerUrl = service.hcViewerUrl;
    }
}