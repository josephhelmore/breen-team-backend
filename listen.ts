import app from './app.ts'

const { PORT = 4000 } = process.env

app.listen(PORT, (err) => {

    if (err) console.log(err)
    else
        console.log("Server is listening on port 4000")

})

