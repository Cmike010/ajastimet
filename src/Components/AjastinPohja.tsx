import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Container, IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import NollausTallentamattaDialogi from './NollausTallentamattaDialogi';
import PoistaDialogi from './PoistaDialogi';


interface Props {
    idx : number;
    tehtava : AjastinTiedot;
    tehtavat : AjastinTiedot[];
    setTehtavat : React.Dispatch<React.SetStateAction<AjastinTiedot[]>>;
    id : string;
}

const AjastinPohja : React.FC<Props> = (props : Props) : React.ReactElement => {

    const { idx, tehtava, tehtavat, setTehtavat, id } = props;
    const [sekunnit, setSekunnit] = useState<number>(0);
    const [minuutit, setMinuutit] = useState<number|undefined>(0);
    const [tunnit, setTunnit] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<any>();
    const [onkoKaynnistetty, setOnkoKaynnistetty] = useState(false);
    const [open, setOpen] = useState(false);
    const [poistaDialogi, setPoistaDialogi] = useState(false);


    /************************************************************
     
     Luodaan intervalli ajastimen käynnistyksen yhteydessä ja kasvatetaan aikaa sekunnin välein

     ***********************************************************/
    const kaynnista = () => {
        if (!onkoKaynnistetty){
            setOnkoKaynnistetty(true);
            setIntervalId(setInterval(kasvataAikaa, 1000));
        }
    }

    const kasvataAikaa = () => {
        setSekunnit(prevSek => prevSek +1);
    }

    /* Pause */
    const taukoFunc = (interval : number) => {
        if (onkoKaynnistetty){
        clearInterval(interval);
        setOnkoKaynnistetty(false);
        }
    }

    /*Nollaus*/
    const nollaa = (interval : number) => {
            clearInterval(interval);
            setOnkoKaynnistetty(false);
            if (minuutit! > 0){
                setOpen(true);
            }

            else {
                setSekunnit(0);
            }
    }

    /*Aktiivisen ajan tallentaminen tehtäviin */

    const tallenna = (interval : number, idx : number) => {
            setOnkoKaynnistetty(false);
            clearInterval(interval);
            const apuTehtavat = tehtavat;

            if (apuTehtavat[idx].minuutit! + minuutit! > 59){
                apuTehtavat[idx].tunnit! += 1;
                apuTehtavat[idx].minuutit! += minuutit! -60;
                setMinuutit(0);
                setSekunnit(0);
            }

            if (apuTehtavat[idx].tunnit! > 23 || apuTehtavat[idx].tunnit! + tunnit > 23){
                apuTehtavat[idx].paivat! += 1;
                apuTehtavat[idx].tunnit! += tunnit - 24;
                setTunnit(0);
                setMinuutit(0);
                setSekunnit(0);
            }

            if (minuutit! > 0){
                apuTehtavat[idx].minuutit! += minuutit!;
                setMinuutit(0);
                setSekunnit(0);
            }

            else {setSekunnit(0);}

            setTehtavat([...apuTehtavat]);
    }
    /*Ajan näyttäminen*/
    const showTime = (sek : number) => {
        if (sek === 60){
            setMinuutit(prevMin => prevMin! +1);
            setSekunnit(0);
        }

        if (minuutit === 59 && sek === 60){
            setTunnit(prevTunnit => prevTunnit +1);
            setMinuutit(0);
            setSekunnit(0);
        }
        return tunnit+":"+minuutit+":"+sekunnit
    }
    /* Avataan dialogi laskurin poistamista varten */
    const poistaLaskuri = () => {
        setPoistaDialogi(true);
    }

  return (
    <>
        {open
        ?<NollausTallentamattaDialogi open={open} setOpen={setOpen} setTunnit={setTunnit} setMinuutit={setMinuutit} setSekunnit={setSekunnit}/>
        :<Card sx={{ minWidth: 275, margin : 2, display : "inline-block", float : "center"}}>
        <CardContent>
            <Container sx={{backgroundColor : "lightgray", marginBottom : 1}}>
                <Typography variant='h4' textAlign={"center"}>
                {tehtava.otsikko}
                </Typography>
            </Container>
            <Container sx={{backgroundColor : "lightgray", marginBottom : 1}}>
                <Typography variant="h5" textAlign={"center"}>
                Käytetty aika yhteensä:
                </Typography>
                <Typography textAlign={"center"}>
                {tehtavat[idx].paivat + " päivää"}
                </Typography>
                <Typography textAlign={"center"}>
                {tehtavat[idx].tunnit + " tuntia"}
                </Typography>
                <Typography textAlign={"center"}>
                {tehtavat[idx].minuutit + " minuuttia"}
                </Typography>
            </Container>
            <Container sx={{backgroundColor : "lightgray"}}>
                <Typography variant='h5' textAlign={"center"}>Aktiivisen session kesto</Typography>
                <Typography variant='h4' textAlign={"center"}>{showTime(sekunnit)}</Typography>
                <Container sx={{textAlign : "center"}}>
                    <Tooltip title="Käynnistä" placement='top'>
                        <IconButton color='success' size='large' onClick={kaynnista}>
                            <PlayCircleIcon sx={{fontSize : "50px"}}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Tauko" placement='top'>
                        <IconButton color='secondary' size='large' onClick={() => taukoFunc(intervalId)}>
                            <PauseCircleIcon sx={{fontSize : "50px"}}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Tallenna" placement='top'>
                        <IconButton color='info' size='large' onClick={() => tallenna(intervalId, idx)}>
                            <AddCircleIcon sx={{fontSize : "50px"}}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Nollaa" placement='top'>
                        <IconButton color='error' size='large' onClick={() => nollaa(intervalId)}>
                            <HighlightOffIcon sx={{fontSize : "50px"}}/>
                        </IconButton>
                    </Tooltip>
                </Container>
            </Container>
            {poistaDialogi
            ?<PoistaDialogi open={poistaDialogi} setPoistaDialogi={setPoistaDialogi} idx={idx} id={id} tehtavat={tehtavat} setTehtavat={setTehtavat}/>
            : null
            }
            <Container sx={{backgroundColor : "lightgray", paddingBottom : "10px"}}>
                <Button variant='contained' 
                        color='error'
                        onClick={poistaLaskuri}>Poista ajastin</Button>
            </Container>
        </CardContent>
        </Card>
        }
    </>
  );
}

export default AjastinPohja;