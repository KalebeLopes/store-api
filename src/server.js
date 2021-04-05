import setupApp from "./app";
import User from "../src/models/user"
const port = 3030;

(async () => {
  try {
    const app = await setupApp();
    const server = app.listen(port, () =>
      console.info(`App running on port ${port}`)
    );
    const admin = new User({
      name: 'kalebe',
      email: 'kalebe@gmail.com',
      password: '123',
      role: 'admin'
    })
    
    admin.save()

    const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"];
    exitSignals.map(sig =>
      process.on(sig, () =>
        server.close(err => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          app.database.connection.close(function() {
            console.info("Database connection closed!");
            process.exit(0);
          });
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
