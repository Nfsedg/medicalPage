import { Dialog as MUIDialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'

import { Close } from '@mui/icons-material'

const Dialog = ({ isOpen, Actions, textContent, content, onClose, title, styles = {}, maxWidth = 'sm', ...rest }) => (
    <MUIDialog {...rest} maxWidth={maxWidth} fullWidth open={isOpen} onClose={onClose} sx={styles}>
        <DialogTitle>
            {title}
            {onClose ? (
                <IconButton onClick={onClose} sx={{ ml: 'auto', position: 'absolute', top: '10px', right: '10px' }}>
                    <Close />
                </IconButton>
            ) : null}
        </DialogTitle>
        <DialogContent>
            {Boolean(content) && content}
            {Boolean(textContent) && <DialogContentText>{textContent}</DialogContentText>}
        </DialogContent>
        <DialogActions>{Actions}</DialogActions>
    </MUIDialog>
)

export default Dialog