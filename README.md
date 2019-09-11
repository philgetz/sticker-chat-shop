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

#### #refund order-\<order-number>

```
Refund Sticker Orders
* must pass in "order-" + order-number

Example
#refund order-1
```

#### History Mode

See specifics of your orders and refunds by clicking on the 'HISTORY' tab to switch into history mode.

In history mode you can filter through:

* Orders
* Refunds


## Resources

#### Technologies Used

* [React w/ create-react-app](https://github.com/facebook/create-react-app)
* [React Router](https://github.com/ReactTraining/react-router)
* [Material Design Components](https://github.com/jamesmfriedman/rmwc)
