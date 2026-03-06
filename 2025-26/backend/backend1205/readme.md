Regisztráció / Login megvalósítás
Auth middleware + hibakezelő
Sütikkel, http only-ba tároljuk a jwt-t.
userid és role kiolvasás jwt-ből az auth middlewareben
Feltöltés pl üzenet/komment

2 db tábla: users {id, name, pass, role}, comments {id, userid, comment}

POST /register
POST /login
PATCH /change/password
Üzenetek szűrése/lekérése <- csak regisztrált userek férhetnek hozzá
GET /comments
GET /comments/:id
GET /comments?include=asdasd
POST /comments 

GET /users <- csak admin role kérhesse le
DELETE /comments/:id <- csak admin -||-

+ GET /logs <- az admin lekérheti a logot
(A logger middleware egy objektumba tárolja a logokat)