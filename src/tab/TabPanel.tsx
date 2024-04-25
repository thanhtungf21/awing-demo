import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Ads, subCampaign } from "../App";
import "./tabPanel.css";

const TabPanel = ({
  isSubmit,
  listSubCampaigns,
  setListSubCampaigns,
}: {
  isSubmit: boolean;
  listSubCampaigns: subCampaign[];
  setListSubCampaigns: (listSubCampaigns: subCampaign[]) => void;
}) => {
  // const [listSubCampaigns, setListSubCampaigns] = useState([
  //   {
  //     name: "Chiến dịch con 0",
  //     status: true,
  //     ads: [
  //       {
  //         name: "Quảng cáo 0",
  //         quantity: 0,
  //       },
  //     ],
  //   },
  // ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [listAds, setListAds] = useState<Ads[]>([]);

  const handleUpdateStatus = (e: any) => {
    const newSubCampaigns = listSubCampaigns.map((item, idx) => {
      if (idx === selectedIndex) {
        return {
          ...item,
          status: e.target.checked,
        };
      } else {
        return item;
      }
    });
    setListSubCampaigns(newSubCampaigns);
  };

  // update campaign name
  const handleUpdate = (index: number, name: string) => {
    const newSubCampaigns = listSubCampaigns.map((item, idx) =>
      index === idx ? { ...item, name: name } : item
    );
    setListSubCampaigns(newSubCampaigns);
  };

  const handleAddAds = () => {
    const newSubCampaigns = listSubCampaigns.map((item, idx) =>
      idx === selectedIndex
        ? {
            ...item,
            ads: [
              ...item?.ads,
              {
                name: `Quảng cáo ${item?.ads.length}`,
                quantity: 0,
              },
            ],
          }
        : item
    );
    setListSubCampaigns(newSubCampaigns);
  };

  const handleRemoveAds = (ads: Ads) => {
    const newSubCampaigns = listSubCampaigns.map((item, idx) =>
      idx === selectedIndex
        ? {
            ...item,
            ads: [...item?.ads?.filter((i) => i !== ads)],
          }
        : item
    );
    setListSubCampaigns(newSubCampaigns);
  };

  const handleRemoveAdsChecked = () => {
    const newSubCampaigns = listSubCampaigns.map((item, idx) =>
      idx === selectedIndex
        ? {
            ...item,
            ads: listSubCampaigns[selectedIndex]?.ads.filter(
              (el) => !listAds.includes(el)
            ),
          }
        : item
    );

    setListSubCampaigns(newSubCampaigns);
  };

  const handleUpdateAds = (value: string, index: number, type: string) => {
    const test = listSubCampaigns.map((item, idx) =>
      idx === selectedIndex
        ? {
            ...item,
            ads: [
              ...item?.ads.map((i, j) =>
                index !== j
                  ? i
                  : type === "name"
                  ? {
                      name: value,
                      quantity: i?.quantity,
                    }
                  : { name: i?.name, quantity: Number(value) }
              ),
            ],
          }
        : item
    );
    setListSubCampaigns(test);
  };

  return (
    <div>
      <Box sx={{ m: 3, p: 2 }}>
        {/* <Card sx={{ m: 3, p: 2 }}> */}
        <Grid container spacing={2}>
          <Grid item xs={1} alignContent={"center"}>
            <IconButton
              sx={{ m: 2, p: 2 }}
              color="secondary"
              aria-label="add"
              size="medium"
              onClick={() =>
                setListSubCampaigns([
                  ...listSubCampaigns,
                  {
                    name: `Chiến dịch con ${listSubCampaigns?.length}`,
                    status: true,
                    ads: [
                      {
                        name: "Quảng cáo 0",
                        quantity: 0,
                      },
                    ],
                  },
                ])
              }
            >
              <Icon>add_circle</Icon>
            </IconButton>
          </Grid>
          <Grid item xs={11}>
            <Stack direction="row" spacing={2} p={2} sx={{ overflowX: "auto" }}>
              {listSubCampaigns?.map((item, index) => (
                <Card
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  variant="outlined"
                  sx={{
                    minWidth: "200px",
                    m: 2,
                    p: 2,
                    border: 2,
                    borderColor:
                      index === selectedIndex ? "secondary.main" : "grey.500",
                  }}
                >
                  <h4
                    style={
                      item?.ads.reduce(
                        (partialSum: number, a: any) =>
                          partialSum + a?.quantity,
                        0
                      ) <= 0 && isSubmit
                        ? { color: "red" }
                        : {}
                    }
                  >
                    {item?.name}{" "}
                    {item?.status ? (
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{ position: "relative", bottom: -4 }}
                        color="success"
                      />
                    ) : (
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ position: "relative", bottom: -4 }}
                        color="disabled"
                      />
                    )}
                  </h4>
                  <h4>
                    {item?.ads.reduce(
                      (partialSum: number, a: any) => partialSum + a?.quantity,
                      0
                    )}
                  </h4>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={8}>
            <TextField
              sx={{ width: "100%" }}
              id="standard-basic"
              label="Tên chiến dịch con *"
              variant="standard"
              value={listSubCampaigns[selectedIndex].name}
              onChange={(e) => handleUpdate(selectedIndex, e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={listSubCampaigns[selectedIndex].status}
                  onChange={(e) => handleUpdateStatus(e)}
                />
              }
              label="Đang hoạt động"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" marginTop={4}>
          DANH SÁCH QUẢNG CÁO
        </Typography>
        {/* </Card> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={listSubCampaigns[selectedIndex]?.ads.every((v) =>
                      listAds.includes(v)
                    )}
                    onChange={(e) =>
                      setListAds(
                        e.target.checked
                          ? [...listSubCampaigns[selectedIndex]?.ads]
                          : []
                      )
                    }
                  />
                </TableCell>
                {listAds?.length > 0 ? (
                  <TableCell colSpan={2} align="left">
                    <IconButton
                      color="default"
                      aria-label="add"
                      size="medium"
                      onClick={handleRemoveAdsChecked}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                ) : (
                  <>
                    <TableCell align="right">Tên quảng cáo*</TableCell>
                    <TableCell align="right">Số lượng*</TableCell>
                  </>
                )}

                <TableCell align="right">
                  <Button
                    onClick={handleAddAds}
                    variant="outlined"
                    startIcon={<AddIcon />}
                  >
                    Thêm
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listSubCampaigns[selectedIndex]?.ads.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Checkbox
                      checked={listAds?.includes(row)}
                      onChange={(e) =>
                        setListAds(
                          e.target.checked
                            ? [...listAds, row]
                            : listAds.filter((item, idx) => item !== row)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      sx={{ width: "100%" }}
                      id="standard-basic"
                      // label="Tên chiến dịch con *"
                      value={row.name}
                      variant="standard"
                      onChange={(e) =>
                        handleUpdateAds(e.target.value, idx, "name")
                      }

                      // value={listSubCampaigns[selectedIndex].name}
                      // onChange={(e) => handleUpdate(selectedIndex, e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      sx={{ width: "100%" }}
                      id="standard-basic"
                      type="number"
                      error={isSubmit && row.quantity <= 0}
                      // label="Tên chiến dịch con *"
                      value={row.quantity}
                      variant="standard"
                      onChange={(e) =>
                        handleUpdateAds(
                          Number(e.target.value) >= 0 ? e.target.value : "0",
                          idx,
                          "quantity"
                        )
                      }
                      // value={listSubCampaigns[selectedIndex].name}
                      // onChange={(e) => handleUpdate(selectedIndex, e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleRemoveAds(row)}
                      color="default"
                      aria-label="add"
                      size="medium"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default TabPanel;
