'use strict';

/**
 * answered-poll service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::answered-poll.answered-poll');
