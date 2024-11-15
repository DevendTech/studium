import pg from 'pg'

const banco = new pg.Pool({
  user:'postgres',
  host:'localhost',
  database:'postgres',
  password:'pablo01020304',
  port:5432
})

export default banco