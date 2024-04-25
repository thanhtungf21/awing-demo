import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import TabPanel from "./tab/TabPanel";
import CheckIcon from "@mui/icons-material/Check";

interface campaign {
  name: string;
  description: string;
}

export interface Ads {
  name: string;
  quantity: number;
}

export interface subCampaign {
  ads: Ads[];
  name: string;
  status: boolean;
}

function App() {
  const [value, setValue] = React.useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isError, setIsError] = useState(false);
  const [campaign, setCampaign] = useState<campaign>({
    name: "",
    description: "",
  });
  const [listSubCampaigns, setListSubCampaigns] = useState<subCampaign[]>([
    {
      name: "Chiến dịch con 0",
      status: true,
      ads: [
        {
          name: "Quảng cáo 0",
          quantity: 0,
        },
      ],
    },
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    let check = false; //check sum === 0?
    listSubCampaigns.map((campaign, idx) => {
      if (
        campaign?.ads?.reduce(
          (partialSum, a) => partialSum + a?.quantity,
          0
        ) === 0
      ) {
        check = true;
        return;
      }
    });

    if (!check) {
      listSubCampaigns.map((campaign) => {
        campaign?.ads?.map((item) => {
          if (item?.name.trim() == "") {
            check = true;
            return;
          }
        });
      });
    }
    setIsError(campaign?.name?.trim() == "" || check);
    setIsSubmit(true);
    setOpenDialog(true);
  };

  return (
    <div className="App">
      <Dialog
        sx={{ bottom: "25%" }}
        onClose={() => setOpenDialog(false)}
        open={openDialog}
      >
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isError
              ? "Vui lòng điền đúng và đầy đủ thông tin"
              : `Thêm thành công chiến dịch:
            ${JSON.stringify({
              campaign: {
                information: campaign,
                subCampaign: listSubCampaigns,
              },
            })}
            `}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Grid container>
          <Grid item xs={11}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Thông tin" />
              <Tab label="Chiến dịch con" />
              {/* <Tab label="Item Three" /> */}
            </Tabs>
          </Grid>
          <Grid item xs={1} alignContent={"center"}>
            <Button variant="contained" onClick={handleSubmit}>
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* <TabPanel label={value} /> */}
      {value === 0 ? (
        <div>
          <Box p={4} component="form">
            <TextField
              sx={{ width: "100%", marginBottom: 2 }}
              error={isSubmit && campaign?.name?.trim() === ""}
              id="standard-basic"
              label="Tên chiến dịch *"
              variant="standard"
              value={campaign?.name}
              onChange={(e) =>
                setCampaign({
                  ...campaign,
                  name: e.target.value,
                })
              }
              helperText={
                isSubmit && campaign?.name?.trim() === ""
                  ? "Dư liệu không hợp lệ"
                  : ""
              }
            />
            <TextField
              sx={{ width: "100%" }}
              id="standard-basic"
              label="Mô tả"
              variant="standard"
              value={campaign?.description}
              multiline
              onChange={(e) =>
                setCampaign({
                  ...campaign,
                  description: e.target.value,
                })
              }
            />
          </Box>
        </div>
      ) : (
        <TabPanel
          isSubmit={isSubmit}
          listSubCampaigns={listSubCampaigns}
          setListSubCampaigns={setListSubCampaigns}
        />
      )}
    </div>
  );
}

export default App;
