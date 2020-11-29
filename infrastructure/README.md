TODO: add note about setting up in circle with santaswap-domain-info context
DOMAIN
DOMAIN_HOSTED_ZONE_ID

# Santa Swap infrastructure

This serverless application creates and manages infrastructure for the Santa Swap UI application. It is embedded in the UI application repository to facilitate deploying and removing everything together as a single unit.

# What it does

This project uses [Travis-CI](https://travis-ci.org/santaswap/ui) to automatically create new infrastructure whenever a new branch is created, and to update that infrastructure with each commit on the branch. To facilitate multiple branches in a shared AWS environment and on the single domain resources are namespaced with the first name of the commit author. The only exception to this is the site's www and naked domains, which drop the stage name in production

| Resource template                | Stage   | Final resource name              |
| -------------------------------- | ------- | -------------------------------- |
| {stage}.santaswap.io             | prod    | santaswap.io                     |
| {stage}.santaswap.io             | phillip | phillip.santaswap.io             |
| santaswap-ui-{stage}-bucketEvent | prod    | santaswap-ui-prod-bucketEvent    |
| santaswap-ui-{stage}-bucketEvent | phillip | santaswap-ui-phillip-bucketEvent |

See the [.travis.yml](https://github.com/santaswap/ui/blob/master/.travis.yml) and [.travis-deploy.sh](https://github.com/santaswap/ui/blob/master/.travis-deploy.sh) files for more information about how this has been configured.

# How the Lambda functions work

There are three Lambda functions deployed with this infrastructure to faciliate its management.

1. **Bucket event:** This function is triggered when the index.html file is updated in the S3 bucket and proceeds to invoke a bucket updated SNS topic
1. **Invalidate CDN:** This function is triggered by the SNS event and invalidates the CDN so that the new content can be cached and served
1. **Empty bucket:** This function is called when the generated CloudFormation stack is deleted, and empties the S3 site bucket so that it deletes successfully with the rest of the stack resources

# Architecture differences by stage

Because of the significant amount of time it takes to deploy a new CloudFront Distribution, this portion of the architecture (including a certificate from AWS Certificate Manager) is only deployed for production stages. In non-production stages the S3 bucket is configured for static website hosting, and the Route 53 route points directly to this rather than through a CloudFront Distribution.

# How to use it

This project is built with the [Serverless Framework](https://serverless.com/) - see their documentation for more about the tool and how to use it.

Two environment variables are used to configure the infrastructure apppropriately:

1. **DOMAIN:** The naked domain of the site (i.e. santaswap.io)
1. **DOMAIN_HOSTED_ZONE_ID:** The ID of the AWS Hosted Zone where the domain is hosted

# Production architecture overview

![odin - architecture overview](https://cloud.githubusercontent.com/assets/2955468/24730194/3514a6a0-1a30-11e7-8ced-77cd98251222.png)
