import prisma from "../utils/client.js";

export const getCServices = async (req, res) => {
   try {
      const catSsrvices = await prisma.categoryService.findMany();
      res.json({ data: catSsrvices });
   } catch (error) {
      res.status(500).json({
         message: error.message,
         response: null,
      });
   }
};
