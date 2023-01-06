import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import uuid from 'react-uuid';
import { useRef, useState } from 'react';

interface Props {
    open : boolean;
    setOpen : React.Dispatch<React.SetStateAction<boolean>>;
    tehtavat : AjastinTiedot[];
    setTehtavat : React.Dispatch<React.SetStateAction<AjastinTiedot[]>>
}

interface SyoteIf {
  [key : string] : any;
  nimi? : string;
  virhe? : string;
}

const LisaaUusiAjastinFormDialogi = (props : Props) => {
  const { open, setOpen, tehtavat, setTehtavat } = props;
  const syote = useRef<SyoteIf>({}); 
  const [virheet, setVirheet] = useState<SyoteIf>({});

  /* Suljetaan dialogi takaisin-nappia painettaessa*/
  const handleClose = () => {
    setOpen(false);
  };

  /* Lisätään uusi ajastin, tarkastetaan ensin onko ajastimelle annettu nimi. Virhe talteen tarvittaessa */
  const lisaaAjastin = () => {
    if (!syote.current.nimi){
      setVirheet({virhe : "Anna ajastimelle nimi!"});
    }

    if (syote.current.nimi){
      let uusiAjastin = {id : uuid(), otsikko : syote.current.nimi, paivat : 0, tunnit : 0, minuutit : 0}
      setTehtavat([...tehtavat, uusiAjastin]);
      setOpen(false);
    }
  }

  /* Otetaan käyttäjän syöte talteen */
  const syoteKasittelija = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    syote.current![e.target.name] = e.target.value;
  }

  return (
    <div>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Luo uusi ajastin</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Anna ajastimelle nimi.
        </DialogContentText>
        <TextField
          onChange={syoteKasittelija}
          autoFocus
          error={Boolean(virheet.virhe)}
          helperText={virheet.virhe}
          margin="dense"
          name="nimi"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Takaisin</Button>
        <Button onClick={lisaaAjastin}>Lisää ajastin</Button>
      </DialogActions>
    </Dialog>
  </div>
  );
}

export default LisaaUusiAjastinFormDialogi;