import cdk = require ('@aws-cdk/core');
import s3 = require ('@aws-cdk/aws-s3');
import { Bucket } from '@aws-cdk/aws-s3';
import { RemovalPolicy, Duration } from '@aws-cdk/core';


export class AppInfrastructure extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      // The code that defines your stack goes here
const LogBucket = new Bucket(this, 'LogBucket', {
    versioned: false,
    removalPolicy: RemovalPolicy.RETAIN,
    lifecycleRules:[
        {
            id: '10-YearRetainLogs',
            enabled: true,
            expiration: Duration.days(3653),
        },
    ],
    
    
})
const CfnLogBucket = LogBucket.node.defaultChild as s3.CfnBucket;

CfnLogBucket.accessControl = "LogDeliveryWrite";





}}
