// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import CampaignDetailPage from "./components/CampaignDetailPage";
import ViewCampaignsList from "./components/ViewCampaignsList"
import CreateNewCampaign from "./components/CreateNewCampaign";
import MyCampaignPage from "./components/MyCampaignPage";
import EditCampaignForm from "./components/EditCampaignForm"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path = '/view-campaigns' component={ViewCampaignsList} />
          <Route exact path='/campaign/:campaignId' component={CampaignDetailPage} />
          <Route exact path='/create-campaign' component={CreateNewCampaign} />
          <Route path = '/my-campaigns' component={MyCampaignPage} />
          <Route path = '/campaigns/:campaignId/edit' component={EditCampaignForm} />
        </Switch>
      )}
    </>
  );
}

export default App;
