export default async (res) => {
  try {
    const ret = await res.json();
    if (res.ok) {
      return Promise.resolve(ret);
    }
    throw new Error(ret.message || 'network error');
  } catch (err) {
    throw new Error(err.message || 'request error');
  }
};
