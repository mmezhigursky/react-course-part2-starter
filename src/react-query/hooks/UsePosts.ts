import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

const usePosts = (userId:number | undefined) => useQuery<Post[], Error> ({
    queryKey: userId ? ['users', userId, 'posts'] : ['posts'],
    queryFn: () => axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.data),
    staleTime: 10 * 10000,

   });

   export default usePosts