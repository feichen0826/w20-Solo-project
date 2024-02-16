'use strict';

const{Contribution} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Contribution.bulkCreate([
      {
        userId: 1,
        campaignId: 1,
        amount: 100
      },
      {
        userId: 2,
        campaignId: 1,
        amount: 200
      },
    ],{});
    /**
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
      options.tableName ='Contributions';
      return queryInterface.bulkDelete(options)
  }
};
