## API for Employee Information Portal


## INFO - Using json structed DB , stored in a flat file

## Running Instructions
1. Run `npm install`
2. Run `npm start`. The system weill run on `localhost:3000`
3. To get all the employees information, try:
 ```bash
 curl -i -X GET http://localhost:3000/api/employees/
```

4. To get an the employees information, try:
 ```bash
 curl -i -X GET http://localhost:3000/api/employees/1
```

5. To create a new entry, try: 
```bash
curl -i -X POST \
    -H "Content-Type: application/json" \
    -d '{ "fname": "Vishal", "lname": "Pandey", "hireDate": "2019-10-11", "role": "CEO" }' \
    http://localhost:3000/api/employees
```
This will create a new employee with a random id and will also append two quotes. This is the response:
```    
{"message":"The employee #4 has been created","content":{"id":4,"fname":"Vishal","lname":"Pandey","hireDate":"2019-10-11","role":"CEO","quote":"The government is a greedy piglet that suckles on a taxpayer's teat until they have sore, chapped nipples.","joke":"What happens to a frog's car when it breaks down? It gets toad."}}
```

6. To update an entry, try:
```bash
curl -i -X PUT \
    -H "Content-Type: application/json" \
    -d '{ "fname": "New", "lname": "Mishra", "hireDate": "2019-10-11", "role": "CEO" }' \
    http://localhost:3000/api/employees/4
```
    
7. To delete an entry, try:
```
curl -i -X DELETE http://localhost:3000/api/employees/3
```

If passed an invalid ID , delete would return `ID not found`


For any concerns reach out to VISHAL PANDEY - vishalpandey92@outlook.com