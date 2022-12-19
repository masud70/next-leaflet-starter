import { useEffect, useState } from "react";
import Map from "@components/Map";

const DEFAULT_CENTER = [23.729211164246585, 90.40874895549243];
const p2 = [38.90724, -77.036545];

<Map
    className={styles.homeMap}
    width="800"
    height="400"
    center={DEFAULT_CENTER}
    zoom={12}
>
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
                        key={`project_${idx}_marker_${id + 1}`}
                    >
                        <Popup>
                            Project Name: {item.project_name} <br /> Easily
                            customizable.
                        </Popup>
                    </Marker>
                ))
            )}
        </>
    )}
</Map>;
