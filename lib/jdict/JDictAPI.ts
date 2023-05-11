import axios from "axios";

const JDICT_API_URL = "https://jdict.net/api/v1" as const;

const axiosInstance = axios.create({
  baseURL: JDICT_API_URL,
});

async function doWordInfo(obj: any) {
  const response = await axiosInstance.get(`/words/${obj.slug}`, {
    params: { get_relate: "1" },
  });
  return response.data;
}

async function doSearch(word: string) {
  const response = await axiosInstance.get("/suggest", {
    params: {
      keyword: word,
      keyword_position: "start",
      type: "word",
    },
  });

  return Promise.all(response.data?.list.map(doWordInfo));
}

const JDictAPI = {
  search: doSearch,
};

export default JDictAPI;
