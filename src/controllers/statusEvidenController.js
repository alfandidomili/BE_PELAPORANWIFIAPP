import prisma from "../utils/client.js";

export const getCatStatEviden = async (req, res) => {
   try {
      const statusEviden = await prisma.statusEviden.findMany();
      res.json({ data: statusEviden });
   } catch (error) {
      res.status(500).json({
         message: error.message,
         response: null,
      });
   }
};
