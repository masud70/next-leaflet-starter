import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataList from "@components/DataList/DataList";
import React, { useEffect, useState } from "react";
import Map from "@components/Map";
import Head from "next/head";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const index = () => {
    const [selected, setSelected] = useState({});
    const [issue, setIssue] = useState("");
    const [mapData, setMapData] = useState([]);
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [center, setCenter] = useState([
        23.729211164246585, 90.40874895549243,
    ]);

    const fetchData = async () => {
        const req = await fetch("api/get_data");
        const data = await req.json();
        setData(data);
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

    useEffect(() => {
        fetchData().then((data) => {
            setMapData(data);
        });
    }, []);

    return (
        <Grid container columns={10} columnSpacing={1} justifyContent='space-between'>
        {/* Grid View Container */}
        {/* Map Container */}
        <Grid item xs={7}>
            <Box sx={{ margin: '16px' }}>
            <Map center={center} zoom={11}>
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
                                                                    issue or concern
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
            {/* <div className="w-full h-full flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-8/12 lg:w-10/12">
                    Map Goes Here
                </div>
                <div className="w-full md:w-4/12 lg:w-2/12 bg-slate-400">
                    <div className="py-4 px-3 justify-center flex w-full flex-col space-y-2">
                        <div className="w-full">
                            <Autocomplete
                                className="w-full"
                                options={options}
                                renderInput={(params) => (
                                    <TextField {...params} label="Filter by" />
                                )}
                                onChange={(event, value) => setSelected(value)}
                            />
                        </div>
                        <div className=" space-y-2">
                            {selected && selected.value === 1 ? (
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
                                    />
                                </>
                            ) : selected && selected.value === 2 ? (
                                <>
                                    <TextField
                                        className="w-full"
                                        label="Lat"
                                        variant="outlined"
                                    />
                                    <TextField
                                        className="w-full"
                                        label="Lng"
                                        variant="outlined"
                                    />
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>}
            </div> */}
        </Grid>
        {/* List container */}
        <Grid item xs={3}>
            <DataList data={data} onListItemSelect={handleDataItemSelection}/>
        </Grid>
    </Grid>
    );
};

export default index;
