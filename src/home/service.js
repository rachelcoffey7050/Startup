
export async function getPolls() {
    const response = await fetch(`/api/polls`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch polls`);
  }
  return await response.json();
}