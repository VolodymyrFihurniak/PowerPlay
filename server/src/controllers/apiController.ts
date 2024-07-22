class APIController {
  public getAPIVersion = () => JSON.stringify({ version: process.env.npm_package_version });
}

export { APIController };
