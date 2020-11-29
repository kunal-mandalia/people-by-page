import React, { useState } from 'react'
import {
  Grid,
  Hidden,
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
  page: number
  onPageChange: Function
}

function ValueLabelComponent(props: { children: any; open: any; value: any }) {
  const { children, open, value } = props

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  )
}

export function PageSlider({ firstPage, lastPage, page, onPageChange }: Props) {
  const classes = useStyles()

  const handleChange = (_: any, value: number | number[]) => {
    const nextPage = Array.isArray(value) ? value[0] : value
    onPageChange(nextPage)
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Hidden xsDown>
          <Grid item md={2}></Grid>
        </Hidden>
        <Grid item xs={12} md={8}>
          <Slider
            min={firstPage}
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
