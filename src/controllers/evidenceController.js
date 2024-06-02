import prisma from "../utils/client.js";

export const getEviden = async (req, res) => {
   try {
      const { page = 1 } = req.query;
      const perPage = 10;
      const skip = (page - 1) * perPage;
      const getEviden = await prisma.eviden.findMany({
         include: {
            user: true,
            service: true,
            statusOrder: true,
            statusEviden: true,
            order: true,
         },
         take: perPage,
         skip: skip,
      });

      const total = await prisma.eviden.count();
      const totalPages = Math.ceil(total / perPage);

      res.json({
         message: "success get all data",
         data: getEviden,
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

export const insertEviden = async (req, res) => {
   try {
      const {
         idUsers,
         idTiket,
         idService,
         waktuEviden,
         notedEviden,
         idStatusOrder,
         idStatusEvidence,
      } = req.body;

      const today = new Date();
      const inputDate = new Date(waktuEviden);

      // Validasi tambahan jika diperlukan
      if (
         isNaN(inputDate) ||
         inputDate > today ||
         inputDate.getFullYear() !== today.getFullYear() ||
         inputDate.getMonth() > 11 // Perhatikan bahwa bulan dari 0-11 (Januari adalah 0)
      ) {
         return res.status(400).json({ error: "waktu eviden tidak valid" });
      }

      const newEviden = await prisma.eviden.create({
         data: {
            idUsers,
            idTiket,
            idService,
            waktuEviden,
            notedEviden,
            idStatusOrder,
            idStatusEvidence,
         },
         include: {
            user: true,
            service: true,
            statusOrder: true,
            statusEviden: true,
            order: true,
         },
      });

      res.status(201).json({ newEviden });
   } catch (error) {
      res.status(500).json({
         message: error.message,
         response: null,
      });
   }
};

export const deleteEvidenceMitra = async (req, res) => {
   try {
      const { idEviden } = req.params;

      // Hapus pemasukan berdasarkan idEviden
      const deleteEvidenceMitra = await prisma.eviden.delete({
         where: {
            idEviden: parseInt(idEviden),
         },
      });

      res.json({ message: "eviden deleted successfully", deleteEvidenceMitra });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};

export const updateEviden = async (req, res) => {
   try {
      const { idEviden } = req.params;
      const {
         idUsers,
         idTiket,
         idService,
         waktuEviden,
         notedEviden,
         idStatusOrder,
         idStatusEvidence,
      } = req.body;

      const today = new Date();
      const inputDate = new Date(waktuEviden);

      // Validasi tambahan jika diperlukan
      if (
         isNaN(inputDate) ||
         inputDate > today ||
         inputDate.getFullYear() !== today.getFullYear() ||
         inputDate.getMonth() > 11 // Perhatikan bahwa bulan dari 0-11 (Januari adalah 0)
      ) {
         return res.status(400).json({ error: "waktu eviden tidak valid" });
      }

      const updateEviden = await prisma.eviden.update({
         where: {
            idEviden: parseInt(idEviden),
         },
         data: {
            idUsers,
            idTiket,
            idService,
            waktuEviden,
            notedEviden,
            idStatusOrder,
            idStatusEvidence,
         },
         include: {
            user: true,
            service: true,
            statusOrder: true,
            statusEviden: true,
            order: true,
         },
      });

      res.json({ message: "eviden updated successfully", updateEviden });
   } catch (error) {
      res.status(500).json({
         message: error.message,
         response: null,
      });
   }
};

export const getEvidenceById = async (req, res) => {
   try {
      const { idEviden } = req.params;

      const eviden = await prisma.eviden.findUnique({
         where: {
            idEviden: parseInt(idEviden),
         },
         include: {
            order: true,
         },
      });

      if (!eviden) {
         return res.status(404).json({ error: "eviden not found" });
      }

      res.json({ data: eviden });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};
