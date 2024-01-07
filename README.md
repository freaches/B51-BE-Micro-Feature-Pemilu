# How to Use Pemilu Backend Using Postman

Steps to use authorization on postman:

1. Login first and the token
2. Click the Authorization tab
3. Choose type "Bearer Token" on the left side
4. Insert the token to Token coloumn on the right side

### A. Admin
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