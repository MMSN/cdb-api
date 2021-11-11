import TokenGeneratorService from '../src/shared/services/token-generator.service';

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getParams = (args: string[]): any => {
  const params = args.slice(2);
  let appName = '';
  let env = '';

  params.forEach((param) => {
    if (param.startsWith('--app-name=')) {
      [, appName] = param.split('--app-name=');
    }

    if (param.startsWith('--env=')) {
      [, env] = param.split('--env=');
    }
  });

  if (!appName.length) {
    throw Error('Error: missing --app-name argument');
  }

  if (!env.length) {
    throw Error('Error: missing --env argument');
  }

  return { appName, env };
};

const createToken = async (): Promise<string> => {
  const { appName, env } = getParams(process.argv);
  return new TokenGeneratorService().generate(appName, env);
};

createToken()
  .then((token) => console.log(`Token created successfully. Token: ${token}`))
  .catch((err) => console.error(err.message));
