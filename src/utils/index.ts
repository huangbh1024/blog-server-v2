import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { resolve } from 'path';
export const getConfig = (type: 'database') => {
  const configPath = resolve(process.cwd(), 'configs', type);
  const fileContent = readFileSync(configPath + '.yaml', 'utf-8');
  const result = parse(fileContent);
  return result;
};
