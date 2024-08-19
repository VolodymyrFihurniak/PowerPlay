declare namespace JSON {
	type JSONValue =
		| string
		| number
		| boolean
		| undefined
		| JSONObject
		| JSONArray
		| JSON2DArray
		| JSONError;

	interface JSONObject {
		[x: string]: JSONValue;
	}

	interface JSON2DArray {
		[x: number]: JSONValue[];
	}

	type JSONArray = Array<JSONValue>;

	interface JSONError extends Error {
		name: string;
		message: string;
		stack?: string;
	}
}
