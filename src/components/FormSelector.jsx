import { Box, MenuItem, Select, Typography, FormControl } from "@mui/material";
import { GREY_LIGHT } from "~/theme";
import TextUtils from "~/utils/text.utils";

const FormSelector = ({ valueName, selectors, value, onChange, width = '560px', ...formControlProps }) => {
    const label = TextUtils.formatValueName(valueName);

    return (
        <Box sx={{ paddingTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                {label}
                <span style={{ color: 'orange' }}> *</span>
            </Typography>
            <FormControl fullWidth>
                <Select
                    labelId={`${valueName}-label`}
                    id={`${valueName}-select`}
                    name={valueName}
                    value={value}
                    onChange={onChange}
                    {...formControlProps}
                    MenuProps={{
                        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        transformOrigin: { vertical: 'top', horizontal: 'left' },
                        PaperProps: {
                            style: {
                                maxHeight: 200,
                                borderRadius: 12, // rounded dropdown
                            },
                        },
                    }}
                    sx={{
                        width: width,
                        marginTop: '10px',
                        borderRadius: '15px',
                        height: '60px',
                        backgroundColor: 'white',
                        '& .Mui-disabled': {
                            cursor: 'not-allowed',
                        },
                        '& .MuiSelect-select': {
                            padding: '10px 15px',
                            fontSize: '16px',
                        },
                    }}
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
