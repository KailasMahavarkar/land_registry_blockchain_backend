declare namespace Express {
	export interface Request {
		locals: {
			user: object;
			hash: boolean;
			compress: boolean;
			encrypt: boolean;
			decrypt: boolean;

			owner: string;
			role: "member" | "admin";

			// checks
			checks: {
				testkey?: boolean;
				apikey?: boolean;
			};

			headers: {
				testkey?: string;
				apikey?: string;
			};
		};
	}
}
