import { Box, MenuItem, Select, Typography, FormControl } from "@mui/material";
import { BLACK_COLOR } from "~/theme";
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
                <Select
                    labelId={`${valueName}-label`}
                    id={`${valueName}-select`}
                    name={valueName}
                    value={value}
                    onChange={onChange}
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
                        width: '560px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '15px',
                            height: '60px',
                            marginTop: '10px',

                            '&.Mui-focused fieldset': {
                                borderColor: BLACK_COLOR
                            },
                        },
                        '& input': {
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
