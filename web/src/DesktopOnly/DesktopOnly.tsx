import React, { useState } from 'react'
import Alert from '@material-ui/lab/Alert'
import { Collapse, Hidden, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: `0 ${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(
      3
    )}px`,
  },
  hide: {
    display: 'none',
  },
}))

export function DesktopOnly() {
  const classes = useStyles()
  const [show, setShow] = useState(true)
  const handleClose = () => {
    setShow(false)
  }
  return (
    <Hidden mdUp>
      <Alert
        onClose={handleClose}
        severity="info"
        classes={{ root: classes.root }}
        className={show ? '' : classes.hide}
      >
        PeopleByPage works best on Desktop and may not work on smaller devices
      </Alert>
    </Hidden>
  )
}
