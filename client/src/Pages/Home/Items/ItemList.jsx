import { Button, Typography, MenuItem, Card, Menu ,useMediaQuery} from "@mui/material";
import { useState } from "react";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

const ItemList = () => {
    const smallScreen = useMediaQuery('(max-width:700px)');

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div style={{ marginTop: 80 }}>
            <Card style={{ display: "flex", gap : smallScreen ? '8em':"15em", boxShadow: "none" }}>
                <Typography variant="h5">My Vault</Typography>

                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    style={{
                        backgroundColor: "#1252A3",
                        color: "#ffffff",
                        fontWeight: 600,
                    }}
                    onClick={handleClick}
                >
                    New
                    <ArrowDropDownOutlinedIcon />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Option 1</MenuItem>
                    <MenuItem onClick={handleClose}>Option 2</MenuItem>
                    <MenuItem onClick={handleClose}>Option 3</MenuItem>
                </Menu>
            </Card>
        </div>
    );
};

export default ItemList;
