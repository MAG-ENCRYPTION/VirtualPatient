import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Slide,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React, { ReactNode, useState } from 'react'

export const ButtonWithModal = ({
  title,
  buttonText,
  children,
  buttonProps,
  dialogProps,
  actions,
  maxWidth = false,
  transition,
}: {
  title: ReactNode
  buttonText: ReactNode
  children: (closeModal: () => void) => ReactNode
  actions?: ReactNode
  maxWidth?: DialogProps['maxWidth']
  buttonProps?: ButtonProps
  dialogProps?: Omit<DialogProps, 'open'>
  transition?: boolean
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const closeModal = () => setIsModalVisible(false)

  return (
    <span>
      <Button
        onClick={() => setIsModalVisible(true)}
        variant='contained'
        {...buttonProps}
      >
        {buttonText}
      </Button>

      <Dialog
        open={isModalVisible}
        sx={{ borderRadius: 100 }}
        onClose={closeModal}
        maxWidth={maxWidth}
        TransitionComponent={transition ? Transition : undefined}
        {...dialogProps}
      >
        <DialogTitle
          color='primary'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {title}
        </DialogTitle>

        <DialogContent>{children(closeModal)}</DialogContent>

        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
          {actions}
        </DialogActions>
      </Dialog>
    </span>
  )
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})
