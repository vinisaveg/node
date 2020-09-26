import redis, { RedisClient } from "redis";
import JWTR from "jwt-redis";

const redisClient: RedisClient = redis.createClient();

const jwtr: JWTR = new JWTR(redisClient);

const secret: string = "secret";
const jti: string = "test";
const payload: { jti: string } = { jti };

jwtr
  .sign(payload, secret, { expiresIn: 5 })
  .then(async (token) => {
    console.log(token);

    const result = await jwtr.verify(token, secret);

    console.log(result);
    return token;
  })
  .then((token) => {
    setTimeout(async () => {
      const expiredResult = await jwtr.verify(token, secret);
    }, 6000);
  })
  .catch((error) => {
    console.log(error);
  });
60 * 24;
