import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

interface PostQueryKey {
    pageSize: number;
}

const usePosts = (query:PostQueryKey) => useInfiniteQuery<Post[], Error> ({
    queryKey: ['posts', query],
    queryFn: ({pageParam = 1}) => axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
        params: {
            _start: (pageParam -1) * query.pageSize,
            _limit: query.pageSize,
        },
    })
    .then((res) => res.data),
    staleTime: 10 * 10000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
        return allPages.length > 0 ? allPages.length + 1: undefined; 
    }

   });

   export default usePosts