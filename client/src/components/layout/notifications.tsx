import * as React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { useStoreActions, useStoreState } from 'config/easy-peasy.store';
import StoreModel from 'config/easy-peasy.store.model';

interface NotificationProps {
  store: keyof StoreModel;
}

const Notification = ({ store }: NotificationProps) => {
  const { feedback }: any = useStoreState((state) => state[store]);
  const { unsetFeedback }: any = useStoreActions((actions) => actions[store]);

  const handleClose = (event: any) => {
    unsetFeedback();
  };

  if (!feedback) return null;

  return (
    <Snackbar
      open={Boolean(feedback)}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={handleClose}
    >
      <Alert
        severity={feedback.severity}
        sx={{ color: 'black' }}
        action={
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="inherit" sx={{ color: 'black' }} />
          </IconButton>
        }
      >
        {feedback.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
