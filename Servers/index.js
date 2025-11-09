import express from "express";
import cors from "cors";

// import routes
import varietiesRoutes from "./routes/varieties.js";
import productRoute from "./routes/products.js";
import newsRoute from "./routes/news.js";
import marketRoute from "./routes/market.js";
import dashboardRoute from "./routes/dashboard.js";

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/varieties", varietiesRoutes); // ชื่อต้องตรงกับ import
app.use("/products", productRoute);
app.use("/news", newsRoute);
app.use("/market", marketRoute);
app.use("/dashboard", dashboardRoute);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
