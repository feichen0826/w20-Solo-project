'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Campaigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      funding_goal: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      current_funding: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      num_backers: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      story: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      img_url: {
        type: Sequelize.STRING,
        allowNull:false
      },
      categories: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Campaigns');
  }
};
