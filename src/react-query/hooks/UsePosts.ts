import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

interface PostQueryKey {
    page: number;
    pageSize: number;
}

const usePosts = (query:PostQueryKey) => useQuery<Post[], Error> ({
    queryKey: ['posts', query],
    queryFn: () => axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
        params: {
            _start: (query.page -1) * query.pageSize,
            _limit: query.pageSize,
        },
    })
    .then((res) => res.data),
    staleTime: 10 * 10000,
    keepPreviousData: true,

   });

   export default usePosts