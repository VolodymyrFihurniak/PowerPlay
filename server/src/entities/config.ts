class Config {
  readonly appBind: string;
  readonly appPort: number;
  constructor(env: Record<string, string | undefined>, configJSON?: JSON.JSONObject) {
    this.appBind = env.app_bind || configJSON?.app.bind || '0.0.0.0';
    this.appPort = parseInt(env.app_port || configJSON?.app.port) || 3000;
  }
}

export default Config;
