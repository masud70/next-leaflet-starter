import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import DataList from "@components/DataList/DataList";
import React, { useEffect, useState } from "react";
import Map from "@components/Map";
const DEFAULT_CENTER = [23.729211164246585, 90.40874895549243];

const options = [
    { label: "Category", value: 1 },
    { label: "Project Time", value: 2 },
];

const index = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [selected, setSelected] = useState(null);
    const [selectedPark, setSelectedPark] = useState(null);
    const [mapData, setMapData] = useState({});
    const [data, setData] = useState([]);
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
                                                <Popup>
                                                    <div className="w-100">
                                                        <div className="font-bold text-lg w-full">
                                                            Project Name:{" "}
                                                            {
                                                                mapData.project_name
                                                            }
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
                <DataList
                    data={data}
                    onListItemSelect={handleDataItemSelection}
                />
            </Grid>
        </Grid>
    );
};

export default index;
