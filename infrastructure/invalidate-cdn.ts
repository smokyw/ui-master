import { CloudFront } from 'aws-sdk';
import { snsWrapper, SnsSignature } from '@manwaring/lambda-wrapper';

const cloudFront = new CloudFront({ apiVersion: '2016-11-25' });

export const handler = snsWrapper(async ({ event, success, error }: SnsSignature) => {
  try {
    console.info('Received SNS event', event);
    if (process.env.CDN) {
      await invalidateCDN();
    }
    success('Successfully invalidated CDN');
  } catch (err) {
    error(err);
  }
});

const invalidateCDN = () => {
  const params = {
    DistributionId: process.env.CDN,
    InvalidationBatch: {
      CallerReference: new Date().getTime().toString(),
      Paths: {
        Quantity: 2,
        Items: ['/index.html', '/assets*']
      }
    }
  };
  console.info('Invalidating CDN with params', params);
  return cloudFront.createInvalidation(params).promise();
};
