import {NextApiRequest, NextApiResponse} from 'next';
import {userApiInstance} from "@/utils/axios.config";
import {serialize} from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const {username, password, keepLogin} = req.body;
            const response = await userApiInstance.post('api/user/auth/login', {username, password, keepLogin},
                {
                    withCredentials: true,
                });
            if (response.status === 200) {
                const token = response.data.token;
                const shouldKeepLogin = keepLogin === 'true';
                res.setHeader('Set-Cookie', serialize('auth_token', token, {
                    httpOnly: true,
                    maxAge: shouldKeepLogin ? 30 * 24 * 60 * 60 : undefined,
                    path: '/',
                }));
                res.status(200).json( {user: response.data.user});
            }
        } catch {
            res.status(401).json({message: 'Invalid credentials'});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}