// import { prismaClient } from "../application/database";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401)
            .json({
                error: "Unauthorization",
            })
            .end();
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(403).json({
                    error: "Token invalid",
                });
            }

            req.user = user;

            next();
        });
        // cek db
        // const user = prismaClient.user.findFirst({
        //     where: {
        //         token: token,
        //     },
        // });

        // // cek user
        // if (!user) {
        //     res.status(401).json({
        //         errors: "Unauthorization",
        //     });
        // } else {
        //     req.user = user;
        //     next();
        // }
    }
};
