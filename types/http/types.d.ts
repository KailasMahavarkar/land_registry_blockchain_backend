import { IncomingHttpHeaders } from "http";

declare module "http" {
	interface IncomingHttpHeaders {
		"x-api-key"?: string;
		"x-test-key"?: string;
	}
}
