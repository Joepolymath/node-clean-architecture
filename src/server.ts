import { IServer } from './interfaces/server.types';
import { init as expressInit } from './presentation/http/express/index';
import { init as fastifyInit } from './presentation/http/fastify';

const serverFramework: IServer = {
  init: expressInit,
};

let services;
function bootstrap(serverChoice: IServer, services: any) {
  const app = serverChoice.init(services);

  let server;
  const PORT = 5008;
  server = app.listen(PORT, () => {
    console.log(`Server spun up on ${PORT}`);
  });
}

bootstrap(serverFramework, services);
