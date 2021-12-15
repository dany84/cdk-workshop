#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TsCdkWorkshopStack } from '../lib/ts-cdk-workshop-stack';
import {WorkshopPipelineStack} from "../lib/pipeline-stack";

const app = new cdk.App();
// new TsCdkWorkshopStack(app, 'TsCdkWorkshopStack');
new WorkshopPipelineStack(app, 'CdkWorkshopPipelineStack');
