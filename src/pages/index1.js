import Head from "next/head";
import Layout from "@components/Layout";
import Section from "@components/Section";
import Container from "@components/Container";
import Map from "@components/Map";
import Button from "@components/Button";

import styles from "@styles/Home.module.scss";
import { useEffect, useState } from "react";

const DEFAULT_CENTER = [23.729211164246585, 90.40874895549243];
const p2 = [38.90724, -77.036545];

export default function Home() {
    const [data, setData] = useState({});
    const fetchData = async () => {
        const req = await fetch("api/get_data");
        const data = await req.json();
        setData(data);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Layout>
            <Head>
                <title>Project BD | Home</title>

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Section>
                <Container>
                    <h1 className={styles.title}>Project BD</h1>
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
                </Container>
            </Section>
        </Layout>
    );
}
