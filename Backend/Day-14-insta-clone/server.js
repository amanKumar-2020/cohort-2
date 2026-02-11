const app = require("./src/app")


app.listen(process.env.PORT|| 3000,()=>{
  console.log(`welcome to our world , you are using multidimensional gate port ${process.env.PORT}`);
})