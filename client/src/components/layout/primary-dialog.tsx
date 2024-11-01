import ClearIcon from '@mui/icons-material/Clear'
import { Box, Button, Dialog, DialogActions, DialogContent, IconButton, Stack } from '@mui/material'
import useResponsive from 'hooks/useResponsive'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface DialogActionButton {
  label: string
  onClick: any
  disabled?: boolean
}

export interface DialogProps {
  open: boolean
  onClose: () => void
}

export interface PrimaryDialogProps extends DialogProps {
  children: React.ReactNode
  actionButton: DialogActionButton
  contentPx?: number
  fullScreen?: boolean
  disableCancel?: boolean
}

const PrimaryDialog = (props: PrimaryDialogProps) => {
  const { open, onClose, children, actionButton, fullScreen, contentPx = 3 } = props

  const { t } = useTranslation()
  const isSmUp = useResponsive('sm')

  const mobilePaperProps = fullScreen ? { height: 'calc(100% - 56px)', position: 'absolute', top: 56 } : undefined

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: '468px', ...mobilePaperProps } }}
      fullScreen={fullScreen}
      slots={{ backdrop: undefined }}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={onClose}>
          <ClearIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: contentPx, py: 0, overflowY: 'hidden' }}>{children}</DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Stack
          sx={{ width: 1 }}
          direction={isSmUp ? 'row' : 'column-reverse'}
          alignItems="center"
          spacing={isSmUp ? 1 : 2}
        >
          {!props.disableCancel && (
            <Button variant="outlined" onClick={onClose} fullWidth>
              {t('common.cancel')}
            </Button>
          )}

          <Button variant="contained" onClick={actionButton.onClick} disabled={actionButton.disabled} fullWidth>
            {actionButton.label}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}

export default PrimaryDialog
