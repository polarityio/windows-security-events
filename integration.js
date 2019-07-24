'use strict';

const Papa = require('papaparse');
const fs = require('fs');

let Logger;
const eventLookup = new Map();

function startup(logger) {
  Logger = logger;
  const csvAsString = fs.readFileSync('./data/windows-security-audit-events.csv', 'utf8');
  let auditEvents = Papa.parse(csvAsString, {
    header: true,
    skipEmptyLines: true,
    delimiter: ',',
    quoteChar: '"'
  });
  if (auditEvents.errors.length > 0) {
    Logger.error({ errors: auditEvents.errors }, 'Encountered Errors Parsing File');
  }
  Logger.info(`Loaded ${auditEvents.data.length} rows`);
  auditEvents.data.forEach((event) => {
    eventLookup.set(event.eventId, event);
  });
}

function doLookup(entities, options, cb) {
  Logger.debug({ entities: entities, options: options }, 'doLookup');

  let entityResults = [];

  entities.forEach((entity) => {
    if (eventLookup.has(entity.value)) {
      let event = eventLookup.get(entity.value);
      Logger.info(event.category);
      entityResults.push({
        entity: entity,
        displayValue: entity.value,
        data: {
          summary: [`${event.category} - ${event.subcategory}`, `${event.messageSummary}`],
          details: event
        }
      });
    }
  });

  Logger.debug({ entityResults }, 'Results');
  cb(null, entityResults);
}

module.exports = {
  doLookup: doLookup,
  startup: startup
};
