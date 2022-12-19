import DataList from '@components/DataList/DataList';
import React, { useEffect, useState } from 'react'

const index = () => {
  const [data, setData] = useState([])
  const [itemData, setItemData] = useState({})
  const fetchData = async () => {
    const req = await fetch("api/get_data");
    const data = await req.json()
    setData(data)
  }

  const handleListItemSelect = (itemData) => {
    setItemData(itemData)
  }

  useEffect(() => {
      fetchData()
  }, [])

  return (
    <div>
      <DataList data={data}/>
    </div>
  )
}

export default index