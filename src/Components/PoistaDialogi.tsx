import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    idx : number;
    open : boolean;
    setPoistaDialogi : Dispatch<SetStateAction<boolean>>;
    id : string;
    tehtavat : AjastinTiedot[];
    setTehtavat : Dispatch<SetStateAction<AjastinTiedot[]>>;
}

const PoistaDialogi = (props : Props) => {
  const { idx, open, setPoistaDialogi, id, tehtavat, setTehtavat } = props;  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  /* Käyttäjän valitessa ei */
  const handleCloseEi = () => {
    setPoistaDialogi(false);
  };

  /* Käyttäjän valitessa kyllä, poistetaan tehtävä */
  const handleCloseKylla = () => {
    setTehtavat([...tehtavat.filter((tehtava : AjastinTiedot, index : number) => index !== Number(idx))])
    setPoistaDialogi(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseEi}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Varoitus!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Haluatko varmasti poistaa ajastimen {tehtavat[idx].otsikko}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseEi}>
            En
          </Button>
          <Button onClick={handleCloseKylla} autoFocus>
            Kyllä
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PoistaDialogi;