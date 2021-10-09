import { ConfigFactory, ConfigObject } from '@nestjs/config';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { readFileSync } from 'fs';

export const configFilepath = {
  apiClient: './environments/api-client/env.yaml',
  apiAccounts: './environments/api-accounts/env.yaml',
  apiAuth: './environments/api-auth/env.yaml',
};

export const readConfigFile = (
  filepath: string,
): ConfigFactory<ConfigObject> => {
  const path = join(process.cwd(), filepath);
  return yaml.load(readFileSync(path, 'utf-8')) as ConfigFactory<ConfigObject>;
};

export const apiClientConfig = readConfigFile(configFilepath.apiClient);
export const apiAccountsConfig = readConfigFile(configFilepath.apiAccounts);
export const apiAuthConfig = readConfigFile(configFilepath.apiAuth);
