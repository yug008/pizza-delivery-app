export const createInventoryHandlers = (Model, label) => {
  const create = async (req, res, next) => {
    try {
      const { name, price, stockQuantity, lowStockThreshold, isAvailable } =
        req.body;

      if (!name) {
        res.status(400);
        throw new Error('Name is required');
      }

      if (price === undefined || price === null) {
        res.status(400);
        throw new Error('Price is required');
      }

      if (Number(price) < 0) {
        res.status(400);
        throw new Error('Price must be a positive number');
      }

      if (stockQuantity === undefined || stockQuantity === null) {
        res.status(400);
        throw new Error('Stock quantity is required');
      }

      if (Number(stockQuantity) < 0) {
        res.status(400);
        throw new Error('Stock quantity cannot be negative');
      }

      if (
        lowStockThreshold !== undefined &&
        Number(lowStockThreshold) < 0
      ) {
        res.status(400);
        throw new Error('Low stock threshold cannot be negative');
      }

      const item = await Model.create({
        name,
        price,
        stockQuantity,
        lowStockThreshold,
        isAvailable,
      });

      res.status(201).json({
        success: true,
        data: item,
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400);
        return next(new Error(`${label} with this name already exists`));
      }

      next(error);
    }
  };

  const getAll = async (req, res, next) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        count: items.length,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);

      if (!item) {
        res.status(404);
        throw new Error(`${label} not found`);
      }

      const { name, price, stockQuantity, lowStockThreshold, isAvailable } =
        req.body;

      if (price !== undefined && Number(price) < 0) {
        res.status(400);
        throw new Error('Price must be a positive number');
      }

      if (stockQuantity !== undefined && Number(stockQuantity) < 0) {
        res.status(400);
        throw new Error('Stock quantity cannot be negative');
      }

      if (
        lowStockThreshold !== undefined &&
        Number(lowStockThreshold) < 0
      ) {
        res.status(400);
        throw new Error('Low stock threshold cannot be negative');
      }

      if (name !== undefined) item.name = name;
      if (price !== undefined) item.price = price;
      if (stockQuantity !== undefined) item.stockQuantity = stockQuantity;
      if (lowStockThreshold !== undefined) {
        item.lowStockThreshold = lowStockThreshold;
      }
      if (isAvailable !== undefined) item.isAvailable = isAvailable;

      const updated = await item.save();

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400);
        return next(new Error(`${label} with this name already exists`));
      }

      next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);

      if (!item) {
        res.status(404);
        throw new Error(`${label} not found`);
      }

      await item.deleteOne();

      res.status(200).json({
        success: true,
        message: `${label} deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  };

  return { create, getAll, update, remove };
};
