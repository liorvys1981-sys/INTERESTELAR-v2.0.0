import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_KEY && STRIPE_KEY.startsWith("sk_")
  ? new Stripe(STRIPE_KEY, { apiVersion: "2025-04-30.basil" })
  : null;

const PRICE_MAP: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER || "",
  growth: process.env.STRIPE_PRICE_GROWTH || "",
  professional: process.env.STRIPE_PRICE_PROFESSIONAL || "",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE || "",
};

export const stripeRouter = createRouter({
  createCheckoutSession: publicQuery
    .input(
      z.object({
        plan: z.enum(["starter", "growth", "professional", "enterprise"]),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (!stripe) {
        return { success: false, error: "Stripe not configured. Set STRIPE_SECRET_KEY.", url: null };
      }
      const priceId = PRICE_MAP[input.plan];
      if (!priceId) {
        return {
          success: false,
          error: `Price not configured for plan: ${input.plan}. Please set STRIPE_PRICE_${input.plan.toUpperCase()} in environment variables.`,
          url: null,
        };
      }

      try {
        const session = await stripe.checkout.sessions.create({
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          success_url: `${process.env.VITE_APP_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.VITE_APP_URL || "http://localhost:3000"}/checkout/cancel`,
          customer_email: input.email || undefined,
          metadata: {
            plan: input.plan,
          },
          allow_promotion_codes: true,
          billing_address_collection: "required",
        });

        return {
          success: true,
          error: null,
          url: session.url,
        };
      } catch (err: any) {
        return {
          success: false,
          error: err.message || "Failed to create checkout session",
          url: null,
        };
      }
    }),

  getSession: publicQuery
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      if (!stripe) return { success: false, error: "Stripe not configured.", session: null };
      try {
        const session = await stripe.checkout.sessions.retrieve(
          input.sessionId,
          {
            expand: ["line_items", "customer"],
          }
        );
        return {
          success: true,
          session: {
            status: session.status,
            paymentStatus: session.payment_status,
            customerEmail: session.customer_email,
            amountTotal: session.amount_total,
            currency: session.currency,
            plan: session.metadata?.plan || null,
          },
        };
      } catch (err: any) {
        return {
          success: false,
          error: err.message,
          session: null,
        };
      }
    }),

  createBillingPortal: publicQuery
    .input(z.object({ customerId: z.string() }))
    .mutation(async ({ input }) => {
      if (!stripe) return { success: false, error: "Stripe not configured." };
      try {
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: input.customerId,
          return_url: `${process.env.VITE_APP_URL || "http://localhost:3000"}/dashboard`,
        });
        return {
          success: true,
          url: portalSession.url,
        };
      } catch (err: any) {
        return {
          success: false,
          error: err.message,
        };
      }
    }),
});
