import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Hidden,
  makeStyles,
  Slider,
  Tooltip,
  Typography,
} from '@material-ui/core'

const MS_PER_PAGE = 1000

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '15px 40px',
    color: theme.palette.grey[100],
    userSelect: 'none',
  },
  slider: {
    color: 'white',
  },
  page: {
    color: theme.palette.grey[200],
  },
  playPauseButton: {
    margin: '0 8px',
  },
}))

interface Props {
  firstPage: number
  lastPage: number
  page: number
  read: number
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

export function PageSlider({
  firstPage,
  lastPage,
  page,
  read,
  onPageChange,
}: Props) {
  const classes = useStyles()
  const [isPlaying, setIsPlaying] = useState(false)
  const [playCounter, setPlayCounter] = useState(0)

  const handleChange = useCallback(
    (_: any, value: number | number[]) => {
      const nextPage = Array.isArray(value) ? value[0] : value
      if (nextPage <= read) {
        onPageChange(nextPage)
      }
    },
    [read, onPageChange]
  )

  const handlePlayStopClick = () => {
    if (page === read) {
      handleChange(null, firstPage)
      setPlayCounter(0)
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      if (page === read) {
        setIsPlaying(false)
      } else {
        setTimeout(() => {
          handleChange(null, page + 1)
          setPlayCounter(playCounter + 1)
        }, MS_PER_PAGE)
      }
    }
  }, [playCounter, isPlaying, handleChange, setPlayCounter, page, read])

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
          <span>
            <Typography variant="caption" classes={{ root: classes.page }}>
              Page {page}
            </Typography>
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              className={classes.playPauseButton}
              onClick={handlePlayStopClick}
            >
              {read === page ? 'Reset' : isPlaying ? 'Pause' : 'Play'}
            </Button>
          </span>
        </Grid>
      </Grid>
    </div>
  )
}
