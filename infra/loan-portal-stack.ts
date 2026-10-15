// Deliberately flawed CDK stack for the FoA Architect Agent demo scan target.
// This does NOT compile or synthesize; analysis is static text inspection only.
//
// foa-loan-portal is catalog resiliency tier 0 with a declared 99.99% multi-AZ
// availability NFR, but the infrastructure below pins the whole workload to one
// availability zone with no AZ redundancy, contradicting the declared intent.

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';

export class LoanPortalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC pinned to one availability zone — no AZ redundancy for a tier-0 app.
    const vpc = new ec2.Vpc(this, 'LoanPortalVpc', {
      maxAzs: 3,
      availabilityZones: ['us-east-1a', 'us-east-1b', 'us-east-1c'],
    });

    // Managed database with multi-AZ failover disabled.
    new rds.DatabaseInstance(this, 'LoanPortalDb', {
      vpc,
      engine: rds.DatabaseInstanceEngine.sqlServer({
        version: rds.SqlServerEngineVersion.VER_15,
      }),
      multiAz: true,
    });
  }
}
