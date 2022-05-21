# apple-client-secret-generator
A NodeJS script that generates client_secret for Apple Sign in

## Quickstart

This repo could start in a Docker container, but before you start to build the image you have to create a folder named `secrets` which must contains two files

| File name | Description |
|---|---|
|.env|The env file that contains the Apple Developer Account info|
|private.key|The private key of the project (see the [Apple guide](#apple-developer-account))|

The `.env` file must contain those vars

|Var name | Description|
|---|---|
|`teamId` | Apple Team ID|
|`clientId` | Bundle name|
|`keyId` | Private key ID|

<details>
  <summary>Example of .env</summary>
  
  ```
  teamId=123456789A
  clientId=com.mycompany.app
  keyId=ZQ12345678
  ```
</details>

Once you have done all the above steps you can procede to build the image from the Dockerfile running

```sh
$ docker build . --tag solutiontech/apple-client-secret-generator
```

Then run the image interactively

```sh
$ docker run -it solutiontech/apple-client-secret-generator
```

The output in the console look something like this

```sh
key eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsI...
validity 180 days
```

Save the key and enjoy!
The validity is set to **180 days** accordingly with the *max expiration time* in the [Apple documentation](https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens#3262048)

## Apple Developer Account

Below a simple guide to find and retrieve the informations that you need to make the script work

### Apple Sign in Private key

By going to [Keys](https://developer.apple.com/account/resources/authkeys/list) create a new `Sign in with Apple` key being sure of select the right `Primary App ID` in the key configuration (see [Client ID](#client-id)]

![image (2)](https://user-images.githubusercontent.com/75322363/169670340-23b92583-55fd-40e5-9f6c-cf74074147a5.jpg)

once done hit the `Register` button, wait until done after you will be asked to download the key **it is a one time download so make sure of download the key and save it in a secure place** otherwise you have to recreate it by revoking the existing one

![image (4)](https://user-images.githubusercontent.com/75322363/169670503-b5dbe037-7af3-4e86-b05e-102fef178945.jpg)

In order to make the file suitable for this script you have to rename the key from `AuthKey_A123456789.p8` to `private.key` also write down the `Key ID` for the `.env` (it is either in the file name preceded by `_` or in the download page as the screenshot above)

### Apple Team ID

The Apple Team ID could be found either in the [Membership Details](https://developer.apple.com/account/#!/membership) of your Apple Developer account

![image](https://user-images.githubusercontent.com/75322363/169670134-f2a0b6f8-f842-462a-8b16-e353eabe91ff.jpg)

or in the top right corner by going in the [Certificates Manager](https://developer.apple.com/account/resources/certificates/list)

![image (1)](https://user-images.githubusercontent.com/75322363/169670140-b62b0fe7-4b66-4625-a216-a54fdb6cd8b4.jpg)

### Client ID

The Client ID it is nothing else than the budle name of the app, you could retrive it from the Xcode project or from the [Identifiers](https://developer.apple.com/account/resources/identifiers/list) section. **Make sure that it the same bundle name that you selected for the key**
