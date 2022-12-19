import path from 'path'
const fs = require('fs')
import csvToJson from 'csvtojson'

const handler = async (req, res) => {
    const dir = path.join(process.cwd(), 'public');

    
    const arr = await csvToJson().fromFile(dir + '/projects.csv')
    
    arr.forEach(row => {
        var temp = row.location_coordinates.split('(')
        temp = temp.filter((item) => {
            return item.length > 0
        })

        for(let i = 0 ; i < temp.length ; i++) {
            temp[i] = temp[i].replaceAll('),', '')
            temp[i] = temp[i].replaceAll(',"', '')
            temp[i] = temp[i].replaceAll(')', '')

            temp[i] = temp[i].split(',')
            temp[i] = {lat: Number.parseFloat(temp[i][0]), long: Number.parseFloat(temp[i][1])}
        }
        row.location_coordinates = temp
    })
    
    res.status(200).json(arr)
}

export default handler