'use strict';
const {Category} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Category.bulkCreate([
      { name: 'Art' },
      { name: 'Animals' },
      { name: 'Technology' },
      { name: 'Education' },
      { name: 'Community' },
      { name: 'Travel' },
      { name: 'Adventure' },
      { name: 'Health' },
      { name: 'Lifestyle' },
      { name: 'History' },
      { name: 'Documentary' },
      { name: 'Food' },
      { name: 'Business' },
      { name: 'Environment' },
      { name: 'Sustainability' },
      { name: 'Entrepreneurship' },
      { name: 'Sports' },
      { name: 'Charity' },
      { name: 'Music' },
      { name: 'Fashion' },
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
  }
};
