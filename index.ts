import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(bodyParser.json());
app.use(cors());

const product: { id: number; name: string; brand: string; price: number }[] = [
  { name: "Iphone", brand: "Apple", id: 1, price: 1000 },
  { name: "Galaxy", brand: "Samsung", id: 2, price: 800 },
];

app.get("/product", (req, res) => {
  console.log("entro a la peticion");
  res.status(200).json(product);
});

app.post("/product", (req, res) => {
  const { name, brand, price } = req.body;
  try {
    if (!name || !brand || !price)
      throw new Error("Missing name, brand or price");
    product.push({ id: new Date().getTime(), name, brand, price });
    res.status(200).json(product.slice(-1));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.put("/product", (req, res) => {
  const { name, brand, id, price } = req.body;
  const index = product.findIndex((product) => product.id === id);
  if (index === -1)
    return res.status(400).json({ message: "no se encontro el producto" });
  product[index] = { ...product[index], name, brand, price };
  res.status(200).json(product[index]);
});

app.delete("/product/:id", (req, res) => {
  const id = req.params.id;
  const index = product.findIndex((product) => product.id === Number(id));
  if (index > -1) {
    return res.status(200).json(product.splice(index, 1));
  } else {
    return res
      .status(400)
      .json({ message: "hubo un error intentando eliminar el producto" });
  }
});

app.listen(3001);
