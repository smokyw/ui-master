import { SNS } from 'aws-sdk';
import { wrapper, WrapperSignature } from '@manwaring/lambda-wrapper';

const sns = new SNS({ apiVersion: '2010-03-31' });

export const handler = wrapper(async ({ event, success, error }: WrapperSignature) => {
  try {
    console.info('Received bucket event', JSON.stringify(event));
    await publishSiteUpdatedEvent();
    success();
  } catch (err) {
    error(err);
  }
});

const publishSiteUpdatedEvent = () => {
  const message = 'Site bucket was updated';
  const params = {
    Message: JSON.stringify({ message }),
    TopicArn: process.env.SITE_UPDATED_SNS
  };
  console.info('Publishing to bucket event sns with params', params);
  return sns.publish(params).promise();
};
