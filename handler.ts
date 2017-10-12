import { Lambda } from 'aws-sdk';

const lambda = new Lambda({
  apiVersion: '2015-03-31',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const send_all = async () => {
  for (var i = 0; i < 10000; i++) {
    lambda.invoke({
      FunctionName: 'redox-10x_mllp-source',
      InvocationType: 'Event',
      Payload: JSON.stringify({
        port: 10012,
        host: '10.255.0.11',
        dataFormat: 'HL7v2',
        dataModel: 'PatientAdmin',
        eventType: 'Arrival',
        size: 'medium',
        testMessage: false
      })
    });
  }
}

export const highwater_10x = (event, context, callback) => {
  send_all()
  callback();
};