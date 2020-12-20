# people-by-page [![CircleCI](https://circleci.com/gh/kunal-mandalia/people-by-page.svg?style=svg&circle-token=3766e40b284b462514fe026606b7a1bf2f400a06)](https://circleci.com/gh/kunal-mandalia/people-by-page) [![Netlify Status](https://api.netlify.com/api/v1/badges/723555fc-1a13-499d-8b84-93a536ac1b05/deploy-status)](https://app.netlify.com/sites/lucid-wing-7c116e/deploys)

Staying on top of characters in a novel can be challenging. People By Page helps to jog your memory about who the key actors are and when they were introduced.

![Demo](./docs/demo-video.gif)


## Contribute books

PRs to add books to the collection are most welcome. At the moment they're stored as files in `./web/src/books`. See `book_9780140449242` for an example of how 'The Brothers Karamazov' is structured.

To add a new book raise a PR with the following changes:
1. Create a new file `./web/src/books/book_<ISBN>.ts`
2. Update the existing file `./web/src/books/books.ts` by adding the new book to the `books` array
3. CI tests will verify the if there's any obvious errors with the new book. If it passes it'll be reviewed and merged for the world to see
