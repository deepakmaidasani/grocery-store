import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";
import {User} from "../models/groceryusers"
import express, { Request, Response } from "express";

const jwt = require("jsonwebtoken");

// function for a middleware in order to check whether the token is okay or not so that the protected routes can be accessed
function authenticateToken(req:Request, res:Response, next:Next) {
	// spliting the Authorization header into two parts as it contains Bearer + Token
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	let isSuccess, message, status;
	if (!token) {
		isSuccess = false;
		message = "Token is missing!";
		status = 401;
		return res.status(status).json({
			isSuccess: isSuccess,
			message: message,
			status: status,
		});
	}
	jwt.verify(token, process.env.USER_ACCESS_KEY, (err:Error, user:User) => {
		// verify the token
		if (err) {
			isSuccess = false;
			message = "Cannot verify the token or the token has expired!";
			status = 403;
			return res.status(status).json({
				isSuccess: isSuccess,
				message: message,
				status: status,
			});
		}
		req.body.user = user;
	});
	next(); // will make call to the function using the middleware
}

export {
	authenticateToken
}

//module.exports=authJwt;