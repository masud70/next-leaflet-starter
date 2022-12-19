import { Autocomplete, TextField } from "@mui/material";
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
    const [data, setData] = useState({});
    const fetchData = async () => {
        const req = await fetch("api/get_data");
        const data = await req.json();
        setData(data);
    };
    useEffect(() => {
        fetchData();
    }, []);
    let categories = [];

    return (
        <div className="">
            <div className="w-full h-full flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-8/12 lg:w-10/12">
                    <Map center={DEFAULT_CENTER} zoom={10}>
                        {({ TileLayer, Marker, Popup }) => (
                            <>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {data.map((item, idx) =>
                                    item.location_coordinates.map((pos, id) => (
                                        <Marker
                                            position={[pos.lat, pos.long]}
                                            key={`project_${idx}_marker_${
                                                id + 1
                                            }`}
                                        >
                                            <Popup>
                                                Project Name:{" "}
                                                {item.project_name} <br />{" "}
                                                Easily customizable.
                                            </Popup>
                                        </Marker>
                                    ))
                                )}
                            </>
                        )}
                    </Map>
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
                </div>
            </div>
        </div>
    );
};

export default index;
