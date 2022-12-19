import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"
import app from '../../firebase/FireApp'
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"
import Map from "@components/Map";

const Admin = () => {
    const columns = [
        { field: 'id', headerName: "ID", width: 90 },
        { field: 'project_name', headerName: 'Project Name', width: 512 },
        { field: 'category', headerName: 'Category', width: 256 },
        { field: 'issues_count', headerName: 'Number of Issues', width: 256}
    ]

    const [rows, setRows] = useState([])
    const [mapData, setMapData] = useState([]);
    const [center, setCenter] = useState([
        23.729211164246585, 90.40874895549243,
    ]);

    const fetchData = async () => {
        const req = await fetch('/api/get_data')
        const csvData = await req.json()

        const db = getFirestore(app)
        const snap = await getDocs(collection(db, 'projects'))

        const temp = []

        snap.forEach((item, idx) => {
            const data = item.data()
            
            let i = 0
            for( ; i < csvData.length ; i++) {
                if(csvData[i].project_name === data.name) break
            }

            if(i === csvData.length) return

            temp.push({id: temp.length, project_name: data.name, category: csvData[i].category, issues_count: data.issues.length})
        })

        console.log('rows', temp)

        setRows(temp)
    }

    useEffect(() => { fetchData() }, [])

    return (
        <Box sx={{height:'100vh'}} >
                <Map
                    style={{
                        border: "2px solid gray",
                        borderRadius: "5px",
                        maxWidth:'80%',
                        padding:'10px',
                        marginBottom:'20px',
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
            <DataGrid
            sx={{marginTop:'20px',height:'400px'}} 
            rows={rows} 
            columns={columns} 
            pageSize={5} 
            rowsPerPageOptions={[5]} 
            disableSelectionOnClick/>
        </Box>
    )
}

export default Admin
