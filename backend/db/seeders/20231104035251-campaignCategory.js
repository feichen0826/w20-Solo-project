'use strict';

const {CampaignCategory} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await CampaignCategory.bulkCreate([
      { campaignId: 1, categoryId: 1,},  // Tech Gadgets Innovation - Technology
      { campaignId: 1, categoryId: 4,},  // Tech Gadgets Innovation -
      { campaignId: 2, categoryId: 1 },  // Tech for Good Hackathon - Technology
      { campaignId: 2, categoryId: 4 },  // Tech for Good Hackathon -
      { campaignId: 3, categoryId: 1 },  // Eco-Friendly Fashion Line - Technology
      { campaignId: 4, categoryId: 2 },  // Healthy Cooking Classes - Education
      { campaignId: 5, categoryId: 3 },  // Music Festival Extravaganza - Health
      { campaignId: 6, categoryId: 4 },  // Environmental Conservation Project - Business, Environment
      { campaignId: 7, categoryId: 3 },  // Mobile App Development Course - Health
      { campaignId: 8, categoryId: 5 },  // Animal Rescue Mission - Sports, Environment
      { campaignId: 9, categoryId: 5 },  // Outdoor Adventure Club - Sports, Environment
      { campaignId: 10, categoryId: 2 }, // Science Education for Kids - Education
      { campaignId: 11, categoryId: 5 }, // Community Art Project - Environment
      { campaignId: 12, categoryId: 4 }, // Renewable Energy Initiative - Business, Environment
      { campaignId: 13, categoryId: 6 }, // Local Food Festival - Sports
      { campaignId: 14, categoryId: 4 }, // Mental Health Awareness Campaign - Business, Environment
      { campaignId: 15, categoryId: 4 }, // Space Exploration Project - Business, Environment
      { campaignId: 16, categoryId: 2 }, // Literacy Program for Children - Education
      { campaignId: 17, categoryId: 6 }, // Local Music Talent Showcase - Sports
      { campaignId: 18, categoryId: 6 }, // Clean Water Initiative - Sports, Environment
      { campaignId: 19, categoryId: 6 }, // Youth Sports Development - Sports
      { campaignId: 20, categoryId: 4 }, // Culinary Entrepreneurship Program - Business, Environment
      { campaignId: 21, categoryId: 6 }, // Local Arts and Crafts Fair - Sports
      { campaignId: 22, categoryId: 6 }, // Wildlife Conservation Expedition - Sports
      { campaignId: 23, categoryId: 4 }, // Adventure Travel Experience - Business, Environment
      { campaignId: 24, categoryId: 3 }, // Healthy Living Community - Health
      { campaignId: 25, categoryId: 4 }, // Historical Documentary Project - Business, Environment
      { campaignId: 26, categoryId: 6 }, // Culinary Exploration Tour - Sports
      { campaignId: 27, categoryId: 4 }, // Innovative Startup Support - Business, Environment
      { campaignId: 28, categoryId: 6 }, // Environmental Conservation - Sports
    ])

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
    options.tableName = 'CampaignCategories';
    return queryInterface.bulkDelete(options)
  }
};
