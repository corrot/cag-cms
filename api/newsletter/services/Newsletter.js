/* global Newsletter */
'use strict';

/**
 * Newsletter.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

// Strapi utilities.
const utils = require('strapi-hook-bookshelf/lib/utils/');
const { convertRestQueryParams, buildQuery } = require('strapi-utils');


module.exports = {

  /**
   * Promise to fetch all newsletters.
   *
   * @return {Promise}
   */

  fetchAll: (params, populate) => {
    // Select field to populate.
    const withRelated = populate || Newsletter.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    const filters = convertRestQueryParams(params);

    return Newsletter.query(buildQuery({ model: Newsletter, filters }))
      .fetchAll({ withRelated })
      .then(data => data.toJSON());
  },

  /**
   * Promise to fetch a/an newsletter.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Newsletter.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    return Newsletter.forge(_.pick(params, 'id')).fetch({
      withRelated: populate
    });
  },

  /**
   * Promise to count a/an newsletter.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = convertRestQueryParams(params);

    return Newsletter.query(buildQuery({ model: Newsletter, filters: _.pick(filters, 'where') })).count();
  },

  /**
   * Promise to add a/an newsletter.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Newsletter.associations.map(ast => ast.alias));
    const data = _.omit(values, Newsletter.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Newsletter.forge(data).save();

    // Create relational data and return the entry.
    return Newsletter.updateRelations({ id: entry.id , values: relations });
  },

  /**
   * Promise to edit a/an newsletter.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Newsletter.associations.map(ast => ast.alias));
    const data = _.omit(values, Newsletter.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Newsletter.forge(params).save(data);

    // Create relational data and return the entry.
    return Newsletter.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an newsletter.
   *
   * @return {Promise}
   */

  remove: async (params) => {
    params.values = {};
    Newsletter.associations.map(association => {
      switch (association.nature) {
        case 'oneWay':
        case 'oneToOne':
        case 'manyToOne':
        case 'oneToManyMorph':
          params.values[association.alias] = null;
          break;
        case 'oneToMany':
        case 'manyToMany':
        case 'manyToManyMorph':
          params.values[association.alias] = [];
          break;
        default:
      }
    });

    await Newsletter.updateRelations(params);

    return Newsletter.forge(params).destroy();
  },

  /**
   * Promise to search a/an newsletter.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = strapi.utils.models.convertParams('newsletter', params);
    // Select field to populate.
    const populate = Newsletter.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    const associations = Newsletter.associations.map(x => x.alias);
    const searchText = Object.keys(Newsletter._attributes)
      .filter(attribute => attribute !== Newsletter.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['string', 'text'].includes(Newsletter._attributes[attribute].type));

    const searchInt = Object.keys(Newsletter._attributes)
      .filter(attribute => attribute !== Newsletter.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['integer', 'decimal', 'float'].includes(Newsletter._attributes[attribute].type));

    const searchBool = Object.keys(Newsletter._attributes)
      .filter(attribute => attribute !== Newsletter.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['boolean'].includes(Newsletter._attributes[attribute].type));

    const query = (params._q || '').replace(/[^a-zA-Z0-9.-\s]+/g, '');

    return Newsletter.query(qb => {
      if (!_.isNaN(_.toNumber(query))) {
        searchInt.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query)}`);
        });
      }

      if (query === 'true' || query === 'false') {
        searchBool.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query === 'true')}`);
        });
      }

      // Search in columns with text using index.
      switch (Newsletter.client) {
        case 'mysql':
          qb.orWhereRaw(`MATCH(${searchText.join(',')}) AGAINST(? IN BOOLEAN MODE)`, `*${query}*`);
          break;
        case 'pg': {
          const searchQuery = searchText.map(attribute =>
            _.toLower(attribute) === attribute
              ? `to_tsvector(${attribute})`
              : `to_tsvector('${attribute}')`
          );

          qb.orWhereRaw(`${searchQuery.join(' || ')} @@ to_tsquery(?)`, query);
          break;
        }
      }

      if (filters.sort) {
        qb.orderBy(filters.sort.key, filters.sort.order);
      }

      if (filters.skip) {
        qb.offset(_.toNumber(filters.skip));
      }

      if (filters.limit) {
        qb.limit(_.toNumber(filters.limit));
      }
    }).fetchAll({
      withRelated: populate
    });
  }
};
