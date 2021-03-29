before(async () => {
  const app = await global.setupApp()
  global.app = app
  global.request = global.supertest(app)
})

after(async () => await app.database.connection.close());