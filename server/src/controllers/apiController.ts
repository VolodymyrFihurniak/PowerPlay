class APIController {
  public getAPIVersion = () => {
    return JSON.stringify({ version: process.env.npm_package_version });
  };
}

export { APIController };
