#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
// import { CdkStack } from '../lib/cdk-stack';
import { AppInfrastructure } from '../lib/app-infrastructure';
import { StaticHost } from '../lib/static-host';

const app = new cdk.App();
// new CdkStack(app, 'CdkStack');
const InfrastructureStack = new AppInfrastructure(app, 'AppInfrastructure');
const StaticHostApp = new StaticHost(app, 'StaticHost');
