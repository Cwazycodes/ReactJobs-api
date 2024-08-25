const app = require('./app');

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});