import prisma from "../utils/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
	createError,
	CustomError,
} from "../utils/error.js";

export const getUsers = async (req, res) => {
	try {
		// defined variale for paginations
		const { page = 1 } = req.query;
		const perPage = 10;
		const skip = (page - 1) * perPage;

		const users = await prisma.user.findMany({
			orderBy: {
				idUsers: "asc",
			},
			include: {
				userRole: true,
			},
			take: perPage,
			skip: skip,
		});

		const total = await prisma.user.count();
		const totalPages = Math.ceil(total / perPage);
		res.json({
			message: "success get all data",
			data: users,
			pageInfo: {
				total,
				page: parseInt(page),
				totalPages,
			},
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "Internal Server Error" });
	}
};

export const getUsersMitra = async (req, res) => {
	try {
		const { page = 1 } = req.query;
		const perPage = 10;
		const skip = (page - 1) * perPage;
		// Hanya mendapatkan pengguna dengan role "mitra"
		const users = await prisma.user.findMany({
			where: {
				userRole: {
					idName: "Mitra",
				},
			},
			orderBy: {
				idUsers: "asc",
			},
			include: {
				userRole: true,
				Order: true,
				Eviden: true,
			},
			take: perPage,
			skip: skip,
		});

		const total = users.length;
		const totalPages = Math.ceil(total / perPage);
		res.json({
			message: "success get all data mitra",
			data: users,
			pageInfo: {
				total,
				page: parseInt(page),
				totalPages,
			},
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "Internal Server Error" });
	}
};

export const registUser = async (req, res) => {
	try {
		const { usernameId, nama, idUserRoles, password } =
			req.body;

		if (!password) {
			return res
				.status(400)
				.json({ error: "Password is required" });
		}
		// Hash password
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(
			password,
			saltRounds
		);

		// Simpan user ke database
		const user = await prisma.user.create({
			data: {
				usernameId,
				nama,
				idUserRoles: parseInt(idUserRoles),
				password: passwordHash,
			},
		});

		res.json({
			message: "Pendaftaran berhasil",
			userId: user.idUsers,
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "Internal Server Error" });
	}
};

const validateLoginInput = (usernameId, password) => {
	const errors = [];

	if (!usernameId) {
		errors.push({
			name: "usernameId",
			errors: ["usernameId harus diisi"],
		});
	}

	if (!password) {
		errors.push({
			name: "password",
			errors: ["Password wajib diisi"],
		});
	}

	return errors;
};

export const loginUsers = async (req, res) => {
	try {
		const { usernameId, password } = req.body;

		// Array to store validation errors

		// Cari user berdasarkan email
		const user = await prisma.user.findFirst({
			where: {
				usernameId: usernameId,
			},
		});

		const inputErrors = validateLoginInput(
			usernameId,
			password
		);

		if (inputErrors.length > 0) {
			throw createError(
				422,
				"Gagal di simpan, periksa kembali",
				inputErrors
			);
		}

		const errors = [];

		if (!user) {
			errors.push({
				name: "usernameId",
				errors: ["username tidak terdaftar"],
			});
		} else {
			// Check if user has password_hash property before comparing the password
			if (user.password) {
				const matchingpass = await bcrypt.compare(
					password,
					user.password
				);

				if (!matchingpass) {
					errors.push({
						name: "password",
						errors: ["Password salah"],
					});
				}
			} else {
				// Handle the case where password_hash is not available
				errors.push({
					name: "password",
					errors: ["Data pengguna tidak lengkap"],
				});
			}
		}

		console.log(errors.length);
		console.log(errors);
		console.log(user);
		if (errors.length > 0) {
			throw createError(
				422,
				"Gagal di simpan, periksa kembali",
				errors
			);
		}

		const secret = process.env.JWT_SECRET;
		const expiresIn = 60 * 60 * 1;

		// Generate token JWT
		const token = jwt.sign(
			{ idUsers: user.idUsers },
			secret,
			{
				expiresIn: expiresIn,
			}
		);

		res.json({
			message: "berhasil login",
			status: 200,
			data: {
				id: user.idUsers,
				usernameId: user.usernameId,
			},
			token,
		});
	} catch (error) {
		console.error(error);
		if (error instanceof CustomError) {
			res.status(error.status).json({
				message: error.message,
				status: error.status,
				error: error.errors,
			});
		} else {
			res.status(500).json({
				message: "Internal Server Error",
				status: 500,
			});
		}
	}
};

export const logoutUsers = async (req, res) => {
	try {
		const token = req.headers.authorization?.replace(
			"Bearer ",
			""
		);

		if (!token) {
			return res
				.status(401)
				.json({ error: "Unauthorized" });
		}

		// Disini Anda dapat menambahkan logika tambahan jika diperlukan
		// (Contoh: menambahkan token ke daftar token yang sudah di-blacklist)

		res.json({ message: "Logout berhasil" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "Internal Server Error" });
	}
};

export const getMe = async (req, res) => {
	try {
		// defined variale for paginations
		const idUsers = req.userData.idUsers;

		const user = await prisma.user.findUnique({
			where: {
				idUsers: idUsers,
			},
			select: {
				idUsers: true,
				usernameId: true,
				nama: true,
				userRole: {
					select: {
						idUserRoles: true,
						idName: true,
					},
				},
			},
		});

		res.json({
			message: "succes get me",
			data: user,
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "Internal Server Error" });
	}
};
