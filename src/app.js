import express from "express";
import migrationRoutes from "./routes/migrationRoutes.js";
import integrationRoutes from "./routes/integrationRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", migrationRoutes);
app.use("/api/integrate", integrationRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/api`);
});
