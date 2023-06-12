export async function request<TResponse>(
  url: string,
  config?: RequestInit
): Promise<TResponse> {
  const response = await fetch(url, config);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await response.json();
}
