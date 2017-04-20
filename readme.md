# Jeopardy Game

A Jeopardy Game built in ReactJS

## Setup

Clone locally and run `npm install`

Then to start, run `npm run local`

Files will be watched and built continuously until you quit the command


## Features

- [ ] Game setup
  - [x] Enter user names
  - [x] Choose Categories
  - [ ] Polish Design
- [ ] Game play
  - [x] Display Jeopardy board
  - [x] Players and score box
  - [x] Show a question when selected
  - [x] Attribute answer to user
  - [x] Answered questions can't be selected again
  - [x] Allow closing question without scoring points
  - [ ] Allow bonus points for great answers
  - [ ] Modify users when in game
  - [ ] Limit number of items per category


## Rules

- Enter users by comma separated values
- Pick categories to play with
  - Currently, it's best to limit at about 6 categories
  - Questions can appear in multiple categories but will removed from all once asked
- User turns will switch automatically, you can see whose turn it is up top
- We don't allow buzzing in at the moment
- When you open a question you can click a button for the user who answered correctly
  - If a user doesn't know the answer, you can give it to another user for points
  - If nobody knows the answer, use the close button to remove the question and award no points
- The game ends whenever you're done or out of questions
