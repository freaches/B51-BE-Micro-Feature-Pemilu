# How to Use Pemilu Backend Using Postman

Steps to use authorization on postman:

1. Login first and get the token
2. Click the Authorization tab
3. Choose type "Bearer Token" on the left side
4. Insert the token to Token coloumn on the right side

### A. Admin and User
1. Register Admin
* url : http://localhost:5000/api/v1/admin/register
* method : `POST`
* Json body example :

        {
            "name" : "Slamet Wilujeng",
            "address" : "Desa Kokoyashi no 3 Pulau Cocoon",
            "gender" : "male",
            "username" : "Eslamet",
            "password" : "akusukapisang"
        }

*  Form-data body example :
```
    name        = Slamet Wilujeng,
    address     = Desa Kokoyashi no 3 Pulau Cocoon
    gender      = male
    username    = Eslamet
    password    = akusukapisang
```
note: for admin, gender and address is optional

2. Register User
* url : http://localhost:5000/api/v1/user/register
* method : `POST`
* Json body example :

        {
            "name" : "Slamet Wilujeng",
            "address" : "Desa Kokoyashi no 3 Pulau Cocoon",
            "gender" : "male",
            "username" : "Eslamet",
            "password" : "akusukapisang"
        }

*  Form-data body example :
```
    name        = Slamet Wilujeng,
    address     = Desa Kokoyashi no 3 Pulau Cocoon
    gender      = male
    username    = Eslamet
    password    = akusukapisang
```
3. Login
* Url       : http://localhost:5000/api/v1/user/login
* Method    : `POST`
* Json body example :

        {
            "username" : "Eslamet",
            "password" : "akusukapisang"
        }

note: you will received token which is used to authorization<br>