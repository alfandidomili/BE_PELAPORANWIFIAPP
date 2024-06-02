// middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
   const status = err.status || 500;
   const message = err.message || "Something went wrong";
   const errors = err.errors || [];

   res.status(status).json({ message, status, error: errors });
};
