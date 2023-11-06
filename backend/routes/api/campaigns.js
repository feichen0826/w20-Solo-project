const express = require('express');
const router = express.Router();
const {Campaign} = require('../../db/models')

//get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.findAll();
    res.json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// get a single campaign by its ID
router.get('/:id', async (req, res) => {
  const campaignId = req.params.id;

  try {
    const campaign = await Campaign.findByPk(campaignId);

    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
    } else {
      res.json(campaign);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// create a new campaign
router.post('/', async (req, res) => {
  const newCampaignData = req.body;

  try {
    const newCampaign = await Campaign.create(newCampaignData);
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// update a campaign by its ID
router.put('/:id', async (req, res) => {
  const campaignId = req.params.id;
  const updatedCampaignData = req.body;

  try {
    const [rowsUpdated, [updatedCampaign]] = await Campaign.update(updatedCampaignData, {
      where: { id: campaignId },
      returning: true,
    });

    if (rowsUpdated === 0) {
      res.status(404).json({ message: 'Campaign not found' });
    } else {
      res.json(updatedCampaign);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Define a route to delete a campaign by its ID
router.delete('/:id', async (req, res) => {
  const campaignId = req.params.id;

  try {
    const rowsDeleted = await Campaign.destroy({
      where: { id: campaignId },
    });

    if (rowsDeleted === 0) {
      res.status(404).json({ message: 'Campaign not found' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router
