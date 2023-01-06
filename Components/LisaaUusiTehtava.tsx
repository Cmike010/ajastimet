import { Button, Container } from "@mui/material";
import { useState } from "react";
import LisaaUusiAjastinFormDialogi from "./LisaaUusiAjastinFormDialogi";


interface Props {
    tehtavat : AjastinTiedot[];
    setTehtavat : React.Dispatch<React.SetStateAction<AjastinTiedot[]>>;
}


const LisaaUusiTehtava : React.FC<Props> = (props : Props) : React.ReactElement => {

    const {tehtavat, setTehtavat} = props;
    const [open, setOpen] = useState(false);

    /* Avataan lisää-tehtävä dialogi */
    const lisaaTehtava = () => {
        setOpen(true);
    }
    
    return (
        <Container sx={{textAlign : "center"}}>
            {open
            ? <LisaaUusiAjastinFormDialogi open={open} setOpen={setOpen} tehtavat={tehtavat} setTehtavat={setTehtavat}/>
            : null
            }
            <Button 
                    size="large" 
                    variant="contained" 
                    onClick={lisaaTehtava}
                    sx={{fontSize : "30px", marginTop : "10px"}}>LISÄÄ AJASTIN</Button>
        </Container>
    )
}

export default LisaaUusiTehtava;