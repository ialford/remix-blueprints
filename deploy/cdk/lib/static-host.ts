import cdk = require ('@aws-cdk/core');
import s3 = require ('@aws-cdk/aws-s3');
import { CloudFrontWebDistribution, CfnCloudFrontOriginAccessIdentity } from '@aws-cdk/aws-cloudfront';
import { Bucket } from '@aws-cdk/aws-s3';
import { Fn } from '@aws-cdk/core';

export class StaticHost extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      // The code that defines your stack goes here

    
    const SiteBucket = new Bucket(this, 'HostBucket');

    const CfnSiteBucket = SiteBucket.node.defaultChild as s3.CfnBucket;

    const AccessIdentity = new CfnCloudFrontOriginAccessIdentity(this, 'OriginIdentity',
    {
        cloudFrontOriginAccessIdentityConfig:
            {
                comment: Fn.sub("Static assets in ${AWS::StackName}")
            }
        
    });

    const SiteCloudFront = new CloudFrontWebDistribution(this, 'SiteCloudFront', {
        originConfigs: [
            {
                s3OriginSource: {
                    s3BucketSource: SiteBucket,
                },
                behaviors: [
                    { isDefaultBehavior: true }
                ]
            }
        ],

    });

    }}