'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Campaign.belongsToMany(models.Category,{
        through:models.CampaignCategory,
        foreignKey:'campaignId',
        otherKey:'categoryId'
      })

      Campaign.belongsTo(models.User,{
        foreignKey:'userId',
      })

      Campaign.hasMany(models.Contribution,{
        foreignKey:'campaignId'
      })
    }
  }
  Campaign.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    fundingGoal: DataTypes.DECIMAL,
    currentFunding: DataTypes.DECIMAL,
    numBackers: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    story: DataTypes.TEXT,
    imgUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Campaign',
  });
  return Campaign;
};
