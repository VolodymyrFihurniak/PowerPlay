class Config {
  readonly appBind: string;
  readonly appPort: number;
  readonly appPathTLSCSR: string;
  readonly appPathTLSKey: string;
  readonly appPathTLSPem: string;
  readonly authAccessSecret: string;
  readonly authRefreshSecret: string;
  readonly authAccessExp: string;
  readonly authRefreshExp: string;
  constructor(env: Record<string, string | undefined>, configJSON?: JSON.JSONObject) {
    this.appBind = env.app_bind || configJSON?.app.bind || '0.0.0.0';
    this.appPort = parseInt(env.app_port || configJSON?.app.port) || 3000;
    this.appPathTLSCSR = env.app_path_tls_csr || configJSON?.app.pathTLSCSR;
    this.appPathTLSKey = env.app_path_tls_key || configJSON?.app.pathTLSKey;
    this.appPathTLSPem = env.app_path_tls_pem || configJSON?.app.pathTLSPem;
    this.authAccessSecret = env.auth_access_secret || configJSON?.auth.accessSecret;
    this.authRefreshSecret = env.auth_refresh_secret || configJSON?.auth.refreshSecret;
    this.authAccessExp = env.auth_access_exp || configJSON?.auth.accessExp || '15m';
    this.authRefreshExp = env.auth_refresh_exp || configJSON?.auth.refreshExp || '7d';
  }
}

export { Config };
