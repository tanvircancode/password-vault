import FoldersBar from "./SideBar/FoldersBar"
import ItemsBar from "./SideBar/ItemsBar"
import OrganizationsBar from "./SideBar/OrganizationsBar"
import {Typography,Button,Card,CardContent,CardActions} from '@mui/material';

const Home = () => {
  return (
    <div>
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        
      <OrganizationsBar />
        <ItemsBar />
        <FoldersBar />
      </CardContent>
      <CardActions>
        <Button size="small">Trash</Button>
      </CardActions>
    </Card>
        
    </div>
  )
}

export default Home;