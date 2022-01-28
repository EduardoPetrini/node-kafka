const Kafka = require('node-rdkafka');

async function start() {
  const consumer = await createConsumer();

  consumer.subscribe(['topic1']);
  consumer.consume();

  process.on('SIGINT', () => {
    console.log('Disconnecting');
    consumer.disconnect();
  });
}

function createConsumer() {
  const consumer = new Kafka.KafkaConsumer({
    //'debug': 'all',
    'metadata.broker.list': 'localhost:29092',
    'group.id': 'my-group',
  }, {
    'auto.offset.reset': 'earliest'
  });

  return new Promise((resolve, reject) => {
    consumer
      .on('ready', (a) => {
        console.log('Ready');
        console.log(a);
        return resolve(consumer);
      })
      .on('data', onData)
      .on('event.error', reject)
      .on('disconnect', () => console.log('Disconnected'))
      .on('event.log', (log) => console.log(log));

    consumer.connect();
  });
}

function onData({ key, value, partition, offset }) {
  console.log(`Received message from ${key} with value ${value} at offset ${offset}`);
}

start()
  .catch(err => {
    console.log(`Error: ${err.message}`);
    console.log(err);
    process.exit(1);
  });