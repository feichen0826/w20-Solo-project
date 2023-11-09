const express = require('express');
const router = express.Router();
const {Campaign, Category, CampaignCategory} = require('../../db/models')

//get all categories
router.get('/', async (req, res) => {
    try {
      const categories = await Category.findAll({
        include:[{
          model:Campaign
        }]
      });
      const categoriesWithCategories = categories.map((category) => {
        const categoryData = category.toJSON();
      categoryData.campaigns = categoryData.Campaigns.map((campaign) => {
        campaign.title,
        campaign.description,
        campaign.currentFunding,
        campaign.fundingGoal,
        campaign.StartDate,
        campaign.endDate});
        delete categoryData.campaigns;
        return categoryData;
      });

      res.json(categoriesWithCategories);
      // res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  module.exports = router
