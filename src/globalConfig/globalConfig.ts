/**
 * Functions for manipulating the global configuration file, which lives at
 * ~/.promptfoo/promptfoo.yaml by default.
 */
import * as fs from 'fs';
import * as path from 'path';
import { parse, stringify } from 'yaml';
import type { GlobalConfig } from '../configTypes';
import { getConfigDirectoryPath } from '../util/config/manage';

export function readGlobalConfig(): GlobalConfig {
  const configDir = getConfigDirectoryPath();
  const configFilePath = path.join(configDir, 'promptfoo.yaml');
  let globalConfig: GlobalConfig = {};
  if (fs.existsSync(configFilePath)) {
    globalConfig = (parse(fs.readFileSync(configFilePath, 'utf-8')) as GlobalConfig) || {};
  } else {
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    fs.writeFileSync(configFilePath, stringify(globalConfig));
  }

  return globalConfig;
}

export function writeGlobalConfig(config: GlobalConfig): void {
  fs.writeFileSync(
    path.join(getConfigDirectoryPath(true), 'promptfoo.yaml') /* createIfNotExists */,
    stringify(config),
  );
}

/**
 * Merges the top-level keys into existing config.
 * @param partialConfig New keys to merge into the existing config.
 */
export function writeGlobalConfigPartial(partialConfig: Partial<GlobalConfig>): void {
  const currentConfig = readGlobalConfig();
  const updatedConfig = { ...currentConfig };

  for (const key in partialConfig) {
    const value = partialConfig[key as keyof GlobalConfig];
    if (value) {
      updatedConfig[key as keyof GlobalConfig] = value as any;
    } else {
      delete updatedConfig[key as keyof GlobalConfig];
    }
  }

  writeGlobalConfig(updatedConfig);
}
