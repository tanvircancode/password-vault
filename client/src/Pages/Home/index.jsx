import FoldersBar from "./SideBar/FoldersBar";
import ItemsBar from "./SideBar/ItemsBar";
import OrganizationsBar from "./SideBar/OrganizationsBar";
import { Button, Card, CardContent, Divider, Typography, useMediaQuery  } from "@mui/material";

const Home = () => {
    const matchesOne = useMediaQuery('(min-width:600px)');
    const matchesTwo = useMediaQuery('(max-width:500px)');

    
    return (
        <Car d sx={{ ...(matchesTwo ? {width: "190px"} : {width: "250px"}), marginTop: 10, ...(matchesOne && { marginLeft: '20px' })}}>
            <CardContent style={{ border: "1px solid #e0e0e0", padding:0 }}>
                <div
                    style={{   
                        border: "1px solid #e0e0e0",
                        padding: 10,
                        backgroundColor: "#F7F7F7",
                    }}
                >
                    <Typography
                        variant="h8"
                        style={{
                            fontWeight: "bold",
                            marginLeft: 30,
                            marginBottom: 10,
                        }}
                    >
                        FILTERS
                    </Typography>
                </div>

                <OrganizationsBar />
                <Divider />
                <ItemsBar />
                <FoldersBar />

                <Button style={{ padding: 10, marginLeft: 22 }}>Trash</Button>
            </CardContent>
        </Card>
    );
};

export default Home;
