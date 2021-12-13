#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TsCdkWorkshopStack } from '../lib/ts-cdk-workshop-stack';

const app = new cdk.App();
new TsCdkWorkshopStack(app, 'TsCdkWorkshopStack');
