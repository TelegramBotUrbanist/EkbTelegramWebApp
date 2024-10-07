import { enqueueSnackbar } from 'notistack';

export const handleSubmitSnackBar = (text) =>{
  return enqueueSnackbar(text,{ variant: 'success', autoHideDuration:2000,anchorOrigin:{horizontal:'right', vertical:'top'}, style:{background:'#045BFF'} })
}