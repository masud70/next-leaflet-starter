import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Done from "@mui/icons-material/Done";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Work from "@mui/icons-material/Work";

import { useState } from "react";

const DataList = ({ data, onListItemSelect }) => {
    const [isOngoingOpen, setOngoingOpen] = useState(true);
    const [isCompleteOpen, setCompleteOpen] = useState(false);

    const handleOngoingListState = () => {
        setOngoingOpen(!isOngoingOpen);
    };

    const handleFinishedListState = () => {
        setCompleteOpen(!isCompleteOpen);
    };

    return (
        <div className="h-screen overflow-auto mr-2">
            <Stack direction={"column"} sx={{ width: "300px',marginTop:'30px" }}>
                <List>
                    <ListItemButton sx={{backgroundColor:'#f3f1f1',borderRadius:'5px'}} onClick={handleOngoingListState}>
                        <ListItemAvatar>
                            <Work color="warning" />
                        </ListItemAvatar>

                        <ListItemText
                            primary="Ongoing Projects"
                            primaryTypographyProps={{
                                fontSize: 20,
                                fontWeight: "medium",
                                letterSpacing: 0,
                            }}
                        />
                        <ListItemIcon>
                            {isOngoingOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                    </ListItemButton>
                    <Collapse in={isOngoingOpen} timeout="auto" unmountOnExit>
                        {data.map(
                            (item, idx) =>
                                Number.parseFloat(item.completion_percentage) <
                                    100 && (
                                    <ListItemButton sx={{backgroundColor:'#f3f1f1',margin:'1px',borderRadius:'4px'}}
                                        key={"ongoing_" + idx}
                                        onClick={() => onListItemSelect(item)}
                                    >
                                        <ListItemText
                                            primary={item.project_name}
                                            primaryTypographyProps={{
                                                noWrap: true,
                                                variant: "body2",
                                            }}
                                        />
                                    </ListItemButton>
                                )
                        )}
                    </Collapse>
                </List>

                <List>
                    <ListItemButton sx={{backgroundColor:'#f3f1f1',borderRadius:'5px'}} onClick={handleFinishedListState}>
                        <ListItemAvatar>
                            <Done color="success" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Finished Projects"
                            primaryTypographyProps={{
                                fontSize: 20,
                                fontWeight: "medium",
                                letterSpacing: 0,
                            }}
                        />
                        <ListItemIcon>
                            {isCompleteOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                    </ListItemButton>
                    <Collapse in={isCompleteOpen} timeout="auto" unmountOnExit>
                        {data.map(
                            (item, idx) =>
                                Number.parseFloat(item.completion_percentage) >=
                                    100 && (
                                    <ListItemButton sx={{backgroundColor:'#f3f1f1',margin:'1px',borderRadius:'4px'}}
                                        key={"ongoing_" + idx}
                                        onClick={() => onListItemSelect(item)}
                                    >
                                        <ListItemText
                                            primary={item.project_name}
                                            primaryTypographyProps={{
                                                noWrap: true,
                                                variant: "body2",
                                            }}
                                        />
                                    </ListItemButton>
                                )
                        )}
                    </Collapse>
                </List>
            </Stack>
        </div>
    );
};

export default DataList;
