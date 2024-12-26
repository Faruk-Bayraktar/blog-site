"use client";
import { useParams } from 'next/navigation';
import CardDetail from '@/components/CardDetail';
import { usePosts } from '@/context/PostsContext';

const PostPage = () => {
    const { cardId } = useParams();
    const { posts } = usePosts();
    const post = posts.find((post) => post.cardId === cardId);

    if (!post) {
        return <div></div>;
    }

    return (
        <div>
            <CardDetail post={post} />
        </div>
    );
};

export default PostPage;