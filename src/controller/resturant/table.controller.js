import asyncHandler from "../../middleware/async_handler.middleware.js";
import { Table } from "../../model/resturant/table.model.js";
import { Resturant } from "../../model/resturant/resutrant.model..js";

const createTable = asyncHandler(async (req, res) => {
  const { name, tableNumber, capacity } = req.body;
  const { restaurantId } = req.restaurant;

  if (!name || !tableNumber || !capacity) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const restaurant = await Resturant.findById(restaurantId);
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  const existingTable = await Table.findOne({
    tableNumber,
    resturant: restaurantId,
  });
  if (existingTable) {
    return res.status(400).json({ message: "Table already exists" });
  }

  // Generate a unique QR code
  // const qrCodeData = `${restaurant.name}-${tableNumber}`;
  const qrCodeData = `${restaurantId}-${tableNumber}`;

  const tableResponse = await Table({
    name,
    tableNumber,
    capacity,
    resturant: restaurantId,
    qrCodeData: qrCodeData,
  });

  await tableResponse.save();

  return res.status(201).json({
    message: "Table created successfully",
    qrCodeData: qrCodeData,
  });
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

const getTableInfo = asyncHandler(async (req, res) => {
  const { qrCodeData } = req.body;
  const tableDetails = await Table.findOne({
    qrCodeData: qrCodeData,
  })
    .populate("resturant")
    .exec();

  if (!tableDetails) {
    return res.status(404).json({ message: "Table not found" });
  }
  if (tableDetails.status === false) {
    return res.status(400).json({ message: "Table already occupied" });
  }

  return res.status(200).json(tableDetails);
});

const deleteTable = asyncHandler(async (req, res) => {
  const { tableId } = req.body;
  const table = await Table.findByIdAndDelete(tableId);
  if (!table) {
    return res.status(400).json({ message: "Table not found" });
  }
  return res.status(200).json({ message: "Table deleted successfully" });
});

const updateTableInfo = asyncHandler(async (req, res) => {
  let { tableId, name, tableNumber, capacity } = req.body;
  if (!tableId && req.body._id) {
    tableId = req.body._id;
  }
  const findTable = await Table.findById(tableId);
  if (!findTable) {
    return res.status(400).json({ message: "Table not found" });
  }
  const existingTableNumber = await Table.findOne({
    tableNumber,
    resturant: findTable.resturant,
    _id: { $ne: tableId },
  });
  if (existingTableNumber) {
    return res
      .status(400)
      .json({ message: "Table number already exists in the restaurant" });
  }
  await Table.findByIdAndUpdate(tableId, {
    name,
    tableNumber,
    capacity,
  });

  return res.status(200).json({ message: "Table updated successfully" });
});

export {
  createTable,
  getAllTables,
  updateTableStatus,
  getTableInfo,
  deleteTable,
  updateTableInfo,
};
