import { Webhook } from "svix";
import express from "express";
import { query } from "../database/pool.js";

const router = express.Router();
router.post("/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) =>{
        try{
            const clerkWebhook = new Webhook(process.env.CLERK_SIGNING_SECRET);
            const evt = clerkWebhook.verify(req.body, req.headers);
            console.log("Clerk event received:", evt.type);
            const data = evt.data;
            if(evt.type === "user.created"){
                const email = data.email_addresses?.[0]?.email_address;
                await query(
                    `insert into app_user values(:id, :email)`,
                    {
                        email: email,
                        id: data.id
                    },
                    { autoCommit: true }
                    );
            }
                
            else if(evt.type === "user.deleted"){
                
            }
            else if(evt.type === "user.updated"){
                
            }
            res.status(200).send("OK");
        }
        catch (err) {
            console.error("Webhook error:", err);
            res.status(400).send("webhook error");
        }
});

export default router;