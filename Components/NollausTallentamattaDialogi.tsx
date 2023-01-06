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
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
    setTunnit : Dispatch<SetStateAction<number>>;
    setMinuutit : Dispatch<SetStateAction<number|undefined>>;
    setSekunnit : Dispatch<SetStateAction<number>>;
}

const NollausTallentamattaDialogi = (props : Props) => {
  const { open, setOpen, setTunnit, setMinuutit, setSekunnit } = props;  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  /* Käyttäjän valitessa ei */
  const handleCloseEi = () => {
    setOpen(false);
  };

  /* Käyttäjän valitessa kyllä, tyhjennetään aktiivinen aika */
  const handleCloseKylla = () => {
    setOpen(false);
    setTunnit(0);
    setMinuutit(0);
    setSekunnit(0);
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
            Haluatko varmasti nollata ajastimen tallentamatta?
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

export default NollausTallentamattaDialogi;