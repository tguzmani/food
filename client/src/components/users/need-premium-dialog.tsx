import React from 'react'
import PrimaryDialog, { DialogProps } from 'components/layout/primary-dialog'
import { useTranslation } from 'react-i18next'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { Stack, Typography } from '@mui/material'

interface NeedPremiumDialogProps extends DialogProps {
  body?: string
}

const NeedPremiumDialog = (props: NeedPremiumDialogProps) => {
  const { t } = useTranslation()

  const actionButton = {
    label: t('common.ok'),
    onClick: props.onClose,
  }

  return (
    <PrimaryDialog open={props.open} onClose={props.onClose} actionButton={actionButton} disableCancel>
      <Stack spacing={4} alignItems="center">
        <WorkspacePremiumIcon sx={{ fontSize: 80 }} />

        <Typography variant="body1">{props.body ?? t('common.premiumFeature')}</Typography>
      </Stack>
    </PrimaryDialog>
  )
}

export default NeedPremiumDialog
