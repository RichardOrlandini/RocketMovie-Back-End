module.exports = {
  jwt: {
    secret: process.env.AUTH || "default",
    expiresIn: "1d"
  }
}