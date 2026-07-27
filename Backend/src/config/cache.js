const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
});



redis.on("connect", () => {
    console.log("Server is connected to Redis");
})


redis.on("error", (error) => {
    console.log("Error to connect Redis", error)
})

module.exports = redis;