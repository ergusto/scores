import { z } from "zod";

export const gameInput = z.oject({
	title: z.string({
		required_error: "Title required"
	}),
});
