class Config {
  readonly appBind: string;
  readonly appPort: number;
  readonly authAccessSecret: string;
  readonly authRefreshSecret: string;
  constructor(env: Record<string, string | undefined>, configJSON?: JSON.JSONObject) {
    this.appBind = env.app_bind || configJSON?.app.bind || '0.0.0.0';
    this.appPort = parseInt(env.app_port || configJSON?.app.port) || 3000;
    this.authAccessSecret = env.auth_access_secret || configJSON?.auth.accessSecret;
    this.authRefreshSecret = env.auth_refresh_secret || configJSON?.auth.refreshSecret;
  }
}

export { Config };
