'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contribution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contribution.belongsTo(models.User, { foreignKey: 'userId' });
      Contribution.belongsTo(models.Campaign, { foreignKey: 'campaignId' });
    }
  }
  Contribution.init({
    userId: DataTypes.INTEGER,
    campaignId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Contribution',
  });
  return Contribution;
};
