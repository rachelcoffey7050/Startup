
export async function getPoll(id) {
    const response = await fetch(`/api/polls/${id}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch poll ${id}`);
  }
  return await response.json();
}

export async function updatePoll(id, updatePoll) {
    const response = await fetch(`/api/polls/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedPoll),
  });
  if (!response.ok) {
    throw new Error(`Failed to update poll ${id}`);
  }
  return await response.json();
}

