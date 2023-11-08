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
      const categoriesWithCategories = categories.map((campaign) => {
        const campaignData = campaign.toJSON();
        campaignData.campaigns = campaignData.Campaigns.map((campaign) => campaign.title, campaign.description, campaign.currentFunding, campaign.fundingGoal, campaign.StartDate, campaign.endDate);
        delete campaignData.Campaigns;
        return campaignData;
      });

      res.json(categoriesWithCategories);
      // res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
