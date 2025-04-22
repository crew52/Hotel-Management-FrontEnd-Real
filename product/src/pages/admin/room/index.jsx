import {Container} from "@mui/material";
import { Outlet } from "react-router-dom";


function Room(){
    return(
        <div>
        <Container>
            <Outlet />
        </Container>
        </div>
    )
}

export default Room;