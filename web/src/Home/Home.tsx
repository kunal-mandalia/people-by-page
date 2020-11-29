import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { books } from '../books/books'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '80px 15px 20px',
    color: theme.palette.grey[200],
    backgroundColor: theme.palette.grey[900],
  },
  title: {
    fontWeight: 800,
    color: theme.palette.grey[500],
  },
  bookTitle: {
    color: theme.palette.grey[200],
    cursor: 'pointer',
    '&:hover': {
      color: `${theme.palette.secondary.dark}`,
    },
  },
  author: {
    fontStyle: 'italic',
    color: theme.palette.grey[500],
  },
}))

export function Home() {
  const classes = useStyles()
  const history = useHistory()
  return (
    <div className={classes.root}>
      <Typography variant="overline" classes={{ root: classes.title }}>
        <span>
          PEOPLE BY <span>📓</span> PAGE
        </span>
      </Typography>
      <br />
      <br />
      {books.map((b) => (
        <div key={b.ISBN}>
          <Typography
            variant="h4"
            className={classes.bookTitle}
            onClick={() => {
              history.push(`/book/${b.ISBN}`)
            }}
          >
            {b.name}
          </Typography>
          <Typography variant="caption" className={classes.author}>
            {' '}
            - {b.author}
          </Typography>
        </div>
      ))}
    </div>
  )
}
