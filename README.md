# token-minter-api
rest api that allows you to call erc721 smart contracts on ethereum network

# Running
* npm install
* npm start
* it serves up on localhost:8080
*  There is single  post endpoint, example curl:

``` 
  curl -X POST \
  http://localhost:8080/token/mint \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: a17147db-df3a-49f2-9bc6-79409e93615a' \
  -H 'cache-control: no-cache' \
  -d '{
        "id": 1,
        "owner": "0x674e6d7e9d2ef4baa39971d58cb0953b39e6f180"
}'

```

# General Info
* Project has my private key to my ehtereum wallet hardcoded (has no real eth!!).
* It uses infura to connect to ropsten network, again for ease the private key is hardcoded.
* It has a already deployed contract called erc721Token.json.
* It points to the deployed contract which is has contract address: `0xA930f24858Df2c8BEF310ADC73Be1f6Ba3d6c990`
