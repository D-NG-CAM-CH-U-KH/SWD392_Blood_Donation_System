import { TextField as MuiTextField } from "@mui/material";

const TextField = ({ value, onChange, placeholder = '', type = 'text' }) => {
  return (
    <MuiTextField
      placeholder={placeholder}
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      sx={{
        width: '560px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '15px',
          height: '60px',
          marginTop: '10px',
          '& fieldset': {
            borderColor: 'blue',
          },
          '&:hover fieldset': {
            borderColor: 'blue',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'blue',
          },
        },
        '& input': {
          padding: '10px 15px',
          fontSize: '16px',
        },
      }}
    />
  );
};

export default TextField;
