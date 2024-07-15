import express from "express";
import migrationRoutes from "./routes/migrationRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use("/api", migrationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
