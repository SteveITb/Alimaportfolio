const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const path = require("path")

dotenv.config()

const News = require("./models/News")

const app = express()

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))

app.get("/", async (req,res)=>{

    const news = await News.find().sort({date:-1})

    res.render("index",{news})

})

app.get("/admin",(req,res)=>{
    res.render("admin")
})

app.post("/admin/news", async (req,res)=>{

    const newPost = new News({
        title:req.body.title,
        content:req.body.content
    })

    await newPost.save()

    res.redirect("/")
})

app.listen(3000,()=>{
    console.log("Server running http://localhost:3000")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});