import { JWTPayload } from "jose";

export interface SessionPayload extends JWTPayload {
    userID?: string,
};
