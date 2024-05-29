// Copyright 2020-2024 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: GPL-3.0

import Pino from 'pino';
import {MonitorService} from './indexer';

let monitorService: MonitorService;

export function setMonitorService(service: MonitorService): void {
  monitorService = service;
}

export function exitWithError(error: Error | string, logger?: Pino.Logger, code = 1): never {
  const errorMessage = typeof error === 'string' ? error : error.message;
  logger?.error(errorMessage);
    monitorService?.write(`[EXIT ${code}]: ${errorMessage}`);
  process.exit(code);
}

export function monitorWrite(blockData: string): void {
  if (monitorService) {
    monitorService.write(blockData);
  }
}
