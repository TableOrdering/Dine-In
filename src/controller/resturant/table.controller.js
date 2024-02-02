import asyncHandler from "../../middleware/async_handler.middleware.js";
import { Table } from "../../model/resturant/table.model.js";

const createTable = asyncHandler(async (req, res) => {
  const { name, tableNumber, capacity, status } = req.body;
  const { restaurantId } = req.restaurant;
  if (!name || !tableNumber || !capacity || !status) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const existingTable = await Table.findOne({ tableNumber });
  if (existingTable) {
    return res.status(400).json({ message: "Table already exists" });
  }
  const tableResponse = await Table({
    name,
    tableNumber,
    capacity,
    status,
    resturant: restaurantId,
  });
  await tableResponse.save();
  return res.status(201).json({ message: "Table created successfully" });
});

const getAllTables = asyncHandler(async (req, res) => {
  const { restaurantId } = req.restaurant;
  const tables = await Table.find({ resturant: restaurantId });
  if (!tables) {
    return res.status(400).json({ message: "No tables found" });
  }
  return res.status(200).json(tables);
});

const updateTableStatus = asyncHandler(async (req, res) => {
  const { tableId } = req.body;
  const table = await Table.findByIdAndUpdate(tableId);
  if (!table) {
    return res.status(400).json({ message: "Table not found" });
  }
  table.status = !table.status;
  await table.save();
  return res.status(200).json({ message: "Table status updated" });
});

export { createTable, getAllTables,updateTableStatus };
