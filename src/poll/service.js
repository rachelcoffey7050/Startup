
export async function getPoll(id) {
    let response = await fetch(`/api/polls/${id}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch poll ${id}`);
  }
  return await response.json();
}

export async function updatePoll(id, updatedPoll) {
    let response = await fetch(`/api/polls/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPoll),
  });
  if (!response.ok) { 
    throw new Error(`Failed to update poll ${id}`);
  }
  return await response.json();
}

