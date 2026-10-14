// Demo scan target for the FoA Architect Agent.
// Deliberately flawed: this stack is NOT meant to compile or deploy — it exists
// so the design-review agent can detect an intent-vs-infrastructure mismatch.
//
// The loan-portal service is resiliency tier 0 with a declared 99.99% multi-AZ
// availability target (see HLD.md), but the infrastructure below pins the whole
// workload to a single availability zone with no redundancy — contradicting the
// stated intent. The agent should flag this and propose a multi-AZ remediation.

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';

export class LoanPortalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC pinned to a single availability zone — no AZ redundancy for a tier-0 app.
    const vpc = new ec2.Vpc(this, 'LoanPortalVpc', {
      maxAzs: 1,
      availabilityZones: ['us-east-1a'],
    });

    // Primary database with multi-AZ failover disabled.
    new rds.DatabaseInstance(this, 'LoanPortalDb', {
      vpc,
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16,
      }),
      multiAz: false,
    });
  }
}
