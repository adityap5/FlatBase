'use strict';

const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevelName = (process.env.LOG_LEVEL || 'info').toLowerCase();
const currentLevel = LEVELS[currentLevelName] ?? LEVELS.info;

function log(level, message, meta = {}) {
  if (LEVELS[level] > currentLevel) return;

  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };

  const line = JSON.stringify(entry);
  if (level === 'error' || level === 'warn') {
    process.stderr.write(line + '\n');
  } else {
    process.stdout.write(line + '\n');
  }
}

const logger = {
  info:  (msg, meta) => log('info',  msg, meta),
  warn:  (msg, meta) => log('warn',  msg, meta),
  error: (msg, meta) => log('error', msg, meta),
  debug: (msg, meta) => log('debug', msg, meta),
};

module.exports = logger;
