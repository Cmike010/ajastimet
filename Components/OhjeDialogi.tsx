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
    ohjeOpen : boolean;
    setOhjeOpen : Dispatch<SetStateAction<boolean>>;
}

const OhjeDialogi = (props : Props) => {
  const { ohjeOpen, setOhjeOpen } = props;  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOhjeOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={ohjeOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Ohje Ajastimet v. 0.1.1"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tällä sovelluksella voit lisätä ajastimia, joilla voit mitata erilaisten tehtävien kestoa.
            Ajastimen voi käynnistää, pysäyttää, nollata ja tallentaa aktiivisen session keston
            tehtävän yhteiskestoon. Laskureita voi myös poistaa. Huom! Sekunteja ei tallenneta, vaan 
            ainoastaan kuluneet minuutit ja tunnit.
            <br /><br />
            Laskurit tallennetaan selaimesi paikalliseen <span>&#40;</span>localstorage<span>&#41;</span> muistiin.
            Niin pitkään kun käytät samaa selainta samalla laitteella tyhjentämättä selaimesi localstorage-muistia, laskurit 
            ladataan muistista aina uudelleen. 
            <br /><br />
            Mukavaa kellottamista!
            <br /><br />
            <a target={"_blank"}  href="https://www.linkedin.com/in/mikko-keskitalo-6248b017/">https://www.linkedin.com/in/mikko-keskitalo-6248b017/</a>
            <br /><br />
            <a target={"_blank"} href="https://github.com/Cmike010?tab=repositories">https://github.com/Cmike010?tab=repositories</a> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OhjeDialogi;