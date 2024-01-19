//Css styling for forms
import { TextField, styled } from '@mui/material';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'purple',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'purple',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'purple',
    },
  },
});

export default CssTextField;
