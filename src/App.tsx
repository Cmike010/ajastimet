import { Container, Grid, IconButton, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AjastinPohja from "./Components/AjastinPohja";
import Header from "./Components/Header";
import LisaaUusiTehtava from "./Components/LisaaUusiTehtava";
import HelpIcon from '@mui/icons-material/Help';
import OhjeDialogi from "./Components/OhjeDialogi";


function App() {
  const [tehtavat, setTehtavat] = useState<AjastinTiedot[]>([])
  const [ohjeOpen, setOhjeOpen] = useState(false);
  const kaynnistetty : React.MutableRefObject<boolean> = useRef(false);                                                           
  

  /* Haetaan tiedot localstoragesta jos löytyy... */
  console.log("Ajastimet")
  useEffect(() => {
    if (!kaynnistetty.current){
      if (localStorage.getItem("tehtavalista")) {
        setTehtavat(JSON.parse(String(localStorage.getItem("tehtavalista"))).map((tehtava : AjastinTiedot) => {
          return tehtava;
        }))
      }
    }

    return () => {
      kaynnistetty.current = true;
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("tehtavalista", JSON.stringify(tehtavat));
  }, [tehtavat]);

    return (
    <>
      <Header/>
      <Grid container justifyContent={"start"} pl={3} sx={{position : "sticky", top : "100px"}}>
        <Grid item>
          <Tooltip title="Ohje" placement="right">
            <IconButton color="info" onClick={() => (setOhjeOpen(true))}>
              <HelpIcon sx={{fontSize : "40px"}}/>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {ohjeOpen
      ? <OhjeDialogi ohjeOpen={ohjeOpen} setOhjeOpen={setOhjeOpen}/>
      : null
      }
      <Container sx={{maxWidth : "80%", textAlign : "center", marginBottom : "20px"}}>
        {(tehtavat)
        ? tehtavat.map((tehtava : AjastinTiedot, idx : number) => {
          return (
            <AjastinPohja key={idx} idx={idx} tehtava={tehtava} tehtavat={tehtavat} setTehtavat={setTehtavat} id={tehtava.id}/>
          )
        })
        : null
        }
        <LisaaUusiTehtava tehtavat={tehtavat} setTehtavat={setTehtavat}/>
      </Container>
    </>
  );
}

export default App;
