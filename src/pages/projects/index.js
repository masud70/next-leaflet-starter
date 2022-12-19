import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataList from "@components/DataList/DataList";
import React, { useEffect, useState } from "react";
import Map from "@components/Map";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";

const index = () => {
    const [selected, setSelected] = useState({});
    const [issue, setIssue] = useState("");
    const [mapData, setMapData] = useState([]);
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [filterBy, setFilterBy] = useState([]);
    const [categories, setCategories] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [center, setCenter] = useState([
        23.729211164246585, 90.40874895549243,
    ]);
    const options = ["Category"];

    const fetchData = async () => {
        const req = await fetch("../api/get_data");
        const data = await req.json();
        setData(data);
        setAllData(data);
        return data;
    };

    const handleDataItemSelection = (mapData) => {
        mapData.location_coordinates.sort((a, b) => {
            if (a.lat == b.lat) return a.long < b.long;
            return a.lat < b.lat;
        });

        console.log("Location Coordinates > ", mapData.location_coordinates);

        setMapData([mapData]);
        const loc = mapData.location_coordinates;
        setCenter([
            loc[Math.floor(loc.length / 2)].lat,
            loc[Math.floor(loc.length / 2)].lng,
        ]);
    };

    const filterHandler = (filterBy) => {
        let dataX = [];
        allData.map((item) => {
            if (item.category === filterBy) {
                dataX = [...dataX, item];
            } else if (filterBy === null) {
                dataX = [...dataX, item];
            }
        });
        setMapData(dataX);
        setData(dataX);
    };

    const handlePostIssue = async () => {
        setUploading(true);
        const comment = issue.trim();
        if (!comment.length) {
            setUploading(false);
            return;
        }

        const req = await fetch(
            `/api/post_issue?projectName=${encodeURIComponent(
                selected.project_name
            )}&issueComment=${encodeURIComponent(comment)}`
        );
        const data = await req.json();

        setUploading(false);
    };

    const handleModalCancel = () => {
        setOpen(false);
        setIssue("");
    };

    useEffect(() => {
        fetchData()
            .then((data) => {
                setMapData(data);
                let array = [];
                data.map((item) => {
                    array = [...array, item.category];
                });
                array = array.filter(
                    (item, index, array) => array.indexOf(item) === index
                );
                setCategories(array);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Grid
            container
            columns={10}
            columnSpacing={1}
            justifyContent="space-between"
        >
            {/* Grid View Container */}
            {/* Map Container */}
            <Grid item xs={7}>
                <Box sx={{ margin: "16px" }}>
                    <Map
                        style={{
                            border: "2px solid gray",
                            borderRadius: "5px",
                        }}
                        center={center}
                        zoom={11}
                    >
                        {({ TileLayer, Marker, Popup }) => (
                            <>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {mapData &&
                                    mapData.map((item, id) =>
                                        item.location_coordinates.map(
                                            (pos, idx) => (
                                                <Marker
                                                    position={[
                                                        pos.lat,
                                                        pos.long,
                                                    ]}
                                                    key={`project_${id}_marker_${
                                                        idx + 1
                                                    }`}
                                                >
                                                    <Popup className="w-[400px]">
                                                        <div className="w-full space-y-2">
                                                            <div className="font-bold text-md w-full flex flex-row">
                                                                <div className="w-3/12">
                                                                    Project
                                                                    Name:
                                                                </div>
                                                                <div className="w-9/12">
                                                                    {
                                                                        item.project_name
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="font-bold text-md w-full flex flex-row">
                                                                <div className="w-3/12">
                                                                    Agency:
                                                                </div>
                                                                <div className="w-9/12">
                                                                    {
                                                                        item.affiliated_agency
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="font-bold text-md w-full flex flex-row">
                                                                <div className="w-3/12">
                                                                    Description:
                                                                </div>
                                                                <div className="w-9/12">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="font-bold text-md w-full flex flex-row">
                                                                <div className="w-3/12">
                                                                    Category:
                                                                </div>
                                                                <div className="w-9/12">
                                                                    {
                                                                        item.category
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="font-bold text-md w-full flex flex-row">
                                                                <div className="w-3/12">
                                                                    Total
                                                                    Budget:
                                                                </div>
                                                                <div className="w-9/12">
                                                                    {
                                                                        item.total_budget
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="font-bold text-md w-full flex flex-row">
                                                                <div className="w-3/12">
                                                                    Start time:
                                                                </div>
                                                                <div className="w-9/12">
                                                                    {
                                                                        item.project_start_time
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="font-bold text-md w-full flex flex-row">
                                                                <div className="w-3/12">
                                                                    End time:
                                                                </div>
                                                                <div className="w-9/12">
                                                                    {
                                                                        item.project_completion_time
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="font-bold text-md w-full flex flex-row">
                                                                <div className="w-3/12">
                                                                    Completed:
                                                                </div>
                                                                <div className="w-9/12">
                                                                    {
                                                                        item.completion_percentage
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="font-bold text-md w-full flex flex-row">
                                                                <div className="w-3/12">
                                                                    Remaining
                                                                    Time:
                                                                </div>
                                                                <div className="w-9/12">
                                                                    {dayjs(
                                                                        item.project_completion_time
                                                                    ).unix() <=
                                                                    dayjs().unix()
                                                                        ? "100%"
                                                                        : (
                                                                              ((dayjs(
                                                                                  item.project_completion_time
                                                                              ).unix() -
                                                                                  dayjs().unix()) *
                                                                                  100) /
                                                                              (dayjs(
                                                                                  item.project_completion_time
                                                                              ).unix() -
                                                                                  dayjs(
                                                                                      item.project_start_time
                                                                                  ).unix())
                                                                          ).toFixed(
                                                                              2
                                                                          ) +
                                                                          "%"}
                                                                </div>
                                                            </div>
                                                            <div className="font-bold text-md w-full flex flex-row justify-center items-center">
                                                                <Button
                                                                    variant="contained"
                                                                    className="bg-slate-600"
                                                                    onClick={() => {
                                                                        setOpen(
                                                                            true
                                                                        );
                                                                        setSelected(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Post an
                                                                    issue or
                                                                    concern
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Popup>
                                                </Marker>
                                            )
                                        )
                                    )}
                            </>
                        )}
                    </Map>
                </Box>
            </Grid>
            <Dialog open={open} onClose={handleModalCancel}>
                <DialogTitle>{selected.project_name}</DialogTitle>
                <DialogContent>
                    {uploading && (
                        <>
                            Loading...
                            <CircularProgress />
                        </>
                    )}
                    {!uploading && (
                        <TextareaAutosize
                            minRows={4}
                            value={issue}
                            variant="standard"
                            autoFocus
                            margin="dense"
                            id="issue"
                            placeholder="Write an issue here..."
                            style={{ width: "100%", padding: "10px" }}
                            onChange={(e) => setIssue(e.target.value)}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalCancel}>Cancel</Button>
                    <Button onClick={handlePostIssue}>Post</Button>
                </DialogActions>
            </Dialog>
            {/* List container */}
            <Grid item xs={3}>
                <Button
                    className="w-full bg-slate-100 mt-4"
                    onClick={() => {
                        setMapData(allData);
                    }}
                >
                    See All
                </Button>
                <div className="w-full my-2">
                    <Autocomplete
                        className="w-full"
                        options={options}
                        renderInput={(params) => (
                            <TextField {...params} label="Filter by" />
                        )}
                        onChange={(event, value) => setFilterBy(value)}
                    />
                </div>
                <div className="w-full mb-2">
                    {filterBy && filterBy === "Category" ? (
                        <>
                            <Autocomplete
                                className="w-full"
                                options={categories}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Category"
                                    />
                                )}
                                onChange={(event, value) =>
                                    filterHandler(value)
                                }
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <DataList
                    data={data}
                    onListItemSelect={handleDataItemSelection}
                />
            </Grid>
        </Grid>
    );
};

export default index;
