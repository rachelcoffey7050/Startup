
export async function createNewPoll(newPoll) {
    const response = await fetch('/api/polls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPoll),
  });
  if (!response.ok) { 
    throw new Error(`Failed to add poll`);
  }
  return await response.json();
}