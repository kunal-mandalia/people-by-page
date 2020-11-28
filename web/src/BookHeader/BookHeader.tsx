import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '40px 15px 20px',
    backgroundColor: theme.palette.grey[900],
  },
  title: {
    color: theme.palette.grey[300],
  },
  author: {
    color: theme.palette.grey[600],
    fontStyle: 'italic',
  },
}))

interface Props {
  title: string
  author: string
}

export function BookHeader({ title, author }: Props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h4" classes={{ root: classes.title }}>
        {title}
      </Typography>
      <Typography variant="subtitle2" classes={{ root: classes.author }}>
        {author}
      </Typography>
    </div>
  )
}
