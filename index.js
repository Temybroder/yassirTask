// SERVER CALL
const server = require('./system/server');

// CRON JOB
const cron_job = require('./core_lib/cron_job');

cron_job();
  server();