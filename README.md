# Kafka Nodejs 
This project uses [node-rdkafka](https://www.npmjs.com/package/node-rdkafka) to produce and consume messages through the Kafka Server running on Docker container.
The `docker-compose.yml` file has the instructions to configure and run a Kafka Server on containers.
It is mandatory to have Docker and docker-compose installed.

## Kafka Server
Everything needed to run the Kafka Server is described in the `docker-compose.yml` file. It needs to have zookeeper image and kafka itself.
In order to run the Kafka server, you need to run the following command:
```
$ docker-compose up -d
``` 
Kafka will be running on the port 29092 and the zookeeper will be running on the port 2181. Both running on the container bridge network.

## Producer
The producer folder contains a simple producer that sends messages to a topic `topic1`. There is a Dockerfile with the instructions to build the producer.
To build the producer just run the following command inside the producer folder:
```
$ docker build -t kafka-producer .
```	

In order to run the producer, you need to use the `host` network to avoid connection issues. Run the following command to that end:
```
$ docker run --net host --name kafka-producer kafka-producer
```
And then the producer should run a single message to the topic `topic1`.

## Consumer
The consumer folder contains the consumer that will be listening to messages from the topic `topic1`. There is a Dockerfile with the instructions to build the consumer.
To build the consumer just run the following command inside the consumer folder:
```
$ docker build -t kafka-consumer .
```	

In order to run the consumer, you need to use the `host` network to avoid connection issues. Run the following command to that end:
```
$ docker run --net host --name kafka-consumer kafka-consumer
```
And then the consumer will be listening to messages from the topic `topic1`.