import { IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import BackIcon from '@material-ui/icons/ArrowBack'
import InfoIcon from '@material-ui/icons/Info'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '80px 15px 20px',
    userSelect: 'none',
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.palette.grey[300],
  },
  author: {
    color: theme.palette.grey[600],
    fontStyle: 'italic',
  },
  icon: {
    margin: '0 4px',
  },
}))

interface Props {
  title: string
  author: string
  ISBN: string
}

export function BookHeader({ title, author, ISBN }: Props) {
  const classes = useStyles()
  const history = useHistory()
  const backToHomepage = () => {
    history.push('/')
  }
  return (
    <div className={classes.root}>
      <span className={classes.titleWrapper}>
        <Tooltip title={<span>Back home to book list</span>}>
          <IconButton onClick={backToHomepage}>
            <BackIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" classes={{ root: classes.title }}>
          {title}
        </Typography>
        <Tooltip title={<span>ISBN: {ISBN}</span>}>
          <InfoIcon
            color="primary"
            classes={{ root: classes.icon }}
            fontSize="small"
          />
        </Tooltip>
      </span>
      <Typography variant="subtitle2" classes={{ root: classes.author }}>
        {author}
      </Typography>
    </div>
  )
}
