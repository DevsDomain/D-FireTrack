import { app } from "./index";
import { env } from './env';

app.listen(env.PORT, () =>
  console.log(`Server is running on Port:${env.PORT}`))
  .on("error", (err) => {
    console.error("Error starting server", err)
  })