running heroku server
in 'ormconfig.json' 
    delete 'host', 'port', 'username', 'password'
    add these
"url": "postgres://vsbizusbdfctum:bd98b6b5aaf4ab9d425c6c4e813ff3709a2ec161e0c12edfb872df21e62ae48d@ec2-3-232-22-121.compute-1.amazonaws.com:5432/d1ks7ka0kufjok",
"ssl": {
"rejectUnauthorized": false
}

run local server

add informatino for: 'host', 'port', 'username', 'password'

delete 
"url": "postgres://vsbizusbdfctum:bd98b6b5aaf4ab9d425c6c4e813ff3709a2ec161e0c12edfb872df21e62ae48d@ec2-3-232-22-121.compute-1.amazonaws.com:5432/d1ks7ka0kufjok",
"ssl": {
"rejectUnauthorized": false
}
