
export function getErrorMessage(error: unknown, p0: string): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong";
}
