import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import HistoryIcon from "@mui/icons-material/History";
import React, { useState } from "react";

const navbarItem = [
    {
        title: "My profile",
        icon: <AccountBoxIcon />,
    },
    {
        title: "Request",
        icon: <VaccinesIcon />,
    },
    {
        title: "Donation History",
        icon: <HistoryIcon />,
    },
];

function SideNavbarProfile() {

    return (
        <Box display="flex" flexDirection="column" width={400} p={2}>
            <Typography variant="h6" mb={2} fontWeight={'bold'} fontSize={40}>
                Profile
            </Typography>
            <List>
                {navbarItem.map((item, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            borderRadius: '10px',
                            mb: 1,
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#f5f5f5",
                            },
                            width: 300
                        }}
                    >
                        <ListItemAvatar>{item.icon}</ListItemAvatar>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default SideNavbarProfile;
