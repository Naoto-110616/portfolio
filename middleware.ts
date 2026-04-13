import { NextResponse, type NextRequest } from "next/server";

const BASIC_AUTH_ID = process.env.BASIC_AUTH_ID?.trim();
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD?.trim();

function isBasicAuthEnabled() {
	return Boolean(BASIC_AUTH_ID && BASIC_AUTH_PASSWORD);
}

function createUnauthorizedResponse() {
	return new NextResponse("Authentication required.", {
		status: 401,
		headers: {
			"WWW-Authenticate": 'Basic realm="Secure Area"',
		},
	});
}

function getCredentialsFromHeader(authorizationHeader: string) {
	const [scheme, encodedCredentials] = authorizationHeader.split(" ");

	if (scheme !== "Basic" || !encodedCredentials) {
		return null;
	}

	try {
		const decodedCredentials = atob(encodedCredentials);
		const separatorIndex = decodedCredentials.indexOf(":");

		if (separatorIndex < 0) {
			return null;
		}

		return {
			id: decodedCredentials.slice(0, separatorIndex),
			password: decodedCredentials.slice(separatorIndex + 1),
		};
	} catch {
		return null;
	}
}

export function middleware(request: NextRequest) {
	if (!isBasicAuthEnabled()) {
		return NextResponse.next();
	}

	const authorizationHeader = request.headers.get("authorization");

	if (!authorizationHeader) {
		return createUnauthorizedResponse();
	}

	const credentials = getCredentialsFromHeader(authorizationHeader);

	if (!credentials) {
		return createUnauthorizedResponse();
	}

	if (credentials.id !== BASIC_AUTH_ID || credentials.password !== BASIC_AUTH_PASSWORD) {
		return createUnauthorizedResponse();
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
