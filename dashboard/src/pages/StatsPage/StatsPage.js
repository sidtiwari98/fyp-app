import React from 'react';
import TabNav from '../../components/TabNav/TabNav';
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/TabNav/TabPanel'
import './statsPage.css'

// function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       'aria-controls': `simple-tabpanel-${index}`,
//     };
//   }

export default function StatsPage(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <DefaultLayout>
      <div className = "main_contianer">
          <TabNav value = {value} handleChange = {handleChange} >
            <Tab label="Speed Violations" />
            <Tab label="Illegal Entry Violations" /> 
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
          </TabNav>
      </div>
    </DefaultLayout>
  );
}