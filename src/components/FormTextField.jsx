import { TextField, Box, Typography } from "@mui/material";
import { BLACK_COLOR } from "~/theme";
import TextUtils from "~/utils/text.utils";

function formatFieldName(fieldKey) {
    return fieldKey
        // Insert space before uppercase letters that are followed by lowercase letters
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/([a-z])([A-Z])/g, '$1 $2')          // insert space between lower & upper case
        .replace(/^./, str => str.toUpperCase())      // capitalize first letter
        .trim();
}

const FormTextField = ({ valueName, value, onChange, type = 'text', width = '560px', ...textFieldProps }) => {
    const label = TextUtils.formatValueName(valueName);

    return <Box sx={{ paddingTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
            {label}
            <span style={{ color: 'orange' }}> *</span>
        </Typography>
        <TextField
            placeholder={`Enter your ${label}`}
            variant="outlined"
            type={type}
            name={valueName}
            value={value}
            onChange={onChange}
            fullWidth
            {...textFieldProps}
            sx={{
                width: { width },
                '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    height: '60px',
                    marginTop: '10px',

                    '&.Mui-focused fieldset': {
                        borderColor: BLACK_COLOR
                    },
                },
                '& .Mui-disabled': {
                    cursor: 'not-allowed',
                },
                '& input': {
                    padding: '10px 15px',
                    fontSize: '16px',
                },
            }}
        />
    </Box>
}



export default FormTextField;