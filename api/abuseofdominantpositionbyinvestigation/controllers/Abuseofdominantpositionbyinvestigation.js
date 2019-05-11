'use strict';

/**
 * Abuseofdominantpositionbyinvestigation.js controller
 *
 * @description: A set of functions called "actions" for managing `Abuseofdominantpositionbyinvestigation`.
 */

module.exports = {

  /**
   * Retrieve abuseofdominantpositionbyinvestigation records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.abuseofdominantpositionbyinvestigation.search(ctx.query);
    } else {
      return strapi.services.abuseofdominantpositionbyinvestigation.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a abuseofdominantpositionbyinvestigation record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.abuseofdominantpositionbyinvestigation.fetch(ctx.params);
  },

  /**
   * Count abuseofdominantpositionbyinvestigation records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.abuseofdominantpositionbyinvestigation.count(ctx.query, populate);
  },

  /**
   * Create a/an abuseofdominantpositionbyinvestigation record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.abuseofdominantpositionbyinvestigation.add(ctx.request.body);
  },

  /**
   * Update a/an abuseofdominantpositionbyinvestigation record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.abuseofdominantpositionbyinvestigation.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an abuseofdominantpositionbyinvestigation record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.abuseofdominantpositionbyinvestigation.remove(ctx.params);
  }
};
