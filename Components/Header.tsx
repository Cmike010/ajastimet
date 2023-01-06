import { Grid, Typography } from "@mui/material";

const Header : React.FC = () : React.ReactElement => {
    return (
        <Grid container sx={{backgroundColor : "lightGray", 
                            position : "sticky", 
                            top : 0, 
                            borderBottom : "2px solid black",
                            zIndex : "1"}}>
            <Grid item xs={12} textAlign={"center"} mt={3} mb={3}>
                <Typography variant="h3">Ajastimet</Typography>
            </Grid>
        </Grid>
    )
}

export default Header;