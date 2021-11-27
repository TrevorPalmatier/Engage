import {Pool as Pool} from "pg";


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "philosophyproject",
    password: "000407949",
    port: 5432
})
