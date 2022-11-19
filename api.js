const MAIN_API =
  "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/";

export const request = async (nexturl) => {
  const url = nexturl ? `${MAIN_API}${nexturl}` : MAIN_API;
  console.log(url);

  const res = await fetch(`${url}`);

  if (res.ok) {
    const json = await res.json();
    console.log(json);
    return json;
  }
  throw new Error("api를 받지 않았습니다");
};
