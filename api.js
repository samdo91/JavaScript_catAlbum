export const request = async (url) => {
  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();
    return json;
  }
  throw new Error("api를 받지 않았습니다");
};
