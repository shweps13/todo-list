const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

export const dbCall = async (method, body, sortField, sortDirection) => {

  const encodeUrl = ( sortField, sortDirection ) => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    return encodeURI(`${url}?${sortQuery}`);
  };

  const response = await fetch(encodeUrl(sortField, sortDirection), {
    method,
    'headers': {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};