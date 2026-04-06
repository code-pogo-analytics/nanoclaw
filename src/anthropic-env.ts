import os from 'os';

import { readEnvFile } from './env.js';

const LOCAL_KEYS = [
  'ANTHROPIC_BASE_URL',
  'ANTHROPIC_AUTH_TOKEN',
  'ANTHROPIC_API_KEY',
] as const;

type LocalAnthropicKey = (typeof LOCAL_KEYS)[number];

const envFileValues = readEnvFile([...LOCAL_KEYS]);

function getValue(key: LocalAnthropicKey): string | undefined {
  return process.env[key] || envFileValues[key];
}

export interface LocalAnthropicEnv {
  ANTHROPIC_BASE_URL: string;
  ANTHROPIC_AUTH_TOKEN?: string;
  ANTHROPIC_API_KEY?: string;
}

export function getLocalAnthropicEnv(): LocalAnthropicEnv | null {
  const baseUrl = getValue('ANTHROPIC_BASE_URL');
  if (!baseUrl) {
    return null;
  }

  const env: LocalAnthropicEnv = {
    ANTHROPIC_BASE_URL: baseUrl,
  };

  const authToken = getValue('ANTHROPIC_AUTH_TOKEN');
  if (authToken) {
    env.ANTHROPIC_AUTH_TOKEN = authToken;
  }

  const apiKey = getValue('ANTHROPIC_API_KEY');
  if (apiKey) {
    env.ANTHROPIC_API_KEY = apiKey;
  }

  return env;
}

function needsHostGatewayRewrite(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  return (
    lower === 'localhost' ||
    lower === '127.0.0.1' ||
    lower === '0.0.0.0' ||
    lower === '::1'
  );
}

function resolveHostGatewayHostname(): string {
  if (
    os.platform() === 'darwin' &&
    process.env.CONTAINER_RUNTIME_BIN === 'container'
  ) {
    return 'host.containers.internal';
  }
  return 'host.docker.internal';
}

export function buildContainerAnthropicEnv(): Record<string, string> | null {
  const env = getLocalAnthropicEnv();
  if (!env) {
    return null;
  }

  const containerEnv: Record<string, string> = {};
  try {
    const parsed = new URL(env.ANTHROPIC_BASE_URL);
    if (needsHostGatewayRewrite(parsed.hostname)) {
      const gatewayHost = resolveHostGatewayHostname();
      parsed.hostname = gatewayHost;
      containerEnv.ANTHROPIC_BASE_URL = parsed.toString();
    } else {
      containerEnv.ANTHROPIC_BASE_URL = env.ANTHROPIC_BASE_URL;
    }
  } catch {
    containerEnv.ANTHROPIC_BASE_URL = env.ANTHROPIC_BASE_URL;
  }

  if (env.ANTHROPIC_AUTH_TOKEN) {
    containerEnv.ANTHROPIC_AUTH_TOKEN = env.ANTHROPIC_AUTH_TOKEN;
  }
  if (env.ANTHROPIC_API_KEY) {
    containerEnv.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
  }

  return containerEnv;
}
