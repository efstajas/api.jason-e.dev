'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;

    ctx.query = {
      ...ctx.query,
      status: ctx.query.status || 'published',
    };

    if (ctx.query._q) {
      entities = await strapi.services.project.search(ctx.query);
    } else {
      entities = await strapi.services.project.find(ctx.query);
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.project })
    );
  },
};
