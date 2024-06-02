import prisma from "../utils/client.js";

export const getOrder = async (req, res) => {
   try {
      const { page = 1 } = req.query;
      const perPage = 10;
      const skip = (page - 1) * perPage;
      const getOrder = await prisma.order.findMany({
         include: {
            user: true,
            service: true,
            statusOrder: true,
         },
         take: perPage,
         skip: skip,
      });

      const total = await prisma.order.count();
      const totalPages = Math.ceil(total / perPage);

      res.json({
         message: "success get all data",
         data: getOrder,
         pageInfo: {
            total,
            page: parseInt(page),
            totalPages,
         },
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};

export const insertOrder = async (req, res) => {
   try {
      const { idUsers, idTiket, idService, waktuOrder, noted, idStatusOrder } =
         req.body;

      const today = new Date();
      const inputDate = new Date(waktuOrder);

      // Validasi tambahan jika diperlukan
      if (
         isNaN(inputDate) ||
         inputDate > today ||
         inputDate.getFullYear() !== today.getFullYear() ||
         inputDate.getMonth() > 11 // Perhatikan bahwa bulan dari 0-11 (Januari adalah 0)
      ) {
         return res.status(400).json({ error: "waktu order tidak valid" });
      }

      const newOrder = await prisma.order.create({
         data: {
            idUsers,
            idTiket,
            idService,
            waktuOrder,
            noted,
            idStatusOrder,
         },
         include: {
            user: true,
            service: true,
            statusOrder: true,
         },
      });

      res.status(201).json({ newOrder });
   } catch (error) {
      res.status(500).json({
         message: error.message,
         response: null,
      });
   }
};

export const updateOrder = async (req, res) => {
   try {
      const { idOrder } = req.params;
      const { idUsers, idTiket, idService, waktuOrder, noted, idStatusOrder } =
         req.body;

      const today = new Date();
      const inputDate = new Date(waktuOrder);

      // Validasi tambahan jika diperlukan
      if (
         isNaN(inputDate) ||
         inputDate > today ||
         inputDate.getFullYear() !== today.getFullYear() ||
         inputDate.getMonth() > 11 // Perhatikan bahwa bulan dari 0-11 (Januari adalah 0)
      ) {
         return res.status(400).json({ error: "waktu order tidak valid" });
      }

      const updatedOrder = await prisma.order.update({
         where: {
            idOrder: parseInt(idOrder),
         },
         data: {
            idUsers,
            idTiket,
            idService,
            waktuOrder,
            noted,
            idStatusOrder,
         },
         include: {
            user: true,
            service: true,
            statusOrder: true,
         },
      });

      res.json({ message: "order updated successfully", updatedOrder });
   } catch (error) {
      res.status(500).json({
         message: error.message,
         response: null,
      });
   }
};

export const getOrderById = async (req, res) => {
   try {
      const { idOrder } = req.params;

      const order = await prisma.order.findUnique({
         where: {
            idOrder: parseInt(idOrder),
         },
         // include: {
         //    user: true,
         //    jenisbankcategory: true,
         // },
      });

      if (!order) {
         return res.status(404).json({ error: "Order not found" });
      }

      res.json({ data: order });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};

export const deleteOrderAdmin = async (req, res) => {
   try {
      const { idOrder } = req.params;

      // Hapus pemasukan berdasarkan idOrder
      const deleteOrderAdmin = await prisma.order.delete({
         where: {
            idOrder: parseInt(idOrder),
         },
      });

      res.json({ message: "order deleted successfully", deleteOrderAdmin });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};
