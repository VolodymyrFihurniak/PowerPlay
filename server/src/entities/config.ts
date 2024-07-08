class Config {
  readonly appBind: string;
  readonly appPort: number;
  constructor(env: Record<string, string | undefined>) {
    this.appBind = env.bind || 'localhost';
    this.appPort = parseInt(env.port!) || 3000;
  }
}

export default Config;
