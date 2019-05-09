'use strict';

/**
 * Newsletter.js controller
 *
 * @description: A set of functions called "actions" for managing `Newsletter`.
 */

module.exports = {

  /**
   * Retrieve newsletter records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.newsletter.search(ctx.query);
    } else {
      return strapi.services.newsletter.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a newsletter record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.newsletter.fetch(ctx.params);
  },

  /**
   * Count newsletter records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.newsletter.count(ctx.query, populate);
  },

  /**
   * Create a/an newsletter record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.newsletter.add(ctx.request.body);
  },

  /**
   * Update a/an newsletter record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.newsletter.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an newsletter record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.newsletter.remove(ctx.params);
  }
};
