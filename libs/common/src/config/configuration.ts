import { ConfigFactory, ConfigObject, registerAs } from '@nestjs/config';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { readFileSync } from 'fs';
import {
  API_ACCOUNTS_CONFIG,
  API_AUTH_CONFIG,
  API_CLIENT_CONFIG,
} from '@app/common/config/config.const';

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

export const apiClientConfig = registerAs(API_CLIENT_CONFIG, () =>
  readConfigFile(configFilepath.apiClient),
);

export const apiAccountsConfig = registerAs(API_ACCOUNTS_CONFIG, () =>
  readConfigFile(configFilepath.apiAccounts),
);

export const apiAuthConfig = registerAs(API_AUTH_CONFIG, () =>
  readConfigFile(configFilepath.apiAuth),
);
