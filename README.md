# 

## Installation

### Clone the repository
```
git clone 
```

### Install Yarn dependencies
```
yarn install
```

### Create your local .env file
```
cp .env.production .env.development.local
vim .env.development.local
```


### Serve the application
```
PORT=3200 yarn start
```
Make a port forwarding between the dev server and your localhost
```
ssh -L 3200:localhost:3000 dev
```
You can access at http://localhost:3000

### Run the tests
```
yarn test
```

### Build for production
```
yarn start
```
