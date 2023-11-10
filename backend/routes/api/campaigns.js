
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {Campaign, Category, CampaignCategory} = require('../../db/models')

const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')

const validateCampaign = [
  check('title')
    .isLength({ min: 5 })
    .withMessage('Campaign Title must be at least 5 characters'),
  check('description')
    .isLength({ min: 10 })
    .withMessage('Campaign Tagline must be at least 10 characters'),
  check('story')
    .isLength({ min: 50 })
    .withMessage('Campaign Story must be at least 50 characters'),
  check('startDate')
    .isISO8601()
    .toDate()
    .withMessage('Invalid Start Date'),
  check('endDate')
    .isISO8601()
    .toDate()
    .withMessage('Invalid End Date')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      if (value <= startDate) {
        throw new Error('End date must be after the start date');
      }
      return true;
    }),
  check('fundingGoal')
    .isNumeric()
    .withMessage('Funding Goal must be a valid number')
    .custom((value) => {
      if (value <= 0) {
        throw new Error('Funding Goal must be greater than 0');
      }
      return true;
    }),
  check('currentFunding')
    .isNumeric()
    .withMessage('Current Funding must be a valid number')
    .custom((value) => {
      if (value < 0) {
        throw new Error('Current Funding must be greater than or equal to 0');
      }
      return true;
    }),
  check('numBackers')
    .isInt({ min: 0 })
    .withMessage('Number of Backers must be a non-negative integer'),
];

//get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      include:[{
        model:Category
      }]
    });
    const campaignsWithCategories = campaigns.map((campaign) => {
      const campaignData = campaign.toJSON();
      campaignData.categories = campaignData.Categories.map((category) => category.name);
      delete campaignData.Categories;
      return campaignData;
    });

    res.json(campaignsWithCategories);
    // res.json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// get a single campaign by its ID
router.get('/:id', async (req, res) => {
  const campaignId = req.params.id;

  try {
    const campaign = await Campaign.findByPk(campaignId,{
      include:[{
        model:Category
      }]
    });
    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
    } else {
      const campaignData = campaign.toJSON();
      campaignData.categories = campaignData.Categories.map((category) => category.name);
      console.log(campaignData)
      // campaignData.category = campaignData.Category.name;
      // delete campaignData.Category;

      res.json(campaignData);

      // res.json({
      //   id: campaignId,
      //   title: campaign.title,
      //   description: campaign.description,
      //   startDate:campaign.startDate,
      //   endDate:campaign.endDate,
      //   fundingGoal:campaign.fundingGoal,
      //   numBackers:campaign.numBackers,
      //   currentFunding:campaign.currentFunding,
      //   userId:campaign.userId,
      //   category: ,
      // });

     //res.json(campaign);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// create a new campaign
// router.post('/', singleMulterUpload("image"), async (req, res) => {
//   try {
//     const { title, description, category, story, startDate, endDate, fundingGoal, currentFunding, numBackers, } = req.body;


//     //const imgUrl = req.file ? req.file.location : null;

//     const newCampaignData = {
//       title,
//       description,
//       categories,
//       story,
//       startDate,
//       endDate,
//       fundingGoal,
//       currentFunding,
//       numBackers,
//      // imgUrl,
//     };

//     const newCampaign = await Campaign.create(newCampaignData);
//     res.status(201).json(newCampaign);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// router.post('/',
// singleMulterUpload("image"),
//   async (req, res) => {
//     const newCampaignData = req.body;

//     try {
//       const newCampaign = await Campaign.create(newCampaignData);
//       res.status(201).json(newCampaign);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// Create a new campaign
router.post('/',  validateCampaign, singleMulterUpload("imgUrl"), async (req, res) => {
  try {
    const { userId, title, description, story, startDate, endDate, fundingGoal, currentFunding, numBackers, category } = req.body;
    const imgUrl = await singlePublicFileUpload(req.file);
    console.log(req.body)
    const newCampaignData = {
      userId,
      title,
      description,
      story,
      startDate,
      endDate,
      fundingGoal,
      currentFunding,
      numBackers,
      imgUrl
    };

    const newCampaign = await Campaign.create(newCampaignData);

    if (category) {
      const selectedCategories = await Category.findAll({
        where: {
          name: category,
        },
      });

      await newCampaign.addCategories(selectedCategories);
    }

    res.status(201).json(newCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// update a campaign by its ID
router.put('/:id', validateCampaign, singleMulterUpload('imgUrl'), async (req, res) => {
  try {
    const campaignId = req.params.id;
    const { title, description, story, startDate, endDate, fundingGoal, currentFunding, numBackers, category } = req.body;
    const imgUrl = await singlePublicFileUpload(req.file);
    const existingCampaign = await Campaign.findByPk(campaignId);

    if (!existingCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }


    existingCampaign.title = title;
    existingCampaign.description = description;
    existingCampaign.story = story;
    existingCampaign.startDate = startDate;
    existingCampaign.endDate = endDate;
    existingCampaign.fundingGoal = fundingGoal;
    existingCampaign.currentFunding = currentFunding;
    existingCampaign.numBackers = numBackers;
    existingCampaign.imgUrl= imgUrl;

    await existingCampaign.save();

    // Update categories if provided
    if (category) {
      const selectedCategories = await Category.findAll({
        where: {
          name: category,
        },
      });

      await existingCampaign.setCategories(selectedCategories);
    }

    res.json(existingCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Define a route to delete a campaign by its ID
router.delete('/:id', async (req, res) => {
  const campaignId = req.params.id;

  const campaign = await Campaign.findByPk(campaignId);
  await campaign.destroy();
  return res.json({ message: 'Successfully deleted' })

});
// router.delete('/:id', async (req, res) => {
//   const campaignId = req.params.id;

//   try {
//     const rowsDeleted = await Campaign.destroy({
//       where: { id: campaignId },
//     });

//     if (rowsDeleted === 0) {
//       res.status(404).json({ message: 'Campaign not found' });
//     } else {
//       res.status(204).send();
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

module.exports = router
