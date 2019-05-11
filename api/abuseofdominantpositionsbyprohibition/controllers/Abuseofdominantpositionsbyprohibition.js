'use strict';

/**
 * Abuseofdominantpositionsbyprohibition.js controller
 *
 * @description: A set of functions called "actions" for managing `Abuseofdominantpositionsbyprohibition`.
 */

module.exports = {

  /**
   * Retrieve abuseofdominantpositionsbyprohibition records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.abuseofdominantpositionsbyprohibition.search(ctx.query);
    } else {
      return strapi.services.abuseofdominantpositionsbyprohibition.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a abuseofdominantpositionsbyprohibition record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.abuseofdominantpositionsbyprohibition.fetch(ctx.params);
  },

  /**
   * Count abuseofdominantpositionsbyprohibition records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.abuseofdominantpositionsbyprohibition.count(ctx.query, populate);
  },

  /**
   * Create a/an abuseofdominantpositionsbyprohibition record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.abuseofdominantpositionsbyprohibition.add(ctx.request.body);
  },

  /**
   * Update a/an abuseofdominantpositionsbyprohibition record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.abuseofdominantpositionsbyprohibition.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an abuseofdominantpositionsbyprohibition record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.abuseofdominantpositionsbyprohibition.remove(ctx.params);
  }
};
