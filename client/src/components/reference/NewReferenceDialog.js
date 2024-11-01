import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Switch,
  Typography,
  Divider,
} from '@mui/material'
import ReferenceItem from './ReferenceItem'
import FAB from '../layout/FAB'
import AddIcon from '@mui/icons-material/Add'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useTranslation } from 'react-i18next'
import useToggle from 'hooks/useToggle'
import NeedPremiumDialog from 'components/users/need-premium-dialog'

const NewReferenceDialog = () => {
  const [open, setOpen] = React.useState(false)

  const { t } = useTranslation()

  const { userIsPremium } = useStoreState(state => state.users)
  const { createReference } = useStoreActions(actions => actions.references)
  const { referenceCount } = useStoreState(state => state.references)
  const { value: isOpenPremiumDialog, toggleValue: toggleOpenPremiumDialog } = useToggle()

  const [reference, setReference] = useState({
    name: '',
    protein: 0,
    carbs: 0,
    fat: 0,
    portion: 0,
    isDirty: false,
    isAlcohol: false,
  })

  const onChange = e => {
    setReference({ ...reference, [e.target.name]: e.target.value })
  }

  const onChangeSwitch = e => {
    setReference({ ...reference, [e.target.name]: !reference[e.target.name] })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = () => {
    createReference(computedReference)
    handleClose()
  }

  const { name, protein, carbs, fat, portion, isDirty, isAlcohol } = reference

  const computedReference = {
    ...reference,
    name: reference.name.toLowerCase(),
    protein: protein / portion,
    carbs: carbs / portion,
    fat: fat / portion,
  }

  const cantAddMoreReferences = referenceCount >= 10 && !userIsPremium

  const referenceNameHasSpaces = name.match(/\s+/)

  return (
    <>
      <NeedPremiumDialog open={isOpenPremiumDialog} onClose={toggleOpenPremiumDialog} />

      <FAB
        show
        Icon={AddIcon}
        onClick={cantAddMoreReferences ? toggleOpenPremiumDialog : handleClickOpen}
        tooltipTitle={cantAddMoreReferences ? t('references.referenceLimits') : t('references.addReference')}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle>{t('references.addReference')}</DialogTitle>
        <DialogContent>
          <TextField
            error={referenceNameHasSpaces}
            helperText={referenceNameHasSpaces && 'Name cannot contain spaces'}
            autoFocus
            margin="normal"
            label={t('references.name')}
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            fullWidth
          />

          <TextField
            margin="normal"
            label={t('references.portionSize')}
            type="number"
            name="portion"
            value={portion}
            onChange={onChange}
            fullWidth
          />

          <TextField
            margin="normal"
            label={t('common.protein')}
            type="number"
            name="protein"
            value={protein}
            onChange={onChange}
            fullWidth
          />

          <TextField
            margin="normal"
            label={t('common.carbs')}
            type="number"
            name="carbs"
            value={carbs}
            onChange={onChange}
            fullWidth
          />

          <TextField
            margin="normal"
            label={t('common.fat')}
            type="number"
            name="fat"
            value={fat}
            onChange={onChange}
            fullWidth
          />

          <FormControlLabel
            control={<Switch checked={isDirty} onChange={onChangeSwitch} name="isDirty" color="primary" />}
            label={t('references.dirty')}
          />

          <FormControlLabel
            control={<Switch checked={isAlcohol} onChange={onChangeSwitch} name="isAlcohol" color="primary" />}
            label={t('references.alcohol')}
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" gutterBottom>
            {t('references.preview')}
          </Typography>
          <ReferenceItem reference={computedReference} preview />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('actions.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            color="primary"
            disabled={portion === 0 || name === '' || referenceNameHasSpaces}
          >
            {t('actions.add')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewReferenceDialog
