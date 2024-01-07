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

note: you will received token which is used to authorization

### B. Articles

1. Getting all articles (no authorization)
* Url       : http://localhost:5000/api/v1/articles
* Method    : `GET`
  
2. Getting a article (no authorization)
* Url       : http://localhost:5000/api/v1/articles/{article-id}
* Method    : `GET`

3. Create a article (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/articles/add
* Method    : `POST`
* Form-data body example :
```
    title       = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    description = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    image       = miku.png
```

4. Update a article (required admin authorizaton)  
* Url       : http://localhost:5000/api/v1/articles/{article-id}
* Method    : `PATCH`
* Form-data body example :
```
    title       = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    description = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    image       = miku.png
```

5. Delete a article (required admin authorization)
* Url       : http://localhost:5000/api/v1/articles/{article-id}
* Method    : `DELETE`

### C. Voter

1. Getting all vote (required admin authorization)
* Url       : http://localhost:5000/api/v1/voters/findall
* Method    : `GET`

2. Voting (required authorization)
* Url       : http://localhost:5000/api/v1/voters/vote
* Method    : `POST`
* Json body example :

        {
            "paslonNumber" : 1
        }

note : user and admin can do voting

### D. Paslon

1. Getting all paslon (no authorization)
* Url       : http://localhost:5000/api/v1/paslons
* Method    : `GET`
  
2. Getting a paslon (no authorization)
* Url       : http://localhost:5000/api/v1/paslons/{paslon-id}
* Method    : `GET`

3. Create a paslon (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/paslons/add
* Method    : `POST`
* Form-data body example :
````
    name          = Slamet Wilujeng
    visionMission = Menghilangkan pinjol dari dumbways
    image         = slamet.png
````
4. Update a paslon (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/paslons/{paslon-id}
* Method    : patch
* Form-data body example :
```
    name          = New Neo Slamet Wilujeng
    visionMission = Menghilangkan pinjol dari dumbways dan ****
    image         = slamet.png
```
5. Delete a paslon (required admin authorization)
* Url       : http://localhost:5000/api/v1/paslons/{paslon-id}
* Method    : `DELETE`

### E. Partai

1. Getting all partais (no authorization)
* Url       : http://localhost:5000/api/v1/partais
* Method    : `GET`
  
2. Getting a partai (no authorization)
* Url       : http://localhost:5000/api/v1/partais/{partai-id}
* Method    : `GET`

3. Create a partai (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/partais/add
* Method    : `POST`
* Form-data body example :
```
    name          = PBG
    leader        = Slamet Wilujeng
    visionMission = Menghijaukan bumi
    address       = Hutan Jaya
    image         = slamet.png
    paslonId      = 1
```
4. Update a partai (required admin authorizaton)
* Url       : http://localhost:5000/api/v1/partais/{{paslon-id}}
* Method    : `PATCH`
* Form-data body example :
```
    name          = PBG
    leader        = Slamet Wilujeng
    visionMission = Menghijaukan bumi
    address       = Hutan Jaya
    image         = slamet.png
    paslonId      = 1
```
5. Delete a partai (required admin authorization)
* Url       : http://localhost:5000/api/v1/partais/{{paslon-id}}
* Method    : `DELETE`

