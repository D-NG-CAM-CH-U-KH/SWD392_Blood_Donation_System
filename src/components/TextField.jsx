import { TextField as MuiTextField } from "@mui/material";

const TextField = ({ value, onChange, placeholder = '', type = 'text'}) => {
  return (
    <MuiTextField
      id="outlined-basic"
      placeholder={placeholder}
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      sx={{
        width: '560px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '15px',
          borderColor: 'blue',
          height: '60px',
          marginTop: '10px',
          '&.Mui-focused fieldset': {
            borderColor: 'blue'
          }
        },
        '& input': {
          padding: '10px 15px',
          fontSize: '16px'
        }
      }}
    />
  );
};

export default TextField;
