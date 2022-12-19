import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"
import app from '../../firebase/FireApp'
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"

const Admin = () => {
    const columns = [
        { field: 'id', headerName: "ID", width: 90 },
        { field: 'project_name', headerName: 'Project Name', width: 256 },
        { field: 'category', headerName: 'Category', width: 128 },
        { field: 'issues_count', headerName: 'Number of Issues', width: 90}
    ]

    const [rows, setRows] = useState([])

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
        <Box sx={{height: '60vh', width: '100%'}}>
            <DataGrid 
            rows={rows} 
            columns={columns} 
            pageSize={5} 
            rowsPerPageOptions={[5]} 
            disableSelectionOnClick/>
        </Box>
    )
}

export default Admin