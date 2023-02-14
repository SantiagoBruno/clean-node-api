export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27018/clear-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '73Idk!jd#2'
}
