package main

import (
	"context"
	"log"
	"time"
	amqp "github.com/rabbitmq/amqp091-go"
	"encoding/json"
)

func failOnError(err error, msg string) {
	if err != nil {
			log.Panicf("%s: %s", msg, err)
	}
}

func send(uuid1 string, prompt string, tags []string) {
	conn, err := amqp.Dial("amqp://guest:guest@rabbitmq:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
        "celery", // name
        true,         // durable
        false,        // delete when unused
        false,        // exclusive
        false,        // no-wait
        nil,          // arguments
	)
	failOnError(err, "Failed to declare a queue")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	task := map[string]interface{}{
		"task": "tasks.process",
		"args": []interface{}{uuid1, prompt, tags},
		"kwargs": map[string]interface{}{},
		"id": uuid1,
	}
	taskJson, err := json.Marshal(task)

	err = ch.PublishWithContext(ctx,
		"",           // exchange
		q.Name,       // routing key
		false,        // mandatory
		false,
		amqp.Publishing{
				DeliveryMode: amqp.Persistent,
				ContentType:  "application/json",
				Body:         taskJson,
		})
	failOnError(err, "Failed to publish a message")
	log.Printf(" [x] Sent %s", taskJson)

}