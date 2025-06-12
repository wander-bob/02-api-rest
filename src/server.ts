import { env } from './env';
import { app } from './app';

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0'
  })
  .then(() => {
    console.log(`server running on port ${env.PORT}`);
  });
