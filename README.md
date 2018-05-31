# Sticker Chat Shop

An e-commerce store bot helper to order, refund, and lookup stickers based on ReactJS and Material Design.

### [Live Demo](https://philgetz.github.io/sticker-chat-shop/)

## Run Locally

#### With npm

```
npm install
npm start
```

#### With Yarn

```
yarn
yarn start
```

## Usage

#### Available Commands

#### #lookup \<sticker-name>

```
Lookup Stickers
* <sticker-name> parameter is optional
* no parameters returns all stickers

Example
#lookup google-sticker
```

#### #order \<sticker-name>

```
Order Sticker
* <sticker-name> must match available sticker

Example
#order google-sticker
```

#refund order-\<order number>

```
Refund Sticker Orders
* must pass in "order-" + order_number

Example
#refund order-1
```

#### History Mode

See specifics of your orders and refunds by clicking on the 'HISTORY' tab to switch into history mode.

In history mode you can filter through:

* Orders
* Refunds

## Q&A

* Exercise Difficulty: **Moderate**
* How did you feel about the exercise itself? **9**
* How do you feel about coding an exercise as a step in the interview process? **10**
* What would you change in the exercise and/or process? **I believe elaboration/confirmation of allowed libraries and technologies could be helpful for participants. Other than that the process and implementation, are great!**

## Resources

#### Technologies User

* [React w/ create-react-app](https://github.com/facebook/create-react-app)
* [React Router](https://github.com/ReactTraining/react-router)
* [Material Design Components](https://github.com/jamesmfriedman/rmwc)
