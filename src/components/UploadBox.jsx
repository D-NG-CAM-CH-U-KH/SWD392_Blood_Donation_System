import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/CloudUpload';
import { BLUE_NORMAL, RED_700 } from '~/theme';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ClearIcon from '@mui/icons-material/Clear';

const UploadBox = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFile = (file) => {
        setFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            handleFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    });

    const handlePaste = (event) => {
        const items = event.clipboardData.items;
        for (const item of items) {
            if (item.type.startsWith('image/')) {
                const pastedFile = item.getAsFile();
                handleFile(pastedFile);
                break;
            }
        }
    };

    return (
        <Box
            onPaste={handlePaste}
            sx={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 200,
            }}
        >
            {!previewUrl ? (
                <Box sx={{ display: 'flex', gap: 4 }}>
                    {/* Drag & Drop Area */}
                    <Box
                        {...getRootProps()}
                        sx={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '20px',
                            borderRight: '1px solid #eee',
                        }}
                    >
                        <input {...getInputProps()} />
                        <UploadIcon sx={{ fontSize: 60, color: '#90caf9' }} />
                        <Typography variant="h6" mt={1}>
                            Drag and drop
                        </Typography>
                    </Box>

                    {/* Browse & Paste */}
                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="body1" mb={2}>Or choose a file</Typography>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{
                                width: '280px',
                                backgroundColor: BLUE_NORMAL,
                                color: 'white',
                                borderRadius: '5px'
                            }}
                        >
                            Browse your files
                            <input hidden type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                marginTop: 2,
                                width: '280px',
                                backgroundColor: 'white',
                                color: BLUE_NORMAL,
                                borderRadius: '5px',
                                borderColor: BLUE_NORMAL
                            }}
                            onClick={() => alert('Use Ctrl + V to paste an image')}
                        >
                            <ContentPasteIcon sx={{ paddingRight: '5px' }} />
                            Paste from clipboard
                        </Button>
                        <Typography mt={2} fontSize="small" color="text.secondary">
                            Supported file types: <b>.jpg, .jpeg, .png, .webp</b>
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    {/* Clear Button in its own line */}
                    <ClearIcon
                        onClick={() => {
                            setFile(null);
                            setPreviewUrl(null);
                        }}
                        sx={{
                            fontSize: 32,
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            padding: '4px',
                            cursor: 'pointer',
                            '&:hover': {
                                color: RED_700,
                                transform: 'scale(1.1)',
                            },
                        }}
                    />

                    {/* Image Preview */}
                    <Box
                        component="img"
                        src={previewUrl}
                        alt="Preview"
                        sx={{
                            maxWidth: '100%',
                            maxHeight: 400,
                            borderRadius: 2,
                            border: '1px solid #ccc',
                        }}
                    />
                </Box>
            )
            };
        </Box>
    )
}
export default UploadBox;
