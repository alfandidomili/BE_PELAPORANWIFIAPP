import prisma from "../utils/client.js";

export const getCStatusOrder = async (req, res) => {
   try {
      const catStatusOrder = await prisma.statusOrder.findMany();
      res.json({ data: catStatusOrder });
   } catch (error) {
      res.status(500).json({
         message: error.message,
         response: null,
      });
   }
};
