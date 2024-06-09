import NodePath from "node:path";

/**
 * Retrieves the value of the specified environment variable.
 * @param key - The name of the environment variable.
 * @returns - The value of the specified environment variable.
 * @throws {TypeError} - If the specified environment variable is not set.
 */
export function getOsEnvironment(key: string): string {
  if (process.env[key] === undefined) {
    throw new TypeError(`Environment variable ${key} is not set.`);
  }

  return process.env[key] as string;
}

/**
 * Retrieves the value of the specified environment variable if it exists.
 * If the environment variable is not set, an empty string is returned.
 * @param key - The name of the environment variable.
 * @returns The value of the specified environment variable, or an empty string if the variable is not set.
 */
export function getOsEnvironmentOptional(key: string): string {
  return process.env[key] || "";
}

/**
 * Constructs a file path based on the environment.
 *
 * If the environment is production, it replaces 'src/' with 'dist/' and appends '.js'.
 * Otherwise, it returns the original path.
 * @param path - The input file path.
 * @returns The constructed file path.
 */
export function getPath(path: string): string {
  return process.env.NODE_ENV === "production"
    ? NodePath.join(
        process.cwd(),
        `${path.replace("src/", "dist/").slice(0, -3)}.js`,
      )
    : NodePath.join(process.cwd(), path);
}

/**
 * Constructs file paths based on the environment for an array of input paths.
 * @param paths - An array of input file paths.
 * @returns An array of constructed file paths.
 */
export function getPaths(paths: string[]): string[] {
  return paths.map((p) => getPath(p));
}

/**
 * Constructs a file path based on an environment variable.
 *
 * Retrieves the value of the specified environment variable and constructs a file path based on it.
 * @param key - The name of the environment variable containing the file path.
 * @returns The constructed file path.
 */
export function getOsPath(key: string): string {
  return getPath(getOsEnvironment(key));
}

/**
 * Retrieves the value of the specified environment variable as an array.
 *
 * Splits the value of the specified environment variable by the specified delimiter to create an array.
 * @param key - The name of the environment variable.
 * @param [delimiter] - The delimiter used to split the environment variable value into an array. Defaults to ','.
 * @returns An array containing the values of the specified environment variable, or an empty array if the variable is not set.
 */
export function getOsEnvironmentArray(
  key: string,
  delimiter: string = ",",
): string[] {
  return (process.env[key] && process.env[key]!.split(delimiter)) || [];
}

/**
 * Constructs file paths based on an environment variable containing multiple paths.
 *
 * Retrieves the value of the specified environment variable as an array of paths,
 * and constructs file paths based on each path in the array.
 * @param key - The name of the environment variable containing the paths.
 * @returns An array of constructed file paths.
 */
export function getOsPaths(key: string): string[] {
  return getPaths(getOsEnvironmentArray(key));
}

/**
 * Converts a string to a number.
 * @param value - The string value to convert to a number.
 * @returns The parsed number.
 */
export function toNumber(value: string): number {
  return Number.parseInt(value, 10);
}

/**
 * Converts a string representation of a boolean to a boolean value.
 * @param value - The string representation of the boolean value.
 * @returns The boolean value parsed from the input string.
 */
export function toBool(value: string): boolean {
  return value === "true";
}

/**
 * Normalizes a port number represented as a string to a valid numeric port.
 * @param port - The port number as a string.
 * @returns The normalized port number.
 * @throws {TypeError} - If the provided port string is not a valid number.
 * @throws {Error} - If the provided port number is negative.
 */
export function normalizePort(port: string): number {
  const parsedPort = Number.parseInt(port, 10);
  if (Number.isNaN(parsedPort)) {
    throw new TypeError(`Environment variable port ${port} is invalid.`);
  }
  if (parsedPort >= 0) {
    return parsedPort;
  }
  throw new Error(`Environment variable port ${port} is invalid.`);
}
