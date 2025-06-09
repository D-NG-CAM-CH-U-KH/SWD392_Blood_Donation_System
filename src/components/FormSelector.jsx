import { Box, InputLabel, MenuItem, Select, Typography, FormControl } from "@mui/material";
import TextUtils from "~/utils/text.utils";

const FormSelector = ({ valueName, selectors, value, onChange }) => {
    const label = TextUtils.formatValueName(valueName);

    return (
        <Box sx={{ paddingTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                {label}
                <span style={{ color: 'orange' }}> *</span>
            </Typography>
            <FormControl fullWidth>
                <InputLabel id={`${valueName}-label`}>{valueName}</InputLabel>
                <Select
                    labelId={`${valueName}-label`}
                    id={`${valueName}-select`}
                    name={valueName}
                    value={value}
                    label={label}
                    onChange={onChange}
                >
                    {selectors.map((selector) => (
                        <MenuItem key={selector.value} value={selector.value}>
                            {selector.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default FormSelector;
