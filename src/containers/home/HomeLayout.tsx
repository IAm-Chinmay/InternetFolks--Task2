import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const [tab, setTab] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setTab(index);
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={tab} onChange={handleTabChange} isLazy>
          <TabList>
            <CustomTab>Requisition Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid templateColumns="3fr 2fr" gap="24px" mt="2rem">
            <GridItem>
              <TabPanels>
                <TabPanel>
                  <RequisitionForm handleTabChange={handleTabChange} />
                </TabPanel>
                <TabPanel>
                  <JobDetailsForm handleTabChange={handleTabChange} />
                </TabPanel>
                <TabPanel>
                  <InterviewSettingsForm handleTabChange={handleTabChange} />
                </TabPanel>
              </TabPanels>
            </GridItem>
            <GridItem>
              <DisplayCard />
            </GridItem>
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
