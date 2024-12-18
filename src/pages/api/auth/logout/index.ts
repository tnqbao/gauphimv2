import {NextApiRequest, NextApiResponse} from "next";
import {userApiInstance} from "@/utils/axios.config";
import {parse, serialize} from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const response = await userApiInstance.post("/api/auth/logout", {}, {
            withCredentials: true,
            headers: {
                Authorization: `${token}`,
            }
        });
        if (response.status != 200) {
            res.status(400).end("Failed to logout");
        } else {
            res.setHeader('Set-Cookie', serialize('auth_token', token, {
                httpOnly: true,
                maxAge: -1,
                path: '/',
            }));
            res.status(200).end("Logout success");
        }
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).end("Internal server error");
    }
}