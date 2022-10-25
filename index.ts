import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(bodyParser.json());
app.use(cors());

const product: { id: number; name: string; marca: string }[] = [
  { name: "hola", marca: "chau", id: 1 },
];

app.get("/product", (req, res) => {
  res.status(200).json(product);
});

app.post("/product", (req, res) => {
  const { name, marca } = req.body;
  try {
    if (!name && !marca) throw new Error("che pasame el name y marca");
    product.push({ id: new Date().getTime(), name, marca });
    res.status(200).json(product.slice(-1));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.put("/product", (req, res) => {
  const { name, marca, id } = req.body;
  const index = product.findIndex((product) => product.id === id);
  if (index === -1)
    return res.status(400).json({ message: "no se encontro el producto" });
  product[index] = { ...product[index], name, marca };
  res.status(200).json(product[index]);
});

app.delete("/product", (req, res) => {
  const { name, marca, id } = req.body;
  const index = product.findIndex((product) => product.id === id);
  if (index > -1) return product.splice(index, 1);
  res.status(200).json(product);
});

app.listen(3001);
