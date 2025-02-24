import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { forwardRef, useEffect, useState } from 'react'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export type NotifType = {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

export type NotifPosition = {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'center' | 'right'
}

export const Notification = ({
  notif,
  position = {
    vertical: 'bottom',
    horizontal: 'left',
  },
}: {
  notif?: NotifType
  position?: NotifPosition
}) => {
  const [open, setOpen] = useState(false)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    if (notif) {
      setOpen(true)
    }
  }, [notif])

  if (notif && notif.message) {
    return (
      <Snackbar
        anchorOrigin={position}
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={notif.type}>
          {notif.message}
        </Alert>
      </Snackbar>
    )
  }
  return null
}
