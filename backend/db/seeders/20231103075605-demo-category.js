'use strict';
const {Category} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Category.bulkCreate([
      { name: 'Technology' },
      { name: 'Education' },
      { name: 'Health' },
      { name: 'Business' },
      { name: 'Environment' },
      { name: 'Sports' },
    ], {});

    /**
     *
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Categories';
    return queryInterface.bulkDelete(options)
  }
};
