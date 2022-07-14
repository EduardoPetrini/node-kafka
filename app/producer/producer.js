
const Kafka = require('node-rdkafka');

async function start(topic, message) {
  const producer = await createProducer();

  console.log('I am ready to send the data');

  producer.setPollInterval(100);

  return sendMessage(producer, topic, message);
};

function createProducer() {
  const producer = new Kafka.Producer({
    'metadata.broker.list': 'localhost:29092',
    'dr_cb': true
  });

  return new Promise((resolve, reject) => {
    producer
      .on('ready', () => {
        console.log('Ready!');
        resolve(producer);
      })
      .on('event.error', reject)
      .on('disconnect', () => console.log('Disconnected'))
      .on('delivery-report', () => console.log('Sending..'))
    producer.connect();
  });
}

function sendMessage(producer, topic, message) {
  console.log('I am sending')
  return producer.produce(topic, -1, Buffer.from(message), null, Date.now(), (a) => {
    console.log('went?');
    console.log(a);
  });
}

const argv = require('minimist')(process.argv.slice(2));

const topic = argv.topic || 'topic1';
const message = argv.message || 'Hello World!';

console.log({ topic, message });

start(topic, message)
  .then(() => {
    console.log('Sent!');
    process.exit(0);
  })
  .catch(err => {
    console.log(`Error when create a producer ${err.message}`);
    console.log(err);
    process.exit(1);
  });