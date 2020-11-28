import React, { useState } from 'react'
import {
  Grid,
  makeStyles,
  Slider,
  Tooltip,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '15px 40px',
    color: theme.palette.grey[100],
    backgroundColor: theme.palette.grey[900],
  },
  slider: {
    color: 'white',
  },
  page: {
    color: theme.palette.grey[200],
  },
}))

interface Props {
  firstPage: number
  lastPage: number
}

function ValueLabelComponent(props: { children: any; open: any; value: any }) {
  const { children, open, value } = props

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  )
}

export function PageSlider({ firstPage, lastPage }: Props) {
  const classes = useStyles()
  const [page, setPage] = useState(firstPage)

  const handleChange = (_: any, value: number | number[]) => {
    if (Array.isArray(value)) {
      setPage(value[0])
    } else {
      setPage(value)
    }
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={8}>
          <Slider
            min={1}
            max={lastPage}
            step={1}
            color="primary"
            value={page}
            onChange={handleChange}
            classes={{
              colorPrimary: classes.slider,
            }}
            ValueLabelComponent={ValueLabelComponent}
          />
          <Typography variant="caption" classes={{ root: classes.page }}>
            Page {page}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
