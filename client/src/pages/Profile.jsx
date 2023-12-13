// Profile.jsx
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/ProfileStyle.css'

export default function Profile() {
  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>

      <Tabs className="tabs-container">
        <TabList className="tab-list">
          <Tab className="tab">Paintings for Sale</Tab>
          <Tab className="tab">Paintings Sold</Tab>
          <Tab className="tab">Paintings Bought</Tab>
        </TabList>

        <TabPanel className="tab-panel">
          <h2 className="tab-content-title">Paintings for Sale</h2>
          {/* Content for Paintings for Sale */}
        </TabPanel>

        <TabPanel className="tab-panel">
          <h2 className="tab-content-title">Paintings Sold</h2>
          {/* Content for Paintings Sold */}
        </TabPanel>

        <TabPanel className="tab-panel">
          <h2 className="tab-content-title">Paintings Bought</h2>
          {/* Content for Paintings Bought */}
        </TabPanel>
      </Tabs>
    </div>
  );
}
