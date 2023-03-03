import { http } from '../utils/http';
import useSWR from "swr";
const url = {
  getPost: () => `/post`,
  getPostById: (id) => `/post/${id}`,
  getPostByIdComment: (id) => `/post/${id}/comment`,
  getCommentByPostId: (id) => `/comments?postId=${id}`,
};
const hooks = {
    useGetPostId(id){
        return useSWR(url.getPostById(id), http.fetcher)
    },
    useGetPost(){
        return useSWR(url.getPost(), http.fetcher)
    }
};

const api = {
  createPost(data) {
    return http.post(url.getPost(), data);
  },
 
};

export const exampleRepository = {
  url,
  hooks,
  api,
};
