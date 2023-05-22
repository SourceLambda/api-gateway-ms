var amqp = require('amqplib/callback_api')

function runProducer(message) {

    var host = 'host.docker.internal'

    amqp.connect('amqp://'+ host, function(err, connection) {
        if(err) throw err

        connection.createChannel((err1, channel) => {

            if(err1) throw err1
            
            //TODO: change queue name as an enviroment variable
            var queueName = 'indexer'
            channel.assertQueue(queueName, {durable: false})

            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
            console.log(" [MQ] Sent %s", JSON.stringify(message))

        })
        setTimeout(() =>{
            connection.close()
        },500)

    })
}

export default runProducer