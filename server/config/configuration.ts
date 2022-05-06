import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join, resolve } from 'path';
import { removeEmptyKeys } from "../src/infrastructure/utils/helpers/remove_empty_keys.util";
dotenv.config();

const env = process.env.NODE_ENV || 'production';
dotenv.config({
  path: resolve(process.cwd(), 'config', env, '.env'),
});

const env_regex = new RegExp(/\${\s*([A-Z_]+)\s*}/gm, 'gm');

const processFile = (file) => {
  const buffer = readFileSync(file, 'utf8');
  let to_return = readFileSync(file, 'utf8');

  const matches = buffer.matchAll(env_regex);
  const matches_array = [...matches] || [];

  matches_array.forEach((match) => {
    if (process.env[match[1]]) {
      to_return = to_return.replace(match[0], process.env[match[1]]);
    } else {
      to_return = to_return.replace(match[0], '');
    }
  });
  return to_return;
};

// strip out elements with undef values for cleaner YAML dumps

const loadConfigFile = (file_name) => {
  const loaded = yaml.load(
    processFile(join(__dirname, env, `${file_name}.yml`)),
  ) as Record<any, any>;
  const config = removeEmptyKeys(loaded);
  return config;
};

// TODO: type return object in depth
const readConfig = () => {
  const main = loadConfigFile('main');
  const database = loadConfigFile('database');

  return {
    main,
    database,
  };
};

export default () => readConfig();

export const config = readConfig();
