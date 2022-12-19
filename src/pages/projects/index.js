import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataList from "@components/DataList/DataList";
import React, { useEffect, useState } from "react";
import Map from "@components/Map";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from '@mui/base/TextareaAutosize';

const index = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [selected, setSelected] = useState({});
    const [issue, setIssue] = useState("");
    const [mapData, setMapData] = useState({});
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [center, setCenter] = useState([
        23.729211164246585, 90.40874895549243,
    ]);

    const fetchData = async () => {
        const req = await fetch("api/get_data");
        const data = await req.json();
        setData(data);
    };

    const handleDataItemSelection = (mapData) => {
        mapData.location_coordinates.sort((a, b) => {
            if (a.lat == b.lat) return a.long < b.long;
            return a.lat < b.lat;
        });

        console.log("Location Coordinates > ", mapData.location_coordinates);

        setMapData(mapData);
        setCenter(mapData[mapData.length / 2]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    let categories = [];

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
                    <Map center={center} zoom={11}>
                        {({ TileLayer, Marker, Popup }) => (
                            <>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {mapData.location_coordinates &&
                                    mapData.location_coordinates.map(
                                        (pos, id) => (
                                            <Marker
                                                position={[pos.lat, pos.long]}
                                                key={`project_${id}_marker_${
                                                    id + 1
                                                }`}
                                            >
                                                <Popup className="w-[400px]">
                                                    <div className="w-full space-y-2">
                                                        <div className="font-bold text-md w-full flex flex-row">
                                                            <div className="w-3/12">
                                                                Project Name:
                                                            </div>
                                                            <div className="w-9/12">
                                                                {
                                                                    mapData.project_name
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="font-bold text-md w-full flex flex-row">
                                                            <div className="w-3/12">
                                                                Agency:
                                                            </div>
                                                            <div className="w-9/12">
                                                                {
                                                                    mapData.affiliated_agency
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="font-bold text-md w-full flex flex-row">
                                                            <div className="w-3/12">
                                                                Description:
                                                            </div>
                                                            <div className="w-9/12">
                                                                {
                                                                    mapData.description
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="font-bold text-md w-full flex flex-row">
                                                            <div className="w-3/12">
                                                                Category:
                                                            </div>
                                                            <div className="w-9/12">
                                                                {
                                                                    mapData.category
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="font-bold text-md w-full flex flex-row">
                                                            <div className="w-3/12">
                                                                Total Budget:
                                                            </div>
                                                            <div className="w-9/12">
                                                                {
                                                                    mapData.total_budget
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="font-bold text-md w-full flex flex-row">
                                                            <div className="w-3/12">
                                                                Start time:
                                                            </div>
                                                            <div className="w-9/12">
                                                                {
                                                                    mapData.project_start_time
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="font-bold text-md w-full flex flex-row">
                                                            <div className="w-3/12">
                                                                End time:
                                                            </div>
                                                            <div className="w-9/12">
                                                                {
                                                                    mapData.project_completion_time
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="font-bold text-md w-full flex flex-row">
                                                            <div className="w-3/12">
                                                                Completed:
                                                            </div>
                                                            <div className="w-9/12">
                                                                {
                                                                    mapData.completion_percentage
                                                                }
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
                                                                        mapData
                                                                    );
                                                                }}
                                                            >
                                                                Post an issue
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        )
                                    )}
                            </>
                        )}
                    </Map>
                </Box>
            </Grid>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{selected.project_name}</DialogTitle>
                <DialogContent>
                    <TextareaAutosize
                        minRows={4}
                        value={issue}
                        fullWidth
                        variant="standard"
                        autoFocus
                        margin="dense"
                        id="issue"
                        placeholder="Write an issue hare..."
                        style={{ width: '100%', padding: '10px' }}
                        onChange={(e) => setIssue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => setOpen(true)}>Subscribe</Button>
                </DialogActions>
            </Dialog>
            {/* List container */}
            <Grid item xs={3}>
                <DataList
                    data={data}
                    onListItemSelect={handleDataItemSelection}
                />
            </Grid>
        </Grid>
    );
};

export default index;
