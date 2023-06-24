import Button from '@mui/material/Button';
  
    const Outlined = ({title, color}) => {
        return(
            <Button sx={{ color }} variant='outlined' disableElevation>{title}</Button>
        )
    }
    const Text = ({title, color}) => {
        return(
            <Button sx={{ color }} variant='text' disableElevation>{title}</Button>
        )
    }
    const Contained = ({title, color}) => {
        return(
            <Button sx={{ color }} variant='contained' disableElevation>{title}</Button>
        )
    }
    const ButtonComponent = {
        Outlined,
        Text,
        Contained
    }
    export default ButtonComponent

