import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import { Collapse, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import { Done, ExpandLess, ExpandMore, Work } from '@mui/icons-material'
import { useState } from 'react'

const DataList = ({data, onListItemSelect}) => {
    const [isOngoingOpen, setOngoingOpen] = useState(true)
    const [isCompleteOpen, setCompleteOpen] = useState(true)

    const handleOngoingListState = () => {
        setOngoingOpen(!isOngoingOpen)
    }

    const handleFinishedListState = () => {
        setCompleteOpen(!isCompleteOpen)
    }

    return (
        <Stack direction={'column'} sx={{width: '300px'}}>
            <List>
                <ListItemButton onClick={handleOngoingListState}>
                    <ListItemAvatar>
                        <Work color='warning'/>
                    </ListItemAvatar>

                    <ListItemText primary='Ongoing Projects' primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: 'medium',
                    letterSpacing: 0,}}/>
                    <ListItemIcon>
                        {isOngoingOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemIcon>
                </ListItemButton>
                <Collapse in={isOngoingOpen} timeout='auto' unmountOnExit>
                {
                    data.map((item , idx) => (
                        Number.parseFloat(item.completion_percentage) < 100 &&
                        <ListItemButton key={'ongoing_' + idx} onClick={() => onListItemSelect(item)}>
                            <ListItemText primary={item.project_name} primaryTypographyProps={{noWrap: true, variant: 'body2'}}/>
                        </ListItemButton>
                    ))
                }
                </Collapse>
            </List>

            <List>
                <ListItemButton onClick={handleFinishedListState}>
                    <ListItemAvatar>
                        <Done color='success'/>
                    </ListItemAvatar>
                    <ListItemText primary='Finished Projects' primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: 'medium',
                    letterSpacing: 0,}}/>
                    <ListItemIcon>
                        {isCompleteOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemIcon>
                </ListItemButton>
                <Collapse in={isCompleteOpen} timeout='auto' unmountOnExit>
                {
                    data.map((item , idx) => (
                        Number.parseFloat(item.completion_percentage) >= 100 &&
                        <ListItemButton key={'ongoing_' + idx} onClick={() => onListItemSelect(item)}>
                            <ListItemText primary={item.project_name} primaryTypographyProps={{noWrap: true, variant: 'body2'}}/>
                        </ListItemButton>
                    ))
                }
                </Collapse>
            </List>
        </Stack>
    )
}

export default DataList