# Loan Portal — High-Level Design

## Overview
The loan portal lets customers submit and track loan applications. It is a
customer-facing service in the lending platform.

## Service classification
- Service name: foa-loan-portal
- Resiliency tier: 0 (business-critical)
- Availability target: 99.99%
- Deployment: multi-AZ, with automatic failover for compute and data tiers

## Architecture intent
The portal MUST remain available during the loss of a single availability zone.
Both the application tier and the database MUST be deployed across at least two
availability zones, and the database MUST have multi-AZ failover enabled so a
zone failure does not cause an outage or data unavailability.

## Data
Application and loan records are stored in a managed relational database. The
database MUST be highly available and MUST survive the loss of one AZ without
manual intervention.
