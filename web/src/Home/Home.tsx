import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { books } from '../books/books'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '80px 15px 20px',
    color: theme.palette.grey[200],
    backgroundColor: theme.palette.grey[900],
  },
  title: {
    fontWeight: 800,
    color: theme.palette.grey[600],
  },
  book: {
    padding: theme.spacing(2),
    color: theme.palette.grey[200],
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#2a2a2a',
    },
  },

  bookTitle: {
    color: theme.palette.grey[200],
    cursor: 'pointer',
    '&:hover': {
      color: `${theme.palette.secondary.dark}`,
    },
  },
  author: {
    fontSize: 'medium',
    fontStyle: 'italic',
    color: theme.palette.grey[500],
  },
  ISBN: {
    fontSize: 'smallest',
    color: theme.palette.grey[600],
  },
}))

export function Home() {
  const classes = useStyles()
  const history = useHistory()
  return (
    <div className={classes.root}>
      <Typography variant="h6" classes={{ root: classes.title }}>
        <span>
          People by <span>📓</span> Page
        </span>
      </Typography>
      <br />
      <br />
      {books.map((b) => (
        <div
          key={b.ISBN}
          onClick={() => {
            history.push(`/book/${b.ISBN}`)
          }}
          className={classes.book}
        >
          <Typography variant="h4">{b.name}</Typography>
          <Typography variant="caption" classes={{ root: classes.author }}>
            {b.author}
          </Typography>
          <br />
          <Typography variant="caption" classes={{ root: classes.ISBN }}>
            ISBN: {b.ISBN}
          </Typography>
        </div>
      ))}
    </div>
  )
}
