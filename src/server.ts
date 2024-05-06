import { IServer } from './interfaces/server.types';
import { init as expressInit } from './presentation/http/express/index';
import { init as fastifyInit } from './presentation/http/fastify';
import signals from './signals';

let services;

class App implements IServer {
  private server: any;
  private readonly PORT = 5008;
  constructor(readonly init = expressInit) {}

  public bootstrap() {
    const app = this.init(5);
    this.server = app.listen(this.PORT, () => {
      console.log(`Server spun up on ${this.PORT}`);
    });
  }

  shutdown() {
    signals.init(async () => {
      await this.server.close();
    });
  }
}

const serverInstance = new App();
serverInstance.bootstrap();
